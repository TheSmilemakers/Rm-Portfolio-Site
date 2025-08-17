#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Magic Portfolio Images...\n');

const imageChecks = [
  // Favicons
  { path: 'public/favicon.ico', desc: 'Main favicon' },
  { path: 'public/favicon-16x16.png', desc: 'Small favicon' },
  { path: 'public/favicon-32x32.png', desc: 'Standard favicon' },
  { path: 'public/apple-touch-icon.png', desc: 'Apple touch icon' },
  { path: 'public/android-chrome-192x192.png', desc: 'Android icon (192)' },
  { path: 'public/android-chrome-512x512.png', desc: 'Android icon (512)' },
  
  // Avatar
  { path: 'public/images/rajan-avatar.jpg', desc: 'Main avatar' },
  
  // OG Images
  { path: 'public/images/og/home.jpg', desc: 'Home OG image' },
  
  // Project Images
  { path: 'public/images/projects/healthcare-ai/cover.jpg', desc: 'Healthcare cover' },
  { path: 'public/images/projects/healthcare-ai/dashboard.jpg', desc: 'Healthcare dashboard' },
  { path: 'public/images/projects/n8n/cover.jpg', desc: 'N8N cover' },
  { path: 'public/images/projects/n8n/dashboard.jpg', desc: 'N8N dashboard' },
  { path: 'public/images/projects/trading/cover.jpg', desc: 'Trading cover' },
  { path: 'public/images/projects/trading/strategy.jpg', desc: 'Trading strategy' },
  
  // Blog Images
  { path: 'public/images/blog/ai-healthcare.jpg', desc: 'Blog: AI Healthcare' },
  { path: 'public/images/blog/agent-systems.jpg', desc: 'Blog: Agent Systems' },
  { path: 'public/images/blog/trading-algorithms.jpg', desc: 'Blog: Trading' },
];

let allGood = true;

imageChecks.forEach(({ path: imagePath, desc }) => {
  const fullPath = path.join(__dirname, imagePath);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    const size = (stats.size / 1024).toFixed(1);
    console.log(`✅ ${desc.padEnd(25)} ${size}KB`);
  } else {
    console.log(`❌ ${desc.padEnd(25)} MISSING`);
    allGood = false;
  }
});

console.log('\n' + '='.repeat(50));
if (allGood) {
  console.log('✨ All images are properly configured!');
} else {
  console.log('⚠️  Some images are missing. Please check the output above.');
}

// Check for orphaned images in "images to process"
const processDir = path.join(__dirname, 'public/images/images to process');
if (fs.existsSync(processDir)) {
  const files = fs.readdirSync(processDir);
  if (files.length > 0) {
    console.log('\n📦 Images to process folder still contains:');
    files.forEach(file => console.log(`   - ${file}`));
    console.log('\n💡 Run "rm -rf public/images/images\\ to\\ process" to clean up');
  }
}