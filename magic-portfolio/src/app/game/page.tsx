'use client';

import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { Column, RevealFx, Heading, Text, Row, Icon, Flex, Button, Badge, LetterFx } from '@once-ui-system/core';
import { GameFrame } from '@/components/game/GameFrame';
import { game, baseURL } from '@/resources';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function GamePage() {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [showRotatePrompt, setShowRotatePrompt] = useState(false);
  const [viewportHeight, setViewportHeight] = useState('100vh');
  const reducedMotion = useReducedMotion();
  
  useEffect(() => {
    const checkOrientation = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      setOrientation(isPortrait ? 'portrait' : 'landscape');
      // Only show rotate prompt on mobile devices
      const isMobile = window.innerWidth < 768;
      setShowRotatePrompt(isPortrait && isMobile);
    };
    
    const updateHeight = () => {
      // Account for mobile browser chrome
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      setViewportHeight(`${window.innerHeight}px`);
    };
    
    checkOrientation();
    updateHeight();
    
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', checkOrientation);
    
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);
  
  return (
    <Column fillWidth align="center" style={{ minHeight: viewportHeight }}>
      {/* Mobile-optimized header - hide on landscape mobile */}
      <Column 
        fillWidth 
        gap="m" 
        paddingX="l"
        paddingTop="m"
        paddingBottom="m"
        style={{ 
          display: orientation === 'landscape' && window.innerWidth < 768 ? 'none' : 'flex' 
        }}
      >
        {reducedMotion ? (
          <Heading 
            variant="display-strong-l"
            align="center"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
          >
            Galactic Hustle
          </Heading>
        ) : (
          <RevealFx>
            <LetterFx speed="medium" trigger="instant">
              <Heading 
                variant="display-strong-l"
                align="center"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
              >
                Galactic Hustle
              </Heading>
            </LetterFx>
          </RevealFx>
        )}
        
        {reducedMotion ? (
          <Text 
            variant="body-default-m" 
            onBackground="neutral-medium"
            align="center"
            style={{ maxWidth: '600px', margin: '0 auto' }}
          >
            Navigate the cosmos as a space trader. Buy low, sell high, and build your empire.
          </Text>
        ) : (
          <RevealFx delay={0.1}>
            <Text 
              variant="body-default-m" 
              onBackground="neutral-medium"
              align="center"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Navigate the cosmos as a space trader. Buy low, sell high, and build your empire.
            </Text>
          </RevealFx>
        )}
        
        {reducedMotion ? (
          <Row gap="s" wrap horizontal="center">
            <Badge background="accent-alpha-weak">Strategy</Badge>
            <Badge background="brand-alpha-weak">30 Days</Badge>
            <Badge background="success-alpha-weak">Trading</Badge>
          </Row>
        ) : (
          <RevealFx delay={0.2}>
            <Row gap="s" wrap horizontal="center">
              <Badge background="accent-alpha-weak">Strategy</Badge>
              <Badge background="brand-alpha-weak">30 Days</Badge>
              <Badge background="success-alpha-weak">Trading</Badge>
            </Row>
          </RevealFx>
        )}
      </Column>
      
      {/* Game container with mobile optimization */}
      <Column fillWidth flex={1} position="relative">
        {showRotatePrompt && (
          <Flex
            position="absolute"
            fillWidth
            fillHeight
            background="surface"
            style={{ zIndex: 100 }}
            horizontal="center"
            vertical="center"
          >
            <Column gap="m" align="center" padding="xl">
              <Icon name="rotate" size="xl" onBackground="brand-medium" />
              <Heading variant="heading-strong-l">
                Please rotate your device
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-medium" align="center">
                This game is best played in landscape mode for the full experience
              </Text>
              <Button
                variant="secondary"
                size="m"
                onClick={() => setShowRotatePrompt(false)}
              >
                Play Anyway
              </Button>
            </Column>
          </Flex>
        )}
        
        <GameFrame />
      </Column>
      
      {/* Mobile controls - show only on portrait mobile */}
      {orientation === 'portrait' && window.innerWidth < 768 && (
        <Row 
          fillWidth 
          gap="m" 
          padding="m"
          style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom))' }}
        >
          <Button 
            fillWidth 
            variant="primary"
            size="l"
            style={{ minHeight: '48px' }}
          >
            Play Game
          </Button>
          <Button 
            fillWidth 
            variant="secondary"
            size="l"
            style={{ minHeight: '48px' }}
          >
            Instructions
          </Button>
        </Row>
      )}
    </Column>
  );
}