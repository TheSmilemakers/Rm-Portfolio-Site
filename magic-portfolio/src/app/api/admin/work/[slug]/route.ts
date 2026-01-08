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

// PUT - Update project
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
    const { title, publishedAt, summary, image, images, tag, featured, content } = body;

    // Validation
    if (!title || !publishedAt || !summary || !content) {
      return NextResponse.json(
        { error: "Missing required fields: title, publishedAt, summary, content" },
        { status: 400 }
      );
    }

    // File path
    const projectsDirectory = path.join(process.cwd(), "src/app/work/projects");
    const filePath = path.join(projectsDirectory, `${slug}.mdx`);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json(
        { error: `Project "${slug}" not found` },
        { status: 404 }
      );
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
      { success: true, slug, message: "Project updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE - Delete project
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
    const projectsDirectory = path.join(process.cwd(), "src/app/work/projects");
    const filePath = path.join(projectsDirectory, `${slug}.mdx`);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json(
        { error: `Project "${slug}" not found` },
        { status: 404 }
      );
    }

    // Delete file
    await fs.unlink(filePath);

    return NextResponse.json(
      { success: true, message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
