"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/hooks/useAuth"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Edit, Eye } from "lucide-react"

export default function VendorProducts() {
  const { user, loading } = useAuth()
  const [products, setProducts] = useState<any[]>([])
  const [productsLoading, setProductsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (user) {
      fetchVendorProducts()
    }
  }, [user])

  const fetchVendorProducts = async () => {
    // First get vendor info
    const { data: vendor } = await supabase
      .from('vendors')
      .select('id')
      .eq('user_id', user?.id)
      .single()

    if (vendor) {
      const { data: products } = await supabase
        .from('products')
        .select(`
          *,
          categories(name, slug)
        `)
        .eq('vendor_id', vendor.id)
        .order('created_at', { ascending: false })

      setProducts(products || [])
    }
    setProductsLoading(false)
  }

  if (loading || productsLoading) {
    return <div className="p-8">Loading...</div>
  }

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p>Please log in to access vendor dashboard.</p>
        <Button asChild className="mt-4">
          <Link href="/auth/login">Sign In</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Products</h1>
        <Button asChild>
          <Link href="/vendor/products/add">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      {products.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 mb-4">No products found</p>
            <Button asChild>
              <Link href="/vendor/products/add">Add Your First Product</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <img
                  src={product.images?.[0] || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.categories?.name}</p>
                <p className="text-lg font-bold text-emerald-600 mb-4">
                  ₹{new Intl.NumberFormat('en-IN').format(product.price)}
                </p>
                
                <div className="flex gap-2 mb-4">
                  <Badge variant={product.is_active ? "default" : "secondary"}>
                    {product.is_active ? "Active" : "Inactive"}
                  </Badge>
                  <Badge variant="outline">
                    Stock: {product.quantity}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/products/${product.slug}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/vendor/products/${product.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}