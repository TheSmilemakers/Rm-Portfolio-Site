# Once UI Bible - Comprehensive Documentation

> The ultimate reference guide for building with Once UI Design System

## Table of Contents

1. [Introduction](#introduction)
2. [Quick Start](#quick-start)
3. [Core Concepts](#core-concepts)
4. [Layout System](#layout-system)
5. [Components](#components)
6. [Styling & Theming](#styling--theming)
7. [Animations & Effects](#animations--effects)
8. [Form Controls](#form-controls)
9. [Data Visualization](#data-visualization)
10. [Context Providers](#context-providers)
11. [Advanced Features](#advanced-features)
12. [Best Practices](#best-practices)

---

## Introduction

Once UI is an agent-first design system built for modern web applications. It provides a comprehensive set of components, layouts, and utilities designed with minimal syntax and maximum developer experience in mind.

### Key Features
- **Agent-first design**: Optimized for AI-powered development
- **Minimal syntax**: Write less code, build faster
- **Theme-aware**: Built-in dark/light mode support
- **Responsive by default**: Mobile-first approach
- **Type-safe**: Full TypeScript support
- **Accessible**: WCAG compliant components

---

## Quick Start

### Installation

#### Create a new Once UI app
```bash
npx create-once-ui-app@latest my-app
```

#### Add to existing project
```bash
npm install @once-ui-system/core
```

### Basic Setup

```tsx
// app/layout.tsx
import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';

import classNames from "classnames";
import { Column } from "@once-ui-system/core";
import { fonts } from "../resources/once-ui.config";

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <Column
      as="html"
      lang="en"
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}>
      <head>
        {/* Theme initialization script */}
      </head>
      <ThemeProvider>
        <DataThemeProvider>
          <ToastProvider>
            <IconProvider>
              <Column background="page" as="body" fillWidth>
                {children}
              </Column>
            </IconProvider>
          </ToastProvider>
        </DataThemeProvider>
      </ThemeProvider>
    </Column>
  );
}
```

---

## Core Concepts

### Layout Primitives

Once UI uses two main layout primitives:

1. **Flex**: Flexible box layout
2. **Grid**: CSS Grid layout

```tsx
// Flex example
<Flex
  fillWidth
  gap="12"
  padding="l"
  border="neutral-medium"
  background="surface"
>
  {children}
</Flex>

// Grid example
<Grid columns="3" gap="16" s={{columns: 2}}>
  {children}
</Grid>
```

### Semantic Wrappers

- **Row**: Horizontal flex container
- **Column**: Vertical flex container

```tsx
<Column fillWidth gap="16">
  <Row horizontal="between" vertical="center">
    <Text>Left content</Text>
    <Button>Right action</Button>
  </Row>
</Column>
```

### Spacing System

Once UI uses a consistent spacing system with tokens:
- `xs`, `s`, `m`, `l`, `xl`, `xxl`
- Numeric values (4, 8, 12, 16, 20, 24, etc.)

```tsx
<Column padding="l" gap="16" marginTop="24">
  {content}
</Column>
```

---

## Layout System

### Alignment

```tsx
// Basic alignment
<Column horizontal="center" vertical="center">
  {centered content}
</Column>

// Space distribution
<Row horizontal="between">
  <Logo />
  <Navigation />
  <UserMenu />
</Row>

// Shorthand
<Flex center>
  {centered content}
</Flex>
```

### Responsive Design

```tsx
// Mobile-first responsive
<Row 
  gap="16" 
  s={{direction: "column", gap: "12"}}
  m={{gap: "20"}}
>
  {responsive content}
</Row>
```

### Fill & Fit

```tsx
// Fill available space
<Column fillWidth fillHeight>
  {expanding content}
</Column>

// Fit content
<Row fit>
  {compact content}
</Row>
```

---

## Components

### Typography

#### Heading
```tsx
<Heading variant="display-strong-xl">Main Title</Heading>
<Heading variant="heading-strong-l" as="h2">Section Title</Heading>
<Heading onBackground="brand-medium">Colored Heading</Heading>
```

#### Text
```tsx
<Text variant="body-default-m" onBackground="neutral-weak">
  Body text with proper styling
</Text>
<Text align="center" wrap="balance">
  Centered, balanced text
</Text>
```

### Interactive Components

#### Button
```tsx
<Button variant="primary" size="l" arrowIcon>
  Primary Action
</Button>
<Button variant="secondary" prefixIcon="settings">
  Settings
</Button>
<Button data-border="rounded" data-solid="color">
  Custom styled
</Button>
```

#### IconButton
```tsx
<IconButton 
  icon="refresh" 
  tooltip="Refresh data"
  tooltipPosition="top"
  variant="ghost"
/>
```

### Media & Content

#### Media
```tsx
<Media
  src="/image.jpg"
  alt="Description"
  aspectRatio="16/9"
  radius="l"
  enlarge
/>

// YouTube video
<Media
  src="https://www.youtube.com/watch?v=VIDEO_ID"
  aspectRatio="16/9"
/>
```

#### Card
```tsx
<Card
  href="/details"
  padding="l"
  radius="l"
  background="surface"
  hover="lift"
>
  <Media src="/thumbnail.jpg" aspectRatio="16/9" />
  <Column gap="s" padding="m">
    <Heading variant="heading-strong-m">Card Title</Heading>
    <Text variant="body-default-s">Description</Text>
  </Column>
</Card>
```

### Navigation

#### Badge
```tsx
<Badge 
  title="New" 
  icon="sparkle"
  background="brand-alpha-weak"
  onBackground="brand-medium"
  href="/new-features"
/>
```

#### Avatar
```tsx
<Avatar 
  src="/user.jpg"
  size="l"
  statusIndicator={{ color: "green" }}
/>

// With initials
<Avatar value="JD" size="m" />
```

#### UserMenu
```tsx
<UserMenu
  name="John Doe"
  subline="john@example.com"
  avatarProps={{ src: "/avatar.jpg" }}
  dropdown={
    <Column gap="4" padding="4">
      <Option label="Settings" prefixIcon="settings" />
      <Option label="Logout" prefixIcon="logout" />
    </Column>
  }
/>
```

### Feedback

#### Toast (via useToast hook)
```tsx
const toaster = useToast();

toaster.success("Operation completed!");
toaster.error("Something went wrong");
toaster.loading("Processing...");
```

#### Feedback Component
```tsx
<Feedback
  variant="success"
  title="Success"
  description="Your changes have been saved"
  showCloseButton
/>
```

---

## Styling & Theming

### Configuration

```tsx
// once-ui.config.js
export const style = {
  theme: "dark",           // dark | light | system
  neutral: "sand",         // sand | gray | slate
  brand: "yellow",         // 13 color options
  accent: "orange",        // 13 color options
  solid: "contrast",       // color | contrast
  solidStyle: "flat",      // flat | plastic
  border: "playful",       // rounded | playful | conservative
  surface: "translucent",  // filled | translucent
  transition: "all",       // all | micro | macro
  scaling: "100"          // 90-110
};
```

### Theme Provider

```tsx
<ThemeProvider
  theme="system"
  brand="blue"
  accent="indigo"
  neutral="gray"
  solid="contrast"
  solidStyle="flat"
  border="playful"
  surface="translucent"
  transition="all"
  scaling="100"
>
  {children}
</ThemeProvider>
```

### Background Effects

```tsx
const effects = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100
  },
  gradient: {
    display: true,
    opacity: 50,
    x: 50,
    y: -25,
    width: 100,
    height: 100,
    colorStart: 'accent-background-strong',
    colorEnd: 'static-transparent'
  },
  dots: {
    display: true,
    size: 2,
    color: 'brand-on-background-weak',
    opacity: 20
  },
  lines: {
    display: false,
    color: 'neutral-alpha-weak',
    opacity: 100
  },
  grid: {
    display: false,
    color: 'neutral-alpha-weak',
    opacity: 100
  }
};
```

### Custom Styling

```tsx
// Background and text colors
<Row background="brand-medium" onBackground="brand-strong">
  Branded content
</Row>

// Solid backgrounds
<Button solid="accent-medium" onSolid="accent-strong">
  Solid button
</Button>

// Alpha backgrounds
<Card background="success-alpha-weak" border="success-alpha-medium">
  Success card
</Card>
```

---

## Animations & Effects

### RevealFx
```tsx
<RevealFx translateY="16" delay={0.2}>
  <Heading>Animated heading</Heading>
</RevealFx>
```

### LetterFx
```tsx
<LetterFx
  speed="medium"
  trigger="instant"
  charset="X$@aHz0y#?*01+"
>
  Animated text effect
</LetterFx>
```

### CountFx
```tsx
<CountFx
  variant="display-strong-m"
  value={1234}
  speed={5000}
  effect="wheel"
  easing="ease-out"
  separator=","
/>
```

### TiltFx
```tsx
<TiltFx aspectRatio={3/4} radius="l">
  <Media src="/card-image.jpg" />
  <Text>Interactive card</Text>
</TiltFx>
```

### HoloFx
```tsx
<HoloFx
  border="brand-alpha-weak"
  radius="l"
  shine={{ opacity: 30, blending: "color-dodge" }}
  burn={{ opacity: 30, blending: "color-dodge" }}
  texture={{ opacity: 10, image: "/texture.jpg" }}
>
  <Media src="/holographic.jpg" />
</HoloFx>
```

### FlipFx
```tsx
<FlipFx
  flipDirection="horizontal"
  front={<Media src="/front.jpg" />}
  back={<Text>Back content</Text>}
/>
```

### GlitchFx
```tsx
<GlitchFx fillWidth speed="medium">
  <Heading>Glitched text</Heading>
</GlitchFx>
```

### Background Component
```tsx
<Background
  fill
  gradient={{
    display: true,
    x: 50,
    y: 0,
    colorStart: "accent-background-strong",
    colorEnd: "static-transparent"
  }}
  dots={{
    display: true,
    size: "4",
    color: "page-background"
  }}
  lines={{
    display: true,
    angle: 90,
    color: "accent-background-strong"
  }}
  mask={{
    cursor: true,
    radius: 50
  }}
/>
```

### Particle
```tsx
<Particle
  fill
  interactive
  speed={3}
  density={250}
  color="brand-background-strong"
  interactionRadius={100}
/>
```

---

## Form Controls

### Input
```tsx
<Input
  id="email"
  label="Email"
  placeholder="Enter your email"
  hasPrefix={<Icon name="email" size="xs" />}
  validate={(value) => {
    if (!value.includes('@')) return 'Invalid email';
    return null;
  }}
/>
```

### Select
```tsx
<Select
  id="country"
  label="Country"
  options={[
    { label: "United States", value: "us" },
    { label: "United Kingdom", value: "uk" },
    { label: "Canada", value: "ca" }
  ]}
  searchable
  onSelect={(value) => console.log(value)}
/>
```

### Textarea
```tsx
<Textarea
  id="message"
  label="Message"
  placeholder="Type your message..."
  lines={5}
  maxLength={500}
/>
```

### Checkbox
```tsx
<Checkbox
  label="I agree to the terms"
  isChecked={agreed}
  onChange={(checked) => setAgreed(checked)}
/>
```

### RadioButton
```tsx
<RadioButton
  label="Option A"
  name="options"
  value="a"
  isChecked={selected === 'a'}
  onChange={() => setSelected('a')}
/>
```

### Switch
```tsx
<Switch
  label="Enable notifications"
  isChecked={enabled}
  onToggle={(checked) => setEnabled(checked)}
/>
```

### Chip
```tsx
<Chip
  label="React"
  selected={skills.includes('react')}
  onClick={() => toggleSkill('react')}
  onRemove={() => removeSkill('react')}
/>
```

---

## Data Visualization

### Setup
```tsx
// Configuration
const dataStyle = {
  variant: "gradient",     // flat | gradient | outline
  mode: "categorical",     // categorical | divergent | sequential
  height: 24,
  axis: {
    stroke: "var(--neutral-alpha-weak)"
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false
  }
};
```

### BarChart
```tsx
<BarChart
  title="Sales by Region"
  axis="both"
  legend={{ position: "bottom-center" }}
  series={[
    { key: "2023", color: "brand" },
    { key: "2024", color: "accent" }
  ]}
  data={[
    { name: "North", "2023": 120, "2024": 150 },
    { name: "South", "2023": 90, "2024": 110 },
    { name: "East", "2023": 80, "2024": 95 },
    { name: "West", "2023": 100, "2024": 130 }
  ]}
/>
```

### LineChart
```tsx
<LineChart
  title="Monthly Revenue"
  axis="x"
  curve="smooth"
  date={{
    format: "MMM yyyy",
    start: new Date("2024-01-01"),
    end: new Date("2024-12-31")
  }}
  series={[
    { key: "Revenue", color: "brand" },
    { key: "Profit", color: "accent" }
  ]}
  data={monthlyData}
/>
```

---

## Context Providers

### ThemeProvider
Manages global theme settings including colors, borders, and transitions.

### DataThemeProvider
Controls data visualization styling across all chart components.

### ToastProvider
Enables toast notifications throughout the application.

### IconProvider
Manages the icon library and custom icon registrations.

### LayoutProvider
Tracks window size and provides responsive breakpoint utilities.

---

## Advanced Features

### Schema Component
```tsx
<Schema
  as="webPage"
  title="Product Page"
  description="High-quality products"
  baseURL="https://example.com"
  path="/products"
  author={{ name: "Company Name" }}
/>
```

### Skeleton Loading
```tsx
<Skeleton shape="line" width="l" delay="1" />
<Skeleton shape="circle" width="m" height="m" />
<Skeleton shape="block" width="full" minHeight="80" />
```

### Scroller
```tsx
<Scroller fadeColor="brand-medium">
  <Row gap="16">
    {items.map(item => (
      <Card key={item.id}>{item.content}</Card>
    ))}
  </Row>
</Scroller>
```

### StylePanel
```tsx
<StylePanel />  // Adds theme customization UI
```

### Dialog
```tsx
<Dialog
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Confirm Action"
  description="Are you sure?"
  footer={
    <Row gap="8">
      <Button variant="secondary" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleConfirm}>
        Confirm
      </Button>
    </Row>
  }
>
  {dialogContent}
</Dialog>
```

---

## Best Practices

### 1. Component Structure
```tsx
"use client";

import React, { forwardRef } from "react";
import classNames from "classnames";
import styles from "./Component.module.scss";
import { Flex } from "@once-ui-system/core";

interface ComponentProps extends React.ComponentProps<typeof Flex> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ children, className, style, ...rest }, ref) => {
    return (
      <Flex
        ref={ref}
        style={style}
        className={classNames(styles.component, className)}
        {...rest}
      >
        {children}
      </Flex>
    );
  }
);

Component.displayName = "Component";
export { Component };
```

### 2. Theme-Aware Styling
- Use semantic color tokens (brand, accent, neutral)
- Apply alpha variants for subtle backgrounds
- Leverage surface colors for layout containers

### 3. Responsive Design
- Start with mobile layout
- Use responsive props (s, m, l, xl)
- Test across all breakpoints

### 4. Accessibility
- Always include alt text for images
- Use semantic HTML elements
- Ensure proper focus management
- Maintain color contrast ratios

### 5. Performance
- Lazy load heavy components
- Use skeleton states during loading
- Optimize images with proper sizing
- Minimize bundle size with tree-shaking

### 6. Consistency
- Follow spacing token system
- Use predefined variants
- Maintain visual hierarchy
- Keep interactions predictable

---

## Component Reference Summary

### Layout Components
- Flex, Row, Column, Grid
- Background, Mask, Fade
- Skeleton, Scroller

### Typography
- Heading, Text, InlineCode
- LetterFx, CountFx

### Interactive
- Button, IconButton, ToggleButton
- Badge, Chip, Arrow

### Media
- Media, Avatar, Logo
- OgCard, LogoCloud

### Navigation
- NavIcon, UserMenu, MobileMegaMenu
- Dropdown, Option

### Form Controls
- Input, Select, Textarea
- Checkbox, RadioButton, Switch
- InteractiveDetails

### Feedback
- Toast, Feedback, Dialog
- Tooltip, CursorCard

### Data Visualization
- BarChart, LineChart, LineBarChart
- Table, ProgressBar

### Effects
- RevealFx, TiltFx, HoloFx
- FlipFx, GlitchFx
- Particle, AutoScroll

### Utilities
- ElementType, Schema
- StylePanel, StyleOverlay
- ThemeSwitcher

---

## Resources

- **Official Docs**: https://once-ui.com
- **GitHub**: https://github.com/once-ui-system
- **Examples**: https://once-ui.com/examples
- **Templates**: Magic Portfolio, Magic Docs, Magic Store

---

## Version History

This bible is based on Once UI System documentation as of January 2025.

Remember: Once UI is designed to help you build faster with less code while maintaining high quality and consistency. Happy building! 🚀