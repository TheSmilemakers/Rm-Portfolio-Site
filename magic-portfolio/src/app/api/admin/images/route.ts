import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import * as cookie from "cookie";

// Helper to check authentication
function checkAuth(request: NextRequest): boolean {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookie.parse(cookieHeader);
  return cookies.authToken === "authenticated";
}

// Helper to recursively get all images from a directory
async function getImagesFromDirectory(dir: string, baseDir: string = dir): Promise<any[]> {
  const images: any[] = [];

  try {
    const items = await fs.readdir(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        // Recursively get images from subdirectories
        const subImages = await getImagesFromDirectory(fullPath, baseDir);
        images.push(...subImages);
      } else if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(item.name)) {
        // Get file stats
        const stats = await fs.stat(fullPath);

        // Get relative path from public directory
        const relativePath = fullPath.replace(path.join(process.cwd(), "public"), "");

        // Determine category from path
        const pathParts = relativePath.split(path.sep).filter(Boolean);
        const category = pathParts.length > 2 ? pathParts[1] : "general";

        images.push({
          path: relativePath.replace(/\\/g, "/"), // Normalize path separators
          name: item.name,
          size: stats.size,
          category: category,
        });
      }
    }
  } catch (error) {
    console.error("Error reading directory:", error);
  }

  return images;
}

// GET - List all images
export async function GET(request: NextRequest) {
  // Check authentication
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const imagesDirectory = path.join(process.cwd(), "public/images");

    // Get all images
    const images = await getImagesFromDirectory(imagesDirectory);

    // Sort by path
    images.sort((a, b) => a.path.localeCompare(b.path));

    return NextResponse.json({ images, count: images.length }, { status: 200 });
  } catch (error) {
    console.error("Error listing images:", error);
    return NextResponse.json(
      { error: "Failed to list images" },
      { status: 500 }
    );
  }
}
