interface WidgetCardProps {
  title: string
  children: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export default function WidgetCard({ title, children, action, className = '' }: WidgetCardProps) {
  return (
    <div className={`glass-card p-5 ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  )
}
