import type { Cart } from "./cart"
import type { Address, Profile } from "./account"

export type OrderStatus = "processing" | "paid" | "shipped" | "delivered" | "cancelled"

export type Order = {
  id: string
  items: Cart["items"]
  subtotal: number
  createdAt: string
  status: OrderStatus
  customer: Profile
  shipping: Address
}

export type OrdersStore = {
  orders: Order[]
}

export const emptyOrders: OrdersStore = { orders: [] }

export function generateOrderId() {
  const now = new Date()
  const y = now.getFullYear()
  const r = Math.floor(1000 + Math.random() * 9000)
  return `KO-${y}-${r}`
}

export function createOrder(cart: Cart, customer: Profile, shipping: Address): Order {
  const id = generateOrderId()
  const subtotal = cart.items.reduce((s, i) => s + i.price * i.quantity, 0)
  return {
    id,
    items: cart.items,
    subtotal,
    createdAt: new Date().toISOString(),
    status: "processing",
    customer,
    shipping,
  }
}
