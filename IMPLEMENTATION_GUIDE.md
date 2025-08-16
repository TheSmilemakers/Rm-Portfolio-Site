# Once UI Portfolio Enhancement Implementation Guide

This guide provides exact code implementations for enhancing your portfolio based on the deep analysis of Once UI best practices and theme/font systems.

## Table of Contents
1. [Once UI Component Enhancements](#once-ui-component-enhancements)
2. [Theme & Font System Improvements](#theme--font-system-improvements)
3. [Implementation Order & Testing](#implementation-order--testing)

---

## Once UI Component Enhancements

### 1. Enhanced Hero Section with Background Effects

**File: `src/app/page.tsx`**

Replace the hero section (lines 42-122) with:

```tsx
import { 
  Heading, 
  Flex, 
  Text, 
  Button, 
  Avatar, 
  RevealFx, 
  Column, 
  Badge, 
  Row, 
  Meta, 
  Schema,
  Grid,
  Card,
  Background,     // Add this import
  Particle,       // Add this import
  LetterFx,       // Add this import
  Icon           // Add this import
} from "@once-ui-system/core";

// Inside the Home component, replace the hero section:
{/* Hero Section - Enhanced with Background and Particle effects */}
<Column 
  fillWidth 
  paddingY="48" 
  gap="l"
  className="hero-section"
  style={{
    position: "relative",
    overflow: "hidden"
  }}
>
  {/* Rich background effects */}
  <Background
    fill
    position="absolute"
    gradient={{
      display: true,
      x: 50,
      y: -25,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
      opacity: 50
    }}
    dots={{
      display: true,
      size: "2",
      color: "brand-on-background-weak",
      opacity: 20
    }}
    mask={{
      cursor: true,
      radius: 100
    }}
  />
  
  {/* Interactive particles */}
  <Particle
    fill
    interactive
    speed={0.3}
    interactionRadius={100}
    color="brand-on-background-weak"
    opacity={30}
    style={{ position: "absolute", zIndex: 0 }}
  />
  
  {/* Keep existing animated mesh */}
  <div className="animated-mesh" />
  
  <Column maxWidth="s" style={{ position: "relative", zIndex: 1 }}>
    {home.featured.display && (
      <RevealFx fillWidth horizontal="start" paddingTop="16" paddingBottom="32" paddingLeft="12">
        <Badge 
          background="accent-alpha-weak" 
          paddingX="12" 
          paddingY="4" 
          onBackground="accent-strong" 
          textVariant="label-default-s" 
          arrow={false}
          href={home.featured.href}
          className="badge-featured glow-hover"
          effect={true}  // Enable hover effect
        >
          <Row paddingY="2">{home.featured.title}</Row>
        </Badge>
      </RevealFx>
    )}
    
    <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="16">
      <Heading 
        wrap="balance" 
        variant="display-strong-l"
        className="gradient-text hero-title"
      >
        <LetterFx
          speed="medium"
          trigger="hover"
          charset="01">
          {home.headline}
        </LetterFx>
      </Heading>
    </RevealFx>
    
    <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="32">
      <Text 
        wrap="balance" 
        onBackground="neutral-weak" 
        variant="heading-default-xl"
        className="hero-subtitle"
      >
        {home.subline}
      </Text>
    </RevealFx>
    
    <RevealFx paddingTop="12" delay={0.4} horizontal="start" paddingLeft="12">
      <Flex gap="16">
        <Button
          id="work"
          data-border="rounded"
          href="/work"
          variant="primary"
          size="l"
          weight="strong"
          className="magnetic-button"
          arrowIcon  // Add arrow animation
          effect     // Enable hover effects
        >
          <Flex gap="8" vertical="center">
            <Icon name="rocket" size="s" decorative={false} />
            View My Work
          </Flex>
        </Button>
        <Button
          id="about"
          data-border="rounded"
          href={about.path}
          variant="secondary"
          size="l"
          weight="default"
          arrowIcon
          className="magnetic-button"
          effect
        >
          <Flex gap="8" vertical="center">
            <Icon name="person" size="s" decorative={false} />
            About Me
          </Flex>
        </Button>
      </Flex>
    </RevealFx>
  </Column>
</Column>
```

### 2. Enhanced AnimatedMetrics Component

**File: `src/components/custom/AnimatedMetrics.tsx`**

Replace the entire component with:

```tsx
"use client";

import { useState, useEffect } from 'react';
import { Grid, Card, Text, Column, Skeleton, CountFx, GlitchFx } from '@once-ui-system/core';

interface Metric {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export function AnimatedMetrics() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const metrics: Metric[] = [
    { label: "Healthcare Lives Impacted", value: 50000, suffix: "+" },
    { label: "Automation Hours Saved", value: 100000, suffix: "+" },
    { label: "Trading Algorithm ROI", value: 20, suffix: "%" },
    { label: "Systems Deployed", value: 25 }
  ];

  if (!isLoaded) {
    return (
      <Grid 
        columns="4" 
        l={{ columns: "2" }}
        s={{ columns: "1" }}
        gap="m" 
        fillWidth
      >
        {[1, 2, 3, 4].map((i) => (
          <Column key={i} gap="m">
            <Skeleton shape="line" width="l" height="s" delay={`${i}`} />
            <Skeleton shape="block" width="xl" height="m" delay={`${i}`} />
          </Column>
        ))}
      </Grid>
    );
  }

  return (
    <Grid 
      columns="4" 
      l={{ columns: "2" }}
      s={{ columns: "1" }}
      gap="m" 
      fillWidth
    >
      {metrics.map((metric, index) => (
        <Card 
          key={metric.label}
          padding="l" 
          background="surface"
          className="metric-card hover-lift"
        >
          <Column gap="s">
            <Text 
              variant="label-default-s" 
              onBackground="neutral-weak"
            >
              {metric.label}
            </Text>
            <GlitchFx speed="slow">
              <CountFx
                variant="display-strong-m"
                value={metric.value}
                speed={2000}
                effect="wheel"
                separator=","
                easing="ease-out"
                className="metric-number"
              >
                {metric.prefix}
                {metric.value}
                {metric.suffix}
              </CountFx>
            </GlitchFx>
          </Column>
        </Card>
      ))}
    </Grid>
  );
}
```

### 3. Enhanced TechStack Component

**File: `src/components/custom/TechStack.tsx`**

Replace with:

```tsx
"use client";

import { Grid, Card, Column, Heading, Text, RevealFx, TiltFx, HoloFx } from '@once-ui-system/core';
import { 
  FaReact, FaNodeJs, FaPython, FaDocker, FaAws,
  FaJava, FaGitAlt, FaLinux, FaDatabase
} from 'react-icons/fa';
import { 
  SiTypescript, SiTensorflow, SiMongodb, SiPostgresql,
  SiKubernetes, SiNextdotjs, SiGooglecloud, SiOpenai,
  SiPytorch, SiRedis
} from 'react-icons/si';

const technologies = [
  { name: "React/Next.js", icon: FaReact, category: "Frontend" },
  { name: "TypeScript", icon: SiTypescript, category: "Frontend" },
  { name: "Node.js", icon: FaNodeJs, category: "Backend" },
  { name: "Python", icon: FaPython, category: "Backend" },
  { name: "TensorFlow", icon: SiTensorflow, category: "AI/ML" },
  { name: "PyTorch", icon: SiPytorch, category: "AI/ML" },
  { name: "AWS", icon: FaAws, category: "Cloud" },
  { name: "Docker", icon: FaDocker, category: "DevOps" },
  { name: "Kubernetes", icon: SiKubernetes, category: "DevOps" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "Database" }
];

export function TechStack() {
  return (
    <Column gap="l" fillWidth>
      <RevealFx>
        <Heading 
          as="h2" 
          variant="display-strong-s" 
          paddingLeft="l"
        >
          Tech Stack
        </Heading>
      </RevealFx>
      
      <Grid 
        columns="5" 
        l={{ columns: "4" }}
        m={{ columns: "3" }}
        s={{ columns: "2" }}
        gap="m" 
        fillWidth
      >
        {technologies.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <RevealFx key={tech.name} delay={index * 0.05}>
              <TiltFx>
                <HoloFx
                  shine={{ opacity: 20, blending: "color-dodge" }}
                  burn={{ opacity: 10, blending: "color-dodge" }}
                >
                  <Card 
                    padding="l" 
                    background="surface"
                    className="tech-card"
                    radius="l"
                    style={{ height: '100%' }}
                  >
                    <Column gap="s" horizontal="center" vertical="center">
                      <Icon size={32} className="tech-icon" />
                      <Text 
                        variant="label-default-s" 
                        align="center"
                      >
                        {tech.name}
                      </Text>
                      <Text 
                        variant="body-default-xs" 
                        onBackground="neutral-weak"
                        align="center"
                      >
                        {tech.category}
                      </Text>
                    </Column>
                  </Card>
                </HoloFx>
              </TiltFx>
            </RevealFx>
          );
        })}
      </Grid>
    </Column>
  );
}
```

### 4. Enhanced Projects Component

**File: `src/components/work/Projects.tsx`**

Add Scroller for horizontal scrolling:

```tsx
import { Scroller, Skeleton } from '@once-ui-system/core';

// Inside the Projects component, wrap the grid with Scroller for mobile:
return (
  <>
    {/* Desktop Grid View */}
    <Grid 
      columns="3" 
      m={{ columns: "2" }}
      s={{ display: "none" }}  // Hide on mobile
      gap="m" 
      fillWidth
    >
      {displayedProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </Grid>

    {/* Mobile Scroller View */}
    <Scroller 
      fadeColor="transparent"
      s={{ display: "flex" }}
      m={{ display: "none" }}
      l={{ display: "none" }}
    >
      <Row gap="16">
        {displayedProjects.map((project) => (
          <div key={project.id} style={{ minWidth: '280px' }}>
            <ProjectCard project={project} />
          </div>
        ))}
      </Row>
    </Scroller>
  </>
);
```

### 5. Add StyleOverlay to Header

**File: `src/components/Header.tsx`**

Add after the ThemeToggle:

```tsx
import { StyleOverlay, IconButton } from '@once-ui-system/core';

// Inside the navigation row, after ThemeToggle:
{display.themeSwitcher && (
  <>
    <NavItem>
      <Flex fillWidth horizontal="center">
        <Line height="20" background="neutral-alpha-weak" />
      </Flex>
    </NavItem>
    <NavItem>
      <ThemeToggle/>
    </NavItem>
    <NavItem>
      <StyleOverlay>
        <IconButton 
          icon="sparkle" 
          size="s"
          variant="ghost"
          tooltip="Customize styles"
          tooltipPosition="bottom"
        />
      </StyleOverlay>
    </NavItem>
  </>
)}
```

---

## Theme & Font System Improvements

### 1. Enhanced Theme Transition System

**File: `src/components/ThemeTransition.tsx`** (Create new file)

```tsx
"use client";

import { useEffect, useState } from 'react';
import styles from './ThemeTransition.module.scss';

interface ThemeTransitionProps {
  children: React.ReactNode;
}

export function ThemeTransition({ children }: ThemeTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && 
            mutation.attributeName === 'data-theme') {
          setIsTransitioning(true);
          setTimeout(() => setIsTransitioning(false), 300);
        }
      });
    });
    
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    });
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div className={`${styles.container} ${isTransitioning ? styles.transitioning : ''}`}>
      {children}
    </div>
  );
}
```

**File: `src/components/ThemeTransition.module.scss`** (Create new file)

```scss
.container {
  contain: layout style paint;
}

.transitioning * {
  transition: 
    background-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
    border-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
    color 300ms cubic-bezier(0.4, 0, 0.2, 1) !important;
}
```

### 2. Enhanced Custom CSS

**File: `src/resources/custom.css`**

Add these sections to your existing custom.css:

```css
/* ===== ENHANCED THEME COLORS ===== */

/* Warm Dark Theme with Better Contrast */
[data-theme="dark"] {
  /* Custom warm dark backgrounds */
  --page-background-custom: #1a1614;
  --surface-background-custom: #201c19;
  
  /* Enhanced brand colors for dark mode */
  --brand-400-enhanced: #fbbf24;
  --brand-500-enhanced: #f59e0b;
  --accent-400-enhanced: #fb923c;
  --accent-500-enhanced: #f97316;
  
  /* Improved text contrast */
  --text-primary-enhanced: rgba(251, 241, 199, 0.95);
  --text-secondary-enhanced: rgba(251, 241, 199, 0.75);
  --text-tertiary-enhanced: rgba(251, 241, 199, 0.55);
  
  /* Dynamic shadows */
  --shadow-color: 40deg 20% 5%;
  --shadow-strength: 0.3;
}

/* Softer Light Theme */
[data-theme="light"] {
  /* Warm light backgrounds */
  --page-background-custom: #fffbf5;
  --surface-background-custom: #fff8ee;
  
  /* Deeper colors for light mode */
  --brand-600-enhanced: #d97706;
  --brand-700-enhanced: #b45309;
  --accent-600-enhanced: #ea580c;
  --accent-700-enhanced: #c2410c;
  
  /* Dynamic shadows */
  --shadow-color: 40deg 10% 50%;
  --shadow-strength: 0.1;
}

/* ===== TYPOGRAPHY ENHANCEMENTS ===== */

/* Variable font weights */
:root {
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-black: 800;
}

/* Theme-specific font weights */
[data-theme="dark"] {
  --heading-weight: var(--font-weight-bold);
  --body-weight: var(--font-weight-regular);
  --label-weight: var(--font-weight-medium);
}

[data-theme="light"] {
  --heading-weight: var(--font-weight-black);
  --body-weight: var(--font-weight-medium);
  --label-weight: var(--font-weight-semibold);
}

/* Better font rendering */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-feature-settings: "kern" 1, "liga" 1;
}

/* Responsive font scaling based on data-scaling */
[data-scaling="90"] {
  --font-scale: 0.9;
}

[data-scaling="95"] {
  --font-scale: 0.95;
}

[data-scaling="100"] {
  --font-scale: 1;
}

[data-scaling="105"] {
  --font-scale: 1.05;
}

[data-scaling="110"] {
  --font-scale: 1.1;
}

/* Apply scaling to typography */
[data-scaling] h1,
[data-scaling] h2,
[data-scaling] h3,
[data-scaling] h4,
[data-scaling] h5,
[data-scaling] h6 {
  font-size: calc(1em * var(--font-scale, 1));
}

/* ===== SEMANTIC COLOR TOKENS ===== */

:root {
  /* Interactive states */
  --color-interactive-hover: var(--brand-500);
  --color-interactive-active: var(--brand-600);
  --color-interactive-disabled: var(--neutral-300);
  
  /* Focus states */
  --color-focus-ring: var(--brand-400);
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
}

/* ===== ACCESSIBILITY ENHANCEMENTS ===== */

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Focus visible for keyboard navigation */
:focus-visible {
  outline: var(--focus-ring-width) solid var(--color-focus-ring);
  outline-offset: var(--focus-ring-offset);
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ===== PERFORMANCE OPTIMIZATIONS ===== */

/* Prevent layout shift during theme change */
html[data-theme-loading] * {
  transition: none !important;
}

/* GPU acceleration for animations */
.magnetic-button,
.hover-lift,
.tech-card,
.metric-card {
  will-change: transform;
  transform: translateZ(0);
}

/* ===== ENHANCED GRADIENTS ===== */

/* Smoother gradient text for both themes */
[data-theme="dark"] .gradient-text {
  background: linear-gradient(
    135deg, 
    var(--brand-400-enhanced, var(--brand-400)) 0%, 
    var(--accent-400-enhanced, var(--accent-400)) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: var(--heading-weight);
}

[data-theme="light"] .gradient-text {
  background: linear-gradient(
    135deg, 
    var(--brand-600-enhanced, var(--brand-600)) 0%, 
    var(--accent-600-enhanced, var(--accent-600)) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: var(--heading-weight);
}
```

### 3. Enhanced ThemeToggle Component

**File: `src/components/ThemeToggle.tsx`**

Replace with enhanced version:

```tsx
"use client";

import { useState, useEffect } from 'react';
import { ToggleButton } from '@once-ui-system/core';
import { useTheme } from '@once-ui-system/core';
import styles from './ThemeToggle.module.scss';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    
    // Monitor system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        announceThemeChange(newTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const announceThemeChange = (theme: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Theme changed to ${theme} mode`;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  };

  if (!mounted) {
    return <div className={styles.placeholder} />;
  }

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

  const handleToggle = () => {
    // Add loading state to prevent transition during initial change
    document.documentElement.setAttribute('data-theme-loading', 'true');
    
    setTheme(nextTheme);
    announceThemeChange(nextTheme);
    
    // Remove loading state after a brief delay
    setTimeout(() => {
      document.documentElement.removeAttribute('data-theme-loading');
    }, 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <ToggleButton
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      role="switch"
      aria-checked={currentTheme === 'dark'}
      aria-label={`Switch to ${nextTheme} mode. Currently in ${currentTheme} mode.`}
      className={styles.themeToggle}
      selected={false}
    >
      {currentTheme === 'light' ? '🌙' : '☀️'}
    </ToggleButton>
  );
}
```

### 4. Update Layout with ThemeTransition

**File: `src/app/layout.tsx`**

Import and wrap children with ThemeTransition:

```tsx
import { ThemeTransition } from '@/components/ThemeTransition';

// Inside the layout, wrap the main content:
<Providers>
  <Column as="body" background="page" fillWidth style={{minHeight: "100vh"}} margin="0" padding="0" horizontal="center">
    <ThemeTransition>
      <Background
        effects={effects}
        data-viz-style={dataStyle.variant}
        data-viz-color-mode={dataStyle.mode}
      />
      <Column fillWidth minHeight="16">
        <RouteGuard>
          <Column fillWidth paddingX="l" maxWidth="xl" horizontal="center">
            <Header />
            <Column
              as="main"
              fillWidth
              paddingTop="xl"
              paddingBottom="xl"
              gap="l"
              horizontal="center">
              {children}
            </Column>
            <Footer />
          </Column>
        </RouteGuard>
      </Column>
    </ThemeTransition>
  </Column>
</Providers>
```

### 5. Font Preloading (Optional)

**File: `src/app/layout.tsx`**

Add in the head section:

```tsx
<head>
  {/* Existing script */}
  <link
    rel="preload"
    href="/_next/static/media/space-grotesk-latin-400.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
  <link
    rel="preload"
    href="/_next/static/media/space-grotesk-latin-700.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
</head>
```

---

## Implementation Order & Testing

### Phase 1: Theme & Font Improvements (1-2 hours)
1. Add enhanced custom CSS
2. Create ThemeTransition component
3. Update ThemeToggle with accessibility features
4. Test theme switching thoroughly

### Phase 2: Component Enhancements (2-3 hours)
1. Update Hero section with Background and Particle effects
2. Enhance AnimatedMetrics with CountFx and GlitchFx
3. Update TechStack with TiltFx and HoloFx
4. Add Scroller to Projects for mobile
5. Add StyleOverlay to Header

### Phase 3: Testing & Optimization (1 hour)
1. Test all animations with reduced motion preference
2. Verify theme transitions are smooth
3. Check accessibility with screen readers
4. Test on multiple devices and browsers
5. Optimize performance if needed

### Testing Checklist
- [ ] Theme switching works without flash
- [ ] All animations respect prefers-reduced-motion
- [ ] Keyboard navigation works throughout
- [ ] Mobile experience is smooth
- [ ] Light/dark modes have proper contrast
- [ ] No console errors or warnings
- [ ] Performance metrics remain good

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

### Performance Considerations
- Use `will-change` sparingly
- Lazy load heavy components if needed
- Monitor bundle size with additions
- Test Core Web Vitals after implementation

---

## Troubleshooting

### Common Issues

1. **Flash of unstyled content**: Ensure theme script runs before render
2. **Animations janky**: Check GPU acceleration and will-change usage
3. **Theme not persisting**: Verify localStorage is working
4. **Fonts not loading**: Check Next.js font configuration
5. **Components not found**: Ensure all imports from @once-ui-system/core

### Debug Commands

```bash
# Check bundle size
npm run analyze

# Test production build
npm run build && npm run start

# Check for type errors
npm run type-check
```

---

This implementation guide provides exact code for all enhancements. Follow the phases in order and test thoroughly between each phase.