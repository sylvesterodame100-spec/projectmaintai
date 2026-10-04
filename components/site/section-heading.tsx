export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <p className="font-mono text-xs uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {description && (
        <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
