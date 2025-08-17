"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
  TiltFx,
  Badge,
  HoloFx,
} from "@once-ui-system/core";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  featured?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  featured = false,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
}) => {
  return (
    <Flex
      as="div"
      fillWidth
      fillHeight
      radius="l"
      background="surface"
      border="neutral-alpha-medium"
      direction="column"
      style={{ overflow: "hidden" }}
    >
      {featured && (
        <HoloFx
          border="brand-alpha-weak"
          radius="m"
          shine={{ opacity: 30 }}
          burn={{ opacity: 30 }}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 10
          }}
        >
          <Badge>
            Featured
          </Badge>
        </HoloFx>
      )}
      <Column fillWidth fillHeight gap="0" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Carousel outside of TiltFx to avoid nested buttons */}
        <div style={{ aspectRatio: "16/9", width: "100%", position: "relative", flexShrink: 0 }}>
          <Carousel
            sizes="(max-width: 960px) 100vw, 960px"
            items={images.map((image) => ({
              slide: image,
              alt: title,
            }))}
            radius="s"
            style={{ height: "100%" }}
          />
        </div>
        {/* TiltFx only on content area */}
        <TiltFx fillWidth style={{ flex: "1", display: "flex" }}>
          <Flex
            mobileDirection="column"
            fillWidth
            paddingX="l"
            paddingTop="l"
            paddingBottom="l"
            gap="l"
            style={{ flex: "1", display: "flex", flexDirection: "column" }}
          >
            {title && (
              <Flex flex={5}>
                <Heading as="h2" wrap="balance" variant="heading-strong-xl">
                  {title}
                </Heading>
              </Flex>
            )}
            {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
              <Column flex={7} gap="m" style={{ marginTop: "auto" }}>
                {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
                {description?.trim() && (
                  <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                    {description}
                  </Text>
                )}
                <Flex gap="l" wrap style={{ marginTop: "8" }}>
                  {content?.trim() && (
                    <SmartLink
                      suffixIcon="arrowRight"
                      style={{ margin: "0", width: "fit-content" }}
                      href={href}
                    >
                      <Text variant="body-default-s">Read case study</Text>
                    </SmartLink>
                  )}
                  {link && (
                    <SmartLink
                      suffixIcon="arrowUpRightFromSquare"
                      style={{ margin: "0", width: "fit-content" }}
                      href={link}
                    >
                      <Text variant="body-default-s">View project</Text>
                    </SmartLink>
                  )}
                </Flex>
              </Column>
            )}
          </Flex>
        </TiltFx>
      </Column>
    </Flex>
  );
};
