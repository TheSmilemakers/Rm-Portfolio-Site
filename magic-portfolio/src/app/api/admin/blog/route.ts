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

// Helper to create slug from title
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  // Check authentication
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, publishedAt, summary, image, content } = body;

    // Validation
    if (!title || !publishedAt || !summary || !content) {
      return NextResponse.json(
        { error: "Missing required fields: title, publishedAt, summary, content" },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = slugify(title);

    // Check if file already exists
    const postsDirectory = path.join(process.cwd(), "src/app/blog/posts");
    const filePath = path.join(postsDirectory, `${slug}.mdx`);

    try {
      await fs.access(filePath);
      return NextResponse.json(
        { error: `A post with slug "${slug}" already exists. Please use a different title.` },
        { status: 409 }
      );
    } catch {
      // File doesn't exist, proceed
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
      { success: true, slug, message: "Blog post created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
