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

// PUT - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Check authentication
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const body = await request.json();
    const { title, publishedAt, summary, image, content } = body;

    // Validation
    if (!title || !publishedAt || !summary || !content) {
      return NextResponse.json(
        { error: "Missing required fields: title, publishedAt, summary, content" },
        { status: 400 }
      );
    }

    // File path
    const postsDirectory = path.join(process.cwd(), "src/app/blog/posts");
    const filePath = path.join(postsDirectory, `${slug}.mdx`);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json(
        { error: `Blog post "${slug}" not found` },
        { status: 404 }
      );
    }

    // Create frontmatter
    const frontmatter = `---
title: "${title}"
publishedAt: "${publishedAt}"
summary: "${summary}"
${image ? `image: "${image}"` : ""}
---

${content}`;

    // Write file
    await fs.writeFile(filePath, frontmatter, "utf8");

    return NextResponse.json(
      { success: true, slug, message: "Blog post updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Check authentication
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug } = await params;

    // File path
    const postsDirectory = path.join(process.cwd(), "src/app/blog/posts");
    const filePath = path.join(postsDirectory, `${slug}.mdx`);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json(
        { error: `Blog post "${slug}" not found` },
        { status: 404 }
      );
    }

    // Delete file
    await fs.unlink(filePath);

    return NextResponse.json(
      { success: true, message: "Blog post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
