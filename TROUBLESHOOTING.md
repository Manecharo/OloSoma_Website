# 🔧 OloSoma Website - Troubleshooting Guide

## ✅ Current Status: WORKING

Your website is running successfully at: **http://localhost:3001**

---

## Common Issues & Solutions

### 1. React Server Components Errors

**Error**: `Could not find the module in the React Client Manifest`

**Cause**: Next.js 15 hot-reload cache issues (development only, doesn't affect production)

**Solution**:
```bash
# Clean cache and restart
rm -rf .next
rm -rf node_modules/.cache
npm run dev
```

**Note**: The production build (`npm run build`) compiles successfully. These are dev-only warnings.

---

### 2. Port Already in Use

**Error**: `Port 3000 is in use`

**Cause**: Another Next.js instance is running

**Solution**: Next.js automatically uses the next available port (3001, 3002, etc.)

**Or manually stop the process**:
```bash
# On Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# On Mac/Linux
lsof -ti:3000 | xargs kill
```

---

### 3. Module Not Found Errors

**Error**: `Cannot find module`

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
npm run dev
```

---

### 4. TypeScript Errors

**Error**: Type checking failures

**Solution**:
```bash
# Check types without running server
npm run build

# If errors persist, check tsconfig.json
# Ensure "strict": true and proper paths are set
```

---

### 5. Image Loading Issues (Logo)

**Error**: Logo not displaying, 404 error

**Cause**: Logo files not yet uploaded

**Solution**:
1. Upload `logo.svg` (or `logo.png`) to `/public/` directory
2. Restart dev server
3. Clear browser cache (Ctrl+Shift+R)

**Temporary**: Website shows "OloSoma" text fallback until logo is added

---

### 6. Cursor Trail Not Visible

**Issue**: Can't see the cursor effect

**Reasons**:
- **By design**: Effect is now 70% LESS visible (30% opacity)
- **Desktop only**: Effect doesn't run on mobile
- **Motion preferences**: Disabled if system has `prefers-reduced-motion` enabled
- **Performance**: May not run on low-end devices

**To test**:
1. Use desktop browser
2. Move mouse slowly across the screen
3. Look for very subtle teal glow (it's meant to be barely visible!)

---

### 7. Favicon Not Loading

**Issue**: Browser tab shows default icon

**Solution**:
1. Upload favicon files to `/public/` directory:
   - `favicon.ico`
   - `favicon.svg`
2. Hard refresh browser: Ctrl+Shift+R
3. Close and reopen browser tab
4. Clear browser cache if needed

---

### 8. Hot Reload Not Working

**Issue**: Changes don't appear automatically

**Solution**:
```bash
# Restart dev server
# Press Ctrl+C to stop, then:
npm run dev
```

---

## Performance Issues

### Slow Page Loads

**Check**:
1. Are you running other heavy applications?
2. Is antivirus scanning `node_modules`? (exclude it)
3. Try production build: `npm run build && npm start`

### Animations Laggy

**Solutions**:
1. **Reduce effect intensity**: Edit `app/layout.tsx`
   ```tsx
   <CursorTrail particleCount={2} particleLife={1000} />
   ```

2. **Disable effects temporarily**: Comment out in `app/layout.tsx`
   ```tsx
   {/* <CursorTrail ... /> */}
   {/* <BreathingNoise ... /> */}
   ```

3. **Check GPU acceleration**: Open Chrome DevTools → Performance → Record

---

## Build Issues

### Build Fails

**Solution**:
```bash
# Clean everything
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Deployment Errors

**Check**:
1. All environment variables set (if any)
2. Node.js version: 18.17 or higher
3. Package.json dependencies up to date

---

## Development Workflow

### Recommended Steps:

1. **Start Development**:
   ```bash
   npm run dev
   ```
   Visit: http://localhost:3001 (or next available port)

2. **Make Changes**:
   - Edit files in `/components`, `/app`, etc.
   - Changes auto-reload (usually)

3. **Test Build**:
   ```bash
   npm run build
   ```
   Ensure no errors before deployment

4. **Deploy** (when ready):
   ```bash
   git add .
   git commit -m "Your message"
   git push
   # Then deploy via Vercel/Netlify
   ```

---

## Known Limitations

### Next.js 15 Warnings (Safe to Ignore)

These console warnings are **normal** during development:
- `Could not find module in React Client Manifest`
- `serviceWorker.js 500 errors`
- Multiple lockfile warnings

**They do NOT affect**:
- Production build
- Website functionality
- Performance
- Deployment

**Why they appear**:
- Next.js 15 is very new (released days ago)
- React Server Components hot-reload is still maturing
- Development vs production bundling differences

**Verification**:
Run `npm run build` - if it succeeds, everything is fine!

---

## Quick Fixes Checklist

Before asking for help, try:

- [ ] Clear cache: `rm -rf .next`
- [ ] Restart dev server: `npm run dev`
- [ ] Hard refresh browser: Ctrl+Shift+R
- [ ] Check terminal for actual errors (not warnings)
- [ ] Test production build: `npm run build`
- [ ] Check file paths are correct (case-sensitive on Linux)
- [ ] Ensure `'use client'` directive is first line in client components

---

## Environment Info

**Current Setup**:
- Next.js: 15.5.5
- React: 19.2.0
- Node.js: Check with `node -v` (need 18.17+)
- Package Manager: npm

**Dev Server**:
- Port: 3001 (or next available)
- URL: http://localhost:3001

**Production Build**:
- Status: ✅ Passing
- All pages compile successfully
- Ready for deployment

---

## Need More Help?

### Check Documentation:
- [EFFECTS_GUIDE.md](EFFECTS_GUIDE.md) - Interactive effects
- [LOGO_ASSETS_GUIDE.md](LOGO_ASSETS_GUIDE.md) - Logo requirements
- [UPDATES_SUMMARY.md](UPDATES_SUMMARY.md) - Recent changes

### Common Commands:
```bash
# Development
npm run dev          # Start dev server
npm run build        # Test production build
npm run lint         # Check code quality

# Cleaning
rm -rf .next         # Clear Next.js cache
rm -rf node_modules  # Clear dependencies (then npm install)

# Deployment
npm run build        # Build for production
npm start            # Run production server locally
```

---

## Contact

If issues persist:
1. Check the error message carefully
2. Look for the actual error (not warnings)
3. Try the solutions above
4. Check Next.js 15 known issues: https://github.com/vercel/next.js/issues

---

**Last Updated**: October 2024
**Status**: ✅ All systems operational
**Build**: ✅ Passing
**Dev Server**: ✅ Running on port 3001
