-- Images column already exists as JSON type in products table
-- Just need to set up storage bucket and policies

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for product images
CREATE POLICY "Allow authenticated users to upload product images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Allow public read access to product images" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Allow vendors to delete their product images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);