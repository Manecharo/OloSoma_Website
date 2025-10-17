# Vercel Deployment Guide - OloSoma Website

Complete step-by-step guide to deploy your OloSoma website to Vercel.

---

## Prerequisites

- [x] Website tested locally and working (http://localhost:3001)
- [ ] GitHub account
- [ ] Vercel account (free tier is sufficient)
- [ ] Git installed on your computer

---

## Step 1: Initialize Git Repository

Since your project is not yet a git repository, let's set it up:

```bash
# Navigate to your project directory
cd C:\Users\manue\Desktop\Olosoma\web\OloSoma_Website

# Initialize git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: OloSoma website with interactive effects"
```

---

## Step 2: Create GitHub Repository

### Option A: Using GitHub CLI (Recommended)

```bash
# Install GitHub CLI if not already installed
# Download from: https://cli.github.com/

# Login to GitHub
gh auth login

# Create new repository and push
gh repo create OloSoma_Website --public --source=. --remote=origin --push
```

### Option B: Using GitHub Web Interface

1. Go to [github.com](https://github.com)
2. Click the `+` icon → `New repository`
3. Name: `OloSoma_Website`
4. Description: `OloSoma design consultancy website`
5. Visibility: `Public` (or Private if you prefer)
6. **DO NOT** initialize with README, .gitignore, or license
7. Click `Create repository`

Then push your local repository:

```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/OloSoma_Website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Vercel

### Option A: Using Vercel CLI (Fastest)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (run from project root)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - What's your project's name? olosoma-website
# - In which directory is your code located? ./
# - Want to modify settings? No

# For production deployment
vercel --prod
```

### Option B: Using Vercel Dashboard (Recommended for First Time)

1. Go to [vercel.com](https://vercel.com)
2. Click `Sign Up` or `Log In`
3. Choose `Continue with GitHub`
4. Authorize Vercel to access your GitHub account

**Import Your Project:**

1. Click `Add New...` → `Project`
2. Find `OloSoma_Website` in the list
3. Click `Import`

**Configure Project:**

1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: `./` (leave as default)
3. **Build Command**: `next build` (auto-filled)
4. **Output Directory**: `.next` (auto-filled)
5. **Install Command**: `npm install` (auto-filled)

**Environment Variables** (Add these now or later):

Click `Environment Variables` and add:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

> **Note**: Other environment variables (RESEND_API_KEY, Sanity credentials) are optional and can be added later when you set up those services.

6. Click `Deploy`

---

## Step 4: Wait for Deployment

Vercel will now:
1. Install dependencies (~2-3 minutes)
2. Build your Next.js app (~1-2 minutes)
3. Deploy to their global CDN (~30 seconds)

**Total time**: ~3-5 minutes

---

## Step 5: Verify Deployment

Once deployed, Vercel will provide a URL like:
- `https://olosoma-website.vercel.app`
- `https://olosoma-website-your-username.vercel.app`

**Test the following:**

### Desktop Testing:
- [ ] Homepage loads with logo
- [ ] Cursor trail effect appears when moving mouse
- [ ] Logo displays correctly in header
- [ ] Logo displays correctly in hero section
- [ ] All buttons have magnetic effect
- [ ] Smooth animations on scroll
- [ ] Navigation works
- [ ] All pages load (Studio, Connect)

### Mobile Testing:
- [ ] Touch ripple effects work
- [ ] Gyroscope parallax works (if device supports)
- [ ] No cursor trail (desktop only)
- [ ] Logo displays correctly
- [ ] Navigation menu works
- [ ] All pages accessible

### Performance:
- [ ] Page loads in <3 seconds
- [ ] Lighthouse score >90
- [ ] No console errors
- [ ] All images load correctly

---

## Step 6: Add Custom Domain (Optional)

### If you own olosoma.com:

1. In Vercel Dashboard → Your Project
2. Go to `Settings` → `Domains`
3. Click `Add`
4. Enter: `olosoma.com`
5. Click `Add`

**Configure DNS** (at your domain registrar):

Add these DNS records:

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

**For www.olosoma.com redirect:**

Vercel will automatically redirect www → non-www (or vice versa).

---

## Step 7: Environment Variables Setup

When you're ready to enable additional features:

### For Contact Form (Resend):

1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. In Vercel: `Settings` → `Environment Variables`
4. Add: `RESEND_API_KEY` = `re_xxxxxxxxxxxx`

### For Sanity CMS:

1. Set up Sanity project
2. Add these environment variables in Vercel:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_READ_TOKEN`

**After adding environment variables:**
- Redeploy: `Deployments` → Latest → `...` → `Redeploy`

---

## Continuous Deployment

Now that everything is connected:

**Every time you push to GitHub:**
```bash
git add .
git commit -m "Update hero section"
git push origin main
```

**Vercel will automatically:**
1. Detect the push
2. Build the new version
3. Deploy to production
4. You'll get a deployment notification

---

## Troubleshooting

### Build Fails

**Error**: `Module not found`
- **Fix**: Make sure all dependencies are in `package.json`
- Run: `npm install` locally to verify

**Error**: `Build timeout`
- **Fix**: Contact Vercel support for increased timeout (rare)

### Environment Variables Not Working

- Make sure variables start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding variables
- Check capitalization (case-sensitive)

### Images Not Loading

- Verify images exist in `/public` directory
- Check image paths (case-sensitive on Vercel)
- Ensure `logo.svg` is lowercase

### Cursor Trail Not Working

- Check browser console for errors
- Verify it's a desktop device (mobile disabled by design)
- Test in different browser

---

## Deployment Checklist

Before going live:

- [ ] All pages tested locally
- [ ] Logo displays correctly
- [ ] Interactive effects working
- [ ] Contact form tested (if enabled)
- [ ] Mobile responsive design verified
- [ ] All links work
- [ ] SEO metadata correct
- [ ] OG image set (for social sharing)
- [ ] Favicon displays correctly
- [ ] No console errors
- [ ] Performance tested (Lighthouse)
- [ ] Git repository created
- [ ] Code pushed to GitHub
- [ ] Vercel project connected
- [ ] Deployment successful
- [ ] Production URL tested
- [ ] Custom domain configured (optional)

---

## Production URLs

After deployment, your site will be available at:

- **Vercel URL**: `https://olosoma-website.vercel.app`
- **Custom Domain**: `https://olosoma.com` (after DNS setup)

---

## Useful Commands

```bash
# Local development
npm run dev

# Build for production locally
npm run build

# Start production server locally
npm start

# Deploy to Vercel
vercel --prod

# Check deployment logs
vercel logs

# List deployments
vercel ls
```

---

## Support Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)

---

## What's Deployed

Your deployment includes:

- Next.js 15.5.5 app with App Router
- React 19.2.0 components
- Framer Motion animations
- GSAP magnetic effects
- Custom cursor trail effect
- Neomorphic UI components
- Responsive design
- SEO optimization
- Performance optimization
- All interactive effects
- Error handling
- 404 page
- Favicon and icons
- Logo assets

---

## Performance Optimizations Already Included

- Image optimization (Next.js Image component)
- Code splitting (automatic with Next.js)
- Compression enabled
- Security headers configured
- Hardware acceleration for animations
- Efficient particle rendering
- Throttled event listeners
- Device-specific rendering
- Accessibility support (prefers-reduced-motion)

---

## Next Steps After Deployment

1. **Monitor Performance**: Check Vercel Analytics
2. **Set Up Error Tracking**: Consider Sentry integration
3. **Enable Contact Form**: Add Resend API key
4. **Configure Sanity CMS**: For content management
5. **Add Custom Domain**: Connect olosoma.com
6. **SEO Optimization**: Submit sitemap to Google
7. **Social Media**: Share your live site!

---

## Status

- [x] Project configuration verified
- [x] Build settings confirmed
- [ ] Git repository initialized
- [ ] GitHub repository created
- [ ] Vercel project deployed
- [ ] Production URL live
- [ ] Custom domain configured

---

**Ready to deploy!** Follow the steps above and your OloSoma website will be live in minutes.
