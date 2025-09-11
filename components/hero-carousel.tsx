'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ResponsiveHeroContent } from '@/components/responsive-hero-content'

const bannerData = [
  {
    id: 1,
    image: '/banner/Lucid_Origin_Design_a_modern_homepage_hero_section_poster_for__0.jpg',
    fallbackBg: 'bg-gradient-to-r from-emerald-600 to-emerald-800',
    title: 'Authentic Kashmir Collection',
    subtitle: 'Discover handcrafted treasures from the valley',
    ctaText: 'Shop Now',
    ctaLink: '/products',
    secondaryCtaText: 'Explore Categories',
    secondaryCtaLink: '/categories'
  },
  {
    id: 2,
    image: '/banner/Lucid_Origin_Design_a_modern_homepage_hero_section_poster_for__1.jpg',
    fallbackBg: 'bg-gradient-to-r from-blue-600 to-purple-700',
    title: 'Premium Pashmina Shawls',
    subtitle: 'Luxurious warmth, timeless elegance',
    ctaText: 'View Collection',
    ctaLink: '/category/pashmina',
    secondaryCtaText: 'Learn More',
    secondaryCtaLink: '/about'
  },
  {
    id: 3,
    image: '/banner/Lucid_Origin_Design_a_modern_homepage_hero_section_poster_for__2.jpg',
    fallbackBg: 'bg-gradient-to-r from-orange-500 to-red-600',
    title: 'Pure Kashmiri Saffron',
    subtitle: 'World\'s finest saffron, directly from Kashmir',
    ctaText: 'Buy Saffron',
    ctaLink: '/category/saffron',
    secondaryCtaText: 'Quality Promise',
    secondaryCtaLink: '/quality'
  },
  {
    id: 4,
    image: '/banner/Lucid_Origin_Design_a_modern_homepage_hero_section_poster_for__3.jpg',
    fallbackBg: 'bg-gradient-to-r from-indigo-600 to-purple-600',
    title: 'Handwoven Carpets',
    subtitle: 'Exquisite craftsmanship, generations of tradition',
    ctaText: 'Browse Carpets',
    ctaLink: '/category/carpets',
    secondaryCtaText: 'Artisan Stories',
    secondaryCtaLink: '/artisans'
  }
]

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    duration: 30
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi) return
    const autoplay = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)
    return () => clearInterval(autoplay)
  }, [emblaApi])

  return (
    <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {bannerData.map((banner) => (
            <div key={banner.id} className="embla__slide relative flex-[0_0_100%] min-w-0">
              <div className={`relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] ${banner.fallbackBg}`}>
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover"
                  priority={banner.id === 1}
                  sizes="100vw"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                
                {/* Content overlay */}
                <ResponsiveHeroContent
                  title={banner.title}
                  subtitle={banner.subtitle}
                  ctaText={banner.ctaText}
                  ctaLink={banner.ctaLink}
                  secondaryCtaText={banner.secondaryCtaText}
                  secondaryCtaLink={banner.secondaryCtaLink}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows - hidden on mobile */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm hidden sm:flex"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
      >
        <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm hidden sm:flex"
        onClick={scrollNext}
        disabled={!canScrollNext}
      >
        <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
      </Button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {bannerData.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}