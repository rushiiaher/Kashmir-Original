"use client"

import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Package, Phone, Mail } from "lucide-react"
import { products } from "@/lib/mock-data"

// Mock vendor data - in real app this would come from Supabase
const vendors = [
  {
    id: "1",
    name: "Kashmir Crafts Co.",
    slug: "kashmir-crafts-co",
    description: "We are a family-run business specializing in authentic handwoven pashminas and traditional Kashmiri shawls. Our artisans have been perfecting their craft for generations.",
    logo: "/placeholder.svg",
    banner: "/placeholder.svg",
    rating: 4.8,
    totalProducts: 45,
    totalSales: 1250,
    location: "Srinagar, Kashmir",
    phone: "+91 9876543210",
    email: "info@kashmircrafts.com",
    isVerified: true,
    joinedDate: "2020-03-15",
    specialties: ["Pashmina", "Shawls", "Textiles"]
  }
]

export default function VendorStorePage({ params }: { params: { slug: string } }) {
  const vendor = vendors.find(v => v.slug === params.slug)
  if (!vendor) return notFound()

  // Filter products by vendor (in real app, this would be a proper vendor_id filter)
  const vendorProducts = products.filter(p => p.category === "pashmina" || p.category === "textiles")

  return (
    <main>
      <SiteHeader />
      
      {/* Vendor Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Package className="w-12 h-12 text-emerald-600" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{vendor.name}</h1>
                {vendor.isVerified && (
                  <Badge className="bg-emerald-600">Verified Vendor</Badge>
                )}
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{vendor.rating}</span>
                  <span className="text-gray-600">({vendor.totalSales} sales)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {vendor.location}
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 max-w-2xl">{vendor.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {vendor.specialties.map((specialty) => (
                  <Badge key={specialty} variant="outline">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Products ({vendorProducts.length})</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {vendorProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {vendorProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products available from this vendor.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="about" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">About {vendor.name}</h3>
                <p className="text-gray-700 mb-6">{vendor.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Store Statistics</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>Total Products: {vendor.totalProducts}</li>
                      <li>Total Sales: {vendor.totalSales}</li>
                      <li>Member Since: {new Date(vendor.joinedDate).toLocaleDateString()}</li>
                      <li>Rating: {vendor.rating}/5.0</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {vendor.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>{vendor.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span>{vendor.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>{vendor.location}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button>Send Message</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <SiteFooter />
    </main>
  )
}