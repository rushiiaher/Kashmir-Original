"use client"

import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useLocalStorageSWR } from "@/lib/use-localstorage-swr"
import { emptyOrders, type OrdersStore } from "@/lib/orders"

export default function AccountOrdersPage() {
  const { data: orders } = useLocalStorageSWR<OrdersStore>("orders", emptyOrders)

  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Your Orders</h1>

        {orders.orders.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No orders yet.{" "}
            <Link href="/products" className="text-emerald-700 hover:underline">
              Shop products
            </Link>
          </p>
        ) : (
          <div className="mt-6 overflow-hidden rounded-lg border">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium">Order</th>
                  <th className="px-4 py-2 font-medium">Date</th>
                  <th className="px-4 py-2 font-medium">Total</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                  <th className="px-4 py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.orders.map((o) => (
                  <tr key={o.id} className="border-t">
                    <td className="px-4 py-2 font-mono">{o.id}</td>
                    <td className="px-4 py-2">{new Date(o.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-2">₹ {new Intl.NumberFormat("en-IN").format(o.subtotal)}</td>
                    <td className="px-4 py-2 capitalize">{o.status}</td>
                    <td className="px-4 py-2">
                      <Link href={`/order/${o.id}`} className="text-emerald-700 hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <SiteFooter />
    </main>
  )
}