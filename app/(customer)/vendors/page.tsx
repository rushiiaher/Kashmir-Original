"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Package } from "lucide-react"
import Link from "next/link"
import { getVendors } from "@/lib/data/vendors"

export default function VendorsPage() {
  const [vendors, setVendors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVendors() {
      const vendorsData = await getVendors()
      setVendors(vendorsData)
      setLoading(false)
    }
    fetchVendors()
  }, [])

  if (loading) {
    return (
      <main>
        <SiteHeader />
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
        <SiteFooter />
      </main>
    )
  }

  const mockVendors = [
  {
    id: "1",
    store_name: "Kashmir Crafts Co.",
    store_slug: "kashmir-crafts-co",
    description: "Authentic handwoven pashminas and traditional Kashmiri shawls",
    rating: 4.8,
    total_sales: 45,
    is_verified: true
  }
  ]
  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Our Trusted Vendors</h1>
          <p className="text-gray-600">
            Discover authentic Kashmiri products from verified local artisans and vendors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(vendors.length > 0 ? vendors : mockVendors).map((vendor) => (
            <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{vendor.store_name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{vendor.rating || 0}</span>
                        </div>
                        {vendor.is_verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{vendor.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Kashmir
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="w-4 h-4" />
                    {vendor.total_sales || 0} sales
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link href={`/vendors/${vendor.store_slug}`}>
                    Visit Store
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}