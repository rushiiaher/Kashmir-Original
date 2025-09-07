const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://ghfzwtoatvwbgighcxzr.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your_service_role_key_here'

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function seedDatabase() {
  console.log('Seeding database...')

  // Insert sample vendors
  const { data: vendors, error: vendorError } = await supabase
    .from('vendors')
    .insert([
      {
        store_name: 'Kashmir Crafts Co.',
        store_slug: 'kashmir-crafts-co',
        description: 'Authentic handwoven pashminas and traditional Kashmiri shawls',
        business_email: 'info@kashmircrafts.com',
        business_phone: '+91 9876543210',
        rating: 4.8,
        total_sales: 150,
        status: 'active',
        is_verified: true
      },
      {
        store_name: 'Saffron Valley',
        store_slug: 'saffron-valley',
        description: 'Premium Kashmiri saffron and authentic spices',
        business_email: 'contact@saffronvalley.com',
        business_phone: '+91 9876543211',
        rating: 4.9,
        total_sales: 89,
        status: 'active',
        is_verified: true
      }
    ])
    .select()

  if (vendorError) {
    console.error('Error inserting vendors:', vendorError)
    return
  }

  console.log('Vendors inserted:', vendors)

  // Get categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')

  if (categories && categories.length > 0 && vendors && vendors.length > 0) {
    // Insert sample products
    const { data: products, error: productError } = await supabase
      .from('products')
      .insert([
        {
          vendor_id: vendors[0].id,
          category_id: categories[0].id,
          name: 'Premium Kashmiri Pashmina Shawl',
          slug: 'premium-kashmiri-pashmina-shawl',
          description: 'Handwoven premium pashmina shawl made from finest Cashmere wool',
          short_description: 'Luxurious handwoven pashmina shawl',
          price: 8500,
          quantity: 25,
          unit: 'piece',
          images: ['/handwoven-pashmina-shawl.jpg'],
          tags: ['pashmina', 'shawl', 'handwoven', 'cashmere'],
          is_featured: true,
          is_active: true,
          rating: 4.7
        },
        {
          vendor_id: vendors[1].id,
          category_id: categories[1].id,
          name: 'Pure Kashmiri Saffron 1g',
          slug: 'pure-kashmiri-saffron-1g',
          description: 'Premium quality Kashmiri saffron, hand-picked from Pampore fields',
          short_description: 'Pure Kashmiri saffron',
          price: 450,
          quantity: 100,
          unit: 'gram',
          images: ['/kashmiri-saffron-1g.jpg'],
          tags: ['saffron', 'spice', 'kashmiri', 'premium'],
          is_featured: true,
          is_active: true,
          rating: 4.9
        }
      ])

    if (productError) {
      console.error('Error inserting products:', productError)
    } else {
      console.log('Products inserted:', products)
    }
  }

  console.log('Database seeding completed!')
}

seedDatabase().catch(console.error)