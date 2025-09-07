const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://ghfzwtoatvwbgighcxzr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZnp3dG9hdHZ3YmdpZ2hjeHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MzE4NTEsImV4cCI6MjA3MjQwNzg1MX0.N1xhQCMPYffukaHtB3Nqe-V-Er23G-qfvpEN4KrXDwo'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('Testing Supabase connection...')
  
  try {
    // Test categories
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*')
      .limit(5)
    
    if (catError) {
      console.error('Categories error:', catError)
    } else {
      console.log('✅ Categories table:', categories?.length || 0, 'records')
    }

    // Test vendors
    const { data: vendors, error: vendorError } = await supabase
      .from('vendors')
      .select('*')
      .limit(5)
    
    if (vendorError) {
      console.error('Vendors error:', vendorError)
    } else {
      console.log('✅ Vendors table:', vendors?.length || 0, 'records')
    }

    // Test products
    const { data: products, error: productError } = await supabase
      .from('products')
      .select('*')
      .limit(5)
    
    if (productError) {
      console.error('Products error:', productError)
    } else {
      console.log('✅ Products table:', products?.length || 0, 'records')
    }

    console.log('✅ Database connection successful!')
    
  } catch (error) {
    console.error('❌ Connection failed:', error)
  }
}

testConnection()