#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..");

function fail(message) {
  console.error(`Erro: ${message}`);
  process.exit(1);
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`nao foi possivel ler JSON valido em ${filePath}: ${error.message}`);
  }
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function listFiles(rootDir) {
  const results = [];

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const absolutePath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(absolutePath);
        continue;
      }

      if (entry.isFile() && entry.name !== ".gitkeep") {
        results.push(absolutePath);
      }
    }
  }

  walk(rootDir);
  return results.sort();
}

function makeCrc32Table() {
  const table = new Uint32Array(256);

  for (let i = 0; i < 256; i += 1) {
    let value = i;

    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }

    table[i] = value >>> 0;
  }

  return table;
}

const crc32Table = makeCrc32Table();

function crc32(buffer) {
  let crc = 0xffffffff;

  for (const byte of buffer) {
    crc = crc32Table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(date) {
  const year = Math.max(date.getFullYear(), 1980);
  const dosTime =
    (date.getHours() << 11) |
    (date.getMinutes() << 5) |
    Math.floor(date.getSeconds() / 2);
  const dosDate =
    ((year - 1980) << 9) |
    ((date.getMonth() + 1) << 5) |
    date.getDate();

  return { dosDate, dosTime };
}

function uint16(value) {
  const buffer = Buffer.alloc(2);
  buffer.writeUInt16LE(value);
  return buffer;
}

function uint32(value) {
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32LE(value >>> 0);
  return buffer;
}

function createZip(entries) {
  const now = dosDateTime(new Date());
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const entry of entries) {
    const nameBuffer = Buffer.from(entry.name.replace(/\\/g, "/"), "utf8");
    const content = entry.content;
    const checksum = crc32(content);

    const localHeader = Buffer.concat([
      uint32(0x04034b50),
      uint16(20),
      uint16(0),
      uint16(0),
      uint16(now.dosTime),
      uint16(now.dosDate),
      uint32(checksum),
      uint32(content.length),
      uint32(content.length),
      uint16(nameBuffer.length),
      uint16(0),
      nameBuffer,
    ]);

    const centralHeader = Buffer.concat([
      uint32(0x02014b50),
      uint16(20),
      uint16(20),
      uint16(0),
      uint16(0),
      uint16(now.dosTime),
      uint16(now.dosDate),
      uint32(checksum),
      uint32(content.length),
      uint32(content.length),
      uint16(nameBuffer.length),
      uint16(0),
      uint16(0),
      uint16(0),
      uint16(0),
      uint32(0),
      uint32(offset),
      nameBuffer,
    ]);

    localParts.push(localHeader, content);
    centralParts.push(centralHeader);
    offset += localHeader.length + content.length;
  }

  const centralDirectory = Buffer.concat(centralParts);
  const endRecord = Buffer.concat([
    uint32(0x06054b50),
    uint16(0),
    uint16(0),
    uint16(entries.length),
    uint16(entries.length),
    uint32(centralDirectory.length),
    uint32(offset),
    uint16(0),
  ]);

  return Buffer.concat([...localParts, centralDirectory, endRecord]);
}

function packDirectory(sourceDir, outputPath) {
  const files = listFiles(sourceDir);

  if (files.length === 0) {
    fail(`nenhum arquivo para empacotar em ${sourceDir}`);
  }

  const entries = files.map((filePath) => ({
    name: path.relative(sourceDir, filePath).replace(/\\/g, "/"),
    content: fs.readFileSync(filePath),
  }));

  fs.writeFileSync(outputPath, createZip(entries));
  return entries.length;
}

function versionLabel(manifest) {
  const version = manifest && manifest.header && manifest.header.version;

  if (!Array.isArray(version) || version.length !== 3) {
    fail("manifest sem header.version no formato [major, minor, patch]");
  }

  return version.join(".");
}

function validatePack(manifestPath, expectedModuleType) {
  if (!fs.existsSync(manifestPath)) {
    fail(`manifest nao encontrado: ${manifestPath}`);
  }

  const manifest = readJson(manifestPath);
  const moduleType =
    manifest.modules &&
    manifest.modules[0] &&
    manifest.modules[0].type;

  if (manifest.format_version !== 2) {
    fail(`${manifestPath} deve usar format_version 2`);
  }

  if (moduleType !== expectedModuleType) {
    fail(`${manifestPath} deve ter modulo do tipo ${expectedModuleType}`);
  }

  return manifest;
}

function build(addonName) {
  if (!addonName || !/^[a-z0-9_-]+$/.test(addonName)) {
    fail("uso: node shared/tools/build_addon.js nome_do_addon");
  }

  const addonDir = path.join(repoRoot, "addons", addonName);
  const packsDir = path.join(addonDir, "packs");
  const behaviorPackDir = path.join(packsDir, "behavior_pack");
  const resourcePackDir = path.join(packsDir, "resource_pack");
  const distDir = path.join(addonDir, "dist");

  if (!fs.existsSync(addonDir)) {
    fail(`addon nao encontrado: ${addonName}`);
  }

  const behaviorManifest = validatePack(
    path.join(behaviorPackDir, "manifest.json"),
    "data"
  );
  const resourceManifest = validatePack(
    path.join(resourcePackDir, "manifest.json"),
    "resources"
  );

  const behaviorVersion = versionLabel(behaviorManifest);
  const resourceVersion = versionLabel(resourceManifest);

  if (behaviorVersion !== resourceVersion) {
    fail("Behavior Pack e Resource Pack estao com versoes diferentes");
  }

  ensureDir(distDir);

  const baseName = `${addonName}_v${behaviorVersion}`;
  const behaviorOutput = path.join(distDir, `${baseName}_bp.mcpack`);
  const resourceOutput = path.join(distDir, `${baseName}_rp.mcpack`);
  const addonOutput = path.join(distDir, `${baseName}.mcaddon`);

  const behaviorCount = packDirectory(behaviorPackDir, behaviorOutput);
  const resourceCount = packDirectory(resourcePackDir, resourceOutput);

  const addonEntries = [
    {
      name: path.basename(behaviorOutput),
      content: fs.readFileSync(behaviorOutput),
    },
    {
      name: path.basename(resourceOutput),
      content: fs.readFileSync(resourceOutput),
    },
  ];

  fs.writeFileSync(addonOutput, createZip(addonEntries));

  console.log(`Addon: ${addonName}`);
  console.log(`Versao: ${behaviorVersion}`);
  console.log(`Behavior Pack: ${path.relative(repoRoot, behaviorOutput)} (${behaviorCount} arquivos)`);
  console.log(`Resource Pack: ${path.relative(repoRoot, resourceOutput)} (${resourceCount} arquivos)`);
  console.log(`MCAddon: ${path.relative(repoRoot, addonOutput)}`);
}

build(process.argv[2]);
