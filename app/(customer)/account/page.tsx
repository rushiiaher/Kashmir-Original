"use client"

import { useAuth } from "@/lib/hooks/useAuth"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { User, Package, Heart, Settings } from "lucide-react"

export default function AccountPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <main>
        <SiteHeader />
        <div className="mx-auto max-w-4xl px-4 py-10">
          <div className="text-center">Loading...</div>
        </div>
        <SiteFooter />
      </main>
    )
  }

  if (!user) {
    return (
      <main>
        <SiteHeader />
        <div className="mx-auto max-w-4xl px-4 py-10">
          <div className="text-center">
            <p>Please log in to access your account.</p>
            <Button asChild className="mt-4">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
        <SiteFooter />
      </main>
    )
  }

  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Manage your personal information
              </p>
              <Button asChild variant="outline">
                <Link href="/account/profile">View Profile</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Track your orders and purchase history
              </p>
              <Button asChild variant="outline">
                <Link href="/account/orders">View Orders</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Wishlist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Items you've saved for later
              </p>
              <Button asChild variant="outline">
                <Link href="/account/wishlist">View Wishlist</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Account settings and preferences
              </p>
              <Button asChild variant="outline">
                <Link href="/account/settings">Manage Settings</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Account Information</h3>
          <p className="text-sm text-gray-600">Email: {user.email}</p>
          <p className="text-sm text-gray-600">Phone: {user.user_metadata?.phone || 'Not provided'}</p>
          <p className="text-sm text-gray-600">Member since: {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}