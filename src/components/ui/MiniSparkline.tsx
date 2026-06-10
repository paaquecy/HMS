import { Area, AreaChart, ResponsiveContainer } from 'recharts'

interface MiniSparklineProps {
  data: number[]
  color?: string
}

export default function MiniSparkline({ data, color = '#2563eb' }: MiniSparklineProps) {
  const chartData = data.map((value, i) => ({ i, value }))
  return (
    <div className="h-10 w-20">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#grad-${color})`}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
