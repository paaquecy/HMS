import { DollarSign, TrendingUp, Calendar, CircleAlert as AlertCircle, Shield, PiggyBank, Receipt, Percent } from 'lucide-react'
import {
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import PageHeader from '../components/layout/PageHeader'
import StatCard from '../components/ui/StatCard'
import ChartCard from '../components/ui/ChartCard'
import WidgetCard from '../components/ui/WidgetCard'
import DataTable from '../components/ui/DataTable'
import SectionTitle from '../components/ui/SectionTitle'
import AlertPanel from '../components/ui/AlertPanel'
import { sparkline, revenueBySource, months, transactions, alerts } from '../data/dummyData'

const txColumns = [
  { key: 'id', label: 'Transaction ID' },
  { key: 'patientName', label: 'Patient' },
  { key: 'serviceType', label: 'Service' },
  { key: 'department', label: 'Department' },
  { key: 'paymentMethod', label: 'Payment' },
  { key: 'insuranceProvider', label: 'Insurance' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status', status: true },
  { key: 'date', label: 'Date' },
]

const monthlyRevenue = months.slice(0, 8).map((m) => ({
  month: m, revenue: Math.floor(Math.random() * 500) + 300, expenses: Math.floor(Math.random() * 300) + 150,
}))

const deptRevenue = [
  { dept: 'Emergency', revenue: 820, cost: 450 },
  { dept: 'ICU', revenue: 1200, cost: 780 },
  { dept: 'Surgery', revenue: 950, cost: 520 },
  { dept: 'Pharmacy', revenue: 680, cost: 380 },
  { dept: 'Lab', revenue: 420, cost: 210 },
]

const expenseBreakdown = [
  { name: 'Salaries', value: 35, color: '#2563eb' },
  { name: 'Equipment', value: 20, color: '#10b981' },
  { name: 'Pharma', value: 15, color: '#f59e0b' },
  { name: 'Utilities', value: 10, color: '#8b5cf6' },
  { name: 'Other', value: 20, color: '#64748b' },
]

const activityFeed = [
  { action: 'Payment received', detail: '₵5,580 from Sarah Johnson', time: '2 min ago', type: 'payment' },
  { action: 'Invoice generated', detail: 'TX-5006 for ICU stay', time: '15 min ago', type: 'invoice' },
  { action: 'Claim approved', detail: 'Aetna claim #CL-8821', time: '32 min ago', type: 'insurance' },
  { action: 'Refund processed', detail: '₵1,488 to Emily Brown', time: '1 hr ago', type: 'refund' },
]

export default function RevenueAnalytics() {
  return (
    <div className="space-y-8">
      <PageHeader title="Revenue Analytics" subtitle="Monitor hospital financial performance, income streams, expenses, insurance claims, and revenue growth" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value="₵597M" trend={12.5} icon={DollarSign} sparkline={sparkline()} />
        <StatCard title="Monthly Revenue" value="₵52M" trend={8.3} icon={Calendar} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
        <StatCard title="Daily Revenue" value="₵1.76M" trend={5.1} icon={TrendingUp} sparkline={sparkline()} />
        <StatCard title="Outstanding" value="₵11M" trend={-3.2} icon={AlertCircle} iconColor="bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400" sparkline={sparkline()} />
        <StatCard title="Insurance Claims" value="₵26M" trend={6.8} icon={Shield} iconColor="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400" sparkline={sparkline()} />
        <StatCard title="Net Profit" value="₵22.3M" trend={10.2} icon={PiggyBank} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
        <StatCard title="Op. Expenses" value="₵29.7M" trend={4.5} icon={Receipt} iconColor="bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400" sparkline={sparkline()} />
        <StatCard title="Growth Rate" value="12.5%" trend={2.1} icon={Percent} iconColor="bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400" sparkline={sparkline()} />
      </div>

      <section>
        <SectionTitle title="Revenue Breakdown Analytics" />
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Revenue Sources">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={revenueBySource} cx="50%" cy="50%" innerRadius={50} outerRadius={85} dataKey="value" paddingAngle={3}>
                  {revenueBySource.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Monthly Revenue vs Expenses (₵K)">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>

      <section>
        <SectionTitle title="Billing & Payment Analytics" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total Invoices', value: '2,847' },
            { label: 'Paid', value: '2,456' },
            { label: 'Pending', value: '312' },
            { label: 'Overdue', value: '79' },
          ].map((s) => (
            <div key={s.label} className="glass-card p-4 text-center">
              <p className="text-sm text-slate-500">{s.label}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Insurance & Claims Analytics" />
        <div className="grid gap-4 lg:grid-cols-3">
          <WidgetCard title="Claims Overview">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Total Claims</span><span className="font-medium">1,245</span></div>
              <div className="flex justify-between"><span>Approved</span><span className="font-medium text-emerald-600">1,089</span></div>
              <div className="flex justify-between"><span>Pending</span><span className="font-medium text-amber-600">112</span></div>
              <div className="flex justify-between"><span>Rejected</span><span className="font-medium text-red-600">44</span></div>
            </div>
          </WidgetCard>
          <WidgetCard title="Top Insurance Providers">
            {['BlueCross', 'Aetna', 'UnitedHealth', 'Cigna'].map((p, i) => (
              <div key={p} className="mb-2 flex justify-between text-sm">
                <span>{p}</span>
                <span className="font-medium">₵{[6.4, 4.7, 3.6, 2.6][i]}M</span>
              </div>
            ))}
          </WidgetCard>
          <WidgetCard title="Avg Processing Time">
            <p className="text-3xl font-bold text-primary-600">4.2 days</p>
            <p className="text-sm text-slate-500">Industry avg: 6.5 days</p>
          </WidgetCard>
        </div>
      </section>

      <section>
        <SectionTitle title="Department Financial Performance" />
        <ChartCard title="Revenue vs Cost by Department (₵K)">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={deptRevenue}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="dept" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cost" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section>
        <SectionTitle title="Expense Management" />
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Expense Breakdown">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={3}>
                  {expenseBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Profit & Loss Trend">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyRevenue.map((d) => ({ ...d, profit: d.revenue - d.expenses }))}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="profit" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>

      <section>
        <SectionTitle title="Real-Time Financial Activity" />
        <WidgetCard title="Live Transaction Feed">
          <div className="space-y-3">
            {activityFeed.map((a, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{a.action}</p>
                  <p className="text-xs text-slate-500">{a.detail}</p>
                </div>
                <span className="text-xs text-slate-400">{a.time}</span>
              </div>
            ))}
          </div>
        </WidgetCard>
      </section>

      <section>
        <SectionTitle title="Revenue Forecasting & AI Insights" />
        <div className="glass-card p-5">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-primary-100 p-3 dark:bg-primary-900/50">
              <TrendingUp className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">AI Financial Recommendations</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <li>• Predicted July revenue: ₵57M (+9.5% growth)</li>
                <li>• Emergency department shows 15% revenue increase opportunity</li>
                <li>• Consider expanding telehealth billing — 23% patient demand increase</li>
                <li>• 3 overdue accounts flagged for collection follow-up</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle title="Financial Transactions" />
        <DataTable
          data={transactions}
          columns={txColumns}
          searchKeys={['patientName', 'id', 'department']}
          filters={[
            { key: 'status', label: 'Status', options: ['paid', 'pending'] },
            { key: 'department', label: 'Department', options: ['Cardiology', 'ICU', 'Emergency', 'Surgery', 'Laboratory'] },
          ]}
        />
      </section>

      <AlertPanel alerts={alerts} title="Financial Alerts" />
    </div>
  )
}
