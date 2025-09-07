import React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getCategories } from "@/lib/data/categories"
import { getFeaturedProducts } from "@/lib/data/products"
import { getVendors } from "@/lib/data/vendors"

export default async function HomePage() {
  const [categories, featuredProducts, vendors] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getVendors()
  ])

  return (
    <main>
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 to-emerald-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-6xl px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 md:text-6xl">
              Kashmir Bazaar
            </h1>
            <p className="text-xl mb-4 text-emerald-100">
              Authentic Kashmiri Products from Verified Local Vendors
            </p>
            <p className="text-sm mb-8 text-emerald-200 max-w-2xl mx-auto">
              Discover handcrafted pashminas, premium saffron, exquisite carpets, and traditional handicrafts directly from Kashmir's finest artisans
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-white text-emerald-800 hover:bg-gray-100" asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button size="lg" className="border-2 border-white text-white hover:bg-white hover:text-emerald-800" asChild>
                <Link href="/vendors">Browse Vendors</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => {
              const getCategoryIcon = (name: string) => {
                switch(name.toLowerCase()) {
                  case 'pashmina': return '🧣'
                  case 'saffron': return '🌿'
                  case 'carpets': return '🧿'
                  case 'handicrafts': return '🎨'
                  default: return '🏷️'
                }
              }
              
              return (
                <Link key={category.id} href={`/category/${category.slug}`}>
                  <Card className="hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer border-2 hover:border-emerald-200">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center">
                        <span className="text-3xl">{getCategoryIcon(category.name)}</span>
                      </div>
                      <h3 className="font-semibold text-gray-800">{category.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button variant="outline" asChild>
              <Link href="/products">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: product.images?.[0] || '/placeholder.svg',
                description: product.description,
                category: product.categories?.slug,
                rating: product.rating || 0,
                stock: product.quantity
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-emerald-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Kashmir Bazaar?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-2xl text-white">✓</span>
              </div>
              <h3 className="font-semibold mb-2">Authentic Products</h3>
              <p className="text-sm text-gray-600">100% genuine Kashmiri products directly from local artisans and verified vendors</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-2xl text-white">🚚</span>
              </div>
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-600">Free delivery across India with secure packaging and tracking</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-2xl text-white">📞</span>
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Dedicated customer support to help you with any queries or concerns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Spotlight */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted Vendors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vendors.slice(0, 3).map((vendor) => (
              <Link key={vendor.id} href={`/vendors/${vendor.store_slug}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🏪</span>
                    </div>
                    <h3 className="font-semibold mb-2">{vendor.store_name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{vendor.description}</p>
                    <Badge variant="secondary">Verified Vendor</Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/vendors">View All Vendors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">"Amazing quality pashmina shawl! Exactly as described and arrived quickly. Will definitely order again."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-semibold">P</span>
                  </div>
                  <div>
                    <p className="font-semibold">Priya Sharma</p>
                    <p className="text-xs text-gray-500">Mumbai</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">"The saffron quality is exceptional! Pure and aromatic. Great packaging and fast delivery."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-semibold">R</span>
                  </div>
                  <div>
                    <p className="font-semibold">Rajesh Kumar</p>
                    <p className="text-xs text-gray-500">Delhi</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">"Beautiful handicrafts! Supporting local artisans while getting authentic products. Highly recommended!"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-semibold">A</span>
                  </div>
                  <div>
                    <p className="font-semibold">Anita Gupta</p>
                    <p className="text-xs text-gray-500">Bangalore</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}