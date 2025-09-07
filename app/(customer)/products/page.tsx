"use client"

import { useMemo, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { getCategories } from "@/lib/data/categories"
import { getProducts } from "@/lib/data/products"
import { Search, SlidersHorizontal } from "lucide-react"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams?.get('search') || "")
  const [cat, setCat] = useState<string | "all">("all")
  const [sortBy, setSortBy] = useState("newest")
  const [priceRange, setPriceRange] = useState("all")
  const [categories, setCategories] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const [categoriesData, productsData] = await Promise.all([
        getCategories(),
        getProducts()
      ])
      setCategories(categoriesData)
      setProducts(productsData)
      setLoading(false)
    }
    fetchData()
  }, [])

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const q = query.trim().toLowerCase()
      const matchesCat = cat === "all" || p.categories?.slug === cat
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tags?.some((t: string) => t.toLowerCase().includes(q))
      
      const matchesPrice = priceRange === "all" || (
        priceRange === "under-1000" && p.price < 1000 ||
        priceRange === "1000-5000" && p.price >= 1000 && p.price <= 5000 ||
        priceRange === "5000-10000" && p.price >= 5000 && p.price <= 10000 ||
        priceRange === "above-10000" && p.price > 10000
      )
      
      return matchesCat && matchesQuery && matchesPrice
    })
    
    // Sort results
    switch(sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "newest":
      default:
        result.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
        break
    }
    
    return result
  }, [query, cat, sortBy, priceRange, products])

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

  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-gray-600">Discover authentic Kashmiri products from verified vendors</p>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Filter Row */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            {/* Category Filter */}
            <Select value={cat} onValueChange={setCat}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Price Filter */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-1000">Under ₹1,000</SelectItem>
                <SelectItem value="1000-5000">₹1,000 - ₹5,000</SelectItem>
                <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
                <SelectItem value="above-10000">Above ₹10,000</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Sort Filter */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Clear Filters */}
            {(query || cat !== "all" || priceRange !== "all" || sortBy !== "newest") && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setQuery("")
                  setCat("all")
                  setPriceRange("all")
                  setSortBy("newest")
                }}
              >
                Clear All
              </Button>
            )}
          </div>
          
          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filtered.length} of {products.length} products
            </p>
            
            {/* Active Filters */}
            <div className="flex gap-2">
              {query && <Badge variant="secondary">Search: {query}</Badge>}
              {cat !== "all" && <Badge variant="secondary">Category: {categories.find(c => c.slug === cat)?.name}</Badge>}
              {priceRange !== "all" && <Badge variant="secondary">Price: {priceRange}</Badge>}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <Button 
              onClick={() => {
                setQuery("")
                setCat("all")
                setPriceRange("all")
                setSortBy("newest")
              }}
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={{
                id: p.id,
                name: p.name,
                slug: p.slug,
                price: p.price,
                image: p.images?.[0] || '/placeholder.svg',
                description: p.description,
                category: p.categories?.slug,
                rating: p.rating || 0,
                stock: p.quantity
              }} />
            ))}
          </div>
        )}
      </div>
      <SiteFooter />
    </main>
  )
}