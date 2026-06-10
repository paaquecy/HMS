import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react'

export interface Alert {
  id: string
  type: 'critical' | 'warning' | 'info'
  message: string
  time?: string
}

const icons = {
  critical: AlertCircle,
  warning: AlertTriangle,
  info: CheckCircle,
}

const colors = {
  critical: 'border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20',
  warning: 'border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-900/20',
  info: 'border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-900/20',
}

const iconColors = {
  critical: 'text-red-500',
  warning: 'text-amber-500',
  info: 'text-emerald-500',
}

export default function AlertPanel({ alerts, title = 'Alerts' }: { alerts: Alert[]; title?: string }) {
  return (
    <div className="glass-card p-5">
      <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">{title}</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {alerts.map((alert) => {
          const Icon = icons[alert.type]
          return (
            <div
              key={alert.id}
              className={`flex items-start gap-3 rounded-xl border p-3 ${colors[alert.type]}`}
            >
              <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${iconColors[alert.type]}`} />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-slate-700 dark:text-slate-300">{alert.message}</p>
                {alert.time && <p className="mt-0.5 text-xs text-slate-500">{alert.time}</p>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
