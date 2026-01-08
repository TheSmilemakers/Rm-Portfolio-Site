import { Column, Row, Heading, Text, Card, Badge } from "@once-ui-system/core";
import { person, social, home, about, blog, work } from "@/resources";

export default function SettingsManagement() {
  return (
    <Column fillWidth gap="l" maxWidth="xl">
      {/* Header */}
      <Column gap="s">
        <Heading variant="display-strong-l" onBackground="neutral-strong">
          Site Settings
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-medium">
          View and manage site configuration
        </Text>
      </Column>

      {/* Configuration File Info */}
      <Card padding="l" border="brand-medium" radius="l" background="brand-weak">
        <Column gap="m">
          <Heading variant="heading-strong-m" onBackground="brand-strong">
            Configuration File
          </Heading>
          <Text variant="body-default-m" onBackground="brand-medium">
            Site settings are managed in:
          </Text>
          <Text variant="label-default-m" onBackground="brand-strong" style={{ fontFamily: "monospace" }}>
            src/resources/content.js
          </Text>
          <Text variant="body-default-s" onBackground="brand-medium">
            Edit this file to update site-wide settings, profile information, and page configurations.
          </Text>
        </Column>
      </Card>

      {/* Person Info */}
      <Card padding="l" border="neutral-medium" radius="l">
        <Column gap="m">
          <Row horizontal="space-between" vertical="center">
            <Heading variant="heading-strong-m" onBackground="neutral-strong">
              Profile Information
            </Heading>
            <Badge background="neutral-weak" textVariant="label-default-s">person</Badge>
          </Row>

          <Column gap="s">
            <Row gap="m">
              <Column gap="4" style={{ flex: 1 }}>
                <Text variant="label-default-xs" onBackground="neutral-medium">
                  Name
                </Text>
                <Text variant="body-default-m" onBackground="neutral-strong">
                  {person.name}
                </Text>
              </Column>
              <Column gap="4" style={{ flex: 1 }}>
                <Text variant="label-default-xs" onBackground="neutral-medium">
                  Role
                </Text>
                <Text variant="body-default-m" onBackground="neutral-strong">
                  {person.role}
                </Text>
              </Column>
            </Row>

            <Row gap="m">
              <Column gap="4" style={{ flex: 1 }}>
                <Text variant="label-default-xs" onBackground="neutral-medium">
                  Email
                </Text>
                <Text variant="body-default-m" onBackground="neutral-strong">
                  {person.email}
                </Text>
              </Column>
              <Column gap="4" style={{ flex: 1 }}>
                <Text variant="label-default-xs" onBackground="neutral-medium">
                  Location
                </Text>
                <Text variant="body-default-m" onBackground="neutral-strong">
                  {person.location}
                </Text>
              </Column>
            </Row>

            {person.avatar && (
              <Column gap="4">
                <Text variant="label-default-xs" onBackground="neutral-medium">
                  Avatar
                </Text>
                <Text variant="body-default-s" onBackground="neutral-medium" style={{ fontFamily: "monospace", fontSize: "12px" }}>
                  {person.avatar}
                </Text>
              </Column>
            )}
          </Column>
        </Column>
      </Card>

      {/* Social Links */}
      <Card padding="l" border="neutral-medium" radius="l">
        <Column gap="m">
          <Row horizontal="space-between" vertical="center">
            <Heading variant="heading-strong-m" onBackground="neutral-strong">
              Social Links
            </Heading>
            <Badge background="neutral-weak" textVariant="label-default-s">social</Badge>
          </Row>

          <Column gap="s">
            {social.map((link, index) => (
              <Row key={index} gap="m" vertical="center">
                <Text variant="label-default-s" onBackground="neutral-strong" style={{ minWidth: "100px" }}>
                  {link.name}
                </Text>
                <Text variant="body-default-s" onBackground="neutral-medium" style={{ fontFamily: "monospace", fontSize: "12px" }}>
                  {link.link}
                </Text>
              </Row>
            ))}
          </Column>
        </Column>
      </Card>

      {/* Page Configurations */}
      <Row gap="m" fillWidth>
        {/* Home Page */}
        <Card padding="l" border="neutral-medium" radius="l" style={{ flex: 1 }}>
          <Column gap="m">
            <Row horizontal="space-between" vertical="center">
              <Heading variant="heading-strong-s" onBackground="neutral-strong">
                Home Page
              </Heading>
              <Badge background="neutral-weak" textVariant="label-default-s">home</Badge>
            </Row>
            <Column gap="s">
              <Column gap="4">
                <Text variant="label-default-xs" onBackground="neutral-medium">
                  Title
                </Text>
                <Text variant="body-default-s" onBackground="neutral-strong">
                  {home.title}
                </Text>
              </Column>
              <Column gap="4">
                <Text variant="label-default-xs" onBackground="neutral-medium">
                  Description
                </Text>
                <Text variant="body-default-s" onBackground="neutral-medium" style={{ fontSize: "12px" }}>
                  {home.description}
                </Text>
              </Column>
            </Column>
          </Column>
        </Card>

        {/* About Page */}
        <Card padding="l" border="neutral-medium" radius="l" style={{ flex: 1 }}>
          <Column gap="m">
            <Row horizontal="space-between" vertical="center">
              <Heading variant="heading-strong-s" onBackground="neutral-strong">
                About Page
              </Heading>
              <Badge background="neutral-weak" textVariant="label-default-s">about</Badge>
            </Row>
            <Column gap="s">
              <Column gap="4">
                <Text variant="label-default-xs" onBackground="neutral-medium">
                  Title
                </Text>
                <Text variant="body-default-s" onBackground="neutral-strong">
                  {about.title}
                </Text>
              </Column>
              <Column gap="4">
                <Text variant="label-default-xs" onBackground="neutral-medium">
                  Description
                </Text>
                <Text variant="body-default-s" onBackground="neutral-medium" style={{ fontSize: "12px" }}>
                  {about.description}
                </Text>
              </Column>
            </Column>
          </Column>
        </Card>
      </Row>

      <Row gap="m" fillWidth>
        {/* Blog Page */}
        <Card padding="l" border="neutral-medium" radius="l" style={{ flex: 1 }}>
          <Column gap="m">
            <Row horizontal="space-between" vertical="center">
              <Heading variant="heading-strong-s" onBackground="neutral-strong">
                Blog Page
              </Heading>
              <Badge background="neutral-weak" textVariant="label-default-s">blog</Badge>
            </Row>
            <Column gap="s">
              <Column gap="4">
                <Text variant="label-default-xs" onBackground="neutral-medium">
                  Title
                </Text>
                <Text variant="body-default-s" onBackground="neutral-strong">
                  {blog.title}
                </Text>
              </Column>
              <Column gap="4">
                <Text variant="label-default-xs" onBackground="neutral-medium">
                  Description
                </Text>
                <Text variant="body-default-s" onBackground="neutral-medium" style={{ fontSize: "12px" }}>
                  {blog.description}
                </Text>
              </Column>
            </Column>
          </Column>
        </Card>

        {/* Work Page */}
        <Card padding="l" border="neutral-medium" radius="l" style={{ flex: 1 }}>
          <Column gap="m">
            <Row horizontal="space-between" vertical="center">
              <Heading variant="heading-strong-s" onBackground="neutral-strong">
                Work Page
              </Heading>
              <Badge background="neutral-weak" textVariant="label-default-s">work</Badge>
            </Row>
            <Column gap="s">
              <Column gap="4">
                <Text variant="label-default-xs" onBackground="neutral-medium">
                  Title
                </Text>
                <Text variant="body-default-s" onBackground="neutral-strong">
                  {work.title}
                </Text>
              </Column>
              <Column gap="4">
                <Text variant="label-default-xs" onBackground="neutral-medium">
                  Description
                </Text>
                <Text variant="body-default-s" onBackground="neutral-medium" style={{ fontSize: "12px" }}>
                  {work.description}
                </Text>
              </Column>
            </Column>
          </Column>
        </Card>
      </Row>

      {/* Edit Instructions */}
      <Card padding="l" border="accent-medium" radius="l" background="accent-weak">
        <Column gap="m">
          <Heading variant="heading-strong-m" onBackground="accent-strong">
            How to Edit Settings
          </Heading>
          <Column gap="s">
            <Text variant="body-default-m" onBackground="accent-medium">
              1. Open <code style={{ fontFamily: "monospace", padding: "2px 6px", backgroundColor: "var(--accent-background-strong)", borderRadius: "4px" }}>src/resources/content.js</code> in your editor
            </Text>
            <Text variant="body-default-m" onBackground="accent-medium">
              2. Locate the relevant section (person, social, home, about, blog, work)
            </Text>
            <Text variant="body-default-m" onBackground="accent-medium">
              3. Update the values
            </Text>
            <Text variant="body-default-m" onBackground="accent-medium">
              4. Save the file
            </Text>
            <Text variant="body-default-m" onBackground="accent-medium">
              5. Refresh your site to see changes
            </Text>
          </Column>
        </Column>
      </Card>

      {/* Future Enhancement */}
      <Card padding="l" border="brand-medium" radius="l" background="brand-weak">
        <Column gap="s">
          <Heading variant="heading-strong-s" onBackground="brand-strong">
            💡 Future Enhancement
          </Heading>
          <Text variant="body-default-s" onBackground="brand-medium">
            A visual settings editor is planned for future updates. For now, manual editing provides full control over all configuration options.
          </Text>
        </Column>
      </Card>
    </Column>
  );
}
