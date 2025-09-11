"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useLocalStorageSWR } from "@/lib/use-localstorage-swr"
import { emptyCart } from "@/lib/cart"
import { CartSheetContent } from "./site-cart-sheet"
import { useMemo } from "react"
import { emptyWishlist } from "@/lib/wishlist"
import { countWish } from "@/lib/wishlist"

export function SiteHeader() {
  const { data: cart } = useLocalStorageSWR("cart", emptyCart)
  const { data: wishlist } = useLocalStorageSWR("wishlist", emptyWishlist)
  const count = useMemo(() => cart.items.reduce((n, i) => n + i.quantity, 0), [cart])
  const wcount = useMemo(() => countWish(wishlist), [wishlist])

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/ko-logo.png"
            alt="Kashmir Original Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="font-sans text-xl font-semibold text-emerald-700">
            Kashmir Original
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm text-foreground/80 hover:text-foreground">
            Home
          </Link>
          <Link href="/products" className="text-sm text-foreground/80 hover:text-foreground">
            Products
          </Link>
          <Link href="/wishlist" className="text-sm text-foreground/80 hover:text-foreground">
            Wishlist{wcount > 0 ? ` (${wcount})` : ""}
          </Link>
          <Link href="/account" className="text-sm text-foreground/80 hover:text-foreground">
            Account
          </Link>
          <Link href="/vendor" className="text-sm text-foreground/80 hover:text-foreground">
            Vendor
          </Link>
          <Link href="/admin" className="text-sm text-foreground/80 hover:text-foreground">
            Admin
          </Link>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative bg-transparent">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Cart
              {count > 0 && (
                <span className="ml-2 rounded bg-amber-600 px-2 py-0.5 text-xs font-medium text-white">{count}</span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            <CartSheetContent />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
