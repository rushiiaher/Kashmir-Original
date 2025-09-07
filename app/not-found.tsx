export default function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold text-balance">Page not found</h1>
      <p className="mt-3 text-muted-foreground">The page you’re looking for doesn’t exist or may have moved.</p>
      <div className="mt-8">
        <a
          href="/"
          className="inline-flex items-center rounded-md bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
        >
          Go back home
        </a>
      </div>
    </main>
  )
}
