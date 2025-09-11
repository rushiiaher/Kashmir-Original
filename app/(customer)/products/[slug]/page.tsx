import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductDetailClient } from "@/components/product-detail-client"
import { ProductCard } from "@/components/product-card"
import { Card, CardContent } from "@/components/ui/card"
import { getProductBySlug, getFeaturedProducts } from "@/lib/data/products"

const mockReviews = [
  { id: 1, name: "Priya S.", rating: 5, comment: "Excellent quality! Exactly as described.", date: "2 days ago" },
  { id: 2, name: "Rajesh K.", rating: 4, comment: "Good product, fast delivery. Recommended!", date: "1 week ago" },
  { id: 3, name: "Anita M.", rating: 5, comment: "Beautiful craftsmanship. Worth every penny.", date: "2 weeks ago" }
]

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [product, relatedProducts] = await Promise.all([
    getProductBySlug(slug),
    getFeaturedProducts()
  ])
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

        {/* Customer Reviews */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="grid gap-4">
            {mockReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{review.name}</span>
                      <div className="flex text-yellow-400">
                        {Array.from({ length: review.rating }, (_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.filter(p => p.id !== product.id).slice(0, 4).map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={{
                id: relatedProduct.id,
                name: relatedProduct.name,
                slug: relatedProduct.slug,
                price: relatedProduct.price,
                image: relatedProduct.images?.[0] || '/placeholder.svg',
                description: relatedProduct.description,
                category: relatedProduct.categories?.slug || 'general',
                rating: relatedProduct.rating || 0,
                stock: relatedProduct.quantity || 0,
                currency: 'INR' as const
              }} />
            ))}
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}