import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  return [
    { url: `${base}/`, priority: 1.0 },
    { url: `${base}/products`, priority: 0.9 },
    { url: `${base}/about`, priority: 0.5 },
    { url: `${base}/contact`, priority: 0.5 },
    { url: `${base}/policies/shipping`, priority: 0.3 },
    { url: `${base}/policies/returns`, priority: 0.3 },
    { url: `${base}/policies/privacy`, priority: 0.3 },
  ]
}
