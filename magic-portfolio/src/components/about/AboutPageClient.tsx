'use client';

import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  RevealFx,
  LetterFx,
  TiltFx,
  Card
} from "@once-ui-system/core";
import { about, person, social } from "@/resources";
import type { Experience, Institution, Skill, SocialItem, ImageItem } from "@/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./about.module.scss";
import React from "react";

interface AboutPageClientProps {
  structure: any[];
  TableOfContents: React.ComponentType<any>;
}

export default function AboutPageClient({ structure, TableOfContents }: AboutPageClientProps) {
  const reducedMotion = useReducedMotion();
  
  return (
    <Column fillWidth>
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide="s"
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Flex fillWidth mobileDirection="column" horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            position="sticky"
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <RevealFx translateY="8" >
              <TiltFx aspectRatio={1} radius="full" >
                <Avatar src={person.avatar} size="xl" />
              </TiltFx>
            </RevealFx>
            <RevealFx delay={0.1} >
              <Flex gap="8" vertical="center">
                <Icon onBackground="accent-weak" name="globe" aria-label="Location" />
                {person.location}
              </Flex>
            </RevealFx>
            {person.languages.length > 0 && (
              <RevealFx delay={0.2} >
                <Flex wrap gap="8">
                  {person.languages.map((language: string, index: number) => (
                    <Tag key={language} size="l">
                      {language}
                    </Tag>
                  ))}
                </Flex>
              </RevealFx>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} fillWidth>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {about.calendar.display && (
              <Flex
                fitWidth
                border="brand-alpha-medium"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
              >
                <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" aria-label="Calendar" />
                <Flex paddingX="8">Schedule a call</Flex>
                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Flex>
            )}
            <RevealFx translateY="16" >
              <LetterFx speed="medium" trigger="instant" >
                <Heading className={styles.textAlign} variant="display-strong-xl">
                  {person.name}
                </Heading>
              </LetterFx>
            </RevealFx>
            <RevealFx delay={0.2} >
              <Text
                className={styles.textAlign}
                variant="display-default-xs"
                onBackground="neutral-medium"
              >
                {person.role}
              </Text>
            </RevealFx>
            {social.length > 0 && (
              <RevealFx delay={0.3} >
                <Flex className={styles.blockAlign} paddingTop="20" paddingBottom="8" gap="8" wrap horizontal="center" fitWidth data-border="rounded">
                  {social.map(
                    (item: SocialItem) =>
                      item.link && (
                          <React.Fragment key={item.name}>
                              <Button
                                  className="s-flex-hide"
                                  href={item.link}
                                  prefixIcon={item.icon}
                                  label={item.name}
                                  size="s"
                                  weight="default"
                                  variant="secondary"
                              />
                              <IconButton
                                  className="s-flex-show"
                                  size="l"
                                  key={`${item.name}-icon`}
                                  href={item.link}
                                  icon={item.icon}
                                  variant="secondary"
                                  style={{ minWidth: '44px', minHeight: '44px' }}
                              />
                          </React.Fragment>
                      ),
                  )}
                </Flex>
              </RevealFx>
            )}
          </Column>

          {about.intro.display && (
            <RevealFx delay={0.4} >
              <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
                {about.intro.description}
              </Column>
            </RevealFx>
          )}

          {about.work.display && (
            <>
              <RevealFx translateY="16" >
                <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                  {about.work.title}
                </Heading>
              </RevealFx>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience: Experience, index: number) => (
                  <RevealFx key={`${experience.company}-${experience.role}-${index}`} delay={0.1 + (index * 0.1)} translateY="8" >
                    <Card fillWidth padding="l" background="neutral-medium" className="hover-lift">
                    <Flex fillWidth horizontal="space-between" vertical="end" marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Flex>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map((achievement: React.ReactNode, index: number) => (
                        <Text
                          as="li"
                          variant="body-default-m"
                          key={`${experience.company}-${index}`}
                        >
                          {achievement}
                        </Text>
                      ))}
                    </Column>
                    {experience.images.length > 0 && (
                      <Flex fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                        {experience.images.map((image: ImageItem, index: number) => (
                          <Flex
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Flex>
                        ))}
                      </Flex>
                    )}
                    </Card>
                  </RevealFx>
                ))}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <RevealFx translateY="16" >
                <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                  {about.studies.title}
                </Heading>
              </RevealFx>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution: Institution, index: number) => (
                  <RevealFx key={`${institution.name}-${index}`} delay={0.1 + (index * 0.1)} translateY="8" >
                    <Column fillWidth gap="4">
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                    </Column>
                  </RevealFx>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <RevealFx translateY="16" >
                <Heading
                  as="h2"
                  id={about.technical.title}
                  variant="display-strong-s"
                  marginBottom="40"
                >
                  {about.technical.title}
                </Heading>
              </RevealFx>
              <Column fillWidth gap="l">
                {about.technical.skills.map((skill: Skill, index: number) => (
                  <RevealFx key={`${skill.title}-${index}`} delay={0.1 + (index * 0.1)} translateY="8" >
                    <Column fillWidth gap="4">
                    <Text id={skill.title} variant="heading-strong-l">{skill.title}</Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {skill.description}
                    </Text>
                    {skill.images && skill.images.length > 0 && (
                      <Flex fillWidth paddingTop="m" gap="12" wrap>
                        {skill.images.map((image: ImageItem, index: number) => (
                          <Flex
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Flex>
                        ))}
                      </Flex>
                    )}
                    </Column>
                  </RevealFx>
                ))}
              </Column>
            </>
          )}
        </Column>
      </Flex>
    </Column>
  );
}