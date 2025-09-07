import { NextResponse } from "next/server"
import { products } from "@/lib/mock-data"

export async function GET() {
  return NextResponse.json({ products })
}
