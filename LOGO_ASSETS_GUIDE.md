# 🎨 OloSoma Logo Assets Guide

## Overview

This document specifies all logo files needed for the OloSoma website, including sizes, formats, and exact file locations.

---

## 📁 Directory Structure

All logo assets should be placed in the `/public` directory:

```
public/
├── favicon.ico                 # Browser tab icon (legacy)
├── favicon.svg                 # Modern SVG favicon
├── logo.svg                    # Main logo (SVG - recommended)
├── logo.png                    # Main logo (PNG fallback)
├── logo-light.svg              # Light mode logo (if different)
├── logo-dark.svg               # Dark mode logo (if different)
├── apple-touch-icon.png        # iOS home screen icon
├── og-image.jpg                # Social media preview image
└── icons/
    ├── icon-16x16.png          # Small favicon
    ├── icon-32x32.png          # Standard favicon
    ├── icon-192x192.png        # Android icon
    └── icon-512x512.png        # High-res Android icon
```

---

## 🖼️ Required Assets

### 1. **Favicon (Browser Tab Icon)**

#### `favicon.ico`
- **Location**: `/public/favicon.ico`
- **Size**: 32x32px (can contain multiple sizes: 16x16, 32x32, 48x48)
- **Format**: ICO
- **Purpose**: Legacy browser support
- **Design**: Simplified version of logo, recognizable at tiny size

#### `favicon.svg`
- **Location**: `/public/favicon.svg`
- **Size**: Scalable (viewBox="0 0 32 32" or similar)
- **Format**: SVG
- **Purpose**: Modern browsers with SVG support
- **Design**: Same as ICO but vector format

#### Additional Favicon Sizes (PNG)
- **Location**: `/public/icons/icon-16x16.png`
- **Size**: 16x16px
- **Format**: PNG with transparency

- **Location**: `/public/icons/icon-32x32.png`
- **Size**: 32x32px
- **Format**: PNG with transparency

---

### 2. **Main Logo (Header/Navigation)**

#### `logo.svg` (Primary - Recommended)
- **Location**: `/public/logo.svg`
- **Size**: Scalable vector
- **Recommended viewBox**: 200x60 or similar (your logo proportions)
- **Format**: SVG with embedded text or outlined fonts
- **Purpose**: Header logo, infinitely scalable
- **Notes**:
  - Should include the "OloSoma" text as you mentioned
  - Remove or make transparent any bounding circle
  - Optimize SVG (remove unnecessary metadata)

**OR**

#### `logo.png` (Fallback)
- **Location**: `/public/logo.png`
- **Size**: 400x120px @2x for retina displays (adjust to your proportions)
- **Format**: PNG with transparency
- **Purpose**: If SVG is not available
- **Background**: Transparent

---

### 3. **Small Logo (Mobile/Compact Views)**

#### `logo-small.svg` or `logo-icon.svg`
- **Location**: `/public/logo-small.svg` or `/public/logo-icon.svg`
- **Size**: Scalable, square (1:1 aspect ratio preferred)
- **Format**: SVG
- **Purpose**: Mobile menu, small screens
- **Design**: Icon/symbol only (no text), just the infinity symbol or brand mark

#### `logo-small.png` (Fallback)
- **Location**: `/public/logo-small.png`
- **Size**: 80x80px @2x (160x160px actual)
- **Format**: PNG with transparency

---

### 4. **Apple Touch Icon (iOS Home Screen)**

#### `apple-touch-icon.png`
- **Location**: `/public/apple-touch-icon.png`
- **Size**: 180x180px
- **Format**: PNG (no transparency - iOS adds rounded corners automatically)
- **Background**: Your brand color (#0a0a0a or #62bfa4)
- **Design**: Logo centered with padding, no text if too small
- **Purpose**: iOS home screen shortcut icon

---

### 5. **Android/PWA Icons**

#### `icon-192x192.png`
- **Location**: `/public/icons/icon-192x192.png`
- **Size**: 192x192px
- **Format**: PNG with transparency (or solid background)
- **Purpose**: Android home screen icon

#### `icon-512x512.png`
- **Location**: `/public/icons/icon-512x512.png`
- **Size**: 512x512px
- **Format**: PNG with transparency (or solid background)
- **Purpose**: Android splash screen, high-resolution displays

---

### 6. **Social Media / Open Graph Image**

#### `og-image.jpg` or `og-image.png`
- **Location**: `/public/og-image.jpg`
- **Size**: 1200x630px (Facebook/LinkedIn standard)
- **Format**: JPG (or PNG if transparency needed)
- **Purpose**: Preview image when sharing on social media
- **Design**:
  - Logo + tagline ("Where Potential Finds Form")
  - Neomorphic background
  - Ensure text is readable at small sizes
  - Safe area: Keep important content in center 1200x600px

**Alternative Sizes** (optional):
- `og-image-square.jpg` - 1200x1200px (Instagram)
- `og-image-twitter.jpg` - 1200x600px (Twitter/X)

---

### 7. **Alternative Logos** (Optional)

#### Light Mode Logo
- **Location**: `/public/logo-light.svg`
- **Purpose**: If logo needs to be different on light backgrounds
- **Format**: SVG

#### Dark Mode Logo
- **Location**: `/public/logo-dark.svg`
- **Purpose**: If logo needs to be different on dark backgrounds (current)
- **Format**: SVG

---

## 🎨 Design Specifications

### Logo Design Requirements

1. **Main Logo (`logo.svg`)**:
   - Include the full "OloSoma" text as part of the logo
   - Remove any bounding circle elements
   - Clean, minimal design
   - Teal accent color (#62bfa4) for brand elements
   - Works on dark background (#0a0a0a)
   - Scalable without losing detail

2. **Favicon/Small Icons**:
   - Simplified version of the logo
   - Recognizable at 16x16px
   - High contrast
   - Can be just the infinity symbol or abstract mark

3. **Color Modes**:
   - Primary: Works on dark backgrounds
   - If needed: Separate versions for light backgrounds

---

## 📐 Exact Dimensions Summary

| Asset                  | File Name                | Size (px)      | Format | Location              |
|------------------------|--------------------------|----------------|--------|-----------------------|
| Legacy Favicon         | favicon.ico              | 32x32          | ICO    | /public/              |
| Modern Favicon         | favicon.svg              | Scalable       | SVG    | /public/              |
| Small Favicon          | icon-16x16.png           | 16x16          | PNG    | /public/icons/        |
| Standard Favicon       | icon-32x32.png           | 32x32          | PNG    | /public/icons/        |
| **Main Logo**          | **logo.svg**             | **~400x120**   | **SVG**| **/public/**          |
| Main Logo (Fallback)   | logo.png                 | 800x240 @2x    | PNG    | /public/              |
| Small Logo             | logo-small.svg           | Square         | SVG    | /public/              |
| Apple Touch Icon       | apple-touch-icon.png     | 180x180        | PNG    | /public/              |
| Android Icon           | icon-192x192.png         | 192x192        | PNG    | /public/icons/        |
| Android Icon HD        | icon-512x512.png         | 512x512        | PNG    | /public/icons/        |
| **Social Preview**     | **og-image.jpg**         | **1200x630**   | **JPG**| **/public/**          |

---

## 🔧 Implementation

Once you provide the logo files, I will:

1. **Update Header Component** ([`components/layout/Header.tsx`](components/layout/Header.tsx))
   - Replace text "OloSoma" with `<Image>` component
   - Remove bounding circle styling
   - Implement responsive sizing

2. **Update Favicon** ([`app/layout.tsx`](app/layout.tsx))
   - Add proper `<link>` tags for all icon sizes
   - Configure Apple touch icon
   - Set up PWA manifest

3. **Update Metadata** ([`app/layout.tsx`](app/layout.tsx))
   - Update Open Graph image reference
   - Add Twitter card metadata
   - Configure proper alt texts

---

## 📦 File Preparation Checklist

Before uploading, ensure:

### For SVG Files:
- [ ] Remove unnecessary metadata/comments
- [ ] Outline all text (convert text to paths)
- [ ] Optimize with SVGO or similar
- [ ] Set proper viewBox dimensions
- [ ] Use relative units where possible
- [ ] Test on dark background (#0a0a0a)

### For PNG Files:
- [ ] Export at 2x resolution for retina displays
- [ ] Use transparency where appropriate
- [ ] Compress with TinyPNG or similar
- [ ] Verify quality at target size
- [ ] Test on dark background

### For ICO Files:
- [ ] Include multiple sizes (16x16, 32x32, 48x48)
- [ ] Test in browser tab
- [ ] Ensure recognizable at smallest size

### For OG Image:
- [ ] Test preview in [OpenGraph.xyz](https://opengraph.xyz)
- [ ] Verify text readability at small size
- [ ] Check mobile preview appearance
- [ ] Ensure brand consistency

---

## 🚀 Next Steps

### What I Need From You:

1. **Primary Logo File** (SVG or PNG)
   - Full logo with "OloSoma" text
   - Without bounding circle
   - On transparent background
   - Optimized for dark mode

2. **Favicon/Icon Version** (SVG or PNG)
   - Simplified symbol/mark
   - Square format (1:1 ratio)
   - Works at 16x16px

3. **Optional: OG Image** (JPG/PNG)
   - 1200x630px social preview
   - Or I can create one using your logo

### Where to Place Files:

Upload all files to:
```
C:\Users\manue\Desktop\Olosoma\web\OloSoma_Website\public\
```

---

## 💡 Tips

### If You Only Have One Logo File:

If you only have one master logo file (e.g., a high-res PNG or AI/Figma file), provide that and I can help generate the various sizes needed.

### Logo Optimization Tools:

- **SVG**: [SVGOMG](https://jakearchibald.github.io/svgomg/)
- **PNG**: [TinyPNG](https://tinypng.com/)
- **ICO Generator**: [RealFaviconGenerator](https://realfavicongenerator.net/)

### Quick Start:

**Minimum Required for Launch**:
1. `logo.svg` or `logo.png` (main header logo)
2. `favicon.ico` (browser tab)
3. `og-image.jpg` (social sharing)

All other sizes can be generated if you provide high-resolution source files.

---

## 📞 Questions?

Let me know:
1. What logo files do you currently have?
2. What format are they in?
3. Do you need help generating any specific sizes?

Once you provide the files, I'll immediately update the Header component and all metadata configurations!

---

**Ready to receive your logo assets!** 🎨
