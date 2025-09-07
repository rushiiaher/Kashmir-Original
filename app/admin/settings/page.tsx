"use client"

import { useState } from "react"
import { useAuth } from "@/lib/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function AdminSettings() {
  const { user, loading } = useAuth()
  const [settings, setSettings] = useState({
    siteName: "Kashmir Bazaar",
    siteDescription: "Authentic Kashmiri Products from Verified Local Vendors",
    commissionRate: "10",
    currency: "INR",
    taxRate: "18"
  })
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    // Simulate saving settings
    setTimeout(() => {
      setMessage("Settings updated successfully!")
      setSubmitting(false)
    }, 1000)
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p>Please log in to access admin panel.</p>
        <Button asChild className="mt-4">
          <Link href="/auth/login">Sign In</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">System Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert className="mb-4">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="siteDescription">Site Description</Label>
              <Input
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="commissionRate">Default Commission Rate (%)</Label>
              <Input
                id="commissionRate"
                type="number"
                step="0.1"
                value={settings.commissionRate}
                onChange={(e) => setSettings({...settings, commissionRate: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                value={settings.currency}
                onChange={(e) => setSettings({...settings, currency: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                step="0.1"
                value={settings.taxRate}
                onChange={(e) => setSettings({...settings, taxRate: e.target.value})}
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