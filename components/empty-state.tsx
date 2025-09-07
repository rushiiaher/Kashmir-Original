type EmptyStateProps = {
  title: string
  description?: string
  action?: { href: string; label: string }
}
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="mx-auto max-w-md text-center py-12">
      <img src="/abstract-empty-state-icon.jpg" alt="" className="mx-auto mb-6 opacity-80" />
      <h2 className="text-xl font-semibold text-balance">{title}</h2>
      {description ? <p className="mt-2 text-sm text-muted-foreground text-pretty">{description}</p> : null}
      {action ? (
        <div className="mt-6">
          <a
            href={action.href}
            className="inline-flex items-center rounded-md bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-800 focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            {action.label}
          </a>
        </div>
      ) : null}
    </div>
  )
}
