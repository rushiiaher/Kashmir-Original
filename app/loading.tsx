export default function Loading() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-1/2 rounded bg-muted" />
        <div className="h-4 w-2/3 rounded bg-muted" />
        <div className="h-4 w-5/6 rounded bg-muted" />
        <div className="h-64 w-full rounded bg-muted" />
      </div>
    </main>
  )
}
