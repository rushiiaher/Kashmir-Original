import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductDetailClient } from "@/components/product-detail-client"
import { getProductBySlug } from "@/lib/data/products"

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return notFound()

  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images?.[0] || "/placeholder.svg"}
            alt={product.name}
            className="h-80 w-full rounded-lg object-cover"
          />
          <div>
            <h1 className="text-balance text-2xl font-semibold">{product.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
            <p className="mt-4 text-2xl font-semibold text-emerald-700">
              ₹ {new Intl.NumberFormat("en-IN").format(product.price)}
            </p>

            <ProductDetailClient product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              image: product.images?.[0] || '/placeholder.svg',
              description: product.description,
              category: product.categories?.slug || 'general',
              rating: product.rating || 0,
              stock: product.quantity || 0,
              currency: 'INR' as const
            }} />

            <div className="mt-8">
              <h3 className="mb-2 font-medium">Details</h3>
              <ul className="list-inside list-disc text-sm text-muted-foreground">
                <li>Category: {product.categories?.name}</li>
                <li>Vendor: {product.vendors?.store_name}</li>
                <li>Rating: {product.rating || 0} / 5</li>
                <li>Availability: {product.quantity > 0 ? "In stock" : "Out of stock"}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}