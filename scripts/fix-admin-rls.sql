-- Drop existing policies if they exist and recreate
DROP POLICY IF EXISTS "Admins can read all vendors" ON vendors;
DROP POLICY IF EXISTS "Admins can update vendor status" ON vendors;
DROP POLICY IF EXISTS "Public can read active products" ON products;
DROP POLICY IF EXISTS "Vendors can manage their products" ON products;
DROP POLICY IF EXISTS "Admins can read all products" ON products;
DROP POLICY IF EXISTS "Public can read active categories" ON categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
DROP POLICY IF EXISTS "Users can read their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;

-- Enable RLS on all tables
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Admin policies for vendors
CREATE POLICY "Admins can read all vendors" ON vendors
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can update vendor status" ON vendors
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Admin policies for products
CREATE POLICY "Admins can read all products" ON products
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Admin policies for profiles
CREATE POLICY "Admins can read all profiles" ON profiles
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid() 
    AND p.role = 'admin'
  )
);