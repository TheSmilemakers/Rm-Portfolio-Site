import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { Column, Row, Heading, Text, Card, Button, Icon, Flex } from "@once-ui-system/core";

// Helper function to count MDX files
async function countMDXFiles(dir: string): Promise<number> {
  try {
    const files = await fs.readdir(dir);
    return files.filter((file) => file.endsWith(".mdx")).length;
  } catch (error) {
    return 0;
  }
}

// Helper function to count images
async function countImages(dir: string): Promise<number> {
  try {
    const countInDir = async (directory: string): Promise<number> => {
      let count = 0;
      const items = await fs.readdir(directory, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(directory, item.name);
        if (item.isDirectory()) {
          count += await countInDir(fullPath);
        } else if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(item.name)) {
          count++;
        }
      }

      return count;
    };

    return await countInDir(dir);
  } catch (error) {
    return 0;
  }
}

// Get site statistics
async function getStats() {
  const blogPosts = await countMDXFiles(path.join(process.cwd(), "src/app/blog/posts"));
  const workProjects = await countMDXFiles(path.join(process.cwd(), "src/app/work/projects"));
  const totalImages = await countImages(path.join(process.cwd(), "public/images"));

  return {
    blogPosts,
    workProjects,
    totalImages,
  };
}

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  href: string;
}

function StatCard({ title, value, icon, href }: StatCardProps) {
  return (
    <Link href={href} style={{ textDecoration: "none", flex: 1 }}>
      <Card
        padding="l"
        fillWidth
        border="neutral-medium"
        radius="l"
        className="hover-lift"
        style={{ cursor: "pointer" }}
      >
        <Column gap="m">
          <Flex horizontal="space-between" vertical="center">
            <Icon name={icon} size="l" onBackground="accent-medium" />
            <Heading variant="display-strong-xl" onBackground="neutral-strong">
              {value}
            </Heading>
          </Flex>
          <Text variant="heading-default-m" onBackground="neutral-medium">
            {title}
          </Text>
        </Column>
      </Card>
    </Link>
  );
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <Column fillWidth gap="l" maxWidth="xl">
      {/* Page Header */}
      <Column gap="m">
        <Heading variant="display-strong-l" onBackground="neutral-strong">
          Dashboard
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-medium">
          Manage your portfolio content, images, and site configuration
        </Text>
      </Column>

      {/* Statistics Cards */}
      <Row gap="m" fillWidth>
        <StatCard
          title="Blog Posts"
          value={stats.blogPosts}
          icon="pen"
          href="/admin/blog"
        />
        <StatCard
          title="Work Projects"
          value={stats.workProjects}
          icon="briefcase"
          href="/admin/work"
        />
        <StatCard
          title="Total Images"
          value={stats.totalImages}
          icon="image"
          href="/admin/images"
        />
      </Row>

      {/* Quick Actions */}
      <Column gap="m" paddingTop="l">
        <Heading variant="heading-strong-m" onBackground="neutral-strong">
          Quick Actions
        </Heading>
        <Row gap="m">
          <Link href="/admin/blog/new" style={{ textDecoration: "none" }}>
            <Button
              variant="primary"
              size="l"
              prefixIcon="plus"
            >
              New Blog Post
            </Button>
          </Link>
          <Link href="/admin/work/new" style={{ textDecoration: "none" }}>
            <Button
              variant="secondary"
              size="l"
              prefixIcon="plus"
            >
              New Project
            </Button>
          </Link>
          <Link href="/admin/images" style={{ textDecoration: "none" }}>
            <Button
              variant="secondary"
              size="l"
              prefixIcon="upload"
            >
              Upload Images
            </Button>
          </Link>
        </Row>
      </Column>

      {/* Recent Activity Section (Placeholder) */}
      <Column gap="m" paddingTop="l">
        <Heading variant="heading-strong-m" onBackground="neutral-strong">
          Recent Activity
        </Heading>
        <Card padding="l" border="neutral-medium" radius="l">
          <Text variant="body-default-m" onBackground="neutral-medium">
            Activity logging will appear here. This feature tracks all content changes and updates.
          </Text>
        </Card>
      </Column>

      {/* Help Section */}
      <Column gap="m" paddingTop="l">
        <Heading variant="heading-strong-m" onBackground="neutral-strong">
          Getting Started
        </Heading>
        <Card padding="l" border="brand-medium" radius="l" background="brand-weak">
          <Column gap="m">
            <Text variant="heading-default-m" onBackground="brand-strong">
              Welcome to your Admin Dashboard!
            </Text>
            <Text variant="body-default-m" onBackground="brand-medium">
              Use the sidebar to navigate between different sections:
            </Text>
            <Column gap="s" paddingLeft="m">
              <Text variant="body-default-s" onBackground="brand-medium">
                • <strong>Blog</strong> - Create and manage blog posts
              </Text>
              <Text variant="body-default-s" onBackground="brand-medium">
                • <strong>Work</strong> - Manage your portfolio projects
              </Text>
              <Text variant="body-default-s" onBackground="brand-medium">
                • <strong>Gallery</strong> - Organize your gallery images
              </Text>
              <Text variant="body-default-s" onBackground="brand-medium">
                • <strong>Images</strong> - Upload and manage all images
              </Text>
              <Text variant="body-default-s" onBackground="brand-medium">
                • <strong>Settings</strong> - Edit site configuration and profile
              </Text>
            </Column>
          </Column>
        </Card>
      </Column>
    </Column>
  );
}
