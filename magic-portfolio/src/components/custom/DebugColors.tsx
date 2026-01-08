'use client';

import React, { useEffect, useState } from 'react';
import { Column, Text, Row, Card } from '@once-ui-system/core';

export function DebugColors() {
  const [cssVars, setCssVars] = useState<Record<string, string>>({});

  useEffect(() => {
    const root = document.documentElement;
    const computedStyles = getComputedStyle(root);
    const colorVars: Record<string, string> = {};

    // Get all CSS variables
    const allProps = Array.from(computedStyles).filter(prop => prop.startsWith('--'));
    
    // Filter for brand and accent colors
    const relevantProps = allProps.filter(prop => 
      prop.includes('brand') || prop.includes('accent') || prop.includes('yellow') || prop.includes('orange')
    );

    relevantProps.forEach(prop => {
      colorVars[prop] = computedStyles.getPropertyValue(prop).trim();
    });

    setCssVars(colorVars);
  }, []);

  return (
    <Card padding="l" margin="l">
      <Column gap="m">
        <Text variant="heading-strong-l">CSS Color Variables Debug</Text>
        <Column gap="s">
          {Object.entries(cssVars).map(([key, value]) => (
            <Row key={key} gap="m" style={{ fontFamily: 'monospace', fontSize: '12px' }}>
              <Text style={{ minWidth: '300px' }}>{key}:</Text>
              <Row gap="s">
                <Text>{value}</Text>
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  backgroundColor: value, 
                  border: '1px solid #ccc' 
                }} />
              </Row>
            </Row>
          ))}
        </Column>
        {Object.keys(cssVars).length === 0 && (
          <Text onBackground="neutral-weak">Loading CSS variables...</Text>
        )}
      </Column>
    </Card>
  );
}