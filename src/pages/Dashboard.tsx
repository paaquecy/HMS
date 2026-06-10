import { Users, Stethoscope, DollarSign, BedDouble, Activity, TrendingUp } from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import PageHeader from '../components/layout/PageHeader'
import StatCard from '../components/ui/StatCard'
import ChartCard from '../components/ui/ChartCard'
import WidgetCard from '../components/ui/WidgetCard'
import AlertPanel from '../components/ui/AlertPanel'
import {
  sparkline, patientGrowthData, departmentDistribution, admissionsVsDischarges,
  recentAdmissions, alerts,
} from '../data/dummyData'

export default function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's your hospital overview at a glance."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Patients" value="12,847" trend={8.2} icon={Users} sparkline={sparkline()} />
        <StatCard title="Active Doctors" value="87" trend={3.1} icon={Stethoscope} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
        <StatCard title="Monthly Revenue" value="₵52M" trend={12.5} icon={DollarSign} iconColor="bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400" sparkline={sparkline()} />
        <StatCard title="Bed Occupancy" value="87%" trend={-2.3} icon={BedDouble} iconColor="bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400" sparkline={sparkline()} />
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <ChartCard title="Patient Growth" subtitle="Monthly patient registrations">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={patientGrowthData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="patients" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Admissions vs Discharges" subtitle="Last 7 months">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={admissionsVsDischarges}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="admissions" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="discharges" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Department Distribution" className="lg:col-span-1">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={departmentDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                {departmentDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap gap-2">
            {departmentDistribution.map((d) => (
              <span key={d.name} className="flex items-center gap-1 text-xs text-slate-500">
                <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                {d.name}
              </span>
            ))}
          </div>
        </ChartCard>

        <WidgetCard title="Recent Admissions" className="lg:col-span-1">
          <div className="space-y-3">
            {recentAdmissions.map((a, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{a.name}</p>
                  <p className="text-xs text-slate-500">{a.dept} · {a.time}</p>
                </div>
                <span className={`text-xs font-medium ${a.severity === 'Critical' ? 'text-red-500' : 'text-emerald-600'}`}>
                  {a.severity}
                </span>
              </div>
            ))}
          </div>
        </WidgetCard>

        <AlertPanel alerts={alerts} title="System Alerts" />
      </div>

      <div className="mt-6 glass-card p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary-100 p-3 dark:bg-primary-900/50">
            <Activity className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">System Status: All Services Operational</p>
            <p className="text-sm text-slate-500">Uptime 99.97% · Last backup 2 hours ago · 342 active sessions</p>
          </div>
          <div className="ml-auto flex items-center gap-1 text-emerald-600">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">Healthy</span>
          </div>
        </div>
      </div>
    </div>
  )
}
