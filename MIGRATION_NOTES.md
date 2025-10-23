# Migration to Experimental Landing (October 23, 2025)

## Overview
Migrated from original homepage to experimental landing page as the default experience.

## What Changed

### 🔄 **Routing & Navigation**
- **Before**: Default homepage at `/` with option to view experimental via `/?intro=experimental`
- **After**: Experimental landing is now the default and only homepage
- Removed query parameter logic entirely

### 🏗️ **Architecture Changes**

#### Modified Files:
1. **`app/page.tsx`**
   - Now imports and renders `ExperimentalLanding` directly
   - Removed old homepage components (Hero, Philosophy, ServicesSection, DualVision, ClosingCTA)

2. **`app/layout.tsx`**
   - Removed `Header` and `Footer` imports (ExperimentalLanding has built-in SideMenu navigation)
   - Updated metadata to reflect new brand messaging: "Systems of Meaning"
   - Simplified layout - just IntroWrapper + children

3. **`components/intro/IntroWrapper.tsx`**
   - Removed experimental mode detection logic
   - Removed `IntroExperience` import and conditional rendering
   - Always uses `LightBeamExperience` intro
   - Simplified from ~70 lines to ~50 lines

### 📦 **Archived Components**
Moved to `components/_archive/original-homepage/` (not deleted):
- `components/features/` - All original homepage sections
  - `hero/Hero.tsx`
  - `philosophy/Philosophy.tsx`
  - `services/ServicesSection.tsx`
  - `team/DualVision.tsx`
  - `cta/ClosingCTA.tsx`
- `components/intro/IntroExperience.tsx` - Original infinity loop intro

### 🎨 **New Default Experience**

**ExperimentalLanding Features:**
- Brutalist typography-led hero
- Color-transitioning logo (no scaling)
- Animated morphing gradient backgrounds
- Services sections with alternating blur effects
- About section with company philosophy
- Mesmerizing contact section
- Built-in SideMenu with vertical navigation

**Intro Experience:**
- Light beam animation with grid text reveals
- Waypoint-based choreography
- 6x6 grid layout (2x6 on mobile)
- Smooth fade to main content

## Backup Branch
Original design preserved in branch: `design-23102025`

```bash
# To view original design:
git checkout design-23102025
npm run dev
```

## Technical Improvements
- Cleaner routing (no query parameter logic)
- Reduced bundle size (removed unused homepage components)
- Better SEO metadata
- Single source of truth for navigation

## Developer Notes
- ExperimentalLanding is self-contained with its own navigation
- No need for separate Header/Footer in layout
- Intro experience remains unchanged (LightBeamExperience)
- All archived components remain intact for reference or future use

---

**Migration Date**: October 23, 2025
**Backup Branch**: `design-23102025`
**Status**: ✅ Complete
