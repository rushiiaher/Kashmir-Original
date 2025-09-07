"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/hooks/useAuth"
import { getVendorByUserId } from "@/lib/data/vendor-data"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function VendorSettings() {
  const { user, loading } = useAuth()
  const [vendor, setVendor] = useState<any>(null)
  const [formData, setFormData] = useState({
    store_name: "",
    description: "",
    business_email: "",
    business_phone: "",
    gst_number: "",
    pan_number: ""
  })
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const supabase = createClient()

  useEffect(() => {
    if (user) {
      fetchVendorData()
    }
  }, [user])

  const fetchVendorData = async () => {
    const vendorData = await getVendorByUserId(user?.id!)
    if (vendorData) {
      setVendor(vendorData)
      setFormData({
        store_name: vendorData.store_name || "",
        description: vendorData.description || "",
        business_email: vendorData.business_email || "",
        business_phone: vendorData.business_phone || "",
        gst_number: vendorData.gst_number || "",
        pan_number: vendorData.pan_number || ""
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const { error } = await supabase
      .from('vendors')
      .update(formData)
      .eq('id', vendor.id)

    if (error) {
      setMessage("Error updating settings: " + error.message)
    } else {
      setMessage("Settings updated successfully!")
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

  if (!vendor) {
    return (
      <div className="p-8 text-center">
        <p>Vendor profile not found.</p>
        <Button asChild className="mt-4">
          <Link href="/vendor/register">Register as Vendor</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Store Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Store Information</CardTitle>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert className="mb-4">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="store_name">Store Name</Label>
              <Input
                id="store_name"
                value={formData.store_name}
                onChange={(e) => setFormData({...formData, store_name: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Store Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
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
              <Label htmlFor="gst_number">GST Number</Label>
              <Input
                id="gst_number"
                value={formData.gst_number}
                onChange={(e) => setFormData({...formData, gst_number: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="pan_number">PAN Number</Label>
              <Input
                id="pan_number"
                value={formData.pan_number}
                onChange={(e) => setFormData({...formData, pan_number: e.target.value})}
                required
              />
            </div>

            <Button type="submit" disabled={submitting}>
              {submitting ? "Updating..." : "Update Settings"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}