import os
import glob
from concurrent.futures import ProcessPoolExecutor
from PIL import Image, ImageFilter, ImageEnhance

SRC_DIR = "./ezgif-44926d411c835299-png-split"
DEST_DIR = "./public/sequence"
TARGET_W, TARGET_H = 2560, 1440  # 2K Resolution

os.makedirs(DEST_DIR, exist_ok=True)

def process_frame(file_path):
    try:
        base_name = os.path.basename(file_path)
        # e.g. ezgif-frame-001.png -> 001
        num_str = base_name.replace("ezgif-frame-", "").replace(".png", "")
        idx = int(num_str)
        padded = f"{idx:03d}"

        with Image.open(file_path) as img:
            # 2K Lanczos interpolation from pristine PNG source
            upscaled = img.resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)

            # Fine micro-detail unsharp mask
            sharpened = upscaled.filter(ImageFilter.UnsharpMask(radius=1.5, percent=130, threshold=2))

            # Aesthetic clarity & micro-contrast
            enhanced = ImageEnhance.Sharpness(sharpened).enhance(1.15)
            enhanced = ImageEnhance.Contrast(enhanced).enhance(1.05)

            # 1. Save as high-performance 2K WebP
            webp_path = os.path.join(DEST_DIR, f"frame_{padded}.webp")
            enhanced.save(webp_path, "WEBP", quality=92, method=4)

            # 2. Save as 2K JPEG fallback
            jpg_path = os.path.join(DEST_DIR, f"frame_{padded}.jpg")
            enhanced.save(jpg_path, "JPEG", quality=94, subsampling=0)

        return idx, True
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return idx, False

def main():
    files = sorted(glob.glob(os.path.join(SRC_DIR, "ezgif-frame-*.png")))
    print(f"Found {len(files)} PNG frames to enhance to 2K (2560x1440)...")

    with ProcessPoolExecutor() as executor:
        results = list(executor.map(process_frame, files))

    success = sum(1 for _, ok in results if ok)
    print(f"Successfully processed {success}/{len(files)} PNG frames to 2K WebP & JPG!")

if __name__ == "__main__":
    main()
