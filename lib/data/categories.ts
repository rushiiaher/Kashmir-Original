import { createClient } from '@/lib/supabase/client'
import { categories } from '@/lib/mock-data'

export async function getCategories() {
  // Return mock data if Supabase is not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
    return categories.map(cat => ({ ...cat, description: `Premium ${cat.name.toLowerCase()} from Kashmir` }))
  }

  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching categories:', error)
    return categories.map(cat => ({ ...cat, description: `Premium ${cat.name.toLowerCase()} from Kashmir` }))
  }
  
  return data || []
}

export async function getCategoryBySlug(slug: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  
  if (error) {
    console.error('Error fetching category:', error)
    return null
  }
  
  return data
}