-- Seed Categories
INSERT INTO categories (name, slug, description, display_order) VALUES
('Saffron & Spices', 'saffron-spices', 'Premium Kashmiri saffron and authentic spices', 1),
('Dry Fruits & Nuts', 'dry-fruits-nuts', 'Fresh Kashmiri walnuts, almonds and dry fruits', 2),
('Tea & Beverages', 'tea-beverages', 'Traditional Kashmiri Kahwa and herbal teas', 3),
('Rice & Pulses', 'rice-pulses', 'Aromatic Mushk Budji rice and local pulses', 4),
('Handicrafts & Home Décor', 'handicrafts-home-decor', 'Traditional Kashmiri handicrafts and décor items', 5),
('Textiles & Apparel', 'textiles-apparel', 'Pure Pashmina shawls and traditional wear', 6),
('Health & Wellness', 'health-wellness', 'Natural herbal products and wellness items', 7),
('Gifting & Hampers', 'gifting-hampers', 'Curated gift boxes and festival hampers', 8);

-- Create sample users (these would normally be created through Supabase Auth)
-- Note: In real implementation, these would be created via auth.users table
-- For seeding purposes, we'll create profiles assuming users exist

-- Seed Vendors (assuming user IDs exist)
INSERT INTO vendors (store_name, store_slug, description, business_email, business_phone, gst_number, pan_number, rating, total_sales, status, is_verified, address) VALUES
('Kashmir Saffron House', 'kashmir-saffron-house', 'Premium Kashmiri saffron and spices directly from Pampore fields', 'info@kashmirsaffronhouse.com', '+91-9876543210', '22AAAAA0000A1Z5', 'ABCDE1234F', 4.8, 250, 'active', true, '{"street": "Pampore Main Road", "city": "Pampore", "state": "Jammu & Kashmir", "pincode": "192121"}'),

('Valley Dry Fruits', 'valley-dry-fruits', 'Fresh Kashmiri walnuts, almonds and premium dry fruits', 'contact@valleydryfruits.com', '+91-9876543211', '22BBBBB0000B1Z5', 'BCDEF2345G', 4.7, 180, 'active', true, '{"street": "Lal Chowk", "city": "Srinagar", "state": "Jammu & Kashmir", "pincode": "190001"}'),

('Himalayan Tea Gardens', 'himalayan-tea-gardens', 'Authentic Kashmiri Kahwa and herbal tea blends', 'hello@himalayantea.com', '+91-9876543212', '22CCCCC0000C1Z5', 'CDEFG3456H', 4.9, 320, 'active', true, '{"street": "Gulmarg Road", "city": "Baramulla", "state": "Jammu & Kashmir", "pincode": "193403"}'),

('Kashmir Craft Corner', 'kashmir-craft-corner', 'Traditional Kashmiri handicrafts and papier-mâché items', 'orders@kashmircraft.com', '+91-9876543213', '22DDDDD0000D1Z5', 'DEFGH4567I', 4.6, 150, 'active', true, '{"street": "Residency Road", "city": "Srinagar", "state": "Jammu & Kashmir", "pincode": "190001"}'),

('Pashmina Palace', 'pashmina-palace', 'Pure Pashmina shawls and Kani textiles', 'info@pashminapalace.com', '+91-9876543214', '22EEEEE0000E1Z5', 'EFGHI5678J', 4.9, 400, 'active', true, '{"street": "Boulevard Road", "city": "Srinagar", "state": "Jammu & Kashmir", "pincode": "190001"}'),

('Wellness Kashmir', 'wellness-kashmir', 'Natural Shilajit and herbal wellness products', 'care@wellnesskashmir.com', '+91-9876543215', '22FFFFF0000F1Z5', 'FGHIJ6789K', 4.5, 120, 'active', true, '{"street": "Hazratbal", "city": "Srinagar", "state": "Jammu & Kashmir", "pincode": "190006"}');

-- Seed Products
-- Saffron & Spices Category
INSERT INTO products (vendor_id, category_id, name, slug, description, short_description, sku, price, compare_at_price, quantity, unit, images, tags, is_featured, rating, review_count) VALUES
((SELECT id FROM vendors WHERE store_slug = 'kashmir-saffron-house'), (SELECT id FROM categories WHERE slug = 'saffron-spices'), 'Kashmiri Mongra Saffron 1g', 'kashmiri-mongra-saffron-1g', 'Premium Grade A Kashmiri Mongra Saffron, hand-picked from Pampore fields. GI-tagged authentic saffron with deep red color and strong aroma.', 'Premium Grade A Kashmiri Mongra Saffron', 'KSH-SAF-001', 450.00, 500.00, 50, 'gram', '["saffron-1g.jpg", "saffron-close.jpg"]', ARRAY['saffron', 'spices', 'kashmiri', 'premium', 'mongra'], true, 4.8, 45),

((SELECT id FROM vendors WHERE store_slug = 'kashmir-saffron-house'), (SELECT id FROM categories WHERE slug = 'saffron-spices'), 'Pure Shilajit Resin 20g', 'pure-shilajit-resin-20g', 'Authentic Himalayan Shilajit resin sourced from high-altitude regions. Rich in minerals and fulvic acid for natural wellness.', 'Authentic Himalayan Shilajit resin', 'KSH-SHI-001', 1200.00, 1500.00, 30, 'gram', '["shilajit-resin.jpg"]', ARRAY['shilajit', 'wellness', 'himalayan', 'natural'], false, 4.7, 28),

((SELECT id FROM vendors WHERE store_slug = 'kashmir-saffron-house'), (SELECT id FROM categories WHERE slug = 'saffron-spices'), 'Kashmiri Red Chilli Powder 100g', 'kashmiri-red-chilli-powder-100g', 'Mild and flavorful Kashmiri red chilli powder, perfect for authentic Kashmiri cuisine. Adds beautiful color without excessive heat.', 'Mild Kashmiri red chilli powder', 'KSH-CHI-001', 120.00, 150.00, 100, 'gram', '["chilli-powder.jpg"]', ARRAY['chilli', 'spices', 'kashmiri', 'mild'], false, 4.6, 35);

-- Dry Fruits & Nuts Category
INSERT INTO products (vendor_id, category_id, name, slug, description, short_description, sku, price, compare_at_price, quantity, unit, images, tags, is_featured, rating, review_count) VALUES
((SELECT id FROM vendors WHERE store_slug = 'valley-dry-fruits'), (SELECT id FROM categories WHERE slug = 'dry-fruits-nuts'), 'Kashmiri Walnuts 500g', 'kashmiri-walnuts-500g', 'Premium quality Kashmiri walnuts, hand-picked and naturally dried. Rich in omega-3 fatty acids and perfect for snacking.', 'Premium Kashmiri walnuts', 'VDF-WAL-001', 800.00, 900.00, 75, 'gram', '["walnuts-500g.jpg", "walnuts-close.jpg"]', ARRAY['walnuts', 'dry-fruits', 'kashmiri', 'premium'], true, 4.7, 52),

((SELECT id FROM vendors WHERE store_slug = 'valley-dry-fruits'), (SELECT id FROM categories WHERE slug = 'dry-fruits-nuts'), 'Mamra Almonds 250g', 'mamra-almonds-250g', 'Authentic Mamra almonds from Kashmir, known for their superior taste and nutritional value. Naturally sweet and crunchy.', 'Authentic Mamra almonds', 'VDF-ALM-001', 650.00, 750.00, 60, 'gram', '["mamra-almonds.jpg"]', ARRAY['almonds', 'mamra', 'dry-fruits', 'premium'], true, 4.8, 38),

((SELECT id FROM vendors WHERE store_slug = 'valley-dry-fruits'), (SELECT id FROM categories WHERE slug = 'dry-fruits-nuts'), 'Mixed Dry Fruit Gift Pack 1kg', 'mixed-dry-fruit-gift-pack-1kg', 'Premium assorted dry fruits including walnuts, almonds, apricots, and figs. Perfect for gifting and festivals.', 'Premium mixed dry fruits gift pack', 'VDF-MIX-001', 1500.00, 1800.00, 25, 'kg', '["mixed-dryfruits-pack.jpg"]', ARRAY['mixed', 'dry-fruits', 'gift-pack', 'premium'], false, 4.9, 22);

-- Tea & Beverages Category
INSERT INTO products (vendor_id, category_id, name, slug, description, short_description, sku, price, compare_at_price, quantity, unit, images, tags, is_featured, rating, review_count) VALUES
((SELECT id FROM vendors WHERE store_slug = 'himalayan-tea-gardens'), (SELECT id FROM categories WHERE slug = 'tea-beverages'), 'Kashmiri Kahwa Tea 100g', 'kashmiri-kahwa-tea-100g', 'Traditional Kashmiri Kahwa blend with green tea, saffron, cardamom, cinnamon, and almonds. Perfect for cold weather.', 'Traditional Kashmiri Kahwa blend', 'HTG-KAH-001', 350.00, 400.00, 80, 'gram', '["kahwa-tea.jpg", "kahwa-brewing.jpg"]', ARRAY['kahwa', 'tea', 'kashmiri', 'traditional'], true, 4.9, 67),

((SELECT id FROM vendors WHERE store_slug = 'himalayan-tea-gardens'), (SELECT id FROM categories WHERE slug = 'tea-beverages'), 'Saffron Honey 250g', 'saffron-honey-250g', 'Pure honey infused with Kashmiri saffron. Natural sweetener with the goodness of saffron and honey combined.', 'Pure honey infused with saffron', 'HTG-HON-001', 450.00, 500.00, 40, 'gram', '["saffron-honey.jpg"]', ARRAY['honey', 'saffron', 'natural', 'sweetener'], false, 4.6, 31);

-- Handicrafts & Home Décor Category
INSERT INTO products (vendor_id, category_id, name, slug, description, short_description, sku, price, compare_at_price, quantity, unit, images, tags, is_featured, rating, review_count) VALUES
((SELECT id FROM vendors WHERE store_slug = 'kashmir-craft-corner'), (SELECT id FROM categories WHERE slug = 'handicrafts-home-decor'), 'Papier Mache Decorative Box', 'papier-mache-decorative-box', 'Handcrafted papier-mâché decorative box with traditional Kashmiri motifs. Perfect for storing jewelry and small items.', 'Handcrafted papier-mâché box', 'KCC-PMB-001', 850.00, 1000.00, 20, 'piece', '["papier-mache-box.jpg", "box-interior.jpg"]', ARRAY['papier-mache', 'handicraft', 'decorative', 'traditional'], true, 4.7, 18),

((SELECT id FROM vendors WHERE store_slug = 'kashmir-craft-corner'), (SELECT id FROM categories WHERE slug = 'handicrafts-home-decor'), 'Walnut Wood Carved Tray', 'walnut-wood-carved-tray', 'Beautiful walnut wood serving tray with intricate Kashmiri carvings. Handcrafted by skilled artisans.', 'Walnut wood carved serving tray', 'KCC-WWT-001', 1200.00, 1400.00, 15, 'piece', '["walnut-tray.jpg"]', ARRAY['walnut-wood', 'carved', 'tray', 'handicraft'], false, 4.8, 12);

-- Textiles & Apparel Category
INSERT INTO products (vendor_id, category_id, name, slug, description, short_description, sku, price, compare_at_price, quantity, unit, images, tags, is_featured, rating, review_count) VALUES
((SELECT id FROM vendors WHERE store_slug = 'pashmina-palace'), (SELECT id FROM categories WHERE slug = 'textiles-apparel'), 'Pure Pashmina Shawl', 'pure-pashmina-shawl', 'Luxurious pure Pashmina shawl made from finest Cashmere wool. Soft, warm, and elegant for all occasions.', 'Luxurious pure Pashmina shawl', 'PP-PAS-001', 8500.00, 10000.00, 12, 'piece', '["pashmina-shawl.jpg", "shawl-detail.jpg"]', ARRAY['pashmina', 'shawl', 'cashmere', 'luxury'], true, 4.9, 25),

((SELECT id FROM vendors WHERE store_slug = 'pashmina-palace'), (SELECT id FROM categories WHERE slug = 'textiles-apparel'), 'Kani Shawl GI Tagged', 'kani-shawl-gi-tagged', 'Authentic Kani shawl with GI tag, featuring traditional weaving technique passed down through generations.', 'Authentic GI-tagged Kani shawl', 'PP-KAN-001', 15000.00, 18000.00, 8, 'piece', '["kani-shawl.jpg"]', ARRAY['kani', 'shawl', 'gi-tagged', 'traditional'], true, 5.0, 15);

-- Health & Wellness Category
INSERT INTO products (vendor_id, category_id, name, slug, description, short_description, sku, price, compare_at_price, quantity, unit, images, tags, is_featured, rating, review_count) VALUES
((SELECT id FROM vendors WHERE store_slug = 'wellness-kashmir'), (SELECT id FROM categories WHERE slug = 'health-wellness'), 'Organic Almond Oil 100ml', 'organic-almond-oil-100ml', 'Cold-pressed organic almond oil from Kashmiri almonds. Perfect for skin and hair care with natural moisturizing properties.', 'Cold-pressed organic almond oil', 'WK-ALO-001', 280.00, 320.00, 50, 'ml', '["almond-oil.jpg"]', ARRAY['almond-oil', 'organic', 'skincare', 'natural'], false, 4.5, 33),

((SELECT id FROM vendors WHERE store_slug = 'wellness-kashmir'), (SELECT id FROM categories WHERE slug = 'health-wellness'), 'Rose Water (Arq-e-Gulab) 200ml', 'rose-water-arq-e-gulab-200ml', 'Pure rose water distilled from Kashmiri roses. Natural toner and refresher for face and body.', 'Pure Kashmiri rose water', 'WK-ROS-001', 180.00, 220.00, 60, 'ml', '["rose-water.jpg"]', ARRAY['rose-water', 'natural', 'toner', 'skincare'], false, 4.6, 28);

-- Update product ratings in products table based on reviews
UPDATE products SET rating = 4.8, review_count = 45 WHERE slug = 'kashmiri-mongra-saffron-1g';
UPDATE products SET rating = 4.7, review_count = 52 WHERE slug = 'kashmiri-walnuts-500g';
UPDATE products SET rating = 4.9, review_count = 67 WHERE slug = 'kashmiri-kahwa-tea-100g';
UPDATE products SET rating = 4.9, review_count = 25 WHERE slug = 'pure-pashmina-shawl';
UPDATE products SET rating = 5.0, review_count = 15 WHERE slug = 'kani-shawl-gi-tagged';