-- Temporarily disable RLS for seeding
ALTER TABLE vendors DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Insert sample vendors
INSERT INTO vendors (store_name, store_slug, description, business_email, business_phone, rating, total_sales, status, is_verified) VALUES
('Kashmir Crafts Co.', 'kashmir-crafts-co', 'Authentic handwoven pashminas and traditional Kashmiri shawls', 'info@kashmircrafts.com', '+91 9876543210', 4.8, 150, 'active', true),
('Saffron Valley', 'saffron-valley', 'Premium Kashmiri saffron and authentic spices', 'contact@saffronvalley.com', '+91 9876543211', 4.9, 89, 'active', true);

-- Insert sample products (using category IDs from existing categories)
INSERT INTO products (vendor_id, category_id, name, slug, description, short_description, price, quantity, unit, images, tags, is_featured, is_active, rating) 
SELECT 
  v.id,
  c.id,
  'Premium Kashmiri Pashmina Shawl',
  'premium-kashmiri-pashmina-shawl',
  'Handwoven premium pashmina shawl made from finest Cashmere wool',
  'Luxurious handwoven pashmina shawl',
  8500,
  25,
  'piece',
  '["handwoven-pashmina-shawl.jpg"]'::jsonb,
  ARRAY['pashmina', 'shawl', 'handwoven', 'cashmere'],
  true,
  true,
  4.7
FROM vendors v, categories c 
WHERE v.store_slug = 'kashmir-crafts-co' AND c.slug = 'pashmina'
LIMIT 1;

INSERT INTO products (vendor_id, category_id, name, slug, description, short_description, price, quantity, unit, images, tags, is_featured, is_active, rating)
SELECT 
  v.id,
  c.id,
  'Pure Kashmiri Saffron 1g',
  'pure-kashmiri-saffron-1g',
  'Premium quality Kashmiri saffron, hand-picked from Pampore fields',
  'Pure Kashmiri saffron',
  450,
  100,
  'gram',
  '["kashmiri-saffron-1g.jpg"]'::jsonb,
  ARRAY['saffron', 'spice', 'kashmiri', 'premium'],
  true,
  true,
  4.9
FROM vendors v, categories c 
WHERE v.store_slug = 'saffron-valley' AND c.slug = 'saffron'
LIMIT 1;

-- Re-enable RLS
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;