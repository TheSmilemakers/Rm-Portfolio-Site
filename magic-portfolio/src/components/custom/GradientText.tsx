'use client';

import React, { useEffect, useRef } from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientText({ children, className = '' }: GradientTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textRef.current) {
      // Apply gradient styles directly via JavaScript as a fallback
      const element = textRef.current;
      element.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
      element.style.webkitBackgroundClip = 'text';
      element.style.webkitTextFillColor = 'transparent';
      element.style.backgroundClip = 'text';
      element.style.color = 'transparent';
      element.style.display = 'inline-block';
      element.style.fontWeight = '800';
    }
  }, []);

  return (
    <span ref={textRef} className={`gradient-text ${className}`}>
      {children}
    </span>
  );
}