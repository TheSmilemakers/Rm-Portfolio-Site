'use client';

import { Column, Heading, Text, RevealFx, LetterFx } from "@once-ui-system/core";
import { work } from "@/resources";
import { PageWrapper } from "@/components/PageWrapper";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface WorkPageClientProps {
  children: React.ReactNode;
}

export default function WorkPageClient({ children }: WorkPageClientProps) {
  const reducedMotion = useReducedMotion();
  
  return (
    <PageWrapper showBackground={true} showParticles={false}>
      <Column fillWidth gap="xl">
        {/* Hero Section */}
        <Column fillWidth gap="l" paddingBottom="xl" align="center">
          <RevealFx >
            <LetterFx speed="medium" trigger="instant" >
              <Heading variant="display-strong-xl" align="center">
                {work.title}
              </Heading>
            </LetterFx>
          </RevealFx>
          
          <RevealFx delay={0.2} >
            <Column maxWidth="m" horizontal="center">
              <Text 
                variant="heading-default-l" 
                onBackground="neutral-medium"
                align="center"
              >
                {work.description}
              </Text>
            </Column>
          </RevealFx>
        </Column>
        
        {/* Projects Grid */}
        <RevealFx delay={0.3} >
          {children}
        </RevealFx>
      </Column>
    </PageWrapper>
  );
}