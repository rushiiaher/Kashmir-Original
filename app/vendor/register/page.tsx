"use client"

import { useState } from "react"
import { useAuth } from "@/lib/hooks/useAuth"
import { createVendorProfile } from "@/lib/data/vendor-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function VendorRegister() {
  const { user, loading } = useAuth()
  const [formData, setFormData] = useState({
    store_name: "",
    store_slug: "",
    description: "",
    business_email: "",
    business_phone: "",
    gst_number: "",
    pan_number: ""
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const slug = generateSlug(formData.store_name)
      
      const vendorData = {
        user_id: user?.id,
        store_name: formData.store_name,
        store_slug: slug,
        description: formData.description,
        business_email: formData.business_email,
        business_phone: formData.business_phone,
        gst_number: formData.gst_number,
        pan_number: formData.pan_number,
        status: 'pending',
        is_verified: false
      }

      const result = await createVendorProfile(vendorData)
      
      if (result.error) {
        setError(result.error)
      } else {
        setSuccess("Vendor registration submitted! Please wait for admin approval.")
        setTimeout(() => router.push('/vendor'), 3000)
      }
    } catch (err) {
      setError("Failed to register vendor profile")
    }
    
    setSubmitting(false)
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p>Please log in to register as a vendor.</p>
        <Button asChild className="mt-4">
          <Link href="/auth/login">Sign In</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Vendor Registration</h1>

      <Card>
        <CardHeader>
          <CardTitle>Store Information</CardTitle>
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
              <Label htmlFor="store_name">Store Name</Label>
              <Input
                id="store_name"
                value={formData.store_name}
                onChange={(e) => {
                  setFormData({
                    ...formData, 
                    store_name: e.target.value,
                    store_slug: generateSlug(e.target.value)
                  })
                }}
                required
              />
            </div>

            <div>
              <Label htmlFor="store_slug">Store URL</Label>
              <Input
                id="store_slug"
                value={formData.store_slug}
                onChange={(e) => setFormData({...formData, store_slug: e.target.value})}
                placeholder="your-store-name"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Your store will be available at: /vendors/{formData.store_slug}
              </p>
            </div>

            <div>
              <Label htmlFor="description">Store Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                placeholder="Describe your store and products..."
              />
            </div>

            <div>
              <Label htmlFor="business_email">Business Email</Label>
              <Input
                id="business_email"
                type="email"
                value={formData.business_email}
                onChange={(e) => setFormData({...formData, business_email: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="business_phone">Business Phone</Label>
              <Input
                id="business_phone"
                type="tel"
                value={formData.business_phone}
                onChange={(e) => setFormData({...formData, business_phone: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="gst_number">GST Number (Optional)</Label>
              <Input
                id="gst_number"
                value={formData.gst_number}
                onChange={(e) => setFormData({...formData, gst_number: e.target.value})}
                placeholder="22AAAAA0000A1Z5"
              />
            </div>

            <div>
              <Label htmlFor="pan_number">PAN Number</Label>
              <Input
                id="pan_number"
                value={formData.pan_number}
                onChange={(e) => setFormData({...formData, pan_number: e.target.value})}
                placeholder="ABCDE1234F"
                required
              />
            </div>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Registering..." : "Register as Vendor"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}