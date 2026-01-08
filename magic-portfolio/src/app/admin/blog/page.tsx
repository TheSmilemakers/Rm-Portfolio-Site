import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import { Column, Row, Heading, Button, Card, Text, Flex, Icon } from "@once-ui-system/core";

interface BlogPost {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  image: string;
}

// Get all blog posts
async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), "src/app/blog/posts");

  try {
    const files = await fs.readdir(postsDirectory);
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = path.join(postsDirectory, file);
        const fileContents = await fs.readFile(filePath, "utf8");
        const { data } = matter(fileContents);

        return {
          slug: file.replace(".mdx", ""),
          title: data.title || "Untitled",
          publishedAt: data.publishedAt || "",
          summary: data.summary || "",
          image: data.image || "",
        };
      })
    );

    // Sort by date (newest first)
    return posts.sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

interface PostCardProps {
  post: BlogPost;
}

function PostCard({ post }: PostCardProps) {
  return (
    <Card padding="l" border="neutral-medium" radius="l" fillWidth>
      <Column gap="m">
        <Row horizontal="space-between" vertical="start" fillWidth>
          <Column gap="s" style={{ flex: 1 }}>
            <Heading variant="heading-strong-m" onBackground="neutral-strong">
              {post.title}
            </Heading>
            <Text variant="label-default-s" onBackground="neutral-medium">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </Column>
          <Row gap="s">
            <Link href={`/blog/${post.slug}`} target="_blank" style={{ textDecoration: "none" }}>
              <Button variant="secondary" size="s" prefixIcon="eye">
                Preview
              </Button>
            </Link>
            <Link href={`/admin/blog/${post.slug}/edit`} style={{ textDecoration: "none" }}>
              <Button variant="primary" size="s" prefixIcon="pen">
                Edit
              </Button>
            </Link>
          </Row>
        </Row>

        {post.summary && (
          <Text variant="body-default-s" onBackground="neutral-medium" style={{ lineHeight: "1.6" }}>
            {post.summary}
          </Text>
        )}

        <Row gap="s" fillWidth style={{ flexWrap: "wrap" }}>
          <Flex gap="4" vertical="center">
            <Icon name="file" size="s" onBackground="neutral-medium" />
            <Text variant="label-default-xs" onBackground="neutral-medium">
              {post.slug}.mdx
            </Text>
          </Flex>
          {post.image && (
            <Flex gap="4" vertical="center">
              <Icon name="image" size="s" onBackground="neutral-medium" />
              <Text variant="label-default-xs" onBackground="neutral-medium">
                Has image
              </Text>
            </Flex>
          )}
        </Row>
      </Column>
    </Card>
  );
}

export default async function BlogManagement() {
  const posts = await getBlogPosts();

  return (
    <Column fillWidth gap="l" maxWidth="xl">
      {/* Page Header */}
      <Row horizontal="space-between" vertical="center" fillWidth>
        <Column gap="s">
          <Heading variant="display-strong-l" onBackground="neutral-strong">
            Blog Posts
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-medium">
            Manage your blog posts and insights
          </Text>
        </Column>
        <Link href="/admin/blog/new" style={{ textDecoration: "none" }}>
          <Button variant="primary" size="l" prefixIcon="plus">
            New Post
          </Button>
        </Link>
      </Row>

      {/* Stats */}
      <Row gap="m">
        <Card padding="m" border="neutral-medium" radius="m">
          <Column gap="4">
            <Text variant="label-default-s" onBackground="neutral-medium">
              Total Posts
            </Text>
            <Heading variant="heading-strong-l" onBackground="neutral-strong">
              {posts.length}
            </Heading>
          </Column>
        </Card>
      </Row>

      {/* Posts List */}
      <Column gap="m">
        {posts.length === 0 ? (
          <Card padding="xl" border="neutral-medium" radius="l" fillWidth>
            <Column gap="m" horizontal="center">
              <Icon name="pen" size="xl" onBackground="neutral-medium" />
              <Column gap="s" horizontal="center">
                <Heading variant="heading-strong-m" onBackground="neutral-strong">
                  No blog posts yet
                </Heading>
                <Text variant="body-default-m" onBackground="neutral-medium">
                  Get started by creating your first blog post
                </Text>
              </Column>
              <Link href="/admin/blog/new" style={{ textDecoration: "none" }}>
                <Button variant="primary" size="m" prefixIcon="plus">
                  Create First Post
                </Button>
              </Link>
            </Column>
          </Card>
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </Column>
    </Column>
  );
}
