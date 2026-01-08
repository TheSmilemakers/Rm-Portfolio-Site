import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { ProjectEditor } from "@/components/admin/ProjectEditor";

interface EditProjectProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProject(slug: string) {
  const filePath = path.join(process.cwd(), "src/app/work/projects", `${slug}.mdx`);

  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      title: data.title || "",
      publishedAt: data.publishedAt || "",
      summary: data.summary || "",
      image: data.image || "",
      images: data.images || [],
      tag: data.tag || "",
      featured: data.featured || false,
      content: content.trim(),
    };
  } catch (error) {
    return null;
  }
}

export default async function EditProject({ params }: EditProjectProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectEditor mode="edit" slug={slug} initialData={project} />;
}
