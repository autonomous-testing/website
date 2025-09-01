const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Check if sharp is available, if not install it
try {
  require("sharp");
} catch (error) {
  console.log("Installing sharp for image optimization...");
  execSync("npm install sharp", { stdio: "inherit" });
}

const sharp = require("sharp");

const IMAGE_DIR = path.join(__dirname, "../static/img");
const SIZES = [640, 750, 828, 1080, 1200, 1920, 2048];

// Images that need optimization - updated to include only actually used images
const IMAGES_TO_OPTIMIZE = [
  // Main images that are used in components
  "wopee_head_1_2023-10-10.png",
  "problem.png",

  // Landing images that are used in components
  "landing/tests-page-new.png",
  "landing/instant-results.png",
  "landing/new-project-dialog.png",
  "landing/comparison-view.png",
];

async function optimizeImage(imagePath) {
  const ext = path.extname(imagePath).toLowerCase();
  const name = path.basename(imagePath, ext);
  const dir = path.dirname(imagePath);

  if (![".png", ".jpg", ".jpeg"].includes(ext)) {
    return;
  }

  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();

    console.log(
      `Optimizing ${imagePath} (${metadata.width}x${metadata.height})`
    );

    // Create WebP version
    const webpPath = path.join(dir, `${name}.webp`);
    await image.webp({ quality: 80, effort: 6 }).toFile(webpPath);

    // Create responsive sizes only for images that are wide enough
    for (const size of SIZES) {
      if (size <= metadata.width) {
        const resizedWebpPath = path.join(dir, `${name}-${size}.webp`);
        await image
          .resize(size)
          .webp({ quality: 80, effort: 6 })
          .toFile(resizedWebpPath);
      }
    }

    console.log(`✅ Optimized ${imagePath}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${imagePath}:`, error.message);
  }
}

async function findAndOptimizeImages(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      await findAndOptimizeImages(filePath);
    } else {
      // Check if this file should be optimized
      const relativePath = path.relative(IMAGE_DIR, filePath);
      if (IMAGES_TO_OPTIMIZE.includes(relativePath)) {
        await optimizeImage(filePath);
      }
    }
  }
}

async function main() {
  console.log("🚀 Starting image optimization...");
  console.log("📁 Processing images in:", IMAGE_DIR);
  console.log("🎯 Images to optimize:", IMAGES_TO_OPTIMIZE);

  if (!fs.existsSync(IMAGE_DIR)) {
    console.error(`❌ Image directory not found: ${IMAGE_DIR}`);
    return;
  }

  await findAndOptimizeImages(IMAGE_DIR);

  console.log("✅ Image optimization complete!");
  console.log("\n📊 Optimization summary:");
  console.log("- WebP versions created for better compression");
  console.log("- Responsive sizes generated for different screen sizes");
  console.log("- Original files preserved as fallbacks");
  console.log("- Only processing images that are actually used in the website");
}

main().catch(console.error);
