export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          phone: string | null
          role: 'customer' | 'vendor' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          phone?: string | null
          role?: 'customer' | 'vendor' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          phone?: string | null
          role?: 'customer' | 'vendor' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      vendors: {
        Row: {
          id: string
          user_id: string
          store_name: string
          store_slug: string
          description: string | null
          logo_url: string | null
          banner_url: string | null
          business_email: string | null
          business_phone: string | null
          gst_number: string | null
          pan_number: string | null
          bank_account_details: Json | null
          address: Json | null
          commission_rate: number
          is_verified: boolean
          verification_documents: Json | null
          rating: number | null
          total_sales: number
          status: 'pending' | 'active' | 'suspended'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          store_name: string
          store_slug: string
          description?: string | null
          logo_url?: string | null
          banner_url?: string | null
          business_email?: string | null
          business_phone?: string | null
          gst_number?: string | null
          pan_number?: string | null
          bank_account_details?: Json | null
          address?: Json | null
          commission_rate?: number
          is_verified?: boolean
          verification_documents?: Json | null
          rating?: number | null
          total_sales?: number
          status?: 'pending' | 'active' | 'suspended'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          store_name?: string
          store_slug?: string
          description?: string | null
          logo_url?: string | null
          banner_url?: string | null
          business_email?: string | null
          business_phone?: string | null
          gst_number?: string | null
          pan_number?: string | null
          bank_account_details?: Json | null
          address?: Json | null
          commission_rate?: number
          is_verified?: boolean
          verification_documents?: Json | null
          rating?: number | null
          total_sales?: number
          status?: 'pending' | 'active' | 'suspended'
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          parent_id: string | null
          display_order: number | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
          display_order?: number | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
          display_order?: number | null
          is_active?: boolean
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          vendor_id: string
          category_id: string
          name: string
          slug: string
          description: string | null
          short_description: string | null
          sku: string | null
          price: number
          compare_at_price: number | null
          cost_price: number | null
          quantity: number
          unit: string | null
          images: Json | null
          weight: number | null
          dimensions: Json | null
          tags: string[] | null
          meta_title: string | null
          meta_description: string | null
          is_featured: boolean
          is_active: boolean
          rating: number | null
          review_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          vendor_id: string
          category_id: string
          name: string
          slug: string
          description?: string | null
          short_description?: string | null
          sku?: string | null
          price: number
          compare_at_price?: number | null
          cost_price?: number | null
          quantity: number
          unit?: string | null
          images?: Json | null
          weight?: number | null
          dimensions?: Json | null
          tags?: string[] | null
          meta_title?: string | null
          meta_description?: string | null
          is_featured?: boolean
          is_active?: boolean
          rating?: number | null
          review_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          vendor_id?: string
          category_id?: string
          name?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          sku?: string | null
          price?: number
          compare_at_price?: number | null
          cost_price?: number | null
          quantity?: number
          unit?: string | null
          images?: Json | null
          weight?: number | null
          dimensions?: Json | null
          tags?: string[] | null
          meta_title?: string | null
          meta_description?: string | null
          is_featured?: boolean
          is_active?: boolean
          rating?: number | null
          review_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          customer_id: string
          total_amount: number
          subtotal: number
          tax_amount: number
          shipping_amount: number
          discount_amount: number
          payment_method: string | null
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          shipping_address: Json | null
          billing_address: Json | null
          notes: string | null
          status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          customer_id: string
          total_amount: number
          subtotal: number
          tax_amount: number
          shipping_amount: number
          discount_amount: number
          payment_method?: string | null
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          shipping_address?: Json | null
          billing_address?: Json | null
          notes?: string | null
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          customer_id?: string
          total_amount?: number
          subtotal?: number
          tax_amount?: number
          shipping_amount?: number
          discount_amount?: number
          payment_method?: string | null
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          shipping_address?: Json | null
          billing_address?: Json | null
          notes?: string | null
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}