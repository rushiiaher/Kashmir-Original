export type Category = {
  id: string
  name: string
  slug: string
}

export type Product = {
  id: string
  name: string
  slug: string
  price: number
  currency: "INR" | "USD"
  description: string
  category: string // slug
  image: string
  stock: number
  rating: number
  tags?: string[]
}

export const categories: Category[] = [
  { id: "c1", name: "Pashmina Shawls", slug: "pashmina-shawls" },
  { id: "c2", name: "Paper Mâché", slug: "paper-mache" },
  { id: "c3", name: "Carpets & Rugs", slug: "carpets-rugs" },
  { id: "c4", name: "Saffron & Spices", slug: "saffron-spices" },
]

export const products: Product[] = [
  {
    id: "p1",
    name: "Handwoven Pashmina Shawl – Classic Emerald",
    slug: "pashmina-shawl-classic-emerald",
    price: 11999,
    currency: "INR",
    description:
      "Luxuriously soft Pashmina handwoven in Kashmir. Lightweight warmth, refined drape, and timeless elegance.",
    category: "pashmina-shawls",
    image: "/handwoven-pashmina-shawl.jpg",
    stock: 12,
    rating: 4.8,
    tags: ["handcrafted", "warm", "kashmir"],
  },
  {
    id: "p2",
    name: "Kashmiri Paper Mâché Vase – Saffron Motif",
    slug: "paper-mache-vase-saffron",
    price: 3499,
    currency: "INR",
    description:
      "Traditional Kashmiri paper mâché vase with hand-painted saffron motifs and protective lacquer finish.",
    category: "paper-mache",
    image: "/kashmiri-paper-mache-vase.jpg",
    stock: 25,
    rating: 4.5,
    tags: ["decor", "handpainted"],
  },
  {
    id: "p3",
    name: "Handknotted Silk Carpet – Mughal Garden",
    slug: "silk-carpet-mughal-garden",
    price: 89999,
    currency: "INR",
    description: "Premium silk carpet inspired by Mughal gardens. Fine knot density, rich hues, and heirloom quality.",
    category: "carpets-rugs",
    image: "/handknotted-silk-carpet.jpg",
    stock: 3,
    rating: 4.9,
    tags: ["luxury", "silk", "handknotted"],
  },
  {
    id: "p4",
    name: "Pure Kashmiri Saffron – 1g",
    slug: "kashmiri-saffron-1g",
    price: 799,
    currency: "INR",
    description: "Authentic Mongra saffron strands from Pampore. Deep aroma, vibrant color, and exceptional flavor.",
    category: "saffron-spices",
    image: "/kashmiri-saffron-1g.jpg",
    stock: 100,
    rating: 4.7,
    tags: ["gourmet", "authentic"],
  },
]
