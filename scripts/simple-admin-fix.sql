-- Temporarily disable RLS for admin testing
ALTER TABLE vendors DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;

-- Or if you want to keep RLS, create a simple admin policy
-- ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
-- DROP POLICY IF EXISTS "Admin full access" ON vendors;
-- CREATE POLICY "Admin full access" ON vendors FOR ALL USING (true);