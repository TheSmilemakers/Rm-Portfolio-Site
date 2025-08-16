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
  Card,
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
    <TiltFx aspectRatio={16/9} radius="l">
      <Card
        fillWidth
        radius="l"
        background="surface"
        border="neutral-alpha-medium"
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
        <Column fillWidth gap="m">
          <Carousel
            sizes="(max-width: 960px) 100vw, 960px"
            items={images.map((image) => ({
              slide: image,
              alt: title,
            }))}
            radius="l"
          />
          <Flex
            mobileDirection="column"
            fillWidth
            paddingX="l"
            paddingTop="12"
            paddingBottom="24"
            gap="l"
          >
        {title && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          </Flex>
        )}
        {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
            {description?.trim() && (
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            )}
            <Flex gap="24" wrap>
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
    </Column>
      </Card>
    </TiltFx>
  );
};
