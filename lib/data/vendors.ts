import { createClient } from '@/lib/supabase/client'

export async function getVendors() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('status', 'active')
    .eq('is_verified', true)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching vendors:', error)
    return []
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