"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
interface Product {
  id: string
  name: string
  slug: string
  price: number
  image: string
  description: string
  category?: string
  rating?: number
  stock: number
}
import { useLocalStorageSWR } from "@/lib/use-localstorage-swr"
import { addToCart, emptyCart } from "@/lib/cart"
import { emptyWishlist, toggleWish, hasWish } from "@/lib/wishlist"
import { Heart, Star, ShoppingCart } from "lucide-react"

export function ProductCard({ product }: { product: Product }) {
  const { data: cart, setData: setCart } = useLocalStorageSWR("cart", emptyCart)
  const { data: wishlist, setData: setWishlist } = useLocalStorageSWR("wishlist", emptyWishlist)
  const wished = hasWish(wishlist, product.id)

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
      <div className="relative">
        <Link href={`/products/${product.slug}`} className="block">
          <img 
            src={product.image || "/placeholder.svg"} 
            alt={product.name} 
            className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-200" 
          />
        </Link>
        
        {/* Stock Badge */}
        {product.stock <= 5 && product.stock > 0 && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            Only {product.stock} left!
          </Badge>
        )}
        
        {product.stock === 0 && (
          <Badge variant="secondary" className="absolute top-2 left-2">
            Out of Stock
          </Badge>
        )}
        
        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
          onClick={() => setWishlist(toggleWish(wishlist, product.id))}
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
        </Button>
      </div>
      
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/products/${product.slug}`} className="text-pretty font-medium hover:underline hover:text-emerald-600">
          {product.name}
        </Link>
        
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        
        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-gray-500">(Reviews)</span>
          </div>
        )}
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-emerald-700">
              ₹{new Intl.NumberFormat("en-IN").format(product.price)}
            </span>
            <span className="text-xs text-gray-500">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
          
          <Button
            onClick={() => setCart(addToCart(cart, product, 1))}
            disabled={product.stock === 0}
            className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-gray-300"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  )
}
