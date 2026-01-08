# Admin Panel User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Blog Management](#blog-management)
4. [Work/Projects Management](#workprojects-management)
5. [Image Library](#image-library)
6. [Gallery Management](#gallery-management)
7. [Site Settings](#site-settings)
8. [Security & Best Practices](#security--best-practices)
9. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Accessing the Admin Panel

1. **Navigate to**: `https://your-domain.com/admin`
2. **Enter Password**: The password is set in your `.env.local` file as `PAGE_ACCESS_PASSWORD`
3. **Session Duration**: You'll stay logged in for 1 hour before needing to re-authenticate

### First Time Setup

1. Ensure your `.env.local` file contains:
   ```
   PAGE_ACCESS_PASSWORD=your_secure_password_here
   ```

2. Start your development server:
   ```bash
   npm run dev
   ```

3. Access the admin panel at: `http://localhost:3000/admin`

---

## Dashboard Overview

The dashboard is your command center for managing all site content.

### Statistics Cards
- **Blog Posts**: Total number of published blog posts
- **Work Projects**: Total number of portfolio projects
- **Total Images**: Count of all images in your library

### Quick Actions
- **New Blog Post**: Create a new blog post immediately
- **New Project**: Create a new portfolio project
- **Upload Images**: Jump to image uploader

### Navigation Sidebar
- **Dashboard**: Overview and statistics
- **Blog**: Manage blog posts
- **Work**: Manage portfolio projects
- **Gallery**: View gallery configuration
- **Images**: Upload and manage images
- **Settings**: View site configuration
- **Exit to Site**: Return to your public website

---

## Blog Management

### Viewing Blog Posts

Navigate to **Blog** in the sidebar to see all your blog posts.

**Each post card shows:**
- Title and publish date
- Summary excerpt
- Category tag (if set)
- File name
- Preview and Edit buttons

### Creating a New Blog Post

1. Click **"New Post"** button
2. Fill out the form:
   - **Title** (required): Post headline
   - **Publish Date** (required): When the post was/will be published
   - **Summary** (required): Brief description (160 chars recommended)
   - **Featured Image**: Path to cover image (e.g., `/images/blog/my-post.jpg`)
   - **Content** (required): Full post content in Markdown/MDX

3. Click **"Create Post"** to publish

**The system will:**
- Generate a URL-friendly slug from your title
- Create an MDX file in `src/app/blog/posts/`
- Add YAML frontmatter with your metadata
- Make the post immediately live

### Editing a Blog Post

1. Click **"Edit"** on any blog post card
2. Modify any fields
3. Click **"Update Post"** to save changes

**The system will:**
- Update the existing MDX file
- Preserve the slug/URL
- Update metadata and content

### Deleting a Blog Post

1. Open the post in edit mode
2. Click **"Delete"** button
3. Confirm the deletion

**Warning:** This permanently deletes the MDX file. This action cannot be undone.

### Previewing Posts

Click **"Preview"** to open the live blog post in a new tab and see how it looks on your site.

### Markdown Formatting Tips

```markdown
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2

[Link text](https://example.com)

![Image alt text](/images/blog/image.jpg)

`inline code`

\`\`\`javascript
// Code block
const example = "code";
\`\`\`
```

---

## Work/Projects Management

### Viewing Projects

Navigate to **Work** to see all portfolio projects.

**Each project card shows:**
- Title with "Featured" badge (if featured)
- Publish date and category tag
- Summary excerpt
- Whether it has a cover image
- Preview and Edit buttons

### Creating a New Project

1. Click **"New Project"** button
2. Fill out the form:
   - **Title** (required): Project name
   - **Publish Date** (required): Project completion/publish date
   - **Summary** (required): Brief description
   - **Tag/Category**: E.g., "Healthcare AI", "Trading", "Automation"
   - **Featured**: Toggle ON to feature this project
   - **Cover Image**: Path to main project image
   - **Gallery Images**: Comma-separated list of image paths
   - **Content** (required): Full case study in Markdown/MDX

3. Click **"Create Project"** to publish

**Featured Projects:**
- Appear first in listings
- May be highlighted on homepage
- Good for your best work

### Gallery Images Format

Enter multiple images separated by commas:
```
/images/projects/my-project/image1.jpg, /images/projects/my-project/image2.jpg, /images/projects/my-project/image3.jpg
```

### Editing and Deleting Projects

Same process as blog posts:
- Click "Edit" to modify
- Click "Delete" (in edit mode) to remove
- Click "Preview" to view live

---

## Image Library

Navigate to **Images** to manage all site images.

### Uploading Images

1. Click **"Upload Images"** button
2. Select one or more image files
3. Wait for upload to complete
4. Images appear in the library immediately

**Upload Requirements:**
- **Accepted formats**: JPEG, PNG, GIF, WebP, SVG
- **Maximum size**: 5MB per file
- **Multiple files**: Upload many at once

**Images are saved to:**
```
/public/images/uploads/
```

**Filename format:**
```
1234567890-your-image-name.jpg
(timestamp + sanitized filename)
```

### Browsing Images

**Grid View:** All images displayed in a responsive grid

**Each image card shows:**
- Preview thumbnail
- Filename
- Category badge
- File size
- Full path
- Copy Path button
- Delete button

### Searching Images

Use the search box to filter by:
- Filename
- Path
- Any text in the image path

### Filtering by Category

Categories are auto-detected from the folder structure:
- `/images/blog/` → "blog" category
- `/images/projects/` → "projects" category
- `/images/gallery/` → "gallery" category
- `/images/uploads/` → "uploads" category

Click category buttons to filter.

### Copying Image Paths

1. Find your image in the library
2. Click **"Copy Path"** button
3. Path is copied to clipboard (e.g., `/images/uploads/12345-photo.jpg`)
4. Paste this path into blog posts or project image fields

### Deleting Images

1. Click **"Delete"** button on image card
2. Confirm deletion
3. Image file is permanently removed

**Warning:** Check if the image is used in any blog posts or projects before deleting!

---

## Gallery Management

Navigate to **Gallery** to view your gallery configuration.

### Current Limitations

The gallery editor is currently view-only. To modify the gallery:

1. Upload new images via the **Images** section
2. Copy the image paths
3. Edit `src/resources/content.js`
4. Find the `gallery` object
5. Add/remove/reorder images in the `images` array

**Example gallery configuration:**
```javascript
const gallery = {
  images: [
    {
      src: "/images/gallery/photo-1.jpg",
      alt: "Description of photo 1",
      orientation: "horizontal"  // or "vertical"
    },
    {
      src: "/images/gallery/photo-2.jpg",
      alt: "Description of photo 2",
      orientation: "vertical"
    },
  ],
};
```

### Image Orientation

- **horizontal**: Landscape/wide images
- **vertical**: Portrait/tall images

This affects how images are displayed in the gallery grid.

---

## Site Settings

Navigate to **Settings** to view your site configuration.

### Viewing Current Settings

The settings page displays:
- Profile information (name, role, email, location, avatar)
- Social media links
- Page configurations (home, about, blog, work)

### Editing Settings

Settings are managed in `src/resources/content.js`. To edit:

1. Open the file in your code editor
2. Find the relevant section:
   - `person` - Profile info
   - `social` - Social links
   - `home` - Homepage config
   - `about` - About page config
   - `blog` - Blog page config
   - `work` - Work page config

3. Update the values
4. Save the file
5. Reload your site to see changes

**Example - Updating profile:**
```javascript
const person = {
  firstName: "Your",
  lastName: "Name",
  role: "Your Role",
  email: "your.email@example.com",
  location: "Your/Timezone",
  avatar: "/images/your-avatar.jpg",
};
```

**Example - Adding social link:**
```javascript
const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/yourusername",
  },
  {
    name: "Twitter",
    icon: "twitter",
    link: "https://twitter.com/yourusername",
  },
  // Add more...
];
```

---

## Security & Best Practices

### Password Protection

**Changing your admin password:**

1. Edit `.env.local`
2. Update `PAGE_ACCESS_PASSWORD=new_password_here`
3. Restart your development server
4. Use new password to log in

**Password Requirements:**
- Use a strong, unique password
- Don't share it publicly
- Don't commit it to version control

### Session Management

- Sessions last 1 hour
- You'll be automatically logged out after expiration
- Re-enter password to continue

### Before Publishing

**Checklist:**
1. ✓ Preview all new/edited content
2. ✓ Check images load correctly
3. ✓ Verify links work
4. ✓ Test on mobile view
5. ✓ Run build to catch errors: `npm run build`

### Backup Recommendations

Before major changes:
1. Commit your current code to Git
2. Back up your MDX files
3. Back up your images
4. Test in development first

### File Naming Best Practices

**Blog/Project Files:**
- Use lowercase
- Use hyphens, not spaces
- Be descriptive: `ai-healthcare-platform.mdx`

**Images:**
- Use descriptive names
- Organize in folders by project/post
- Keep sizes reasonable (< 1MB when possible)

---

## Troubleshooting

### "Page not found" error

**Problem:** Can't access `/admin`

**Solutions:**
1. Check that you added the route to `once-ui.config.js`
2. Restart your dev server
3. Clear browser cache

### "Unauthorized" error

**Problem:** Can't access admin pages after login

**Solutions:**
1. Verify `PAGE_ACCESS_PASSWORD` is set in `.env.local`
2. Check that your session hasn't expired
3. Try logging in again
4. Clear cookies and try again

### Images not uploading

**Problem:** Upload fails or hangs

**Solutions:**
1. Check file size is under 5MB
2. Verify file format is supported (JPEG, PNG, GIF, WebP, SVG)
3. Check server logs for errors
4. Ensure `/public/images/uploads/` directory exists and is writable

### Blog post not appearing on site

**Problem:** Created post but not visible

**Solutions:**
1. Check that the MDX file was created in `src/app/blog/posts/`
2. Verify frontmatter is valid YAML
3. Check publish date is not in the future
4. Restart development server
5. Check for build errors: `npm run build`

### "Slug already exists" error

**Problem:** Can't create post/project with certain title

**Solutions:**
1. A file with that slug already exists
2. Choose a different title, or
3. Delete the existing file first

### Changes not showing on site

**Problem:** Edited content but site hasn't updated

**Solutions:**
1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Restart development server
3. Check file was actually saved
4. Clear Next.js cache: `rm -rf .next` then restart

### Images broken on site

**Problem:** Images show broken link icon

**Solutions:**
1. Verify image path starts with `/images/`
2. Check file actually exists in `/public/images/`
3. Check filename spelling matches exactly (case-sensitive)
4. Ensure image isn't corrupted

---

## Advanced Tips

### Markdown Power Features

**Headings with IDs:**
```markdown
## My Section {#custom-id}
```

**Tables:**
```markdown
| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

**Blockquotes:**
```markdown
> This is a quote
> It can span multiple lines
```

**Horizontal Rules:**
```markdown
---
```

### SEO Best Practices

**Blog Posts:**
- Write descriptive, keyword-rich titles
- Keep summaries under 160 characters
- Use relevant featured images
- Structure content with headings (##, ###)
- Include alt text for images

**Projects:**
- Clear, professional titles
- Detailed summaries
- High-quality cover images
- Use tags/categories consistently
- Feature your best work

### Performance Tips

**Images:**
- Compress before uploading
- Use modern formats (WebP when possible)
- Don't upload huge files (keep under 1MB)
- Use appropriate dimensions

**Content:**
- Keep MDX files focused
- Break long posts into series
- Use code blocks for code (not screenshots)
- Optimize GIFs (or convert to video)

---

## Quick Reference

### File Locations

| Content Type | Location |
|--------------|----------|
| Blog Posts | `src/app/blog/posts/*.mdx` |
| Work Projects | `src/app/work/projects/*.mdx` |
| Uploaded Images | `public/images/uploads/` |
| Site Config | `src/resources/content.js` |
| Routes Config | `src/resources/once-ui.config.js` |

### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/admin/blog` | POST | Create blog post |
| `/api/admin/blog/[slug]` | PUT | Update blog post |
| `/api/admin/blog/[slug]` | DELETE | Delete blog post |
| `/api/admin/work` | POST | Create project |
| `/api/admin/work/[slug]` | PUT | Update project |
| `/api/admin/work/[slug]` | DELETE | Delete project |
| `/api/admin/images` | GET | List images |
| `/api/admin/images/upload` | POST | Upload images |
| `/api/admin/images/delete` | DELETE | Delete image |

### Keyboard Shortcuts (In Development)

- **Ctrl/Cmd + K**: Focus search (when implemented)
- **Ctrl/Cmd + S**: Save form (browser default)
- **Esc**: Cancel/close modals

---

## Support & Resources

### Documentation
- [Once UI Documentation](https://once-ui.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Markdown Guide](https://www.markdownguide.org/)

### Getting Help

1. Check this guide first
2. Review error messages carefully
3. Check browser console for errors (F12)
4. Review server logs

### Feedback

To improve this admin panel, please provide feedback on:
- Features you'd like to see
- Usability issues
- Bugs or errors
- Performance concerns

---

**Last Updated:** January 2025
**Version:** 1.0.0
