import { createClient } from '@/lib/supabase/client'

const mockVendors = [
  {
    id: 'v1',
    store_name: 'Kashmir Craft House',
    store_slug: 'kashmir-craft-house',
    description: 'Authentic Kashmiri handicrafts and textiles'
  },
  {
    id: 'v2', 
    store_name: 'Saffron Valley',
    store_slug: 'saffron-valley',
    description: 'Premium saffron and spices from Kashmir'
  },
  {
    id: 'v3',
    store_name: 'Pashmina Palace',
    store_slug: 'pashmina-palace', 
    description: 'Luxury pashmina shawls and accessories'
  }
]

export async function getVendors() {
  // Return mock data if Supabase is not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
    return mockVendors
  }

  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('status', 'active')
    .eq('is_verified', true)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching vendors:', error)
    return mockVendors
  }
  
  return data || []
}

export async function getVendorBySlug(slug: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('store_slug', slug)
    .eq('status', 'active')
    .single()
  
  if (error) {
    console.error('Error fetching vendor:', error)
    return null
  }
  
  return data
}

export async function getVendorProducts(vendorId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories(name, slug)
    `)
    .eq('vendor_id', vendorId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching vendor products:', error)
    return []
  }
  
  return data || []
}