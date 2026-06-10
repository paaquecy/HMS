import { FileText, Calendar, Download, Clock, AlertCircle, Database, Target, Sparkles } from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import PageHeader from '../components/layout/PageHeader'
import StatCard from '../components/ui/StatCard'
import ChartCard from '../components/ui/ChartCard'
import WidgetCard from '../components/ui/WidgetCard'
import SectionTitle from '../components/ui/SectionTitle'
import AlertPanel from '../components/ui/AlertPanel'
import { sparkline, months, departmentDistribution, alerts } from '../data/dummyData'

const reportTypes = ['Patient Reports', 'Financial Reports', 'Staff Reports', 'Doctor Reports', 'Pharmacy Reports', 'Lab Reports', 'Bed Occupancy', 'System Activity']

const templates = [
  { name: 'Monthly Financial Report', category: 'Financial', lastUsed: '2025-06-01' },
  { name: 'Patient Summary Report', category: 'Patients', lastUsed: '2025-06-08' },
  { name: 'Staff Performance Report', category: 'Staff', lastUsed: '2025-06-05' },
  { name: 'Department Efficiency', category: 'Operations', lastUsed: '2025-05-28' },
]

const reportQueue = [
  { name: 'June Financial Summary', status: 'completed', time: '2 min ago' },
  { name: 'ICU Occupancy Report', status: 'processing', time: 'In progress' },
  { name: 'Staff Attendance Q2', status: 'pending', time: 'Scheduled 10:00 AM' },
  { name: 'Insurance Claims May', status: 'failed', time: '1 hour ago' },
]

const multiMetric = months.slice(0, 6).map((m, i) => ({
  month: m,
  patients: 1200 + i * 100,
  revenue: 3.5 + i * 0.15,
  occupancy: 80 + i * 2,
}))

export default function ReportsAnalytics() {
  return (
    <div className="space-y-8">
      <PageHeader title="Reports & Analytics" subtitle="Generate, analyze, and export comprehensive hospital performance reports across all departments and operations" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Reports" value="2,847" trend={12.0} icon={FileText} sparkline={sparkline()} />
        <StatCard title="Monthly Created" value="186" trend={8.5} icon={Calendar} sparkline={sparkline()} />
        <StatCard title="Exported" value="1,456" trend={15.2} icon={Download} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
        <StatCard title="Scheduled" value="24" trend={0} icon={Clock} sparkline={sparkline()} />
        <StatCard title="Pending" value="8" trend={-20} icon={AlertCircle} iconColor="bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400" sparkline={sparkline()} />
        <StatCard title="Failed Jobs" value="3" trend={-50} icon={AlertCircle} iconColor="bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400" sparkline={sparkline()} />
        <StatCard title="Data Sources" value="14" trend={0} icon={Database} sparkline={sparkline()} />
        <StatCard title="Accuracy Score" value="98.5%" trend={0.5} icon={Target} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
      </div>

      <section>
        <SectionTitle title="Hospital Performance Analytics" />
        <ChartCard title="Multi-Metric Overview">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={multiMetric}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="patients" stroke="#2563eb" strokeWidth={2} name="Patients" />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue ($M)" />
              <Line yAxisId="left" type="monotone" dataKey="occupancy" stroke="#f59e0b" strokeWidth={2} name="Occupancy %" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section>
        <SectionTitle title="Custom Report Generator" />
        <div className="glass-card p-5">
          <div className="grid gap-4 lg:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">Report Type</label>
              <select className="select-field w-full">
                {reportTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Date Range</label>
              <div className="flex gap-2">
                <input type="date" className="select-field flex-1" />
                <input type="date" className="select-field flex-1" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Department</label>
              <select className="select-field w-full">
                <option>All Departments</option>
                <option>Emergency</option><option>ICU</option><option>Surgery</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="btn-primary">Generate Report</button>
            <button className="btn-secondary">Preview</button>
            <button className="btn-secondary">Save Template</button>
            <button className="btn-secondary">Schedule</button>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle title="Department-Wise Analytics" />
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Department Comparison">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={departmentDistribution}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Revenue Distribution">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={departmentDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={3}>
                  {departmentDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>

      <section>
        <SectionTitle title="Report Status Tracking" />
        <div className="grid gap-4 lg:grid-cols-2">
          <WidgetCard title="Report Queue">
            {reportQueue.map((r, i) => (
              <div key={i} className="mb-2 flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-slate-500">{r.time}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                  r.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                  r.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                  r.status === 'failed' ? 'bg-red-100 text-red-700' :
                  'bg-amber-100 text-amber-700'
                }`}>{r.status}</span>
              </div>
            ))}
          </WidgetCard>
          <WidgetCard title="Report Template Library">
            {templates.map((t, i) => (
              <div key={i} className="mb-2 flex items-center justify-between rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.category} · Last used {t.lastUsed}</p>
                </div>
                <button className="text-xs text-primary-600 hover:underline">Use</button>
              </div>
            ))}
          </WidgetCard>
        </div>
      </section>

      <section>
        <SectionTitle title="AI Insights Engine" />
        <div className="glass-card p-5">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-violet-100 p-3 dark:bg-violet-900/50">
              <Sparkles className="h-6 w-6 text-violet-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Automated Hospital Insights</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <li>• Patient volume up 8.2% — consider expanding outpatient capacity</li>
                <li>• Emergency department efficiency score dropped 3% — review staffing</li>
                <li>• Revenue growth outpacing expenses by 12% — positive financial trajectory</li>
                <li>• Bed occupancy predicted to peak at 92% next week</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle title="Export Center" />
        <div className="flex flex-wrap gap-3">
          {['PDF', 'Excel', 'CSV', 'Print', 'Email Delivery'].map((f) => (
            <button key={f} className="btn-secondary">{f}</button>
          ))}
        </div>
      </section>

      <AlertPanel alerts={alerts} title="Report Insights & Alerts" />
    </div>
  )
}
