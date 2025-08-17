#!/usr/bin/env python3
"""
Image processing script for Magic Portfolio
Processes favicons, avatars, and project images
"""

import os
import shutil
from PIL import Image
import subprocess

# Define paths
BASE_DIR = "/Users/rajan/Documents/rmsitemagicportfolio/magic-portfolio"
PUBLIC_DIR = os.path.join(BASE_DIR, "public")
IMAGES_DIR = os.path.join(PUBLIC_DIR, "images")
PROCESS_DIR = os.path.join(IMAGES_DIR, "images to process")

def ensure_dir(path):
    """Ensure directory exists"""
    os.makedirs(path, exist_ok=True)

def process_favicon():
    """Process favicon from source image"""
    print("Processing favicon...")
    
    source = os.path.join(PROCESS_DIR, "fav.ico.jpg")
    if not os.path.exists(source):
        print(f"Source favicon not found: {source}")
        return
    
    # Open source image
    img = Image.open(source)
    
    # Convert to RGBA if needed
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Create different sizes
    sizes = [
        (16, 16, "favicon-16x16.png"),
        (32, 32, "favicon-32x32.png"),
        (180, 180, "apple-touch-icon.png"),
        (192, 192, "android-chrome-192x192.png"),
        (512, 512, "android-chrome-512x512.png")
    ]
    
    for width, height, filename in sizes:
        output_path = os.path.join(PUBLIC_DIR, filename)
        resized = img.resize((width, height), Image.Resampling.LANCZOS)
        resized.save(output_path, "PNG", optimize=True)
        print(f"Created {filename} ({width}x{height})")
    
    # Create ICO file using imagemagick if available, otherwise use PNG fallback
    ico_path = os.path.join(PUBLIC_DIR, "favicon.ico")
    
    # Try using imagemagick convert
    try:
        # Create temporary PNGs for ICO
        temp_files = []
        for size in [(16, 16), (32, 32), (48, 48)]:
            temp_path = f"/tmp/favicon_{size[0]}.png"
            resized = img.resize(size, Image.Resampling.LANCZOS)
            resized.save(temp_path, "PNG")
            temp_files.append(temp_path)
        
        # Use imagemagick to create ICO
        cmd = ["convert"] + temp_files + [ico_path]
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            print(f"Created favicon.ico with multiple resolutions")
        else:
            # Fallback: just copy the 32x32 as ICO
            shutil.copy(os.path.join(PUBLIC_DIR, "favicon-32x32.png"), ico_path)
            print(f"Created favicon.ico (fallback from 32x32 PNG)")
        
        # Clean up temp files
        for temp in temp_files:
            if os.path.exists(temp):
                os.remove(temp)
                
    except Exception as e:
        # Final fallback: just copy the 32x32 PNG as ICO
        shutil.copy(os.path.join(PUBLIC_DIR, "favicon-32x32.png"), ico_path)
        print(f"Created favicon.ico (fallback from 32x32 PNG)")

def process_avatar():
    """Process avatar images"""
    print("\nProcessing avatar...")
    
    # Process main avatar
    source = os.path.join(PROCESS_DIR, "Rajan-Avatar.jpeg")
    if os.path.exists(source):
        img = Image.open(source)
        # Create square 500x500 avatar
        # Find center square crop
        width, height = img.size
        size = min(width, height)
        left = (width - size) // 2
        top = (height - size) // 2
        right = left + size
        bottom = top + size
        
        img_cropped = img.crop((left, top, right, bottom))
        img_resized = img_cropped.resize((500, 500), Image.Resampling.LANCZOS)
        
        output_path = os.path.join(IMAGES_DIR, "rajan-avatar.jpg")
        img_resized.save(output_path, "JPEG", quality=85, optimize=True)
        print(f"Created rajan-avatar.jpg (500x500)")
        
        # Also create a high-quality version for about page
        img_about = img.resize((1200, int(1200 * height / width)), Image.Resampling.LANCZOS)
        output_about = os.path.join(IMAGES_DIR, "rajan-about.jpg")
        img_about.save(output_about, "JPEG", quality=90, optimize=True)
        print(f"Created rajan-about.jpg ({img_about.size[0]}x{img_about.size[1]})")

def process_og_images():
    """Process Open Graph images"""
    print("\nProcessing OG images...")
    
    # Process home OG image
    source = os.path.join(PROCESS_DIR, "home og.jpg")
    if os.path.exists(source):
        img = Image.open(source)
        # Resize to standard OG size
        og_img = img.resize((1200, 630), Image.Resampling.LANCZOS)
        
        ensure_dir(os.path.join(IMAGES_DIR, "og"))
        output_path = os.path.join(IMAGES_DIR, "og", "home.jpg")
        og_img.save(output_path, "JPEG", quality=85, optimize=True)
        print(f"Created OG image: home.jpg (1200x630)")

def process_project_images():
    """Process project screenshots"""
    print("\nProcessing project images...")
    
    projects = [
        ("Med-ai.png", "healthcare-ai"),
        ("Trading-ai.png", "trading-ai"),
        ("futurevision-ai.png", "automation"),
        ("futuristic-ai.png", "futuristic-ai")
    ]
    
    for source_file, project_name in projects:
        source = os.path.join(PROCESS_DIR, source_file)
        if not os.path.exists(source):
            continue
            
        # Create project directory
        project_dir = os.path.join(IMAGES_DIR, "projects", project_name)
        ensure_dir(project_dir)
        
        # Open and process image
        img = Image.open(source)
        
        # Create cover image (1200x800)
        cover = img.resize((1200, 800), Image.Resampling.LANCZOS)
        cover_path = os.path.join(project_dir, "cover.jpg")
        cover.save(cover_path, "JPEG", quality=85, optimize=True)
        print(f"Created {project_name}/cover.jpg (1200x800)")
        
        # Create dashboard view (1440x900)
        dashboard = img.resize((1440, 900), Image.Resampling.LANCZOS)
        dashboard_path = os.path.join(project_dir, "dashboard.jpg")
        dashboard.save(dashboard_path, "JPEG", quality=85, optimize=True)
        print(f"Created {project_name}/dashboard.jpg (1440x900)")
        
        # Create thumbnail (720x450)
        thumb = img.resize((720, 450), Image.Resampling.LANCZOS)
        thumb_path = os.path.join(project_dir, "thumb.jpg")
        thumb.save(thumb_path, "JPEG", quality=80, optimize=True)
        print(f"Created {project_name}/thumb.jpg (720x450)")

def create_webmanifest():
    """Create site.webmanifest file"""
    print("\nCreating site.webmanifest...")
    
    manifest = {
        "name": "Rajan Maharjan - Portfolio",
        "short_name": "RM Portfolio",
        "description": "AI Software Engineer & Full-Stack Developer Portfolio",
        "start_url": "/",
        "display": "standalone",
        "theme_color": "#000000",
        "background_color": "#000000",
        "icons": [
            {
                "src": "/android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/android-chrome-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ]
    }
    
    import json
    manifest_path = os.path.join(PUBLIC_DIR, "site.webmanifest")
    with open(manifest_path, 'w') as f:
        json.dump(manifest, f, indent=2)
    print("Created site.webmanifest")

def main():
    """Main processing function"""
    print("Starting image processing for Magic Portfolio...")
    
    # Check if PIL is installed
    try:
        import PIL
        print(f"Using PIL version: {PIL.__version__}")
    except ImportError:
        print("Installing Pillow...")
        subprocess.check_call(["pip3", "install", "Pillow"])
        print("Pillow installed. Please run the script again.")
        return
    
    # Process all images
    process_favicon()
    process_avatar()
    process_og_images()
    process_project_images()
    create_webmanifest()
    
    print("\nImage processing complete!")
    print("Don't forget to:")
    print("1. Update layout.tsx with favicon links")
    print("2. Add tech stack SVG icons")
    print("3. Clean up the 'images to process' folder when ready")

if __name__ == "__main__":
    main()