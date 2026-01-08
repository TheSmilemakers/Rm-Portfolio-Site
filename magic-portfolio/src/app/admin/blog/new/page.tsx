import { BlogEditor } from "@/components/admin/BlogEditor";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default function NewBlogPost() {
  return <BlogEditor mode="create" />;
}
