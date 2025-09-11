import { createClient } from '@/lib/supabase/client'
import { products } from '@/lib/mock-data'

export async function getProducts() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories(name, slug),
      vendors(store_name, store_slug)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  
  return data || []
}

export async function getProductBySlug(slug: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories(name, slug),
      vendors(store_name, store_slug)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  
  if (error) {
    console.error('Error fetching product:', error)
    return null
  }
  
  return data
}

export async function getProductsByCategory(categorySlug: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories!inner(name, slug),
      vendors(store_name, store_slug)
    `)
    .eq('categories.slug', categorySlug)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
  
  return data || []
}

export async function getFeaturedProducts() {
  // Return empty array if Supabase is not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
    return []
  }

  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories(name, slug),
      vendors(store_name, store_slug)
    `)
    .eq('is_featured', true)
    .eq('is_active', true)
    .limit(6)
  
  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
  
  return data || []
}