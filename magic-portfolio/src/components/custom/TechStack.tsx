"use client";

import { Grid, Card, Heading, Text, Column, RevealFx, FlipFx, HoloFx, Row } from "@once-ui-system/core";
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker } from "react-icons/fa";
import { SiNextdotjs, SiTensorflow, SiOpenai, SiKubernetes, SiPostgresql } from "react-icons/si";

const technologies = [
  { 
    icon: SiNextdotjs, 
    name: "Next.js", 
    category: "Frontend",
    description: "React framework for production-grade applications",
    experience: "5+ years"
  },
  { 
    icon: FaReact, 
    name: "React", 
    category: "Frontend",
    description: "Building interactive user interfaces",
    experience: "6+ years"
  },
  { 
    icon: FaNodeJs, 
    name: "Node.js", 
    category: "Backend",
    description: "Server-side JavaScript runtime",
    experience: "7+ years"
  },
  { 
    icon: FaPython, 
    name: "Python", 
    category: "AI/ML",
    description: "Data science and machine learning",
    experience: "8+ years"
  },
  { 
    icon: SiTensorflow, 
    name: "TensorFlow", 
    category: "AI/ML",
    description: "Deep learning and neural networks",
    experience: "4+ years"
  },
  { 
    icon: SiOpenai, 
    name: "OpenAI", 
    category: "AI/ML",
    description: "GPT integration and AI solutions",
    experience: "2+ years"
  },
  { 
    icon: FaAws, 
    name: "AWS", 
    category: "Cloud",
    description: "Cloud infrastructure and services",
    experience: "6+ years"
  },
  { 
    icon: FaDocker, 
    name: "Docker", 
    category: "DevOps",
    description: "Containerization and deployment",
    experience: "5+ years"
  },
  { 
    icon: SiKubernetes, 
    name: "Kubernetes", 
    category: "DevOps",
    description: "Container orchestration at scale",
    experience: "3+ years"
  },
  { 
    icon: SiPostgresql, 
    name: "PostgreSQL", 
    category: "Database",
    description: "Relational database management",
    experience: "7+ years"
  },
];

export function TechStack() {
  return (
    <Column gap="l" fillWidth>
      <Heading as="h2" variant="display-strong-s" paddingLeft="l">
        Technology Stack
      </Heading>
      <Grid columns="5" gap="m" fillWidth>
        {technologies.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <RevealFx 
              key={tech.name} 
              translateY="16"
              delay={index * 0.05}
            >
              <FlipFx
                flipDirection="horizontal"
                front={
                  <HoloFx
                    border="brand-alpha-weak"
                    radius="l"
                    shine={{ opacity: 30, blending: "color-dodge" }}
                    burn={{ opacity: 20, blending: "color-dodge" }}
                  >
                    <Card 
                      padding="l" 
                      background="surface"
                      style={{ 
                        textAlign: "center", 
                        height: "140px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer"
                      }}
                      radius="l"
                      border="neutral-alpha-medium"
                    >
                      <Column gap="s" horizontal="center" vertical="center">
                        <Icon size={40} style={{ color: "var(--brand-on-background-strong)" }} />
                        <Text variant="label-default-m" onBackground="neutral-strong">
                          {tech.name}
                        </Text>
                        <Text variant="label-default-xs" onBackground="neutral-weak">
                          {tech.category}
                        </Text>
                      </Column>
                    </Card>
                  </HoloFx>
                }
                back={
                  <Card 
                    padding="l" 
                    background="brand-alpha-weak"
                    style={{ 
                      height: "140px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer"
                    }}
                    radius="l"
                    border="brand-alpha-medium"
                  >
                    <Column gap="xs" horizontal="center" vertical="center">
                      <Text variant="label-default-s" onBackground="brand-strong">
                        {tech.description}
                      </Text>
                      <Text variant="label-default-xs" onBackground="brand-medium">
                        {tech.experience}
                      </Text>
                    </Column>
                  </Card>
                }
              />
            </RevealFx>
          );
        })}
      </Grid>
    </Column>
  );
}