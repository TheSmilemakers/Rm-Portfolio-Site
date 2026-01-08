import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { BlogEditor } from "@/components/admin/BlogEditor";

interface EditBlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getBlogPost(slug: string) {
  const filePath = path.join(process.cwd(), "src/app/blog/posts", `${slug}.mdx`);

  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      title: data.title || "",
      publishedAt: data.publishedAt || "",
      summary: data.summary || "",
      image: data.image || "",
      content: content.trim(),
    };
  } catch (error) {
    return null;
  }
}

export default async function EditBlogPost({ params }: EditBlogPostProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogEditor mode="edit" slug={slug} initialData={post} />;
}
