import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react'
import MiniSparkline from './MiniSparkline'

interface StatCardProps {
  title: string
  value: string | number
  trend?: number
  icon: LucideIcon
  iconColor?: string
  sparkline?: number[]
}

export default function StatCard({
  title,
  value,
  trend,
  icon: Icon,
  iconColor = 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400',
  sparkline,
}: StatCardProps) {
  const isPositive = trend !== undefined && trend >= 0

  return (
    <div className="glass-card group p-5">
      <div className="flex items-start justify-between">
        <div className={`rounded-xl p-2.5 ${iconColor}`}>
          <Icon className="h-5 w-5" />
        </div>
        {sparkline && <MiniSparkline data={sparkline} />}
      </div>
      <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
      {trend !== undefined && (
        <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
          <span>{Math.abs(trend)}% vs last month</span>
        </div>
      )}
    </div>
  )
}
