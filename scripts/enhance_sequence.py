import os
import glob
from concurrent.futures import ProcessPoolExecutor
from PIL import Image, ImageFilter, ImageEnhance

SRC_DIR = "./zip"
DEST_DIR = "./public/sequence"
TARGET_W, TARGET_H = 2560, 1440  # 2K Resolution

os.makedirs(DEST_DIR, exist_ok=True)

def process_frame(file_path):
    try:
        base_name = os.path.basename(file_path)
        num_str = base_name.replace("ezgif-frame-", "").replace(".jpg", "")
        idx = int(num_str)
        padded = f"{idx:03d}"

        with Image.open(file_path) as img:
            # High-end Lanczos 2K Upscaling
            upscaled = img.resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)

            # Unsharp mask for micro-detail enhancement (suit weave, spectacles, curls, fire smoke)
            sharpened = upscaled.filter(ImageFilter.UnsharpMask(radius=1.6, percent=140, threshold=2))

            # Micro-contrast and clarity enhancement
            enhanced = ImageEnhance.Sharpness(sharpened).enhance(1.20)
            enhanced = ImageEnhance.Contrast(enhanced).enhance(1.08)
            enhanced = ImageEnhance.Color(enhanced).enhance(1.06)

            # 1. Save as high-performance 2K WebP
            webp_path = os.path.join(DEST_DIR, f"frame_{padded}.webp")
            enhanced.save(webp_path, "WEBP", quality=90, method=4)

            # 2. Save as high-performance 2K JPEG
            jpg_path = os.path.join(DEST_DIR, f"frame_{padded}.jpg")
            enhanced.save(jpg_path, "JPEG", quality=92, subsampling=0)

            # 3. Save as original name for backwards compatibility
            ezgif_path = os.path.join(DEST_DIR, f"ezgif-frame-{padded}.jpg")
            enhanced.save(ezgif_path, "JPEG", quality=92, subsampling=0)

        return idx, True
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return idx, False

def main():
    files = sorted(glob.glob(os.path.join(SRC_DIR, "ezgif-frame-*.jpg")))
    print(f"Found {len(files)} frames to enhance to 2K (2560x1440)...")

    with ProcessPoolExecutor() as executor:
        results = list(executor.map(process_frame, files))

    success = sum(1 for _, ok in results if ok)
    print(f"Successfully enhanced {success}/{len(files)} frames to 2K clarity!")

if __name__ == "__main__":
    main()
