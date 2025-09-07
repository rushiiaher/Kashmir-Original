"use client"

import React, { useMemo, useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { getCategoryBySlug } from "@/lib/data/categories"
import { getProductsByCategory } from "@/lib/data/products"

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params)
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchData() {
      const [categoryData, productsData] = await Promise.all([
        getCategoryBySlug(params.slug),
        getProductsByCategory(params.slug)
      ])
      
      if (!categoryData) {
        return notFound()
      }
      
      setCategory(categoryData)
      setProducts(productsData)
      setLoading(false)
    }
    fetchData()
  }, [params.slug])

  const categoryProducts = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((p) => {
      const matchesQuery = !q || 
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tags?.some((t: string) => t.toLowerCase().includes(q))
      return matchesQuery
    })
  }, [query, products])

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

  if (!category) return notFound()

  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{category.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-sm text-gray-600">
            {categoryProducts.length} products found
          </p>
          <Input
            placeholder="Search in this category…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-72"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {categoryProducts.map((product) => (
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

        {categoryProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        )}
      </div>
      <SiteFooter />
    </main>
  )
}