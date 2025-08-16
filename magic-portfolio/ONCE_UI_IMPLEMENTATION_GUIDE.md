# 🎨 Once UI Implementation Guide - Magic Portfolio

**Purpose:** Ensure 100% Once UI compliance across all portfolio components  
**Reference:** [OnceuiBible.md](./OnceuiBible.md) for complete Once UI documentation  
**Version:** Once UI System v1.2.4 with Next.js 15.3.1

---

## 🎯 Core Principles

### 1. **Once UI First**
- Always check if Once UI provides a component/pattern before creating custom solutions
- Use Once UI props instead of custom CSS whenever possible
- Leverage semantic design tokens for consistency

### 2. **Component Hierarchy**
```tsx
// ✅ Correct: Once UI components with proper props
<Column fillWidth gap="l" padding="xl">
  <RevealFx translateY="32" delay={0.2}>
    <Card hover="lift" radius="l" surface="translucent">
      <Heading variant="display-strong-l">Title</Heading>
    </Card>
  </RevealFx>
</Column>

// ❌ Incorrect: Custom styles and divs
<div style={{width: '100%', padding: '32px'}}>
  <div className="custom-card">
    <h1 className="custom-heading">Title</h1>
  </div>
</div>
```

### 3. **Animation Patterns**
Always use Once UI animation components:
- `RevealFx` - For entrance animations
- `LetterFx` - For text animations
- `TiltFx` - For 3D hover effects
- `HoloFx` - For holographic shine
- `FlipFx` - For flip interactions
- `GlitchFx` - For tech/glitch effects

---

## 📦 Component Implementation Patterns

### Hero Section Pattern
```tsx
// Full Once UI compliant hero section
<Column fillWidth gap="xl" horizontal="center">
  {/* Background effects */}
  <Background
    gradient={{
      display: true,
      opacity: 100,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent"
    }}
    dots={{
      display: true,
      opacity: 40,
      size: "2",
      color: "brand-background-strong"
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
    speed={3}
    density={250}
    color="brand-background-strong"
  />
  
  {/* Animated headline */}
  <RevealFx translateY="32" delay={0.1}>
    <LetterFx 
      speed="medium" 
      trigger="instant"
      charset="X$@aHz0y#?*01+"
    >
      <Heading 
        variant="display-strong-xl"
        background="gradient"
      >
        Your Headline Here
      </Heading>
    </LetterFx>
  </RevealFx>
  
  {/* CTA buttons with proper styling */}
  <RevealFx translateY="16" delay={0.3}>
    <Row gap="m">
      <Button 
        variant="primary" 
        size="l"
        arrowIcon
      >
        Primary Action
      </Button>
      <Button 
        variant="secondary" 
        size="l"
        surface="translucent"
      >
        Secondary Action
      </Button>
    </Row>
  </RevealFx>
</Column>
```

### Card Component Pattern
```tsx
// Project card with full Once UI effects
<RevealFx translateY="24" delay={index * 0.1}>
  <TiltFx aspectRatio={16/9} radius="l">
    <Card
      hover="lift"
      radius="l"
      padding="l"
      surface="translucent"
      border="neutral-alpha-medium"
    >
      {/* Featured badge with holographic effect */}
      {featured && (
        <HoloFx
          border="brand-alpha-weak"
          radius="m"
          shine={{ opacity: 30 }}
          burn={{ opacity: 30 }}
        >
          <Badge variant="brand" size="s">
            Featured
          </Badge>
        </HoloFx>
      )}
      
      {/* Content with proper spacing */}
      <Column gap="m">
        <Heading variant="heading-strong-m">
          {title}
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {description}
        </Text>
      </Column>
    </Card>
  </TiltFx>
</RevealFx>
```

### Metrics Animation Pattern
```tsx
// Animated metrics with Once UI
<Grid columns="4" gap="m" s={{columns: "2"}} m={{columns: "3"}}>
  {metrics.map((metric, index) => (
    <RevealFx 
      key={metric.id}
      translateY="16" 
      delay={index * 0.05}
    >
      <Card
        padding="l"
        radius="l"
        surface="translucent"
        border="neutral-alpha-weak"
      >
        <Column gap="xs">
          <Heading 
            variant="display-strong-m"
            className="tabular-nums"
          >
            {metric.value}
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
```

### Tech Stack Pattern
```tsx
// Interactive tech cards
<Grid columns="6" gap="s" s={{columns: "3"}} m={{columns: "4"}}>
  {technologies.map((tech, index) => (
    <FlipFx
      key={tech.id}
      trigger="click"
      duration={0.6}
    >
      {/* Front side */}
      <HoloFx
        radius="m"
        border="brand-alpha-weak"
        shine={{ opacity: 20 }}
      >
        <Card
          padding="m"
          radius="m"
          hover="scale"
          className="cursor-pointer"
        >
          <Column gap="xs" horizontal="center">
            <Icon name={tech.icon} size="l" />
            <Text variant="label-default-s">
              {tech.name}
            </Text>
          </Column>
        </Card>
      </HoloFx>
      
      {/* Back side */}
      <Card
        padding="m"
        radius="m"
        surface="brand-weak"
      >
        <Text variant="body-default-s">
          {tech.description}
        </Text>
      </Card>
    </FlipFx>
  ))}
</Grid>
```

---

## 🎨 Theme & Styling Guidelines

### Color Usage
```tsx
// ✅ Correct: Semantic color tokens
<Column background="surface" onBackground="neutral-strong">
  <Card border="neutral-alpha-medium" surface="translucent">
    <Text onBackground="neutral-weak">Content</Text>
  </Card>
</Column>

// ❌ Incorrect: Hard-coded colors
<div style={{background: '#1a1a1a', color: '#ffffff'}}>
  <div style={{border: '1px solid #333'}}>
    <p style={{color: '#999'}}>Content</p>
  </div>
</div>
```

### Spacing System
```tsx
// ✅ Correct: Once UI spacing tokens
<Column gap="l" padding="xl" marginBottom="m">
  <Row gap="m" paddingX="l">
    <Component />
  </Row>
</Column>

// ❌ Incorrect: Custom spacing
<div style={{gap: '24px', padding: '32px', marginBottom: '16px'}}>
  <Component />
</div>
```

### Responsive Design
```tsx
// ✅ Correct: Once UI responsive props
<Grid 
  columns="4"
  gap="l"
  s={{columns: "1", gap: "m"}}
  m={{columns: "2", gap: "m"}}
  l={{columns: "3"}}
  xl={{columns: "4", gap: "xl"}}
>
  {items}
</Grid>

// ❌ Incorrect: Media queries in CSS
@media (max-width: 768px) {
  .grid { grid-template-columns: 1fr; }
}
```

---

## 🚀 Migration Checklist

### From Custom CSS to Once UI

| Custom Pattern | Once UI Replacement | Example |
|----------------|-------------------|---------|
| `.glass-effect` | `surface="translucent"` | `<Card surface="translucent">` |
| `.button-3d` | Built-in Button hover | `<Button variant="primary">` |
| `.hover-lift` | `hover="lift"` | `<Card hover="lift">` |
| `.gradient-text` | `background="gradient"` | `<Heading background="gradient">` |
| Custom animations | RevealFx, LetterFx, etc. | See patterns above |
| Custom grid | Grid component | `<Grid columns="3">` |
| Custom spacing | Gap/padding props | `gap="l" padding="xl"` |

### Component Conversion Steps

1. **Identify custom implementations**
   - Check for className usage
   - Look for inline styles
   - Find custom CSS classes

2. **Map to Once UI equivalent**
   - Reference OnceuiBible.md
   - Use semantic props
   - Apply proper variants

3. **Test thoroughly**
   - Check both theme modes
   - Verify all breakpoints
   - Test interactions

4. **Remove old code**
   - Delete unused CSS
   - Remove custom components
   - Clean up imports

---

## 🔧 Common Patterns

### Loading States
```tsx
<RevealFx translateY="16">
  <Card padding="l" surface="translucent">
    {isLoading ? (
      <Column gap="m">
        <div className="loading" style={{height: '24px', width: '60%'}} />
        <div className="loading" style={{height: '16px', width: '100%'}} />
      </Column>
    ) : (
      <Column gap="m">
        <Heading>{title}</Heading>
        <Text>{content}</Text>
      </Column>
    )}
  </Card>
</RevealFx>
```

### Error States
```tsx
<Card 
  surface="danger-weak" 
  border="danger-medium"
  padding="m"
  radius="m"
>
  <Row gap="s" vertical="center">
    <Icon name="error" color="danger" />
    <Text variant="body-default-s" onBackground="danger-strong">
      {errorMessage}
    </Text>
  </Row>
</Card>
```

### Empty States
```tsx
<Column 
  fillWidth 
  minHeight="400" 
  horizontal="center" 
  vertical="center"
  gap="l"
>
  <Icon name="inbox" size="xl" color="neutral-weak" />
  <Column gap="s" horizontal="center">
    <Heading variant="heading-strong-m">
      No items found
    </Heading>
    <Text variant="body-default-m" onBackground="neutral-weak">
      Try adjusting your filters
    </Text>
  </Column>
</Column>
```

---

## ⚠️ Important Notes

### TypeScript Compliance
```tsx
// Handle opacity type issues
const backgroundConfig = {
  gradient: { 
    ...effects.gradient, 
    opacity: effects.gradient.opacity as 100 
  },
  dots: { 
    ...effects.dots, 
    opacity: effects.dots.opacity as 40 
  }
};
```

### Performance Considerations
- Use `RevealFx` sparingly on large lists
- Stagger animations with calculated delays
- Prefer CSS transitions over JavaScript animations
- Use `will-change` only when necessary

### Accessibility
- Always include proper ARIA labels
- Ensure interactive elements have focus states
- Maintain proper heading hierarchy
- Test with keyboard navigation

---

## 📚 Quick Reference

### Animation Delay Calculator
```tsx
const getStaggerDelay = (index: number, baseDelay = 0.1) => {
  return Math.min(index * 0.05, 0.5) + baseDelay;
};
```

### Responsive Helper
```tsx
const responsiveColumns = {
  columns: "4",
  s: { columns: "1" },
  m: { columns: "2" },
  l: { columns: "3" },
  xl: { columns: "4" }
};
```

### Theme-Aware Styling
```tsx
const themeStyles = {
  light: { surface: "neutral-weak", onBackground: "neutral-strong" },
  dark: { surface: "neutral-alpha-weak", onBackground: "neutral-weak" }
};
```

---

**Remember:** When in doubt, check [OnceuiBible.md](./OnceuiBible.md) or ask the `once-ui-expert` agent for guidance!