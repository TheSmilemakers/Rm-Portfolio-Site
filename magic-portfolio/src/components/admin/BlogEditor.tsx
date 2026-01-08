"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Column, Row, Heading, Button, Input, Text } from "@once-ui-system/core";

interface BlogEditorProps {
  initialData?: {
    title: string;
    publishedAt: string;
    summary: string;
    image: string;
    content: string;
  };
  slug?: string; // For edit mode
  mode: "create" | "edit";
}

export function BlogEditor({ initialData, slug, mode }: BlogEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    publishedAt: initialData?.publishedAt || new Date().toISOString().split("T")[0],
    summary: initialData?.summary || "",
    image: initialData?.image || "",
    content: initialData?.content || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = mode === "create" ? "/api/admin/blog" : `/api/admin/blog/${slug}`;
      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save blog post");
      }

      const data = await response.json();

      // Redirect to blog list
      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/blog/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete blog post");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Column fillWidth gap="l" maxWidth="xl">
        {/* Header */}
        <Row horizontal="space-between" vertical="center" fillWidth>
          <Heading variant="display-strong-l" onBackground="neutral-strong">
            {mode === "create" ? "Create Blog Post" : "Edit Blog Post"}
          </Heading>
          <Row gap="s">
            <Button
              type="button"
              variant="secondary"
              size="m"
              onClick={() => router.push("/admin/blog")}
              disabled={loading}
            >
              Cancel
            </Button>
            {mode === "edit" && (
              <Button
                type="button"
                variant="danger"
                size="m"
                onClick={handleDelete}
                disabled={loading}
              >
                Delete
              </Button>
            )}
            <Button type="submit" variant="primary" size="m" disabled={loading}>
              {loading ? "Saving..." : mode === "create" ? "Create Post" : "Update Post"}
            </Button>
          </Row>
        </Row>

        {/* Error Message */}
        {error && (
          <Text variant="body-default-m" onBackground="danger-strong">
            Error: {error}
          </Text>
        )}

        {/* Form Fields */}
        <Column gap="l">
          {/* Title */}
          <Column gap="s">
            <label htmlFor="title">
              <Text variant="label-default-s" onBackground="neutral-strong">
                Title *
              </Text>
            </label>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter blog post title"
              required
              disabled={loading}
            />
          </Column>

          {/* Publish Date */}
          <Column gap="s">
            <label htmlFor="publishedAt">
              <Text variant="label-default-s" onBackground="neutral-strong">
                Publish Date *
              </Text>
            </label>
            <Input
              id="publishedAt"
              type="date"
              value={formData.publishedAt}
              onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
              required
              disabled={loading}
            />
          </Column>

          {/* Summary */}
          <Column gap="s">
            <label htmlFor="summary">
              <Text variant="label-default-s" onBackground="neutral-strong">
                Summary *
              </Text>
            </label>
            <textarea
              id="summary"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="Brief summary of the blog post (shown in listings)"
              rows={3}
              required
              disabled={loading}
              className="admin-textarea"
            />
            <Text variant="label-default-xs" onBackground="neutral-medium">
              {formData.summary.length} / 160 characters recommended
            </Text>
          </Column>

          {/* Featured Image */}
          <Column gap="s">
            <label htmlFor="image">
              <Text variant="label-default-s" onBackground="neutral-strong">
                Featured Image Path
              </Text>
            </label>
            <Input
              id="image"
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="/images/blog/my-post.jpg"
              disabled={loading}
            />
            <Text variant="label-default-xs" onBackground="neutral-medium">
              Path to image in public directory. Upload images via Images section first.
            </Text>
          </Column>

          {/* Content (MDX) */}
          <Column gap="s">
            <label htmlFor="content">
              <Text variant="label-default-s" onBackground="neutral-strong">
                Content (Markdown/MDX) *
              </Text>
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your blog post content using Markdown..."
              rows={20}
              required
              disabled={loading}
              className="admin-textarea admin-textarea-code"
            />
            <Text variant="label-default-xs" onBackground="neutral-medium">
              Supports Markdown and MDX. Use ## for headings, **bold**, *italic*, etc.
            </Text>
          </Column>
        </Column>

        {/* Preview Note */}
        <Column gap="s" padding="m" border="brand-medium" radius="m" background="brand-weak">
          <Text variant="label-default-s" onBackground="brand-strong">
            💡 Tip: Preview your post
          </Text>
          <Text variant="body-default-s" onBackground="brand-medium">
            After saving, click "Preview" on the blog list to see how your post looks on the live site.
          </Text>
        </Column>
      </Column>
    </form>
  );
}
