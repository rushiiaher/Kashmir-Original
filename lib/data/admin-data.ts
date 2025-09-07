import { createClient } from '@/lib/supabase/client'

export async function getAdminStats() {
  const supabase = createClient()
  
  // Get total vendors
  const { count: vendorCount } = await supabase
    .from('vendors')
    .select('*', { count: 'exact', head: true })
  
  // Get total products
  const { count: productCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
  
  // Get active vendors
  const { count: activeVendorCount } = await supabase
    .from('vendors')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')
  
  // Get pending vendors
  const { count: pendingVendorCount } = await supabase
    .from('vendors')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')
  
  return {
    totalVendors: vendorCount || 0,
    totalProducts: productCount || 0,
    activeVendors: activeVendorCount || 0,
    pendingVendors: pendingVendorCount || 0,
    totalOrders: 0, // Will be implemented when orders table is ready
    totalRevenue: 0 // Will be implemented when orders table is ready
  }
}

export async function getAllVendors() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('vendors')
    .select(`
      *,
      profiles(full_name, email)
    `)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching vendors:', error)
    return []
  }
  
  return data || []
}

export async function getAllProducts() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories(name),
      vendors(store_name)
    `)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  
  return data || []
}

export async function updateVendorStatus(vendorId: string, status: string, isVerified: boolean) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('vendors')
    .update({ status, is_verified: isVerified })
    .eq('id', vendorId)
  
  return { error }
}

export async function toggleProductStatus(productId: string, isActive: boolean) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('products')
    .update({ is_active: !isActive })
    .eq('id', productId)
  
  return { error }
}