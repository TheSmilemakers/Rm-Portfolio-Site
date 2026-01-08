'use client';

import { useState, useEffect } from "react";
import { Column, Heading, Text, RevealFx, LetterFx, Grid, Card, Skeleton } from "@once-ui-system/core";
import { gallery } from "@/resources";
import { PageWrapper } from "@/components/PageWrapper";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface GalleryPageClientProps {
  children: React.ReactNode;
}

export default function GalleryPageClient({ children }: GalleryPageClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  const reducedMotion = useReducedMotion();
  
  useEffect(() => {
    // Simulate loading delay for skeleton effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <PageWrapper showBackground={true} showParticles={false}>
      <Column fillWidth gap="xl">
        {/* Hero Section */}
        <Column gap="m" align="center" paddingBottom="xl">
          <RevealFx >
            <LetterFx speed="medium" trigger="instant" >
              <Heading variant="display-strong-l" align="center">
                {gallery.title}
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
                {gallery.description}
              </Text>
            </Column>
          </RevealFx>
        </Column>
        
        {/* Gallery Content */}
        <RevealFx delay={0.3} >
          {isLoading ? (
            <Grid columns="3" gap="m" mobileColumns="1" tabletColumns="2">
              {[...Array(6)].map((_, i) => (
                <Card key={i} padding="0" radius="l" overflow="hidden">
                  <Skeleton 
                    shape="block"
                    aspectRatio={i % 2 === 0 ? 1 : 4/3} 
                    radius="l"
                  />
                </Card>
              ))}
            </Grid>
          ) : (
            children
          )}
        </RevealFx>
      </Column>
    </PageWrapper>
  );
}