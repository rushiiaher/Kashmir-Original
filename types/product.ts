export interface Product {
  id: string
  name: string
  slug: string
  price: number
  currency: "INR" | "USD"
  image: string
  description: string
  category: string
  rating: number
  stock: number
  tags?: string[]
}