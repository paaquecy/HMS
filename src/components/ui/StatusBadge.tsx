const variants: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  admitted: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  discharged: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  emergency: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
  critical: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  on_leave: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
  available: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  occupied: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
  reserved: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  maintenance: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  failed: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  resolved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  investigating: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  inactive: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
}

export default function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase().replace(/\s+/g, '_')
  const cls = variants[key] || variants.pending
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${cls}`}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}
