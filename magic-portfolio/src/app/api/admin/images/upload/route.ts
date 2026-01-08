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

// Helper to sanitize filename
function sanitizeFilename(filename: string): string {
  return filename
    .toLowerCase()
    .replace(/[^\w.-]/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// POST - Upload images
export async function POST(request: NextRequest) {
  // Check authentication
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    // Validate files
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: `Invalid file type: ${file.type}. Allowed: JPEG, PNG, GIF, WebP, SVG` },
          { status: 400 }
        );
      }

      if (file.size > maxSize) {
        return NextResponse.json(
          { error: `File too large: ${file.name}. Max size: 5MB` },
          { status: 400 }
        );
      }
    }

    // Upload directory - default to general
    const uploadDirectory = path.join(process.cwd(), "public/images/uploads");

    // Ensure directory exists
    try {
      await fs.access(uploadDirectory);
    } catch {
      await fs.mkdir(uploadDirectory, { recursive: true });
    }

    // Upload files
    const uploadedFiles: string[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      // Generate unique filename
      const timestamp = Date.now();
      const sanitized = sanitizeFilename(file.name);
      const filename = `${timestamp}-${sanitized}`;
      const filepath = path.join(uploadDirectory, filename);

      // Write file
      await fs.writeFile(filepath, buffer);

      const relativePath = `/images/uploads/${filename}`;
      uploadedFiles.push(relativePath);
    }

    return NextResponse.json(
      {
        success: true,
        uploaded: uploadedFiles.length,
        files: uploadedFiles,
        message: `Successfully uploaded ${uploadedFiles.length} image(s)`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading images:", error);
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 }
    );
  }
}
