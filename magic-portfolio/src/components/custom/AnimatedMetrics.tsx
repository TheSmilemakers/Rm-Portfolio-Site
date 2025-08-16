"use client";

import { useEffect, useState } from "react";
import { Grid, Card, Heading, Text, Column } from "@once-ui-system/core";

const metrics = [
  { label: "Healthcare Lives Impacted", value: 50000, suffix: "+" },
  { label: "Automation Hours Saved", value: 100000, suffix: "+" },
  { label: "Trading Algorithm ROI", value: 20, suffix: "%" },
  { label: "Systems Deployed", value: 25, suffix: "" },
];

export function AnimatedMetrics() {
  const [counts, setCounts] = useState(metrics.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a small delay to ensure component is mounted
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const duration = 2000;
    const steps = 60;
    const increment = metrics.map(m => m.value / steps);
    let currentStep = 0;

    const animationTimer = setInterval(() => {
      if (currentStep < steps) {
        setCounts(prev => prev.map((c, i) => 
          Math.min(c + increment[i], metrics[i].value)
        ));
        currentStep++;
      } else {
        clearInterval(animationTimer);
      }
    }, duration / steps);

    return () => {
      clearTimeout(visibilityTimer);
      clearInterval(animationTimer);
    };
  }, []);

  if (!isVisible) {
    return (
      <Grid columns="4" gap="m" fillWidth>
        {metrics.map((metric) => (
          <Card 
            key={metric.label} 
            padding="l" 
            background="neutral-alpha-weak"
            className="metric-card glass-effect"
            style={{ minHeight: '120px' }}
            radius="l"
            border="neutral-alpha-medium"
          >
            <Column gap="xs">
              <div className="loading" style={{ height: '40px' }} />
              <Text variant="label-default-s" onBackground="neutral-weak">
                {metric.label}
              </Text>
            </Column>
          </Card>
        ))}
      </Grid>
    );
  }

  return (
    <Grid columns="4" gap="m" fillWidth>
      {metrics.map((metric, index) => (
        <Card 
          key={metric.label} 
          padding="l" 
          background="neutral-alpha-weak"
          className="metric-card glass-effect"
          style={{ minHeight: '120px' }}
          radius="l"
          border="neutral-alpha-medium"
        >
          <Column gap="xs">
            <Heading 
              variant="display-strong-m" 
              className="metric-number"
              style={{ 
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                lineHeight: '1.2',
                fontWeight: '700'
              }}
            >
              {Math.floor(counts[index]).toLocaleString()}{metric.suffix}
            </Heading>
            <Text 
              variant="label-default-s" 
              onBackground="neutral-weak"
              style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
            >
              {metric.label}
            </Text>
          </Column>
        </Card>
      ))}
    </Grid>
  );
}