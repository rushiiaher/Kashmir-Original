import { createClient } from '@/lib/supabase/client'

export async function getVendorByUserId(userId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  if (error) {
    console.error('Error fetching vendor:', error)
    return null
  }
  
  return data
}

export async function createVendorProfile(vendorData: any) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('vendors')
    .insert(vendorData)
    .select()
    .single()
  
  if (error) {
    console.error('Error creating vendor:', error)
    return { error: error.message }
  }
  
  return { data }
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
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching vendor products:', error)
    return []
  }
  
  return data || []
}

export async function getVendorStats(vendorId: string) {
  const supabase = createClient()
  
  // Get product count
  const { count: productCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('vendor_id', vendorId)
  
  // Get order count and revenue (would need order_items table)
  // For now, return basic stats
  
  return {
    totalProducts: productCount || 0,
    totalOrders: 0,
    totalRevenue: 0,
    rating: 0
  }
}