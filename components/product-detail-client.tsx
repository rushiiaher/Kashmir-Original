"use client"

import { Button } from "@/components/ui/button"
import { addToCart, emptyCart } from "@/lib/cart"
import { useLocalStorageSWR } from "@/lib/use-localstorage-swr"
import type { Product } from "@/lib/mock-data"
import { emptyWishlist, toggleWish, hasWish } from "@/lib/wishlist"

export function ProductDetailClient({ product }: { product: Product }) {
  const { data: cart, setData: setCart } = useLocalStorageSWR("cart", emptyCart)
  const { data: wishlist, setData: setWishlist } = useLocalStorageSWR("wishlist", emptyWishlist)
  const wished = hasWish(wishlist, product.id)

  return (
    <div className="mt-6 flex gap-3">
      <Button className="bg-emerald-700 hover:bg-emerald-800" onClick={() => setCart(addToCart(cart, product, 1))}>
        Add to cart
      </Button>
      <Button variant="outline" onClick={() => setWishlist(toggleWish(wishlist, product.id))} aria-pressed={wished}>
        {wished ? "Saved" : "Save to wishlist"}
      </Button>
    </div>
  )
}
