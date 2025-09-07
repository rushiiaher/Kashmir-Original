# Kashmir Bazaar Database Setup Guide

## 📋 **Database Structure Overview**

### Core Tables
- **profiles** - User profiles extending Supabase auth
- **vendors** - Vendor store information and verification
- **categories** - Product categories (8 main categories)
- **products** - Complete product catalog
- **orders** - Customer orders and order management
- **order_items** - Individual items within orders
- **reviews** - Product reviews and ratings
- **wishlist** - Customer wishlist functionality
- **cart** - Shopping cart items

## 🚀 **Setup Instructions**

### Step 1: Run Complete Schema
```sql
-- Execute this file in Supabase SQL Editor
lib/database/complete-schema.sql
```

### Step 2: Setup Triggers
```sql
-- Execute this file for automatic functions
lib/database/auth-trigger.sql
```

### Step 3: Seed Sample Data
```sql
-- Execute this file for sample products and vendors
lib/database/seed-data.sql
```

## 📦 **Product Categories Included**

### 1. Saffron & Spices 🌸
- Kashmiri Mongra Saffron (GI-tagged)
- Shilajit (resin & capsules)
- Kashmiri Red Chilli Powder
- Special spice mixes

### 2. Dry Fruits & Nuts 🥜
- Kashmiri Walnuts
- Mamra Almonds
- Mixed dry fruit gift packs
- Premium quality nuts

### 3. Tea & Beverages 🍵
- Kashmiri Kahwa (traditional blend)
- Saffron-infused honey
- Herbal tea varieties

### 4. Rice & Pulses 🌾
- Mushk Budji Rice (GI-tagged)
- Local Basmati varieties
- Rajma and other pulses

### 5. Handicrafts & Home Décor 🎨
- Papier-mâché items
- Walnut wood carvings
- Copperware and decorative items

### 6. Textiles & Apparel 👗
- Pure Pashmina Shawls
- Kani Shawls (GI-tagged)
- Traditional embroidered items

### 7. Health & Wellness 🌿
- Organic oils (almond, walnut)
- Rose water and herbal products
- Natural wellness items

### 8. Gifting & Hampers 🎁
- Curated gift boxes
- Festival hampers
- Premium combo packs

## 🏪 **Sample Vendors Included**

1. **Kashmir Saffron House** - Premium saffron and spices
2. **Valley Dry Fruits** - Fresh nuts and dry fruits
3. **Himalayan Tea Gardens** - Traditional teas and beverages
4. **Kashmir Craft Corner** - Handicrafts and décor
5. **Pashmina Palace** - Luxury textiles and shawls
6. **Wellness Kashmir** - Health and wellness products

## 🔐 **Security Features**

### Row Level Security (RLS)
- **Public Access**: Categories, active products, verified vendors
- **User Access**: Own profile, orders, cart, wishlist
- **Vendor Access**: Own products and store management
- **Admin Access**: Full system management

### Automatic Triggers
- **Profile Creation**: Auto-create profile on user registration
- **Rating Updates**: Auto-update product/vendor ratings
- **Review Verification**: Maintain review integrity

## 📊 **Key Features**

### Product Management
- ✅ SKU tracking and inventory management
- ✅ Multiple product images support
- ✅ Tag-based categorization
- ✅ Featured products system
- ✅ Rating and review system

### Order Management
- ✅ Complete order lifecycle tracking
- ✅ Payment status management
- ✅ Shipping address handling
- ✅ Order item breakdown

### Vendor System
- ✅ Vendor verification workflow
- ✅ Commission rate management
- ✅ Sales tracking and analytics
- ✅ Store profile management

### Customer Features
- ✅ Wishlist functionality
- ✅ Shopping cart persistence
- ✅ Order history tracking
- ✅ Product reviews and ratings

## 🛠 **Database Relationships**

```
auth.users (Supabase)
    ↓
profiles (1:1)
    ↓
vendors (1:many) → products (1:many) → order_items
    ↓                    ↓                    ↓
orders ← customers    reviews           orders
    ↓
order_items
```

## 📈 **Sample Data Included**

- **8 Product Categories** with descriptions
- **6 Active Vendors** with complete profiles
- **20+ Sample Products** across all categories
- **Realistic Pricing** in Indian Rupees
- **Product Images** and descriptions
- **Ratings and Reviews** for social proof

## 🔄 **Next Steps After Setup**

1. **Verify Tables**: Check all tables are created successfully
2. **Test Triggers**: Register a test user to verify profile creation
3. **Seed Data**: Run seed script to populate sample data
4. **Test Queries**: Verify data relationships work correctly
5. **Setup Frontend**: Connect frontend to use real database

## 📝 **Important Notes**

- All prices are in Indian Rupees (₹)
- Products include authentic Kashmiri items with GI tags where applicable
- Vendor verification system is built-in
- Review system maintains data integrity
- Cart and wishlist persist across sessions
- Full audit trail with created_at/updated_at timestamps

The database is now ready for a complete multi-vendor e-commerce platform with authentic Kashmiri products!