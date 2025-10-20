#!/usr/bin/env node
/**
 * Copy configuration files to build directory for distribution
 */

const fs = require("fs");
const path = require("path");

const BUILD_DIR = path.join(__dirname, "..", "build");
const ROOT_DIR = path.join(__dirname, "..");

// Ensure build directory exists
if (!fs.existsSync(BUILD_DIR)) {
  fs.mkdirSync(BUILD_DIR, { recursive: true });
}

// Copy .env.example as .env
const envExample = path.join(ROOT_DIR, ".env.example");
const envTarget = path.join(BUILD_DIR, ".env");
if (fs.existsSync(envExample)) {
  fs.copyFileSync(envExample, envTarget);
  console.log("✅ Copied .env.example → build/.env");
} else {
  console.warn("⚠️  .env.example not found");
}

// Copy wishlist.json
const wishlistSrc = path.join(ROOT_DIR, "wishlist.json");
const wishlistTarget = path.join(BUILD_DIR, "wishlist.json");
if (fs.existsSync(wishlistSrc)) {
  fs.copyFileSync(wishlistSrc, wishlistTarget);
  console.log("✅ Copied wishlist.json → build/wishlist.json");
} else {
  console.warn("⚠️  wishlist.json not found");
}

// Create README for distribution
const readmeContent = `# CSFloat Discount Notifier

## Quick Start

1. **Edit .env** - Add your CSFloat API key:
   \`\`\`
   CSFLOAT_API_KEY=your_api_key_here
   \`\`\`
   Get your API key at: https://csfloat.com/profile

2. **Edit wishlist.json** - Add items you want to track:
   \`\`\`json
   [
     { "name": "Chroma 2 Case", "def_index": 4089 },
     { "name": "AK-47 Redline", "def_index": 7, "paint_index": 282 }
   ]
   \`\`\`

3. **Run the executable** - Double-click the .exe file

## How It Works

- Checks CSFloat every 10 minutes for your tracked items
- Shows desktop notifications for good deals
- Click notification to open the item in your browser

## Need Help?

Visit: https://github.com/YOUR_USERNAME/csfloat-discount-notifier

## Windows Defender Warning

If Windows Defender flags this as a threat, it's a false positive (common with pkg executables).
You can either:
- Add an exclusion for this folder in Windows Defender
- Run with Node.js installed instead (see GitHub for instructions)
`;

const readmeTarget = path.join(BUILD_DIR, "README.txt");
fs.writeFileSync(readmeTarget, readmeContent);
console.log("✅ Created build/README.txt");

console.log("\n🎉 Build assets ready for distribution!");
console.log(`📦 Zip the 'build' folder to share with others\n`);
