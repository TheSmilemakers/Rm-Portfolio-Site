# Magic Portfolio - Once UI Project Configuration

This file contains project-specific instructions and references for the Magic Portfolio project built with Once UI.

## Project Overview
- **Framework**: Next.js 15.4.6 with App Router
- **UI System**: Once UI System (@once-ui-system/core)
- **Styling**: CSS-in-JS with theme tokens
- **Theme**: Dark mode default with yellow/orange/sand palette

## Once UI Bible Reference
The comprehensive Once UI documentation is available at:
`/Users/rajan/Documents/rmsitemagicportfolio/magic-portfolio/OnceuiBible.md`

## Build Error Solutions

### TypeScript Opacity Error Fix
When encountering opacity type errors with Background component:
```tsx
// Option 1: Type cast in layout.tsx
const typedEffects = {
  gradient: { ...effects.gradient, opacity: effects.gradient.opacity as 100 },
  dots: { ...effects.dots, opacity: effects.dots.opacity as 40 },
  grid: { ...effects.grid, opacity: effects.grid.opacity as 100 },
  lines: { ...effects.lines, opacity: effects.lines.opacity as 100 },
  mask: effects.mask
};
```

## Key Once UI Patterns

### 1. Layout Structure
```tsx
<Column fillWidth gap="l">
  <Row horizontal="between" vertical="center">
    <Heading>Title</Heading>
    <Button>Action</Button>
  </Row>
  <Grid columns="3" gap="m" s={{columns: 2}}>
    {/* Responsive grid content */}
  </Grid>
</Column>
```

### 2. Animation Effects
```tsx
// RevealFx for staggered animations
<RevealFx translateY="16" delay={index * 0.05}>
  <Card>{content}</Card>
</RevealFx>

// LetterFx for text animations
<LetterFx speed="medium" trigger="instant">
  Animated headline
</LetterFx>

// TiltFx for interactive cards
<TiltFx aspectRatio={16/9} radius="l">
  <Media src="/image.jpg" />
</TiltFx>
```

### 3. Background Effects
```tsx
<Background
  gradient={{ display: true, opacity: 100, colorStart: "accent-background-strong" }}
  dots={{ display: true, opacity: 40, size: "2", color: "brand-background-strong" }}
  mask={{ cursor: true, radius: 100 }}
/>

// Particle effects
<Particle
  fill
  interactive
  speed={3}
  density={250}
  color="brand-background-strong"
/>
```

### 4. Theme Configuration
```js
// once-ui.config.js
export const style = {
  theme: "dark",
  brand: "yellow",
  accent: "orange",
  neutral: "sand",
  border: "playful",
  solid: "contrast",
  solidStyle: "flat",
  surface: "translucent",
  transition: "all",
  scaling: "100"
};
```

## Available Components

### Effects & Animations
- **RevealFx**: Staggered reveal animations
- **LetterFx**: Character-by-character text effects
- **TiltFx**: 3D tilt effect on hover
- **HoloFx**: Holographic card effect
- **GlitchFx**: Glitch text effect
- **FlipFx**: Card flip animations
- **Particle**: Interactive particle systems
- **Background**: Gradient, dots, grid, lines effects

### Layout Components
- **Flex, Row, Column**: Flexible layouts
- **Grid**: Responsive grid system
- **Card**: Content containers
- **Background**: Full-screen effects

### Typography
- **Heading**: Display and heading text
- **Text**: Body and label text
- **variants**: display-strong-xl, heading-strong-l, body-default-m, label-default-s

### Interactive
- **Button**: Primary, secondary, ghost variants
- **IconButton**: Icon-only buttons
- **Badge**: Status indicators
- **Chip**: Selectable tags

## Project-Specific Notes

### Current Implementation
1. **Hero Section**: Uses RevealFx for staggered animations
2. **Tech Stack**: Grid layout with hover effects
3. **Metrics**: Custom AnimatedMetrics component
4. **Theme**: Dark mode with yellow/orange accents

### Enhancement Opportunities
1. Add Background component with gradient + dots
2. Implement Particle effects in hero section
3. Use LetterFx for main headline
4. Add TiltFx to project cards
5. Implement HoloFx for tech stack items

## Common Commands
```bash
# Development
npm run dev

# Build
npm run build

# Type checking (fix opacity errors first)
npm run typecheck

# Linting
npm run lint
```

## Implementation Guide
Detailed implementation guide available at:
`/Users/rajan/Documents/rmsitemagicportfolio/magic-portfolio/IMPLEMENTATION_GUIDE.md`

## Portfolio Specialist Agent Stack

### Configured Agents (14 specialists)
The project now includes a specialized sub-agent stack optimized for portfolio development:

**Core Professional Agents:**
- `once-ui-expert` - Once UI System mastery and component optimization
- `frontend-developer` - Next.js/React development and architecture
- `typescript-pro` - TypeScript optimization and type safety
- `performance-engineer` - Core Web Vitals and loading optimization
- `search-specialist` - SEO optimization and professional visibility
- `security-auditor` - Production security and vulnerability assessment
- `ui-ux-designer` - Professional presentation and user experience
- `business-analyst` - Portfolio effectiveness and conversion analysis
- `content-marketer` - Personal branding and content strategy
- `docs-architect` - Technical documentation and content organization

**Enterprise Bonus Agents:**
- `code-reviewer` - Code quality assurance and best practices
- `test-automator` - Automated testing implementation
- `deployment-engineer` - CI/CD optimization and deployment
- `reference-builder` - Documentation excellence and API references

### Agent Usage Examples
```bash
# Automatic agent selection (context-aware)
"Optimize the hero section with particle effects" # → once-ui-expert, performance-engineer

# Explicit agent invocation
"Use business-analyst to analyze portfolio conversion metrics"
"Use once-ui-expert to implement TiltFx on project cards"

# Multi-agent workflows
"Use business-analyst then ui-ux-designer to improve homepage conversion"
```

### Agent Configuration
- **Template**: portfolio-website (custom template for professional portfolios)
- **Context Integration**: All agents have access to Once UI Bible and project specifications
- **Focus Domains**: AI development, healthcare technology, algorithmic trading
- **Success Metrics**: Performance > 95, SEO > 95, Code Quality > 90%

### Agent Documentation
- **Configuration**: `/Users/rajan/Documents/rmsitemagicportfolio/.claude/project-config.json`
- **Integration Guide**: `/Users/rajan/Documents/rmsitemagicportfolio/.claude/agent-integration.md`
- **Setup Guide**: `/Users/rajan/Documents/rmsitemagicportfolio/PROJECT_SETUP_GUIDE.md`

## Handover Documentation
Build error solutions documented at:
`/Users/rajan/Documents/rmsitemagicportfolio/magic-portfolio/HANDOVER_BUILD_ERRORS.md`