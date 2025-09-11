-- Enable RLS on vendors table
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert their own vendor profile
CREATE POLICY "Users can insert their own vendor profile" ON vendors
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to read their own vendor profile
CREATE POLICY "Users can read their own vendor profile" ON vendors
FOR SELECT USING (auth.uid() = user_id);

-- Allow users to update their own vendor profile
CREATE POLICY "Users can update their own vendor profile" ON vendors
FOR UPDATE USING (auth.uid() = user_id);

-- Allow public to read active verified vendors
CREATE POLICY "Public can read active verified vendors" ON vendors
FOR SELECT USING (status = 'active' AND is_verified = true);

-- Allow admins to read all vendors
CREATE POLICY "Admins can read all vendors" ON vendors
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Allow admins to update vendor status
CREATE POLICY "Admins can update vendor status" ON vendors
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Similar policies for products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active products" ON products
FOR SELECT USING (is_active = true);

CREATE POLICY "Vendors can manage their products" ON products
FOR ALL USING (
  vendor_id IN (
    SELECT id FROM vendors WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can read all products" ON products
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Categories policies
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active categories" ON categories
FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage categories" ON categories
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Profiles policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own profile" ON profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can read all profiles" ON profiles
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid() 
    AND p.role = 'admin'
  )
);