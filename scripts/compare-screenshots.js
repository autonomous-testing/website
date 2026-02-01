const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const [localPath, prodPath, diffPath] = process.argv.slice(2);

if (!localPath || !prodPath || !diffPath) {
  console.error(
    "Usage: node scripts/compare-screenshots.js <local.png> <prod.png> <diff.png>"
  );
  process.exit(1);
}

const loadImage = async (filePath) => {
  const image = sharp(filePath).ensureAlpha();
  const metadata = await image.metadata();
  return { image, metadata };
};

const main = async () => {
  const local = await loadImage(localPath);
  const prod = await loadImage(prodPath);

  const width = Math.min(local.metadata.width, prod.metadata.width);
  const height = Math.min(local.metadata.height, prod.metadata.height);

  if (!width || !height) {
    throw new Error("Unable to determine image dimensions for comparison.");
  }

  const extract = (image) =>
    image.extract({ left: 0, top: 0, width, height }).raw();

  const [localRaw, prodRaw] = await Promise.all([
    extract(local.image).toBuffer(),
    extract(prod.image).toBuffer(),
  ]);

  const diffBuffer = Buffer.alloc(localRaw.length);
  let mismatchedPixels = 0;

  for (let i = 0; i < localRaw.length; i += 4) {
    const diff =
      Math.abs(localRaw[i] - prodRaw[i]) +
      Math.abs(localRaw[i + 1] - prodRaw[i + 1]) +
      Math.abs(localRaw[i + 2] - prodRaw[i + 2]) +
      Math.abs(localRaw[i + 3] - prodRaw[i + 3]);

    const normalized = diff / (255 * 4);
    const isMismatch = normalized > 0.1;

    if (isMismatch) {
      mismatchedPixels += 1;
      diffBuffer[i] = 255;
      diffBuffer[i + 1] = 0;
      diffBuffer[i + 2] = 0;
      diffBuffer[i + 3] = 255;
    } else {
      diffBuffer[i] = 0;
      diffBuffer[i + 1] = 0;
      diffBuffer[i + 2] = 0;
      diffBuffer[i + 3] = 0;
    }
  }

  fs.mkdirSync(path.dirname(diffPath), { recursive: true });

  await sharp(diffBuffer, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(diffPath);

  const totalPixels = width * height;
  const mismatchPercentage = ((mismatchedPixels / totalPixels) * 100).toFixed(
    2
  );

  console.log(`Mismatch: ${mismatchedPixels} pixels (${mismatchPercentage}%)`);
  console.log(`Diff image written to ${diffPath}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
