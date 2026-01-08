#!/bin/bash

# Script to fix animation component TypeScript errors

echo "Fixing animation components..."

# Fix game page
sed -i '' 's/disabled={reducedMotion}//g' src/app/game/page.tsx
sed -i '' 's/<Badge size="s"/<Badge/g' src/app/game/page.tsx

# Fix about page
sed -i '' 's/disabled={reducedMotion}//g' src/components/about/AboutPageClient.tsx

# Fix work page
sed -i '' 's/disabled={reducedMotion}//g' src/components/work/WorkPageClient.tsx

# Fix blog page
sed -i '' 's/disabled={reducedMotion}//g' src/components/blog/BlogPageClient.tsx

# Fix gallery page
sed -i '' 's/disabled={reducedMotion}//g' src/components/gallery/GalleryPageClient.tsx

# Fix Posts component
sed -i '' 's/className={fadeInClassName}//g' src/components/blog/Posts.tsx

# Fix Projects component
sed -i '' 's/className={animationClass}//g' src/components/work/Projects.tsx

# Fix PageWrapper minHeight
sed -i '' 's/minHeight="100vh"/minHeight={100}/g' src/components/PageWrapper.tsx

echo "Animation fixes complete!"