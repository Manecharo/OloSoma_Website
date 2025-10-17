# OloSoma Website - Deployment Guide

Quick guide to deploy your website to Vercel and configure your custom domain.

---

## 📋 Pre-Deployment Checklist

### 1. Test Local Build
```bash
npm run build
```
✅ Ensure build completes without errors

### 2. Review Environment Variables
Create `.env.local` file (already in .gitignore):
```env
# Optional - Add when ready
RESEND_API_KEY=re_xxxxxxxxxxxx
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-link
```

### 3. Update Social Media Links
Edit `components/layout/Footer.tsx`:
- Replace `#` with actual social media URLs
- LinkedIn, Instagram, Behance

---

## 🚀 Deploy to Vercel (Recommended)

### Method 1: Via GitHub (Recommended)

#### Step 1: Push to GitHub
```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: OloSoma website"

# Create GitHub repository at github.com
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/olosoma-website.git
git branch -M main
git push -u origin main
```

#### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

#### Step 3: Add Environment Variables (Optional)
In Vercel dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add variables:
   ```
   RESEND_API_KEY=your_key_here
   NEXT_PUBLIC_CALENDLY_URL=your_calendly_link
   ```

#### Step 4: Deploy!
- Click **"Deploy"**
- Wait 2-3 minutes
- Your site will be live at `your-project.vercel.app`

---

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production
vercel --prod
```

---

## 🌐 Configure Custom Domain

### Step 1: Add Domain in Vercel
1. Go to your project in Vercel dashboard
2. Click **Settings** → **Domains**
3. Click **"Add Domain"**
4. Enter your domain: `olosoma.com`

### Step 2: Update DNS Records

Vercel will provide DNS configuration. Two options:

#### Option A: Use Vercel Nameservers (Easiest)
Update at your domain registrar:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

#### Option B: Add A/CNAME Records
Add these records at your domain registrar:

For root domain (`olosoma.com`):
```
Type: A
Name: @
Value: 76.76.21.21
```

For www subdomain:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: Wait for Propagation
- DNS changes can take 24-48 hours
- Usually propagates in 1-2 hours
- Check status in Vercel dashboard

### Step 4: Verify SSL Certificate
- Vercel automatically provisions SSL
- Your site will be accessible at `https://olosoma.com`

---

## 📧 Email Service Setup (Resend)

### Step 1: Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for free account
3. Verify your email

### Step 2: Add Domain
1. In Resend dashboard, go to **Domains**
2. Click **"Add Domain"**
3. Enter `olosoma.com`
4. Add DNS records provided:
   ```
   TXT record for verification
   MX records for email delivery
   ```

### Step 3: Generate API Key
1. Go to **API Keys**
2. Click **"Create API Key"**
3. Copy the key (starts with `re_`)

### Step 4: Add to Vercel
1. In Vercel dashboard → **Settings** → **Environment Variables**
2. Add: `RESEND_API_KEY=re_xxxxxxxxxxxx`
3. Redeploy your site

### Step 5: Enable Email in Code
Uncomment the Resend code in `app/actions/contact.ts`:
```typescript
const { Resend } = await import('resend')
const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'contact@olosoma.com',
  to: 'hello@olosoma.com',
  subject: `New contact from ${name}`,
  html: `...`
})
```

---

## 📅 Calendly Integration

### Step 1: Create Calendly Account
1. Go to [calendly.com](https://calendly.com)
2. Sign up and create event type
3. Configure "Discovery Call" event (30 minutes)

### Step 2: Get Embed Link
1. In Calendly dashboard, go to your event
2. Click **"Share"** → **"Embed"**
3. Choose **"Inline Embed"**
4. Copy the URL (e.g., `https://calendly.com/olosoma/discovery`)

### Step 3: Add to Website
Edit `app/connect/page.tsx`:
```tsx
// Replace placeholder with:
<div
  className="calendly-inline-widget"
  data-url="https://calendly.com/olosoma/discovery"
  style={{ minWidth: '320px', height: '630px' }}
/>

// Add script to head (or use next/script):
<Script
  src="https://assets.calendly.com/assets/external/widget.js"
  async
/>
```

---

## 🔍 SEO Configuration

### Update Metadata (if needed)
Edit `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://olosoma.com'), // Update URL
  // ... rest of metadata
}
```

### Generate Sitemap
Create `app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://olosoma.com'

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/studio`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/services/olopulse`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/services/somaweave`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/services/somaforge`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/connect`, lastModified: new Date(), priority: 0.8 },
  ]
}
```

### Add robots.txt
Create `app/robots.ts`:
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://olosoma.com/sitemap.xml',
  }
}
```

---

## 📊 Analytics Setup (Optional)

### Google Analytics
1. Create GA4 property
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
4. Add to `app/layout.tsx`:
   ```tsx
   import Script from 'next/script'

   // In <body>:
   <Script
     src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
     strategy="afterInteractive"
   />
   <Script id="google-analytics" strategy="afterInteractive">
     {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
     `}
   </Script>
   ```

### Vercel Analytics (Easier)
1. In Vercel dashboard → **Analytics**
2. Enable Vercel Analytics (free)
3. Automatically tracks Core Web Vitals
4. No code changes needed!

---

## ✅ Post-Deployment Checklist

### Test Everything
- [ ] Visit your live URL
- [ ] Test all navigation links
- [ ] Submit contact form
- [ ] Check mobile responsiveness
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Verify SSL certificate (https://)
- [ ] Check page load speeds
- [ ] Test on actual mobile devices

### Monitor Performance
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals in Vercel
- [ ] Monitor contact form submissions
- [ ] Set up error tracking (Sentry optional)

### Share!
- [ ] Share with your team
- [ ] Post on social media
- [ ] Update business cards
- [ ] Add to email signatures
- [ ] Submit to search engines

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Domain Not Working
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- Try incognito/private browsing
- Clear browser cache

### Contact Form Not Sending Emails
- Check Resend API key is set in Vercel
- Verify domain in Resend dashboard
- Check console logs for errors
- Test with simple console.log first

### Slow Performance
- Enable Vercel Analytics
- Check image optimization
- Review Lighthouse suggestions
- Consider lazy loading images

---

## 🎯 Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server

# Production Build
npm run build            # Build for production
npm start                # Start production server

# Deployment
git push origin main     # Deploy via GitHub → Vercel
vercel --prod            # Deploy via CLI

# Testing
npm run lint             # Check for errors
```

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Resend Docs**: https://resend.com/docs
- **Calendly Docs**: https://help.calendly.com

---

## 🎉 You're Ready!

Your OloSoma website is ready to go live. Follow these steps and you'll have a professional, fast, and beautiful website deployed in minutes!

**Good luck with your launch! 🚀**
