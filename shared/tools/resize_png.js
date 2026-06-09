#!/usr/bin/env node

const fs = require("fs");
const zlib = require("zlib");

function fail(message) {
  console.error(`Erro: ${message}`);
  process.exit(1);
}

function readUInt32BE(buffer, offset) {
  return buffer.readUInt32BE(offset);
}

function writeUInt32BE(buffer, offset, value) {
  buffer.writeUInt32BE(value, offset);
}

function crc32(buffer) {
  let crc = 0xffffffff;

  for (const byte of buffer) {
    crc ^= byte;

    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
    }
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const typeBuffer = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const crcInput = Buffer.concat([typeBuffer, data]);
  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc32(crcInput));
  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

function paethPredictor(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);

  if (pa <= pb && pa <= pc) {
    return a;
  }

  if (pb <= pc) {
    return b;
  }

  return c;
}

function unfilterScanline(filterType, row, previousRow, bytesPerPixel) {
  const output = Buffer.alloc(row.length);

  for (let index = 0; index < row.length; index += 1) {
    const left = index >= bytesPerPixel ? output[index - bytesPerPixel] : 0;
    const up = previousRow ? previousRow[index] : 0;
    const upLeft = previousRow && index >= bytesPerPixel ? previousRow[index - bytesPerPixel] : 0;
    const value = row[index];

    switch (filterType) {
      case 0:
        output[index] = value;
        break;
      case 1:
        output[index] = (value + left) & 0xff;
        break;
      case 2:
        output[index] = (value + up) & 0xff;
        break;
      case 3:
        output[index] = (value + Math.floor((left + up) / 2)) & 0xff;
        break;
      case 4:
        output[index] = (value + paethPredictor(left, up, upLeft)) & 0xff;
        break;
      default:
        fail(`filtro PNG nao suportado: ${filterType}`);
    }
  }

  return output;
}

function decodePng(buffer) {
  const signature = buffer.subarray(0, 8).toString("hex");

  if (signature !== "89504e470d0a1a0a") {
    fail("arquivo nao e um PNG valido");
  }

  let offset = 8;
  let width;
  let height;
  let bitDepth;
  let colorType;
  let compressed = null;

  while (offset < buffer.length) {
    const length = readUInt32BE(buffer, offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const data = buffer.subarray(offset + 8, offset + 8 + length);
    offset += 12 + length;

    if (type === "IHDR") {
      width = readUInt32BE(data, 0);
      height = readUInt32BE(data, 4);
      bitDepth = data[8];
      colorType = data[9];

      if (bitDepth !== 8 || colorType !== 6) {
        fail("apenas PNG RGBA 8-bit nao interlaced e suportado");
      }
    }

    if (type === "IDAT") {
      compressed = compressed ? Buffer.concat([compressed, data]) : Buffer.from(data);
    }
  }

  if (!width || !height || !compressed) {
    fail("PNG sem IHDR ou IDAT");
  }

  const decompressed = zlib.inflateSync(compressed);
  const bytesPerPixel = 4;
  const stride = width * bytesPerPixel;
  const pixels = Buffer.alloc(width * height * bytesPerPixel);
  let sourceOffset = 0;
  let previousRow = null;

  for (let row = 0; row < height; row += 1) {
    const filterType = decompressed[sourceOffset];
    sourceOffset += 1;
    const filteredRow = decompressed.subarray(sourceOffset, sourceOffset + stride);
    sourceOffset += stride;
    const currentRow = unfilterScanline(filterType, filteredRow, previousRow, bytesPerPixel);
    currentRow.copy(pixels, row * stride);
    previousRow = currentRow;
  }

  return { width, height, pixels };
}

function resizeRgba(pixels, sourceWidth, sourceHeight, targetWidth, targetHeight) {
  const output = Buffer.alloc(targetWidth * targetHeight * 4);
  const isDownscale = targetWidth < sourceWidth || targetHeight < sourceHeight;

  for (let y = 0; y < targetHeight; y += 1) {
    for (let x = 0; x < targetWidth; x += 1) {
      const targetIndex = (y * targetWidth + x) * 4;

      if (!isDownscale) {
        const sourceX = Math.min(sourceWidth - 1, Math.floor((x * sourceWidth) / targetWidth));
        const sourceY = Math.min(sourceHeight - 1, Math.floor((y * sourceHeight) / targetHeight));
        const sourceIndex = (sourceY * sourceWidth + sourceX) * 4;

        output[targetIndex] = pixels[sourceIndex];
        output[targetIndex + 1] = pixels[sourceIndex + 1];
        output[targetIndex + 2] = pixels[sourceIndex + 2];
        output[targetIndex + 3] = pixels[sourceIndex + 3];
        continue;
      }

      const x0 = Math.floor((x * sourceWidth) / targetWidth);
      const x1 = Math.max(x0 + 1, Math.floor(((x + 1) * sourceWidth) / targetWidth));
      const y0 = Math.floor((y * sourceHeight) / targetHeight);
      const y1 = Math.max(y0 + 1, Math.floor(((y + 1) * sourceHeight) / targetHeight));
      let red = 0;
      let green = 0;
      let blue = 0;
      let alpha = 0;
      let count = 0;

      for (let sourceY = y0; sourceY < y1; sourceY += 1) {
        for (let sourceX = x0; sourceX < x1; sourceX += 1) {
          const sourceIndex = (sourceY * sourceWidth + sourceX) * 4;
          red += pixels[sourceIndex];
          green += pixels[sourceIndex + 1];
          blue += pixels[sourceIndex + 2];
          alpha += pixels[sourceIndex + 3];
          count += 1;
        }
      }

      output[targetIndex] = Math.round(red / count);
      output[targetIndex + 1] = Math.round(green / count);
      output[targetIndex + 2] = Math.round(blue / count);
      output[targetIndex + 3] = Math.round(alpha / count);
    }
  }

  return output;
}

function encodePng(width, height, pixels) {
  const bytesPerPixel = 4;
  const stride = width * bytesPerPixel;
  const raw = Buffer.alloc((stride + 1) * height);

  for (let row = 0; row < height; row += 1) {
    const rowOffset = row * (stride + 1);
    raw[rowOffset] = 0;
    pixels.copy(raw, rowOffset + 1, row * stride, row * stride + stride);
  }

  const compressed = zlib.deflateSync(raw, { level: 9 });
  const ihdr = Buffer.alloc(13);
  writeUInt32BE(ihdr, 0, width);
  writeUInt32BE(ihdr, 4, height);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    createChunk("IHDR", ihdr),
    createChunk("IDAT", compressed),
    createChunk("IEND", Buffer.alloc(0))
  ]);
}

function resizePngFile(inputPath, outputPath, targetSize) {
  const decoded = decodePng(fs.readFileSync(inputPath));
  const resized = resizeRgba(decoded.pixels, decoded.width, decoded.height, targetSize, targetSize);
  fs.writeFileSync(outputPath, encodePng(targetSize, targetSize, resized));
  console.log(`${inputPath}: ${decoded.width}x${decoded.height} -> ${targetSize}x${targetSize}`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    fail("uso: node shared/tools/resize_png.js <largura> <altura> <arquivo1.png> [arquivo2.png ...]");
  }

  const targetWidth = Number.parseInt(args[0], 10);
  const targetHeight = Number.parseInt(args[1], 10);

  if (!Number.isFinite(targetWidth) || !Number.isFinite(targetHeight) || targetWidth <= 0 || targetHeight <= 0) {
    fail("largura e altura devem ser numeros positivos");
  }

  if (targetWidth !== targetHeight) {
    fail("apenas redimensionamento quadrado e suportado nesta ferramenta");
  }

  for (const filePath of args.slice(2)) {
    if (!fs.existsSync(filePath)) {
      fail(`arquivo nao encontrado: ${filePath}`);
    }

    resizePngFile(filePath, filePath, targetWidth);
  }
}

main();
