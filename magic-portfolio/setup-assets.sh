#!/bin/bash

# Portfolio Asset Setup Script for RajanMaher
# Run this in your portfolio root: /Users/rajan/Documents/rmsitemagicportfolio/magic-portfolio

echo "🚀 Setting up RajanMaher Portfolio Assets..."

# Create all image directories
echo "📁 Creating directory structure..."
mkdir -p public/images/{og,projects/{healthcare-ai,n8n,trading},skills,gallery}
mkdir -p src/app/work/projects
mkdir -p src/app/blog/posts
mkdir -p src/components/custom

# Create placeholder image files
echo "🎨 Creating placeholder image files..."

# Personal Images
touch public/images/rajan-avatar.jpg
touch public/images/rajan-about.jpg

# OG Images
touch public/images/og/home.jpg
touch public/images/og/about.jpg
touch public/images/og/work.jpg
touch public/images/og/blog.jpg

# Healthcare AI Project Images
touch public/images/projects/healthcare-ai/cover.jpg
touch public/images/projects/healthcare-ai/dashboard.jpg
touch public/images/projects/healthcare-ai/mobile.jpg
touch public/images/projects/healthcare-ai/results.jpg
touch public/images/projects/healthcare-ai/architecture.jpg

# N8N Project Images
touch public/images/projects/n8n/cover.jpg
touch public/images/projects/n8n/workflow.jpg
touch public/images/projects/n8n/dashboard.jpg
touch public/images/projects/n8n/agents.jpg

# Trading Project Images
touch public/images/projects/trading/cover.jpg
touch public/images/projects/trading/performance.jpg
touch public/images/projects/trading/strategy.jpg
touch public/images/projects/trading/backtest.jpg

# Skills Images
touch public/images/skills/ai-systems.jpg
touch public/images/skills/cloud-architecture.jpg
touch public/images/skills/dev-setup.jpg

# Gallery Images
touch public/images/gallery/gallery-01.jpg
touch public/images/gallery/gallery-02.jpg
touch public/images/gallery/gallery-03.jpg
touch public/images/gallery/gallery-04.jpg

# Brand Assets
touch public/logo-light.svg
touch public/logo-dark.svg
touch public/favicon.ico
touch public/favicon-16x16.png
touch public/favicon-32x32.png
touch public/apple-touch-icon.png
touch public/android-chrome-192x192.png
touch public/android-chrome-512x512.png

# PDF Documents
touch public/healthcare-case-study.pdf
touch public/trading-whitepaper.pdf
touch public/resume-rajan-maher.pdf

echo "📝 Creating MDX file templates..."

# Create Healthcare AI Project MDX
cat > src/app/work/projects/healthcare-ai-platform.mdx << 'EOF'
---
title: "AI-Powered Healthcare Diagnostic Platform"
publishedAt: "2024-01-15"
summary: "Revolutionary healthcare platform reducing diagnosis time by 40% while maintaining 98% accuracy"
image: "/images/projects/healthcare-ai/cover.jpg"
tag: "Healthcare AI"
featured: true
---

# Placeholder content - Replace with your actual project details
EOF

# Create N8N Project MDX
cat > src/app/work/projects/n8n-agent-system.mdx << 'EOF'
---
title: "Cloud-Hosted N8N Agent System with LLM Orchestration"
publishedAt: "2024-02-20"
summary: "Hierarchical agent system for complex task automation with RAG knowledge base"
image: "/images/projects/n8n/cover.jpg"
tag: "Automation"
featured: true
---

# Placeholder content - Replace with your actual project details
EOF

# Create Trading Project MDX
cat > src/app/work/projects/trading-algorithms.mdx << 'EOF'
---
title: "Quantitative Trading Algorithm Suite"
publishedAt: "2024-03-10"
summary: "ML-powered trading system achieving 20% annual returns with risk management"
image: "/images/projects/trading/cover.jpg"
tag: "FinTech"
featured: true
---

# Placeholder content - Replace with your actual project details
EOF

# Create sample blog posts
cat > src/app/blog/posts/ai-healthcare-future.mdx << 'EOF'
---
title: "The Future of AI in Healthcare"
publishedAt: "2024-01-01"
summary: "Exploring how artificial intelligence is revolutionizing medical diagnosis and treatment"
---

# Placeholder blog post - Add your content here
EOF

cat > src/app/blog/posts/building-agent-systems.mdx << 'EOF'
---
title: "Building Intelligent Agent Systems with N8N"
publishedAt: "2024-02-01"
summary: "A guide to creating hierarchical LLM-powered automation workflows"
---

# Placeholder blog post - Add your content here
EOF

cat > src/app/blog/posts/algorithmic-trading-insights.mdx << 'EOF'
---
title: "Algorithmic Trading: Lessons from 3 Years of Development"
publishedAt: "2024-03-01"
summary: "Key insights from building and deploying profitable trading algorithms"
---

# Placeholder blog post - Add your content here
EOF

echo "🎨 Creating HTML placeholder generator..."
cat > public/placeholder-generator.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
  <title>Placeholder Image Generator</title>
  <style>
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .controls {
      padding: 20px;
      background: #f5f5f5;
    }
    .controls input, .controls select {
      margin: 5px;
      padding: 5px;
    }
    .placeholder {
      background: linear-gradient(135deg, #0A0A0A 0%, #262626 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFD700;
      font-weight: bold;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .placeholder::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        45deg,
        transparent 30%,
        rgba(255, 215, 0, 0.1) 50%,
        transparent 70%
      );
      animation: shimmer 3s infinite;
    }
    @keyframes shimmer {
      0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
      100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
    }
    .text { position: relative; z-index: 1; }
  </style>
</head>
<body>
  <div class="controls">
    <label>Width: <input type="number" id="width" value="1920"></label>
    <label>Height: <input type="number" id="height" value="1080"></label>
    <label>Text: <input type="text" id="text" value="Healthcare AI Platform"></label>
    <label>Size: 
      <select id="size">
        <option value="24">Small</option>
        <option value="48" selected>Medium</option>
        <option value="72">Large</option>
      </select>
    </label>
    <button onclick="updatePlaceholder()">Update</button>
    <button onclick="downloadImage()">Download</button>
  </div>
  <div id="placeholder" class="placeholder" style="width: 1920px; height: 1080px;">
    <div class="text" style="font-size: 48px;">Healthcare AI Platform</div>
  </div>

  <script>
    function updatePlaceholder() {
      const placeholder = document.getElementById('placeholder');
      const width = document.getElementById('width').value;
      const height = document.getElementById('height').value;
      const text = document.getElementById('text').value;
      const size = document.getElementById('size').value;
      
      placeholder.style.width = width + 'px';
      placeholder.style.height = height + 'px';
      placeholder.querySelector('.text').textContent = text;
      placeholder.querySelector('.text').style.fontSize = size + 'px';
    }

    function downloadImage() {
      alert('Take a screenshot using Cmd+Shift+5 (Mac) or Win+Shift+S (Windows)');
    }
  </script>
</body>
</html>
EOF

echo "✅ Asset structure created successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Add your avatar image: public/images/rajan-avatar.jpg"
echo "2. Open public/placeholder-generator.html in browser to create placeholder images"
echo "3. Replace placeholder MDX content with your actual project details"
echo "4. Generate favicon at https://favicon.io"
echo ""
echo "🎯 Priority Files to Replace First:"
echo "  - public/images/rajan-avatar.jpg (your photo)"
echo "  - public/favicon.ico (browser icon)"
echo "  - public/images/projects/*/cover.jpg (project covers)"
echo "  - src/app/work/projects/*.mdx (project content)"
echo ""
echo "💡 Tip: Use placeholder images to launch quickly, then replace gradually!"