# 🎯 Particle Background Fix - Session Handover

## 🚨 Critical Issue
**Problem**: Particle effect creating empty container below footer instead of working as page background
**Current Status**: Server running on localhost:3001, but particles not visible and creating layout issues

## 🔍 Issue Analysis

### **Root Cause**
The layout structure is causing particles to render in wrong location:

```tsx
// CURRENT PROBLEMATIC STRUCTURE (layout.tsx lines 106-142)
<Column as="body" style={{minHeight: "100vh", height: "100%", position: "relative"}}>
  <div style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0}}>
    <Background {...effects} />
    <Particle fill interactive density={400} opacity={80} /> // ← ISSUE HERE
  </div>
  <Column style={{minHeight: "100vh", position: "relative", zIndex: 1}}>
    <Header />
    <main>{children}</main>
    <Footer />
  </Column>
</Column>
```

**Problem**: Particles are absolutely positioned within body container but content extends beyond viewport

## 📋 Working Reference Implementation

The project has a **working** PageWrapper component at `/src/components/PageWrapper.tsx` (lines 44-64) that correctly implements particles:

```tsx
{showParticles && !reducedMotion && (
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0
  }}>
    <Particle
      fill
      interactive
      speed={2}
      density={200}
      color="brand-on-background-weak"
      opacity={60}
      size="2"
      interactionRadius={100}
    />
  </div>
)}
```

## 🎯 Recommended Solutions

### **Option 1: Use PageWrapper Pattern (Recommended)**
1. **Remove particles from layout.tsx completely**
2. **Add particles to individual pages** using PageWrapper component
3. **Modify PageWrapper** to enable particles by default:
   ```tsx
   showParticles={true}  // Change default from false
   ```

### **Option 2: Fix Layout Implementation**
1. **Change container height strategy**:
   ```tsx
   // Replace minHeight: "100vh" with min-height: 100vh in CSS
   // Use min-height: 100% for particle container
   ```

2. **Add proper viewport handling**:
   ```tsx
   style={{
     minHeight: "100vh",
     position: "relative",
     overflow: "hidden"  // Prevent particle container overflow
   }}
   ```

### **Option 3: CSS-Only Background (Simplest)**
1. **Remove Particle component entirely from layout**
2. **Use CSS background effects** in custom.css
3. **Add animated dots/particles via CSS animations**

## 🔧 Immediate Debug Steps

### **Step 1: Verify Particle Component**
```bash
# Test if Particle works in isolation
# Create simple test page with just Particle component
```

### **Step 2: Check Z-Index Conflicts**
```bash
# Header has zIndex: 9
# Content has zIndex: 1  
# Particles have zIndex: 0
# Temporarily set particles to zIndex: 10 to test visibility
```

### **Step 3: Test Color/Opacity**
```tsx
// Try maximum visibility settings:
color="yellow"  // Hard-coded visible color
opacity={100}   // Maximum opacity
size="4"        // Larger particle size
```

## 📂 Key Files to Modify

### **Primary**: `/src/app/layout.tsx`
- Lines 106-142: Current particle implementation
- **Issue**: Absolute positioning within minHeight container

### **Reference**: `/src/components/PageWrapper.tsx`  
- Lines 44-64: Working particle implementation
- **Pattern to follow**: Conditional rendering with reduced motion

### **Configuration**: `/src/resources/once-ui.config.js`
- Lines 112-117: Effects configuration
- Currently: `dots: { display: true, opacity: 40 }`

## 🎨 Once UI Compliance Check

### **Confirmed Working Patterns**:
1. ✅ `s-flex-show` / `s-flex-hide` classes (Header.tsx)
2. ✅ Background component with effects (layout.tsx)
3. ✅ PageWrapper particle implementation (PageWrapper.tsx)

### **Issue Pattern**:
❌ Global layout particle implementation not following Once UI container patterns

## 💡 Quick Win Solution

**Fastest Fix**: 
1. Remove particles from layout.tsx completely
2. Add `showParticles={true}` to PageWrapper component  
3. Wrap all page content with PageWrapper

This uses the proven working pattern and avoids layout conflicts.

## 🔍 Current Settings
- **Density**: 400 (kept as requested)
- **Color**: "brand-background-strong"
- **Opacity**: 80
- **Speed**: 3
- **Interactive**: true

## ⚠️ Critical Notes
- Server running on localhost:3001
- Mobile header size fix completed (size="s")
- Build system is working (98% quality compliance)
- Once UI compatibility confirmed for header changes

**Next Action**: Choose solution approach and implement particle background that doesn't interfere with page layout.