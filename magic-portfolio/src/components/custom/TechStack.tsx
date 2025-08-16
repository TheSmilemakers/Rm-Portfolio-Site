"use client";

import { Grid, Card, Heading, Text, Column, RevealFx } from "@once-ui-system/core";
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker } from "react-icons/fa";
import { SiNextdotjs, SiTensorflow, SiOpenai, SiKubernetes, SiPostgresql } from "react-icons/si";

const technologies = [
  { icon: SiNextdotjs, name: "Next.js", category: "Frontend" },
  { icon: FaReact, name: "React", category: "Frontend" },
  { icon: FaNodeJs, name: "Node.js", category: "Backend" },
  { icon: FaPython, name: "Python", category: "AI/ML" },
  { icon: SiTensorflow, name: "TensorFlow", category: "AI/ML" },
  { icon: SiOpenai, name: "OpenAI", category: "AI/ML" },
  { icon: FaAws, name: "AWS", category: "Cloud" },
  { icon: FaDocker, name: "Docker", category: "DevOps" },
  { icon: SiKubernetes, name: "Kubernetes", category: "DevOps" },
  { icon: SiPostgresql, name: "PostgreSQL", category: "Database" },
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
            <RevealFx key={tech.name} delay={index * 0.05}>
              <Card 
                padding="m" 
                background="neutral-alpha-weak"
                className="tech-card glass-effect"
                style={{ textAlign: "center", height: "100%" }}
                radius="l"
                border="neutral-alpha-medium"
              >
                <Column gap="s" horizontal="center">
                  <Icon size={32} className="tech-icon" />
                  <Text variant="label-default-s">
                    {tech.name}
                  </Text>
                  <Text variant="label-default-xs" onBackground="neutral-weak">
                    {tech.category}
                  </Text>
                </Column>
              </Card>
            </RevealFx>
          );
        })}
      </Grid>
    </Column>
  );
}