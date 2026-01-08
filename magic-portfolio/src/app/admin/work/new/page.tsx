import { ProjectEditor } from "@/components/admin/ProjectEditor";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default function NewProject() {
  return <ProjectEditor mode="create" />;
}
