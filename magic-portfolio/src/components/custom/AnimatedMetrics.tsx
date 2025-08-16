"use client";

import { useEffect, useState } from "react";
import { Grid, Card, Heading, Text, Column, RevealFx, Row, Icon } from "@once-ui-system/core";

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
      <Grid 
      columns="4"
      mobileColumns="1"
      tabletColumns="2"
      gap="l" 
      fillWidth
    >
        {metrics.map((metric, index) => (
          <RevealFx
            key={metric.label}
            translateY="16"
            delay={index * 0.1}
          >
            <Card 
              padding="l" 
              background="surface"
              radius="l"
              border="neutral-alpha-weak"
            >
              <Column gap="s">
                <div className="loading" style={{ height: '40px', width: '60%' }} />
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {metric.label}
                </Text>
              </Column>
            </Card>
          </RevealFx>
        ))}
      </Grid>
    );
  }

  return (
    <Grid 
      columns="4"
      mobileColumns="1"
      tabletColumns="2"
      gap="l" 
      fillWidth
    >
      {metrics.map((metric, index) => (
        <RevealFx
          key={metric.label}
          translateY="16"
          delay={index * 0.1}
        >
          <Card 
            padding="l" 
            background="surface"
            radius="l"
            border="neutral-alpha-weak"
          >
            <Column gap="s">
              <Heading 
                variant="display-strong-m" 
                className="tabular-nums"
              >
                {Math.floor(counts[index]).toLocaleString()}{metric.suffix}
              </Heading>
              <Text 
                variant="label-default-s" 
                onBackground="neutral-weak"
              >
                {metric.label}
              </Text>
            </Column>
          </Card>
        </RevealFx>
      ))}
    </Grid>
  );
}