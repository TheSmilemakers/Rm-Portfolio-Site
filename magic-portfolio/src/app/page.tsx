import React from "react";
import { 
  Heading, 
  Flex, 
  Text, 
  Button, 
  Avatar, 
  RevealFx, 
  Column, 
  Badge, 
  Row, 
  Meta, 
  Schema,
  Grid,
  Card,
  LetterFx,
  Particle,
  Background
} from "@once-ui-system/core";
import { home, about, person, newsletter, baseURL, routes } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import { TechStack } from "@/components/custom/TechStack";
import { AnimatedMetrics } from "@/components/custom/AnimatedMetrics";

export default function Home() {
  return (
    <Column fillWidth gap="xl">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      {/* Hero Section - Enhanced with Once UI effects */}
      <Column 
        fillWidth 
        gap="l"
        className="hero-section"
        paddingTop="80"
        paddingBottom="xl"
        vertical="center"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "calc(100vh - 160px)"
        }}
      >
        {/* Interactive Particle Background - Replaces animated mesh */}
        <Particle
          fill
          interactive
          speed={3}
          density={200}
          color="brand-background-strong"
          interactionRadius={100}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0
          }}
        />
        
        <Column fillWidth maxWidth="l" horizontal="center" style={{ position: "relative", zIndex: 1 }}>
          {home.featured.display && (
            <RevealFx fillWidth horizontal="center" paddingTop="16" paddingBottom="32">
              <Badge 
                background="accent-alpha-weak" 
                paddingX="12" 
                paddingY="4" 
                onBackground="accent-strong" 
                textVariant="label-default-s" 
                arrow={false}
                href={home.featured.href}
                className="badge-featured glow-hover"
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <LetterFx 
              speed="medium" 
              trigger="instant"
            >
              <Heading 
                wrap="balance" 
                variant="display-strong-l"
                className="gradient-text hero-title"
                align="center"
              >
                {home.headline}
              </Heading>
            </LetterFx>
          </RevealFx>
          
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text 
              wrap="balance" 
              onBackground="neutral-weak" 
              variant="heading-default-xl"
              className="hero-subtitle"
              align="center"
            >
              {home.subline}
            </Text>
          </RevealFx>
          
          <RevealFx paddingTop="12" delay={0.4} horizontal="center">
            <Row gap="m">
              <Button
                id="work"
                href="/work"
                variant="primary"
                size="l"
                weight="strong"
                arrowIcon
              >
                View My Work
              </Button>
              <Button
                id="about"
                href={about.path}
                variant="secondary"
                size="l"
                weight="default"
                arrowIcon
              >
                About Me
              </Button>
            </Row>
          </RevealFx>
        </Column>
      </Column>

      {/* Animated Metrics Section */}
      <RevealFx translateY="16" delay={0.5}>
        <AnimatedMetrics />
      </RevealFx>

      {/* Featured Projects */}
      <RevealFx translateY="16" delay={0.6}>
        <Column gap="l" fillWidth>
          <Heading as="h2" variant="display-strong-s" paddingLeft="l">
            Featured Projects
          </Heading>
          <Projects range={[1, 3]} />
        </Column>
      </RevealFx>

      {/* Tech Stack */}
      <RevealFx translateY="16" delay={0.7}>
        <TechStack />
      </RevealFx>

      {/* Latest Insights */}
      {routes["/blog"] && (
        <RevealFx translateY="16" delay={0.8}>
          <Flex fillWidth gap="24" mobileDirection="column">
            <Flex flex={1} paddingLeft="l" paddingTop="24">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                Latest Insights
              </Heading>
            </Flex>
            <Flex flex={3} paddingX="20">
              <Posts range={[1, 3]} columns="3" />
            </Flex>
          </Flex>
        </RevealFx>
      )}

      {/* CTA Section */}
      <RevealFx translateY="16" delay={0.9}>
        <Card 
          fillWidth 
          padding="xl" 
          background="brand-alpha-weak"
          className="cta-card glass-effect"
          style={{ textAlign: "center" }}
          radius="l"
          border="brand-alpha-medium"
        >
          <Column gap="m" horizontal="center">
            <Heading variant="display-strong-s">
              Let&apos;s Build Something Extraordinary
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak">
              Whether you&apos;re looking to revolutionize healthcare, automate complex systems, 
              or push the boundaries of AI – I&apos;m ready to help.
            </Text>
            <Button
              href="mailto:hello@rajanmaher.com"
              variant="primary"
              size="l"
              className="button-3d"
            >
              Start a Conversation
            </Button>
          </Column>
        </Card>
      </RevealFx>
    </Column>
  );
}