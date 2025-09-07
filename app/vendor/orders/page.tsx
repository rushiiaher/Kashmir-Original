"use client"

import { useAuth } from "@/lib/hooks/useAuth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function VendorOrders() {
  const { user, loading } = useAuth()

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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>

      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500 mb-4">No orders found</p>
          <p className="text-sm text-gray-400">
            Orders will appear here when customers purchase your products
          </p>
        </CardContent>
      </Card>
    </div>
  )
}