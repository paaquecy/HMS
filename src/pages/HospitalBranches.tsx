import { Plus, Building2, MapPin, TrendingUp, Users, BedDouble, DollarSign } from 'lucide-react'
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import PageHeader from '../components/layout/PageHeader'
import StatCard from '../components/ui/StatCard'
import ChartCard from '../components/ui/ChartCard'
import WidgetCard from '../components/ui/WidgetCard'
import DataTable from '../components/ui/DataTable'
import SectionTitle from '../components/ui/SectionTitle'
import AlertPanel from '../components/ui/AlertPanel'
import { sparkline, branches, alerts } from '../data/dummyData'

const branchColumns = [
  { key: 'id', label: 'Branch ID' },
  { key: 'name', label: 'Branch Name' },
  { key: 'location', label: 'Location' },
  { key: 'manager', label: 'Manager' },
  { key: 'contact', label: 'Contact' },
  { key: 'totalStaff', label: 'Staff' },
  { key: 'totalPatients', label: 'Patients' },
  { key: 'bedCapacity', label: 'Beds' },
  { key: 'occupancyRate', label: 'Occupancy' },
  { key: 'monthlyRevenue', label: 'Revenue' },
  { key: 'status', label: 'Status', status: true },
]

const branchRevenue = branches.map((b) => ({
  name: b.name.replace('MediCare ', ''),
  revenue: parseFloat(b.monthlyRevenue.replace(/[$KM]/g, '')) * (b.monthlyRevenue.includes('M') ? 1000 : 1),
}))

const growthTrend = [
  { month: 'Jan', main: 3.8, east: 1.6, north: 1.9, west: 0.8 },
  { month: 'Feb', main: 3.9, east: 1.7, north: 2.0, west: 0.82 },
  { month: 'Mar', main: 4.0, east: 1.75, north: 2.05, west: 0.85 },
  { month: 'Apr', main: 4.1, east: 1.8, north: 2.1, west: 0.87 },
  { month: 'May', main: 4.15, east: 1.78, north: 2.08, west: 0.89 },
  { month: 'Jun', main: 4.2, east: 1.8, north: 2.1, west: 0.89 },
]

export default function HospitalBranches() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Hospital Branches Management"
        subtitle="Monitor, manage, and analyze all hospital branches, locations, and regional operations in real time"
        actions={<button className="btn-primary"><Plus className="h-4 w-4" /> Add New Branch</button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Branches" value="4" trend={0} icon={Building2} sparkline={sparkline()} />
        <StatCard title="Active Branches" value="3" trend={0} icon={MapPin} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
        <StatCard title="Underperforming" value="1" trend={0} icon={TrendingUp} iconColor="bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400" sparkline={sparkline()} />
        <StatCard title="New This Year" value="1" trend={100} icon={Building2} sparkline={sparkline()} />
        <StatCard title="Total Staff" value="945" trend={4.2} icon={Users} sparkline={sparkline()} />
        <StatCard title="Total Patients" value="6,090" trend={6.8} icon={Users} iconColor="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400" sparkline={sparkline()} />
        <StatCard title="Avg Occupancy" value="80.5%" trend={2.1} icon={BedDouble} sparkline={sparkline()} />
        <StatCard title="Total Revenue" value="$8.99M" trend={8.5} icon={DollarSign} iconColor="bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400" sparkline={sparkline()} />
      </div>

      <section>
        <SectionTitle title="Branch Directory" />
        <DataTable
          data={branches}
          columns={branchColumns}
          searchKeys={['name', 'location', 'manager']}
          filters={[{ key: 'status', label: 'Status', options: ['active', 'under_review'] }]}
        />
      </section>

      <section>
        <SectionTitle title="Branch Performance Analytics" />
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Revenue by Branch ($K)">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={branchRevenue}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Revenue Growth Trend ($M)">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={growthTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="main" stroke="#2563eb" strokeWidth={2} name="Main" />
                <Line type="monotone" dataKey="east" stroke="#10b981" strokeWidth={2} name="East" />
                <Line type="monotone" dataKey="north" stroke="#f59e0b" strokeWidth={2} name="North" />
                <Line type="monotone" dataKey="west" stroke="#ef4444" strokeWidth={2} name="West" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>

      <section>
        <SectionTitle title="Geographic Branch Visualization" />
        <div className="glass-card p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {branches.map((b) => {
              const perf = b.occupancyRate === '65%' ? 'red' : parseInt(b.occupancyRate) > 85 ? 'green' : 'amber'
              const colors = { green: 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20', amber: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20', red: 'border-red-400 bg-red-50 dark:bg-red-900/20' }
              return (
                <div key={b.id} className={`cursor-pointer rounded-xl border-2 p-4 transition hover:shadow-card-hover ${colors[perf as keyof typeof colors]}`}>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary-600" />
                    <p className="font-semibold text-sm text-slate-900 dark:text-white">{b.name.replace('MediCare ', '')}</p>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{b.location}</p>
                  <div className="mt-3 space-y-1 text-xs">
                    <p>Occupancy: <strong>{b.occupancyRate}</strong></p>
                    <p>Revenue: <strong>{b.monthlyRevenue}</strong></p>
                    <p>Staff: <strong>{b.totalStaff}</strong></p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section>
        <SectionTitle title="Branch Comparison Leaderboard" />
        <div className="grid gap-4 lg:grid-cols-2">
          <WidgetCard title="Top Performing">
            {branches.filter((b) => b.status === 'active').sort((a, b) => parseInt(b.occupancyRate) - parseInt(a.occupancyRate)).slice(0, 3).map((b, i) => (
              <div key={b.id} className="mb-2 flex items-center gap-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">{i + 1}</span>
                <div>
                  <p className="text-sm font-medium">{b.name}</p>
                  <p className="text-xs text-slate-500">{b.occupancyRate} occupancy · {b.monthlyRevenue}</p>
                </div>
              </div>
            ))}
          </WidgetCard>
          <WidgetCard title="Needs Attention">
            {branches.filter((b) => b.status !== 'active' || parseInt(b.occupancyRate) < 70).map((b) => (
              <div key={b.id} className="mb-2 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900/50 dark:bg-amber-900/20">
                <p className="text-sm font-medium">{b.name}</p>
                <p className="text-xs text-slate-500">{b.occupancyRate} occupancy — review recommended</p>
              </div>
            ))}
          </WidgetCard>
        </div>
      </section>

      <section>
        <SectionTitle title="Staff & Resource Distribution" />
        <ChartCard title="Staff per Branch">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={branches.map((b) => ({ name: b.name.replace('MediCare ', ''), staff: b.totalStaff, patients: Math.round(b.totalPatients / 10) }))}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="staff" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="patients" fill="#10b981" radius={[4, 4, 0, 0]} name="Patients (÷10)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <AlertPanel alerts={alerts} title="Branch Activity Alerts" />
    </div>
  )
}
