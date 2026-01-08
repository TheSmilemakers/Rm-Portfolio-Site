# Next.js Deployment Fix Plan

## Problem Summary
The build is failing due to TypeScript errors where animation components and other UI components are being passed props that don't exist in their type definitions.

## Root Cause
The Once UI animation components (`RevealFx`, `LetterFx`, `TiltFx`) don't support a `disabled` prop for reduced motion, and other components have prop mismatches.

## Step-by-Step Fix Strategy

### Phase 1: Fix TypeScript Errors

#### 1.1 Animation Components
The `disabled` prop doesn't exist on animation components. We need to:
- Remove the `disabled` prop from all animation components
- Conditionally render animations based on reduced motion preference
- Or wrap content without the animation component when reduced motion is enabled

#### 1.2 Badge Component
- Remove `size` prop from Badge components (not supported)

#### 1.3 Other Component Props
- Fix `className` props that should be `style` or removed
- Fix `minHeight` prop that should be numeric or use style
- Fix other type mismatches

### Phase 2: Environment Variable Verification

#### 2.1 Required Variables
- Ensure all environment variables in `.env.local` are properly set in Vercel
- Key variables:
  - `NEXT_PUBLIC_BASE_URL`
  - `NEXT_PUBLIC_SITE_NAME`
  - `PAGE_ACCESS_PASSWORD` (if using protected routes)

### Phase 3: Pre-Deployment Checklist

1. **Local Build Test**
   ```bash
   npm run build
   npm run start
   ```

2. **TypeScript Check**
   ```bash
   npx tsc --noEmit
   ```

3. **Lint Check**
   ```bash
   npm run lint
   ```

4. **Environment Variables**
   - Set all variables from `.env.local` in Vercel dashboard
   - Ensure no sensitive data is exposed

### Phase 4: Vercel Deployment Configuration

1. **Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

2. **Node Version**
   - Ensure Node.js 18.x or higher

3. **Environment Variables**
   - Add all from `.env.local`
   - Don't commit `.env.local` to git

### Phase 5: Fix Implementation Order

1. Fix game page animations (highest priority)
2. Fix about page animations
3. Fix work/blog page animations
4. Fix gallery page animations
5. Fix component prop types
6. Test build locally
7. Deploy to Vercel

### Common Patterns to Fix

#### Pattern 1: Animation with Reduced Motion
```tsx
// Instead of:
<RevealFx disabled={reducedMotion}>
  <Content />
</RevealFx>

// Use:
{reducedMotion ? (
  <Content />
) : (
  <RevealFx>
    <Content />
  </RevealFx>
)}
```

#### Pattern 2: Badge without size
```tsx
// Instead of:
<Badge size="s" background="accent-alpha-weak">Tag</Badge>

// Use:
<Badge background="accent-alpha-weak">Tag</Badge>
```

## Immediate Actions

1. Fix all TypeScript errors in the following files:
   - `/src/app/game/page.tsx`
   - `/src/components/about/AboutPageClient.tsx`
   - `/src/components/work/WorkPageClient.tsx`
   - `/src/components/blog/BlogPageClient.tsx`
   - `/src/components/gallery/GalleryPageClient.tsx`
   - `/src/components/PageWrapper.tsx`
   - `/src/components/work/Projects.tsx`
   - `/src/components/blog/Posts.tsx`

2. Run build locally to verify fixes
3. Deploy to Vercel

## Troubleshooting Tips

1. **Build Still Fails**
   - Check Vercel build logs for specific errors
   - Ensure all dependencies are in `package.json`
   - Check for case-sensitive import issues

2. **Runtime Errors**
   - Check browser console for errors
   - Verify all API routes work
   - Check for missing environment variables

3. **Style Issues**
   - Ensure all CSS imports are correct
   - Check for missing font files
   - Verify image paths are correct