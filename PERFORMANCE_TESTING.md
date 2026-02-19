# Quick Performance Testing Guide

## Immediate Actions to Test

### 1. Build and Test Locally

```bash
# Clean build
rm -rf .next
npm run build
npm start

# Open in browser
# Navigate to http://localhost:3000
```

### 2. Performance Metrics to Check

#### Chrome DevTools

1. Open DevTools (F12)
2. Go to **Lighthouse** tab
3. Select "Performance" category
4. Click "Analyze page load"

**Target Scores:**

- Performance: > 80
- First Contentful Paint: < 1.5s
- Time to Interactive: < 2.5s
- Speed Index: < 3.0s

#### Network Tab

1. Open DevTools Network tab
2. Reload page
3. Check:
   - Initial JS bundle size: Should be < 600KB
   - Total page size: Should be < 2MB
   - Number of requests: Should be < 50

### 3. Visual Inspection

✅ **Things that should be faster now:**

- Dashboard page load
- Component rendering
- Particle animations (smoother, less CPU)
- Context updates (likes, saves, etc.)
- Image loading
- Page navigation

## Before vs After Comparison

### Measure Initial Bundle Size

```bash
npm run build
# Check .next/static/chunks for bundle sizes
```

### Animation Performance

1. Open DevTools Performance tab
2. Click Record
3. Navigate to dashboard
4. Watch for 5 seconds
5. Stop recording
6. Check CPU usage (should be < 30%)

### Memory Usage

1. DevTools > Memory tab
2. Take heap snapshot
3. Navigate around app
4. Take another snapshot
5. Check for memory leaks (should be stable)

## Install Performance Monitoring (Optional)

### Bundle Analyzer

```bash
npm install --save-dev @next/bundle-analyzer
```

Add to `next.config.ts`:

```typescript
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
```

Run analysis:

```bash
ANALYZE=true npm run build
```

### Web Vitals Monitoring

Create `src/app/web-vitals.tsx`:

```typescript
"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric);
  });
}
```

## Common Issues & Solutions

### Issue: Still slow on dashboard

**Solution:** Check if Firebase is slow. Add caching layer.

### Issue: Images loading slowly

**Solution:** Use CDN for images instead of external hosts.

### Issue: High CPU usage

**Solution:** Reduce particle count further in `particle-background.tsx`.

### Issue: Large bundle size

**Solution:** Check imports, ensure tree-shaking is working.

## Production Deployment

### Vercel (Recommended)

```bash
# Vercel automatically optimizes
vercel deploy --prod
```

### Other Platforms

Ensure these are set:

- `NODE_ENV=production`
- Build command: `npm run build`
- Start command: `npm start`

## Monitoring in Production

### Add to your app:

```typescript
// src/lib/analytics.ts
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV === "production") {
    // Send to analytics service
    console.log("Web Vital:", metric.name, metric.value);
  }
}
```

## Performance Budget

Set these limits:

- **JavaScript:** < 600KB (initial)
- **CSS:** < 100KB
- **Images:** < 500KB per page
- **Total:** < 2MB per page
- **Requests:** < 50 per page

## Next Steps

1. ✅ Test build locally
2. ✅ Run Lighthouse audit
3. ✅ Check bundle sizes
4. ✅ Test on slow 3G network (DevTools)
5. ✅ Deploy to production
6. ✅ Monitor real user metrics

## Support

If issues persist:

1. Check browser console for errors
2. Verify all dependencies installed
3. Clear `.next` cache
4. Check Firebase performance
5. Review network waterfall in DevTools
