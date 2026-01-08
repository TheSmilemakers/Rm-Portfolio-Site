'use client';

import { Column, Heading, Text, RevealFx, LetterFx } from "@once-ui-system/core";
import { blog } from "@/resources";
import { PageWrapper } from "@/components/PageWrapper";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface BlogPageClientProps {
  children: React.ReactNode;
}

export default function BlogPageClient({ children }: BlogPageClientProps) {
  const reducedMotion = useReducedMotion();
  
  return (
    <PageWrapper showBackground={true} showParticles={false}>
      <Column fillWidth gap="xl">
        {/* Hero Section */}
        <Column gap="m" align="center" paddingBottom="xl">
          <RevealFx >
            <LetterFx speed="medium" trigger="instant" >
              <Heading variant="display-strong-l" align="center">
                {blog.title}
              </Heading>
            </LetterFx>
          </RevealFx>
          <RevealFx delay={0.2} >
            <Column maxWidth="m" horizontal="center">
              <Text 
                variant="body-default-l" 
                onBackground="neutral-medium"
                align="center"
              >
                {blog.description}
              </Text>
            </Column>
          </RevealFx>
        </Column>
        
        {/* Blog Posts */}
        <RevealFx delay={0.3} >
          {children}
        </RevealFx>
      </Column>
    </PageWrapper>
  );
}