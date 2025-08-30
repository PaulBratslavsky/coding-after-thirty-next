interface IPageHeaderProps {
  readonly title: string
  readonly description: string
}

export function PageHeader({ title, description }: IPageHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  )
}