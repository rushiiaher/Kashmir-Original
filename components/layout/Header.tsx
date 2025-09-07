"use client"

import Link from "next/link"
import { ShoppingCart, Search, User, Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLocalStorageSWR } from "@/lib/use-localstorage-swr"
import { emptyCart, type CartStore } from "@/lib/cart"
import { useAuth } from "@/lib/hooks/useAuth"

function UserMenu() {
  const { user, signOut } = useAuth()

  if (!user) {
    return (
      <Button variant="ghost" size="sm" asChild>
        <Link href="/auth/login">
          <User className="h-5 w-5" />
        </Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/account">My Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/orders">Orders</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Header() {
  const { data: cart } = useLocalStorageSWR<CartStore>("cart", emptyCart)
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-emerald-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">KB</span>
          </div>
          <span className="font-bold text-xl">Kashmir Bazaar</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/products" className="text-sm font-medium hover:text-emerald-600">
            Products
          </Link>
          <Link href="/vendors" className="text-sm font-medium hover:text-emerald-600">
            Vendors
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-emerald-600">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-emerald-600">
            Contact
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-sm mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <Button variant="ghost" size="sm" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {itemCount}
                </Badge>
              )}
            </Link>
          </Button>

          {/* User Account */}
          <UserMenu />

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-6">
                <Link href="/products" className="text-sm font-medium">
                  Products
                </Link>
                <Link href="/vendors" className="text-sm font-medium">
                  Vendors
                </Link>
                <Link href="/about" className="text-sm font-medium">
                  About
                </Link>
                <Link href="/contact" className="text-sm font-medium">
                  Contact
                </Link>
                <hr />
                <Link href="/account" className="text-sm font-medium">
                  My Account
                </Link>
                <Link href="/cart" className="text-sm font-medium">
                  Cart ({itemCount})
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}