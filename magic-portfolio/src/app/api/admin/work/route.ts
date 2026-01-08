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

// POST - Create new project
export async function POST(request: NextRequest) {
  // Check authentication
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, publishedAt, summary, image, images, tag, featured, content } = body;

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
    const projectsDirectory = path.join(process.cwd(), "src/app/work/projects");
    const filePath = path.join(projectsDirectory, `${slug}.mdx`);

    try {
      await fs.access(filePath);
      return NextResponse.json(
        { error: `A project with slug "${slug}" already exists. Please use a different title.` },
        { status: 409 }
      );
    } catch {
      // File doesn't exist, proceed
    }

    // Build frontmatter with optional fields
    const frontmatterLines = [
      "---",
      `title: "${title}"`,
      `publishedAt: "${publishedAt}"`,
      `summary: "${summary}"`,
    ];

    if (image) {
      frontmatterLines.push(`image: "${image}"`);
    }

    if (images && images.length > 0) {
      frontmatterLines.push("images: [");
      images.forEach((img: string, index: number) => {
        frontmatterLines.push(`  "${img}"${index < images.length - 1 ? "," : ""}`);
      });
      frontmatterLines.push("]");
    }

    if (tag) {
      frontmatterLines.push(`tag: "${tag}"`);
    }

    if (featured) {
      frontmatterLines.push(`featured: ${featured}`);
    }

    frontmatterLines.push("---");

    const frontmatter = frontmatterLines.join("\n") + "\n\n" + content;

    // Write file
    await fs.writeFile(filePath, frontmatter, "utf8");

    return NextResponse.json(
      { success: true, slug, message: "Project created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
