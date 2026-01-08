"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Column, Row, Heading, Button, Input, Text } from "@once-ui-system/core";

interface ProjectEditorProps {
  initialData?: {
    title: string;
    publishedAt: string;
    summary: string;
    image: string;
    images: string[];
    tag: string;
    featured: boolean;
    content: string;
  };
  slug?: string; // For edit mode
  mode: "create" | "edit";
}

export function ProjectEditor({ initialData, slug, mode }: ProjectEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    publishedAt: initialData?.publishedAt || new Date().toISOString().split("T")[0],
    summary: initialData?.summary || "",
    image: initialData?.image || "",
    images: initialData?.images?.join(", ") || "",
    tag: initialData?.tag || "",
    featured: initialData?.featured || false,
    content: initialData?.content || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = mode === "create" ? "/api/admin/work" : `/api/admin/work/${slug}`;
      const method = mode === "create" ? "POST" : "PUT";

      // Convert images string to array
      const imagesArray = formData.images
        .split(",")
        .map((img) => img.trim())
        .filter((img) => img);

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          images: imagesArray,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save project");
      }

      router.push("/admin/work");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/work/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete project");
      }

      router.push("/admin/work");
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
            {mode === "create" ? "Create Project" : "Edit Project"}
          </Heading>
          <Row gap="s">
            <Button
              type="button"
              variant="secondary"
              size="m"
              onClick={() => router.push("/admin/work")}
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
              {loading ? "Saving..." : mode === "create" ? "Create Project" : "Update Project"}
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
              placeholder="Enter project title"
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
              placeholder="Brief summary of the project (shown in listings)"
              rows={3}
              required
              disabled={loading}
              className="admin-textarea"
            />
            <Text variant="label-default-xs" onBackground="neutral-medium">
              {formData.summary.length} / 160 characters recommended
            </Text>
          </Column>

          {/* Tag */}
          <Column gap="s">
            <label htmlFor="tag">
              <Text variant="label-default-s" onBackground="neutral-strong">
                Tag/Category
              </Text>
            </label>
            <Input
              id="tag"
              type="text"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              placeholder="e.g., Healthcare AI, Trading, Automation"
              disabled={loading}
            />
            <Text variant="label-default-xs" onBackground="neutral-medium">
              Category badge shown on project card
            </Text>
          </Column>

          {/* Featured Toggle */}
          <Row gap="m" vertical="center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              disabled={loading}
              className="admin-checkbox"
            />
            <Column gap="4">
              <label htmlFor="featured">
                <Text variant="label-default-s" onBackground="neutral-strong">
                  Featured Project
                </Text>
              </label>
              <Text variant="label-default-xs" onBackground="neutral-medium">
                Featured projects appear first and may be highlighted on the homepage
              </Text>
            </Column>
          </Row>

          {/* Cover Image */}
          <Column gap="s">
            <label htmlFor="image">
              <Text variant="label-default-s" onBackground="neutral-strong">
                Cover Image Path
              </Text>
            </label>
            <Input
              id="image"
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="/images/projects/my-project/cover.jpg"
              disabled={loading}
            />
            <Text variant="label-default-xs" onBackground="neutral-medium">
              Main cover image for the project
            </Text>
          </Column>

          {/* Gallery Images */}
          <Column gap="s">
            <label htmlFor="images">
              <Text variant="label-default-s" onBackground="neutral-strong">
                Gallery Images (Optional)
              </Text>
            </label>
            <textarea
              id="images"
              value={formData.images}
              onChange={(e) => setFormData({ ...formData, images: e.target.value })}
              placeholder="/images/projects/my-project/image1.jpg, /images/projects/my-project/image2.jpg"
              rows={3}
              disabled={loading}
              className="admin-textarea"
            />
            <Text variant="label-default-xs" onBackground="neutral-medium">
              Comma-separated list of image paths for project gallery
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
              placeholder="Write your project case study using Markdown..."
              rows={20}
              required
              disabled={loading}
              className="admin-textarea admin-textarea-code"
            />
            <Text variant="label-default-xs" onBackground="neutral-medium">
              Supports Markdown and MDX. Use ## for headings, **bold**, *italic*, lists, etc.
            </Text>
          </Column>
        </Column>

        {/* Preview Note */}
        <Column gap="s" padding="m" border="brand-medium" radius="m" background="brand-weak">
          <Text variant="label-default-s" onBackground="brand-strong">
            💡 Tip: Preview your project
          </Text>
          <Text variant="body-default-s" onBackground="brand-medium">
            After saving, click "Preview" on the work list to see how your project looks on the live site.
          </Text>
        </Column>
      </Column>
    </form>
  );
}
