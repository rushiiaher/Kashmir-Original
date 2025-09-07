import { NextResponse } from "next/server"
import { products } from "@/lib/mock-data"

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) return new NextResponse("Not Found", { status: 404 })
  return NextResponse.json({ product })
}
