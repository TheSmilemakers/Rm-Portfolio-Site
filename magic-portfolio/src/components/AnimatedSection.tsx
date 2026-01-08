'use client';

import React from 'react';
import { RevealFx } from '@once-ui-system/core';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  translateY?: number;
  stagger?: boolean;
  staggerDelay?: number;
}

export const AnimatedSection = ({ 
  children, 
  delay = 0,
  translateY = 16,
  stagger = false,
  staggerDelay = 0.1
}: AnimatedSectionProps) => {
  const reducedMotion = useReducedMotion();
  
  if (reducedMotion) {
    return <>{children}</>;
  }
  
  if (stagger && React.Children.count(children) > 1) {
    return (
      <>
        {React.Children.map(children, (child, index) => (
          <RevealFx 
            key={index}
            translateY={translateY} 
            delay={delay + (index * staggerDelay)}
          >
            {child}
          </RevealFx>
        ))}
      </>
    );
  }
  
  return (
    <RevealFx translateY={translateY} delay={delay}>
      {children}
    </RevealFx>
  );
};