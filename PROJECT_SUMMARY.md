# OloSoma Website - Project Summary & Memory Bank

## 🎯 Project Overview

**Company**: OloSoma Global Consultancy
**Website Purpose**: Attract high-caliber clients + establish brand authority
**Design Philosophy**: "Futuristic spaceship designed by Mies van der Rohe" - neomorphic minimalism
**Color Scheme**: Black (#0a0a0a) with Teal accent (#62bfa4)
**Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP

## 🏢 Company Services

### 1. oloPulse™ — Strategy & Vision
**Tagline**: "Where potential finds its path"
**Focus**: Strategic ignition from concept to integrated reality
**Fusion of**: Original oloPulse + somaPath

### 2. somaWeave™ — Experience Design
**Tagline**: "Where worlds become seamless"
**Focus**: Multi-dimensional experience building (physical + digital + service)
**Core Offering**: Stands alone

### 3. somaForge™ — Form & Identity
**Tagline**: "Where ideas take shape"
**Focus**: Rapid materialization from prototype to presence
**Fusion of**: oloForge + somaAura

## 🎨 Brand Philosophy

**olo**: The unseen—pure thought, strategy, possibility waiting to be realized
**soma**: The tangible—experience, interface, space made real through design

This duality represents the journey from idea to reality, from soft logic to real form.

## 👥 Founding Team

**Diogo Rodrigues** - Spatial & Service Design
- European luxury hospitality expertise
- Focus: HORECA, luxury retail, service blueprinting
- Markets: Europe & Middle East

**Manuel [Last Name]** - Industrial & Digital Design
- Product strategist and rapid prototyper
- Focus: Industrial design, UX/UI, cultural IP innovation
- Markets: Latin America & Asia

## 📁 Site Map

```
/               → Homepage (single scroll)
/studio         → About + philosophy
/services
  /olopulse     → Strategy & Vision service
  /somaweave    → Experience Design service
  /somaforge    → Form & Identity service
/connect        → Contact + calendar booking
/work           → Future: CMS-driven case studies
```

## 🎨 Design System Specifications

### Colors
```css
Primary Black:     #0a0a0a (backgrounds)
Elevated:          #1a1a1a (cards, surfaces)
Brand Teal:        #62bfa4 (accents, interactions)
Pure White:        #FFFFFF (text)
```

### Neomorphic Shadows
```css
Raised:
  box-shadow: 8px 8px 16px rgba(0,0,0,0.6),
              -8px -8px 16px rgba(98,191,164,0.08);

Pressed:
  box-shadow: inset 6px 6px 12px rgba(0,0,0,0.7),
              inset -6px -6px 12px rgba(98,191,164,0.05);

Glow (hover):
  box-shadow: 0 0 20px rgba(98,191,164,0.3);
```

### Typography
- **Headings**: Inter
  - H1: 64px / 400 weight / -2% tracking
  - H2: 48px / 400 weight / -1% tracking
- **Body**: Inter
  - Large: 18px / 400 weight / 1.6 line-height
  - Base: 16px / 400 weight / 1.7 line-height

### Spacing System
Based on 8px grid: xs(8px), sm(16px), md(24px), lg(48px), xl(96px), 2xl(144px)

## 🎬 Micro-Interactions Catalogue

1. **Logo Morph**: Infinity loop breathes on 4s cycle (Framer Motion)
2. **Cursor Halo**: 40px soft glow follows cursor (desktop only)
3. **Neomorphic Cards**: Hover transitions raised→pressed with teal glow
4. **Infinite Logo Carousel**: 20px/sec horizontal scroll, pauses on hover
5. **Scroll Parallax**: Background(-0.3x), Foreground(1.2x) multipliers
6. **Gyroscope Tilt**: 2-3° parallax shift on mobile (max 15°)
7. **Section Reveal**: Fade up on 50% viewport with staggered children
8. **Text Shimmer**: Gradient sweep on cursor proximity (<100px)
9. **CTA Breathing**: Border glow pulses 2-4px on 3s cycle
10. **Form Focus**: Input "pushes in" with teal left border

## 📦 Current Project Status

### ✅ Completed
- [x] Next.js 15 project initialized with TypeScript
- [x] Tailwind CSS configured with neomorphic design system
- [x] Global styles with all component classes
- [x] Dependencies installed (Framer Motion, GSAP, React Hook Form, Zod, Resend)
- [x] Development server running
- [x] Basic test page with neomorphic styling
- [x] Project documentation (README, Implementation Guide)

### 🔄 In Progress
- [ ] Component library (Button, Card, Input, Checkbox)
- [ ] Homepage sections
- [ ] Service detail pages
- [ ] Contact form with email integration

### 📋 Pending
- [ ] Navigation/Header component
- [ ] Footer component
- [ ] Animations implementation (logo morph, parallax, cursor halo)
- [ ] Sanity CMS setup (for future case studies)
- [ ] About page (/studio)
- [ ] SEO optimization
- [ ] Performance testing
- [ ] Vercel deployment
- [ ] Custom domain configuration

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

**Development URL**: http://localhost:3000

## 📂 Project Structure

```
OloSoma_Website/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Neomorphic design system
│   └── actions/            # Server actions (forms)
├── components/
│   ├── ui/                 # Reusable UI (Button, Card, Input)
│   ├── features/           # Feature components (Hero, Services)
│   ├── layout/             # Header, Footer
│   └── animations/         # Motion wrappers
├── lib/                    # Utilities
├── public/                 # Static assets
└── sanity/                 # CMS (to be added)
```

## 🚀 Next Immediate Steps

1. **Create Component Library** (1-2 days)
   - Motion wrappers (`MotionDiv`, `MotionSection`)
   - `NeuButton` component
   - `NeuCard` component
   - `NeuInput` component
   - `NeuCheckbox` component

2. **Build Homepage** (3-4 days)
   - Hero section with animated logo
   - Philosophy block (olo vs soma split)
   - Services section (3 cards)
   - Dual vision section (founders)
   - Trust indicators (logo carousel)
   - Closing CTA

3. **Create Service Pages** (2-3 days)
   - Service detail template
   - oloPulse page
   - somaWeave page
   - somaForge page

4. **Build Contact Page** (1-2 days)
   - Contact form with validation
   - Resend email integration
   - Calendly booking widget
   - Success/error states

5. **Deploy** (1 day)
   - Push to GitHub
   - Deploy to Vercel
   - Configure environment variables
   - Set up custom domain

## 📧 Environment Variables Needed

```bash
# Email (Resend) - for contact form
RESEND_API_KEY=re_xxxxxxxxxxxx

# Site URL
NEXT_PUBLIC_SITE_URL=https://olosoma.com

# Calendly (optional)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
```

## 🎯 Performance Goals

- Lighthouse Score: 95+ (Performance, Accessibility, SEO)
- First Contentful Paint: <1.2s
- Time to Interactive: <2.5s
- 60fps on all interactions

## 📚 Key Resources

- [README.md](./README.md) - Quick start guide
- [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - Detailed step-by-step implementation
- [.env.example](./.env.example) - Environment variables template

## 💡 Design Principles

1. **Restrained & Precise**: Every element has purpose
2. **Weightless Interactions**: Smooth 60fps animations
3. **Soft Logic**: Gradients represent the unseen (olo)
4. **Real Form**: Solid neomorphic shapes represent the tangible (soma)
5. **Cultural Intelligence**: Global reach with local expertise

## 📞 Contact Integration

- **Contact Form**: Server-side validation with Zod, emails via Resend
- **Calendly**: Embed for 30-minute discovery calls
- **Email**: hello@olosoma.com

---

**Note**: All website copy, service descriptions, and content are documented in your original design brief. Reference that document for exact wording when building pages.

---

**Last Updated**: October 16, 2025
**Status**: Foundation complete, ready for component development
**Dev Server**: ✅ Running at http://localhost:3000
