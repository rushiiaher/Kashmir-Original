# Kashmir Bazaar - Vercel Deployment Guide

## 🚀 **Quick Deployment Steps**

### 1. **Prepare Repository**
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/yourusername/kashmir-bazaar.git
git push -u origin main
```

### 2. **Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings

### 3. **Environment Variables**
Add these in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://ghfzwtoatvwbgighcxzr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZnp3dG9hdHZ3YmdpZ2hjeHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MzE4NTEsImV4cCI6MjA3MjQwNzg1MX0.N1xhQCMPYffukaHtB3Nqe-V-Er23G-qfvpEN4KrXDwo
NEXT_PUBLIC_SITE_URL=https://your-app-name.vercel.app
```

### 4. **Update Supabase Settings**
In Supabase Dashboard → Authentication → Settings:
- **Site URL**: `https://your-app-name.vercel.app`
- **Redirect URLs**: 
  - `https://your-app-name.vercel.app/auth/callback`
  - `https://your-app-name.vercel.app`

## 📋 **Pre-Deployment Checklist**

### ✅ **Files Created**
- `vercel.json` - Vercel configuration
- `.env.example` - Environment variables template
- `.gitignore` - Git ignore rules
- `DEPLOYMENT.md` - This deployment guide

### ✅ **Database Setup**
- Run `complete-schema.sql` in Supabase
- Run `auth-trigger.sql` for triggers
- Run `seed-data.sql` for sample data

### ✅ **Environment Variables**
- Supabase URL configured
- Supabase Anon Key configured
- Site URL will be updated after deployment

## 🔧 **Build Configuration**

The project uses:
- **Framework**: Next.js 15
- **Package Manager**: pnpm
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`

## 🌐 **Domain Setup (Optional)**

### Custom Domain
1. Go to Vercel Dashboard → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

## 🔍 **Post-Deployment Verification**

### Test These Features:
1. **Homepage** - Categories and products load
2. **Authentication** - Register/login works
3. **Products** - Search and filters work
4. **Vendors** - Vendor pages accessible
5. **Cart** - Add/remove items works
6. **Database** - Real data displays

## 🚨 **Common Issues & Solutions**

### Build Errors
- **Missing dependencies**: Run `pnpm install`
- **TypeScript errors**: Check component imports
- **Environment variables**: Ensure all vars are set

### Runtime Errors
- **Database connection**: Verify Supabase credentials
- **Authentication**: Check redirect URLs in Supabase
- **API routes**: Ensure proper error handling

### Performance
- **Images**: Add proper image optimization
- **Database**: Ensure proper indexing
- **Caching**: Leverage Vercel's edge caching

## 📊 **Monitoring**

### Vercel Analytics
- Enable Web Analytics in Vercel Dashboard
- Monitor Core Web Vitals
- Track user interactions

### Error Tracking
- Check Vercel Functions logs
- Monitor Supabase logs
- Set up error boundaries

## 🔄 **Continuous Deployment**

Every push to `main` branch will:
1. Trigger automatic deployment
2. Run build process
3. Deploy to production
4. Update live site

## 📱 **Mobile Optimization**

The app is mobile-first and includes:
- Responsive design
- Touch-friendly interfaces
- Fast loading times
- PWA capabilities (can be added)

## 🎯 **Next Steps After Deployment**

1. **Test all functionality** on live site
2. **Set up custom domain** (optional)
3. **Configure analytics** and monitoring
4. **Add more products** via admin panel
5. **Invite vendors** to register
6. **Launch marketing** campaigns

Your Kashmir Bazaar is now ready for production! 🎉