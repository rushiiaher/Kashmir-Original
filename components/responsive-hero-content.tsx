'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useIsMobile } from '@/hooks/use-mobile'

interface HeroContentProps {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  secondaryCtaText: string
  secondaryCtaLink: string
}

export function ResponsiveHeroContent({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink
}: HeroContentProps) {
  const isMobile = useIsMobile()

  return (
    <div className="absolute inset-0 flex items-center">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl text-white">
          <h1 className={`font-bold mb-4 leading-tight ${
            isMobile 
              ? 'text-2xl' 
              : 'text-3xl md:text-5xl lg:text-6xl'
          }`}>
            {title}
          </h1>
          <p className={`mb-8 text-gray-200 leading-relaxed ${
            isMobile 
              ? 'text-base' 
              : 'text-lg md:text-xl lg:text-2xl'
          }`}>
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size={isMobile ? "default" : "lg"}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg font-semibold"
              asChild
            >
              <Link href={ctaLink}>
                {ctaText}
              </Link>
            </Button>
            
            <Button 
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-emerald-800 px-8 py-3 text-lg font-semibold bg-transparent"
              asChild
            >
              <Link href={secondaryCtaLink}>
                {secondaryCtaText}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}