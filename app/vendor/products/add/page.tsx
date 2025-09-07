"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/hooks/useAuth"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AddProduct() {
  const { user, loading } = useAuth()
  const [categories, setCategories] = useState<any[]>([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    short_description: "",
    price: "",
    quantity: "",
    category_id: "",
    sku: "",
    unit: "piece"
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('name')
    
    setCategories(data || [])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      // Get vendor info
      const { data: vendor } = await supabase
        .from('vendors')
        .select('id')
        .eq('user_id', user?.id)
        .single()

      if (!vendor) {
        setError("Vendor profile not found. Please complete your vendor registration.")
        setSubmitting(false)
        return
      }

      // Create slug from name
      const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

      const { error: insertError } = await supabase
        .from('products')
        .insert({
          vendor_id: vendor.id,
          category_id: formData.category_id,
          name: formData.name,
          slug: slug,
          description: formData.description,
          short_description: formData.short_description,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity),
          sku: formData.sku,
          unit: formData.unit,
          is_active: true
        })

      if (insertError) {
        setError(insertError.message)
      } else {
        setSuccess("Product added successfully!")
        setTimeout(() => router.push('/vendor/products'), 2000)
      }
    } catch (err) {
      setError("Failed to add product")
    }
    
    setSubmitting(false)
  }

  if (loading) {
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
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="mb-4">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category_id} onValueChange={(value) => setFormData({...formData, category_id: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="short_description">Short Description</Label>
              <Input
                id="short_description"
                value={formData.short_description}
                onChange={(e) => setFormData({...formData, short_description: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => setFormData({...formData, sku: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="unit">Unit</Label>
                <Select value={formData.unit} onValueChange={(value) => setFormData({...formData, unit: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="piece">Piece</SelectItem>
                    <SelectItem value="kg">Kilogram</SelectItem>
                    <SelectItem value="gram">Gram</SelectItem>
                    <SelectItem value="meter">Meter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Adding..." : "Add Product"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}