import type { Product } from "@/types/product"

export type CartItem = {
  productId: string
  name: string
  price: number
  currency: "INR" | "USD"
  image: string
  quantity: number
  category: string
}

export type Cart = {
  items: CartItem[]
}

export type CartStore = Cart

export const emptyCart: Cart = { items: [] }

export function addToCart(cart: Cart, product: Product, qty = 1): Cart {
  const idx = cart.items.findIndex((i) => i.productId === product.id)
  const next = { ...cart, items: [...cart.items] }
  if (idx >= 0) {
    next.items[idx] = { ...next.items[idx], quantity: next.items[idx].quantity + qty }
  } else {
    next.items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image: product.image,
      quantity: qty,
      category: product.category,
    })
  }
  return next
}

export function updateQty(cart: Cart, productId: string, qty: number): Cart {
  const next = { ...cart, items: cart.items.map((i) => ({ ...i })) }
  const idx = next.items.findIndex((i) => i.productId === productId)
  if (idx >= 0) {
    if (qty <= 0) next.items.splice(idx, 1)
    else next.items[idx].quantity = qty
  }
  return next
}

export function updateQuantity(cart: Cart, productId: string, qty: number): Cart {
  return updateQty(cart, productId, qty)
}

export function removeItem(cart: Cart, productId: string): Cart {
  return { ...cart, items: cart.items.filter((i) => i.productId !== productId) }
}

export function removeFromCart(cart: Cart, productId: string): Cart {
  return removeItem(cart, productId)
}

export function total(cart: Cart): number {
  return cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
}
