"use client";

import { useState, useEffect, useCallback } from "react";
import { Column, Row, Heading, Button, Card, Text, Input, Icon, Flex, Badge } from "@once-ui-system/core";

interface ImageFile {
  path: string;
  name: string;
  size: number;
  category: string;
}

export function ImageLibrary() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch images
  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/images");
      if (!response.ok) throw new Error("Failed to fetch images");

      const data = await response.json();
      setImages(data.images || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load images");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Handle file upload
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/admin/images/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await response.json();
      setSuccess(`Successfully uploaded ${data.uploaded} image(s)`);
      await fetchImages();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Handle image delete
  const handleDelete = async (imagePath: string) => {
    if (!confirm(`Are you sure you want to delete this image?\n${imagePath}`)) {
      return;
    }

    try {
      const response = await fetch("/api/admin/images/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: imagePath }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Delete failed");
      }

      setSuccess("Image deleted successfully");
      await fetchImages();

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  // Copy path to clipboard
  const copyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    setSuccess(`Copied: ${path}`);
    setTimeout(() => setSuccess(null), 2000);
  };

  // Filter images
  const filteredImages = images.filter((img) => {
    const matchesSearch = img.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         img.path.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || img.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(images.map((img) => img.category)))];

  // Format file size
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <Column fillWidth gap="l" maxWidth="xl">
      {/* Header */}
      <Row horizontal="space-between" vertical="center" fillWidth>
        <Column gap="s">
          <Heading variant="display-strong-l" onBackground="neutral-strong">
            Image Library
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-medium">
            Upload and manage images for your portfolio
          </Text>
        </Column>
        <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files)}
            style={{ display: "none" }}
            disabled={uploading}
          />
          <Button variant="primary" size="l" prefixIcon="upload" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Images"}
          </Button>
        </label>
      </Row>

      {/* Success/Error Messages */}
      {success && (
        <Card padding="m" border="success-medium" radius="m" background="success-weak">
          <Text variant="body-default-m" onBackground="success-strong">
            ✓ {success}
          </Text>
        </Card>
      )}

      {error && (
        <Card padding="m" border="danger-medium" radius="m" background="danger-weak">
          <Text variant="body-default-m" onBackground="danger-strong">
            ✗ {error}
          </Text>
        </Card>
      )}

      {/* Search and Filters */}
      <Row gap="m" fillWidth>
        <Column gap="s" style={{ flex: 1 }}>
          <Input
            id="image-search"
            type="text"
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
          />
        </Column>
        <Row gap="s" style={{ flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "primary" : "secondary"}
              size="s"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </Row>
      </Row>

      {/* Stats */}
      <Row gap="m">
        <Card padding="m" border="neutral-medium" radius="m">
          <Column gap="4">
            <Text variant="label-default-s" onBackground="neutral-medium">
              Total Images
            </Text>
            <Heading variant="heading-strong-l" onBackground="neutral-strong">
              {images.length}
            </Heading>
          </Column>
        </Card>
        <Card padding="m" border="neutral-medium" radius="m">
          <Column gap="4">
            <Text variant="label-default-s" onBackground="neutral-medium">
              Filtered
            </Text>
            <Heading variant="heading-strong-l" onBackground="neutral-strong">
              {filteredImages.length}
            </Heading>
          </Column>
        </Card>
      </Row>

      {/* Images Grid */}
      {loading ? (
        <Card padding="xl" border="neutral-medium" radius="l">
          <Text variant="body-default-m" onBackground="neutral-medium">
            Loading images...
          </Text>
        </Card>
      ) : filteredImages.length === 0 ? (
        <Card padding="xl" border="neutral-medium" radius="l">
          <Column gap="m" horizontal="center">
            <Icon name="image" size="xl" onBackground="neutral-medium" />
            <Column gap="s" horizontal="center">
              <Heading variant="heading-strong-m" onBackground="neutral-strong">
                {searchQuery || selectedCategory !== "all" ? "No images found" : "No images yet"}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-medium">
                {searchQuery || selectedCategory !== "all"
                  ? "Try adjusting your search or filters"
                  : "Upload your first image to get started"}
              </Text>
            </Column>
          </Column>
        </Card>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
          {filteredImages.map((img) => (
            <Card key={img.path} padding="0" border="neutral-medium" radius="m" overflow="hidden">
              <Column gap="0">
                {/* Image Preview */}
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    backgroundColor: "var(--neutral-background-medium)",
                    position: "relative",
                  }}
                >
                  <img
                    src={img.path}
                    alt={img.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Image Info */}
                <Column gap="m" padding="m">
                  <Column gap="4">
                    <Text
                      variant="label-default-s"
                      onBackground="neutral-strong"
                      style={{
                        wordBreak: "break-all",
                        fontSize: "12px",
                      }}
                    >
                      {img.name}
                    </Text>
                    <Row gap="s">
                      <Badge background="neutral-weak" textVariant="label-default-s">
                        {img.category}
                      </Badge>
                      <Text variant="label-default-xs" onBackground="neutral-medium">
                        {formatSize(img.size)}
                      </Text>
                    </Row>
                  </Column>

                  {/* Actions */}
                  <Row gap="s" fillWidth>
                    <Button
                      variant="secondary"
                      size="s"
                      onClick={() => copyPath(img.path)}
                      style={{ flex: 1 }}
                    >
                      Copy Path
                    </Button>
                    <Button
                      variant="danger"
                      size="s"
                      onClick={() => handleDelete(img.path)}
                      prefixIcon="trash"
                    >
                      Delete
                    </Button>
                  </Row>

                  {/* Full Path */}
                  <Text
                    variant="label-default-xs"
                    onBackground="neutral-medium"
                    style={{
                      wordBreak: "break-all",
                      fontSize: "10px",
                      fontFamily: "monospace",
                    }}
                  >
                    {img.path}
                  </Text>
                </Column>
              </Column>
            </Card>
          ))}
        </div>
      )}
    </Column>
  );
}
