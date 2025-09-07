# Kashmir Bazaar - Multi-Vendor E-commerce Platform

A complete multi-vendor e-commerce platform for authentic Kashmiri products built with Next.js 14, Supabase, and TypeScript.

## Setup Instructions

### 1. Database Setup

1. Go to your Supabase project dashboard: https://ghfzwtoatvwbgighcxzr.supabase.co
2. Navigate to SQL Editor
3. Run the schema from `lib/database/schema.sql`

### 2. Environment Setup

The environment variables are already configured in `.env.local`:
- Supabase URL: `https://ghfzwtoatvwbgighcxzr.supabase.co`
- Supabase Anon Key: Already set

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Seed Database (Optional)

```bash
node scripts/seed-database.js
```

### 5. Run Development Server

```bash
pnpm dev
```

Visit http://localhost:3000

## Project Structure

- `app/(customer)/` - Customer-facing pages (homepage, products, vendors)
- `app/vendor/` - Vendor dashboard (products, orders, analytics)
- `app/admin/` - Admin panel (vendor management, categories)
- `components/` - Reusable UI components
- `lib/data/` - Database query functions
- `lib/supabase/` - Supabase client configuration
- `types/` - TypeScript type definitions

## Features Implemented

✅ **Frontend Structure**
- Customer routes with product browsing
- Vendor and category pages
- Responsive design with Tailwind CSS

✅ **Database Integration**
- Supabase connection configured
- Real-time data fetching
- Row Level Security policies

✅ **Core Functionality**
- Product listing and search
- Category-based browsing
- Vendor store pages
- Shopping cart integration

## Next Steps

1. **Authentication**: Implement Supabase Auth for login/register
2. **Vendor Dashboard**: Build product management interface
3. **Payment Integration**: Add Razorpay for checkout
4. **Admin Panel**: Complete vendor and order management
5. **File Upload**: Implement image upload for products

## Database Schema

The project uses the following main tables:
- `profiles` - User profiles extending Supabase auth
- `vendors` - Vendor store information
- `categories` - Product categories
- `products` - Product catalog
- `orders` - Order management

All tables have Row Level Security enabled for data protection.