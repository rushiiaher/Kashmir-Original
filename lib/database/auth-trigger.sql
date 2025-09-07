-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone',
    COALESCE(new.raw_user_meta_data->>'role', 'customer')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update product ratings when reviews are added/updated
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS trigger AS $$
BEGIN
  UPDATE products 
  SET 
    rating = (
      SELECT ROUND(AVG(rating)::numeric, 1) 
      FROM reviews 
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id) 
      AND is_verified = true
    ),
    review_count = (
      SELECT COUNT(*) 
      FROM reviews 
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id) 
      AND is_verified = true
    )
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Triggers for review changes
DROP TRIGGER IF EXISTS update_product_rating_on_review ON reviews;
CREATE TRIGGER update_product_rating_on_review
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- Function to update vendor rating based on product ratings
CREATE OR REPLACE FUNCTION update_vendor_rating()
RETURNS trigger AS $$
BEGIN
  UPDATE vendors 
  SET rating = (
    SELECT ROUND(AVG(rating)::numeric, 1) 
    FROM products 
    WHERE vendor_id = COALESCE(NEW.vendor_id, OLD.vendor_id)
    AND rating > 0
  )
  WHERE id = COALESCE(NEW.vendor_id, OLD.vendor_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to update vendor rating when product rating changes
DROP TRIGGER IF EXISTS update_vendor_rating_on_product_change ON products;
CREATE TRIGGER update_vendor_rating_on_product_change
  AFTER UPDATE OF rating ON products
  FOR EACH ROW EXECUTE FUNCTION update_vendor_rating();