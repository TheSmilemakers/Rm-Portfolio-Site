# Portfolio Agent Integration Configuration

## Once UI Bible Integration

All agents have access to the comprehensive Once UI documentation:
- **Primary Reference**: `/Users/rajan/Documents/rmsitemagicportfolio/magic-portfolio/OnceuiBible.md`
- **Project Context**: `/Users/rajan/Documents/rmsitemagicportfolio/magic-portfolio/CLAUDE.md`

## Agent Context Configuration

### Core Portfolio Context
All agents are configured with knowledge of:
- **Project Type**: Professional portfolio showcasing AI/healthcare/trading expertise
- **Tech Stack**: Next.js 15, React 19, TypeScript, Once UI System
- **Current Status**: Production-ready with advanced animations and theming
- **Target Audience**: Enterprise clients, tech companies, potential employers

### Agent-Specific Contexts

#### `once-ui-expert`
- Direct access to Once UI Bible for component specifications
- Understands current TypeScript opacity fixes in layout.tsx
- Familiar with project's yellow/orange/sand theme configuration
- Knows existing animation implementations (RevealFx, TiltFx, etc.)

#### `frontend-developer`
- Aware of Next.js 15 App Router architecture
- Understands current component structure and patterns
- Has context of existing responsive design implementations
- Knows about MDX content system integration

#### `business-analyst`
- Understands target domains: AI development, healthcare technology, algorithmic trading
- Knows project showcases: 50,000+ healthcare patients, trading algorithms
- Has context of professional goals and conversion objectives
- Aware of portfolio effectiveness metrics

#### `performance-engineer`
- Knows current build configuration and optimization setup
- Understands Once UI component loading patterns
- Has context of image optimization requirements
- Aware of Core Web Vitals targets (< 2 seconds loading)

#### `search-specialist`
- Understands current SEO implementation
- Knows target keywords for AI/healthcare/trading domains
- Has context of existing meta tag structure
- Aware of professional visibility requirements

## Workflow Integration Patterns

### Automatic Agent Selection
Claude Code will automatically invoke relevant agents based on context:
```
"Optimize the hero section animations" → once-ui-expert, performance-engineer
"Improve portfolio SEO" → search-specialist, content-marketer
"Review component code quality" → typescript-pro, code-reviewer
```

### Manual Agent Invocation
Explicit agent requests for specific expertise:
```
"Use once-ui-expert to implement particle effects in the hero section"
"Use business-analyst to analyze portfolio conversion metrics"
"Use security-auditor to review authentication implementation"
```

### Multi-Agent Workflows
Complex tasks using multiple specialized agents:
```
1. business-analyst → Analyze portfolio effectiveness
2. ui-ux-designer → Design improvements based on analysis
3. once-ui-expert → Implement UI improvements with Once UI
4. performance-engineer → Optimize implementation for speed
```

## Integration Verification

### Agent Accessibility Test
All agents can access:
- ✅ Once UI Bible (`/magic-portfolio/OnceuiBible.md`)
- ✅ Project configuration (`/magic-portfolio/CLAUDE.md`)
- ✅ Current codebase and file structure
- ✅ Portfolio-specific success metrics and goals

### Context Awareness Test
Each agent understands:
- ✅ Current project state and architecture
- ✅ Professional domain focus (AI/healthcare/trading)
- ✅ Technology stack and implementation patterns
- ✅ Performance and quality requirements

## Success Indicators

### Integration Complete When:
- [ ] Agents respond with project-specific context
- [ ] Once UI recommendations align with current implementation
- [ ] Business analysis reflects actual portfolio domains
- [ ] Performance suggestions consider current tech stack
- [ ] All agents demonstrate awareness of portfolio goals

### Quality Assurance
- Agents provide recommendations consistent with existing patterns
- Once UI expert suggestions use current theme configuration
- Business insights reflect actual portfolio positioning
- Performance optimizations consider Next.js 15 best practices