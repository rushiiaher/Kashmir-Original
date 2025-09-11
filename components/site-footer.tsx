import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/ko-logo.png"
              alt="Kashmir Original Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Kashmir Original. Handcrafted heritage from Kashmir.
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-foreground/80 hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="text-sm text-foreground/80 hover:text-foreground">
              Terms
            </a>
            <a href="#" className="text-sm text-foreground/80 hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
