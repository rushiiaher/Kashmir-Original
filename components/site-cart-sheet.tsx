"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useLocalStorageSWR } from "@/lib/use-localstorage-swr"
import { emptyCart, removeItem, total, updateQty } from "@/lib/cart"
import Link from "next/link"

export function CartSheetContent() {
  const { data: cart, setData } = useLocalStorageSWR("cart", emptyCart)
  const { toast } = useToast()
  const t = total(cart)

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 py-4">
        {cart.items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Your cart is empty.</p>
        ) : (
          cart.items.map((i) => (
            <div key={i.productId} className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={i.image || "/placeholder.svg"} alt="" className="h-16 w-16 rounded object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{i.name}</p>
                <p className="text-xs text-muted-foreground">₹ {new Intl.NumberFormat("en-IN").format(i.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  aria-label="Quantity"
                  type="number"
                  min={0}
                  value={i.quantity}
                  onChange={(e) => setData(updateQty(cart, i.productId, Number(e.target.value)))}
                  className="h-8 w-16"
                />
                <Button variant="ghost" onClick={() => setData(removeItem(cart, i.productId))}>
                  Remove
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t py-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Subtotal</span>
          <span className="text-base font-semibold">₹ {new Intl.NumberFormat("en-IN").format(t)}</span>
        </div>
        <Button disabled={cart.items.length === 0} className="w-full bg-emerald-700 hover:bg-emerald-800" asChild>
          <Link href="/checkout">Proceed to checkout</Link>
        </Button>
      </div>
    </div>
  )
}
