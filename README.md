# OloSoma Website

A Next.js 15 website featuring neomorphic design with a black background and teal accent color (#62bfa4).

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
OloSoma_Website/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles with neomorphic design system
│   ├── studio/             # About page
│   ├── services/           # Service pages
│   │   ├── olopulse/
│   │   ├── somaweave/
│   │   └── somaforge/
│   └── connect/            # Contact page
├── components/             # Reusable React components
│   ├── ui/                 # UI components (Button, Card, Input, etc.)
│   ├── layout/             # Layout components (Header, Footer)
│   └── features/           # Feature-specific components
├── lib/                    # Utilities and helpers
├── sanity/                 # Sanity CMS configuration (to be added)
│   ├── lib/                # Sanity client and queries
│   └── schemas/            # Content schemas
├── public/                 # Static assets
│   ├── images/
│   └── fonts/
└── README.md
```

## 🎨 Design System

### Colors
- **Primary Black**: `#000000` (#0a0a0a for backgrounds)
- **Elevated Black**: `#1a1a1a` (for cards and elevated surfaces)
- **Brand Teal**: `#62bfa4` (accent color for interactions and highlights)
- **Pure White**: `#FFFFFF` (for text and key highlights)

### Neomorphic Components

The design system includes pre-built neomorphic components:

#### Buttons
```tsx
<button className="neu-button neu-button-primary">Primary Button</button>
<button className="neu-button neu-button-secondary">Secondary Button</button>
```

#### Cards
```tsx
<div className="neu-card">
  <div className="neu-card-header">
    <h3>Card Title</h3>
  </div>
  <p>Card content...</p>
</div>
```

#### Form Inputs
```tsx
<div className="neu-input-group">
  <label className="neu-input-label">Name</label>
  <input type="text" className="neu-input" placeholder="Enter your name" />
</div>
```

#### Checkboxes
```tsx
<label className="neu-checkbox-wrapper">
  <input type="checkbox" className="neu-checkbox-input" />
  <span className="neu-checkbox-box"></span>
  <span className="neu-checkbox-label">Accept terms</span>
</label>
```

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom neomorphic utilities
- **Animations**: Framer Motion + GSAP
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend
- **CMS**: Sanity.io (to be configured)

## 🛠️ Dependencies

### Core
- `next`: ^15.5.5
- `react`: ^19.2.0
- `react-dom`: ^19.2.0
- `typescript`: ^5

### Animations
- `framer-motion`: ^12.23.24
- `gsap`: ^3.13.0
- `@gsap/react`: ^2.1.2

### Forms & Validation
- `react-hook-form`: ^7.65.0
- `@hookform/resolvers`: ^5.2.2
- `zod`: ^4.1.12

### Other
- `resend`: ^6.1.3 (Email service)
- `@portabletext/react`: ^4.0.3 (Rich text rendering)
- `@sanity/image-url`: ^1.1.0 (Image URL builder)

## 🎯 Next Steps

### 1. Create Component Library
Create reusable components in `/components`:
- NeuButton
- NeuCard
- NeuInput
- NeuCheckbox
- Navigation/Header
- Footer

### 2. Build Homepage
Implement all homepage sections:
- **Hero**: Animated logo with infinity loop morph
- **Philosophy Block**: Split-screen (olo vs soma)
- **Services Section**: 3 neomorphic cards (oloPulse, somaWeave, somaForge)
- **Dual Vision**: Founders' profiles
- **Trust Indicators**: Logo carousel
- **CTA Section**: Contact buttons

### 3. Create Pages
- `/studio` - About page with philosophy
- `/services/olopulse` - Strategy & Vision service
- `/services/somaweave` - Experience Design service
- `/services/somaforge` - Form & Identity service
- `/connect` - Contact form + Calendly integration

### 4. Set Up Sanity CMS
Configure Sanity for future case studies:
```bash
# Install Sanity dependencies (when ready)
npm install sanity next-sanity

# Initialize Sanity project
npx sanity init
```

### 5. Implement Animations
- Logo morph animation (Framer Motion)
- Scroll-based parallax (GSAP ScrollTrigger)
- Cursor halo effect
- Card hover interactions
- Breathing CTA buttons

### 6. Configure Email Service
Set up Resend for contact form:
1. Create account at resend.com
2. Generate API key
3. Add to `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
```

### 7. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Configure custom domain
```

## 🔐 Environment Variables

Create a `.env.local` file:

```bash
# Sanity (to be added later)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token

# Email (Resend)
RESEND_API_KEY=your_resend_key

# Site URL
NEXT_PUBLIC_SITE_URL=https://olosoma.com
```

## 📝 Content Structure

### Services
1. **oloPulse™** - Strategy & Vision
   - Tagline: "Where potential finds its path"
   - Focus: Strategic direction, roadmapping

2. **somaWeave™** - Experience Design
   - Tagline: "Where worlds become seamless"
   - Focus: Spatial + digital + service integration

3. **somaForge™** - Form & Identity
   - Tagline: "Where ideas take shape"
   - Focus: Product design, branding, prototyping

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

Private - All rights reserved by OloSoma Design Consultancy

## 🆘 Support

For questions or issues, contact the development team.

---

**Built with ❤️ using Next.js and neomorphic design principles**
