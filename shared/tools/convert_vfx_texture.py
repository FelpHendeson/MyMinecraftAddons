#!/usr/bin/env python3

import sys
from pathlib import Path

from PIL import Image

CHECKER_COLORS = (
    (255, 255, 255),
    (204, 204, 204),
    (192, 192, 192),
    (160, 160, 160),
    (128, 128, 128),
)
TOLERANCE = 20


def is_checkerboard_pixel(red, green, blue):
    if abs(red - green) > 10 or abs(green - blue) > 10:
        return False

    for checker_red, checker_green, checker_blue in CHECKER_COLORS:
        if (
            abs(red - checker_red) <= TOLERANCE
            and abs(green - checker_green) <= TOLERANCE
            and abs(blue - checker_blue) <= TOLERANCE
        ):
            return True

    return red > 245 and green > 245 and blue > 245


def convert_texture(input_path, output_path, size):
    image = Image.open(input_path).convert("RGBA")
    pixels = image.load()
    width, height = image.size

    for y in range(height):
        for x in range(width):
            red, green, blue, alpha = pixels[x, y]
            if is_checkerboard_pixel(red, green, blue):
                pixels[x, y] = (0, 0, 0, 0)

    resized = image.resize((size, size), Image.Resampling.BOX)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    resized.save(output_path, "PNG")
    print(f"{input_path} -> {output_path} ({size}x{size})")


def main():
    if len(sys.argv) < 4:
        print("uso: python shared/tools/convert_vfx_texture.py <tamanho> <entrada> <saida>")
        sys.exit(1)

    size = int(sys.argv[1])
    input_path = Path(sys.argv[2])
    output_path = Path(sys.argv[3])

    if size <= 0:
        print("tamanho deve ser positivo")
        sys.exit(1)

    if not input_path.exists():
        print(f"arquivo nao encontrado: {input_path}")
        sys.exit(1)

    convert_texture(input_path, output_path, size)


if __name__ == "__main__":
    main()
