'use client';

import { Column, Particle, Background } from '@once-ui-system/core';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import classNames from 'classnames';

interface PageWrapperProps {
  children: React.ReactNode;
  showParticles?: boolean;
  showBackground?: boolean;
  maxWidth?: 's' | 'm' | 'l' | 'xl';
  className?: string;
}

export const PageWrapper = ({ 
  children, 
  showParticles = true,
  showBackground = true,
  maxWidth = 'xl',
  className
}: PageWrapperProps) => {
  const reducedMotion = useReducedMotion();
  
  return (
    <Column fillWidth position="relative" style={{ minHeight: '100vh' }} className={classNames(className)}>
      {showBackground && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: 'none'
        }}>
          <Background
            gradient={{ display: true, opacity: 20, colorStart: "brand-background-weak", colorEnd: "page" }}
            dots={{ display: true, opacity: 10, size: "2" as any, color: "brand-background-strong" }}
            mask={{ cursor: true, radius: 100, x: 0, y: 0 }}
          />
        </div>
      )}
      
      {showParticles && !reducedMotion && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0
        }}>
          <Particle
            fill
            interactive
            speed={3}
            density={400}
            color="brand-background-strong"
            opacity={80}
            size="2"
            interactionRadius={120}
          />
        </div>
      )}
      
      <Column 
        fillWidth 
        maxWidth={maxWidth}
        horizontal="center"
        paddingTop="104" 
        paddingBottom="xl" 
        paddingX="l"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {children}
      </Column>
    </Column>
  );
};