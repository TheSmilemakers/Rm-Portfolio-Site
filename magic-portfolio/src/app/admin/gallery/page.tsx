import Link from "next/link";
import { Column, Row, Heading, Text, Card, Button, Icon } from "@once-ui-system/core";
import { gallery } from "@/resources";

export default function GalleryManagement() {
  const totalImages = gallery.images?.length || 0;

  return (
    <Column fillWidth gap="l" maxWidth="xl">
      {/* Header */}
      <Column gap="s">
        <Heading variant="display-strong-l" onBackground="neutral-strong">
          Gallery Management
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-medium">
          Manage gallery images and ordering
        </Text>
      </Column>

      {/* Current Gallery Info */}
      <Card padding="l" border="brand-medium" radius="l" background="brand-weak">
        <Column gap="m">
          <Row horizontal="space-between" vertical="center">
            <Heading variant="heading-strong-m" onBackground="brand-strong">
              Current Gallery
            </Heading>
            <Heading variant="heading-strong-l" onBackground="brand-strong">
              {totalImages} images
            </Heading>
          </Row>

          <Text variant="body-default-m" onBackground="brand-medium">
            Gallery images are currently configured in:
          </Text>
          <Text variant="label-default-s" onBackground="brand-strong" style={{ fontFamily: "monospace" }}>
            src/resources/content.js
          </Text>

          <Column gap="s" paddingTop="s">
            <Text variant="label-default-s" onBackground="brand-strong">
              To manage gallery images:
            </Text>
            <Column gap="4" paddingLeft="m">
              <Text variant="body-default-s" onBackground="brand-medium">
                1. Upload images via the <Link href="/admin/images" style={{ textDecoration: "underline" }}>Images</Link> section
              </Text>
              <Text variant="body-default-s" onBackground="brand-medium">
                2. Edit the gallery array in content.js
              </Text>
              <Text variant="body-default-s" onBackground="brand-medium">
                3. Add images with src, alt, and orientation fields
              </Text>
              <Text variant="body-default-s" onBackground="brand-medium">
                4. Save and reload to see changes
              </Text>
            </Column>
          </Column>
        </Column>
      </Card>

      {/* Current Gallery Images Preview */}
      {gallery.images && gallery.images.length > 0 && (
        <Column gap="m">
          <Heading variant="heading-strong-m" onBackground="neutral-strong">
            Current Gallery Images
          </Heading>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            {gallery.images.map((img, index) => (
              <Card key={index} padding="0" border="neutral-medium" radius="m" overflow="hidden">
                <Column gap="0">
                  <div
                    style={{
                      width: "100%",
                      height: "150px",
                      backgroundColor: "var(--neutral-background-medium)",
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <Column gap="4" padding="s">
                    <Text variant="label-default-xs" onBackground="neutral-medium" style={{ fontSize: "10px" }}>
                      {img.src}
                    </Text>
                  </Column>
                </Column>
              </Card>
            ))}
          </div>
        </Column>
      )}

      {/* Quick Actions */}
      <Card padding="l" border="neutral-medium" radius="l">
        <Column gap="m">
          <Heading variant="heading-strong-m" onBackground="neutral-strong">
            Quick Actions
          </Heading>
          <Row gap="m">
            <Link href="/admin/images" style={{ textDecoration: "none" }}>
              <Button variant="primary" size="m" prefixIcon="upload">
                Upload Gallery Images
              </Button>
            </Link>
            <Link href="/gallery" target="_blank" style={{ textDecoration: "none" }}>
              <Button variant="secondary" size="m" prefixIcon="eye">
                Preview Gallery
              </Button>
            </Link>
          </Row>
        </Column>
      </Card>

      {/* Future Enhancement Note */}
      <Card padding="l" border="accent-medium" radius="l" background="accent-weak">
        <Column gap="s">
          <Row gap="s" vertical="center">
            <Icon name="info" size="m" onBackground="accent-strong" />
            <Heading variant="heading-strong-s" onBackground="accent-strong">
              Future Enhancement
            </Heading>
          </Row>
          <Text variant="body-default-s" onBackground="accent-medium">
            Drag-and-drop gallery editor coming soon! For now, manually edit the gallery configuration in content.js.
          </Text>
        </Column>
      </Card>
    </Column>
  );
}
