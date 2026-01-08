import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";

// Force dynamic rendering for work management
export const dynamic = "force-dynamic";
import { Column, Row, Heading, Button, Card, Text, Flex, Icon, Badge } from "@once-ui-system/core";

interface WorkProject {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  image: string;
  tag: string;
  featured: boolean;
}

// Get all work projects
async function getWorkProjects(): Promise<WorkProject[]> {
  const projectsDirectory = path.join(process.cwd(), "src/app/work/projects");

  try {
    const files = await fs.readdir(projectsDirectory);
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

    const projects = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = path.join(projectsDirectory, file);
        const fileContents = await fs.readFile(filePath, "utf8");
        const { data } = matter(fileContents);

        return {
          slug: file.replace(".mdx", ""),
          title: data.title || "Untitled",
          publishedAt: data.publishedAt || "",
          summary: data.summary || "",
          image: data.image || "",
          tag: data.tag || "",
          featured: data.featured || false,
        };
      })
    );

    // Sort by date (newest first), featured first
    return projects.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  } catch (error) {
    console.error("Error reading work projects:", error);
    return [];
  }
}

interface ProjectCardProps {
  project: WorkProject;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card padding="l" border="neutral-medium" radius="l" fillWidth>
      <Column gap="m">
        <Row horizontal="space-between" vertical="start" fillWidth>
          <Column gap="s" style={{ flex: 1 }}>
            <Row gap="s" vertical="center">
              <Heading variant="heading-strong-m" onBackground="neutral-strong">
                {project.title}
              </Heading>
              {project.featured && (
                <Badge background="brand-weak" textVariant="label-default-s">
                  Featured
                </Badge>
              )}
            </Row>
            <Row gap="m" vertical="center">
              <Text variant="label-default-s" onBackground="neutral-medium">
                {new Date(project.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
              {project.tag && (
                <Badge background="neutral-weak" textVariant="label-default-s">
                  {project.tag}
                </Badge>
              )}
            </Row>
          </Column>
          <Row gap="s">
            <Link href={`/work/${project.slug}`} target="_blank" style={{ textDecoration: "none" }}>
              <Button variant="secondary" size="s" prefixIcon="eye">
                Preview
              </Button>
            </Link>
            <Link href={`/admin/work/${project.slug}/edit`} style={{ textDecoration: "none" }}>
              <Button variant="primary" size="s" prefixIcon="pen">
                Edit
              </Button>
            </Link>
          </Row>
        </Row>

        {project.summary && (
          <Text variant="body-default-s" onBackground="neutral-medium" style={{ lineHeight: "1.6" }}>
            {project.summary}
          </Text>
        )}

        <Row gap="s" fillWidth style={{ flexWrap: "wrap" }}>
          <Flex gap="4" vertical="center">
            <Icon name="file" size="s" onBackground="neutral-medium" />
            <Text variant="label-default-xs" onBackground="neutral-medium">
              {project.slug}.mdx
            </Text>
          </Flex>
          {project.image && (
            <Flex gap="4" vertical="center">
              <Icon name="image" size="s" onBackground="neutral-medium" />
              <Text variant="label-default-xs" onBackground="neutral-medium">
                Has cover image
              </Text>
            </Flex>
          )}
        </Row>
      </Column>
    </Card>
  );
}

export default async function WorkManagement() {
  const projects = await getWorkProjects();
  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <Column fillWidth gap="l" maxWidth="xl">
      {/* Page Header */}
      <Row horizontal="space-between" vertical="center" fillWidth>
        <Column gap="s">
          <Heading variant="display-strong-l" onBackground="neutral-strong">
            Work Projects
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-medium">
            Manage your portfolio projects and case studies
          </Text>
        </Column>
        <Link href="/admin/work/new" style={{ textDecoration: "none" }}>
          <Button variant="primary" size="l" prefixIcon="plus">
            New Project
          </Button>
        </Link>
      </Row>

      {/* Stats */}
      <Row gap="m">
        <Card padding="m" border="neutral-medium" radius="m">
          <Column gap="4">
            <Text variant="label-default-s" onBackground="neutral-medium">
              Total Projects
            </Text>
            <Heading variant="heading-strong-l" onBackground="neutral-strong">
              {projects.length}
            </Heading>
          </Column>
        </Card>
        <Card padding="m" border="neutral-medium" radius="m">
          <Column gap="4">
            <Text variant="label-default-s" onBackground="neutral-medium">
              Featured
            </Text>
            <Heading variant="heading-strong-l" onBackground="neutral-strong">
              {featuredCount}
            </Heading>
          </Column>
        </Card>
      </Row>

      {/* Projects List */}
      <Column gap="m">
        {projects.length === 0 ? (
          <Card padding="xl" border="neutral-medium" radius="l" fillWidth>
            <Column gap="m" horizontal="center">
              <Icon name="briefcase" size="xl" onBackground="neutral-medium" />
              <Column gap="s" horizontal="center">
                <Heading variant="heading-strong-m" onBackground="neutral-strong">
                  No projects yet
                </Heading>
                <Text variant="body-default-m" onBackground="neutral-medium">
                  Get started by creating your first project
                </Text>
              </Column>
              <Link href="/admin/work/new" style={{ textDecoration: "none" }}>
                <Button variant="primary" size="m" prefixIcon="plus">
                  Create First Project
                </Button>
              </Link>
            </Column>
          </Card>
        ) : (
          projects.map((project) => <ProjectCard key={project.slug} project={project} />)
        )}
      </Column>
    </Column>
  );
}
