import { Plus, Users, UserPlus, Bed, LogOut, AlertTriangle, Shield } from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import PageHeader from '../components/layout/PageHeader'
import StatCard from '../components/ui/StatCard'
import ChartCard from '../components/ui/ChartCard'
import WidgetCard from '../components/ui/WidgetCard'
import DataTable from '../components/ui/DataTable'
import AlertPanel from '../components/ui/AlertPanel'
import {
  sparkline, patientGrowthData, monthlyRegistrations, departmentDistribution,
  admissionsVsDischarges, patients, recentAdmissions, criticalPatients, alerts,
} from '../data/dummyData'

const patientColumns = [
  { key: 'id', label: 'Patient ID' },
  { key: 'fullName', label: 'Full Name' },
  { key: 'age', label: 'Age' },
  { key: 'gender', label: 'Gender' },
  { key: 'department', label: 'Department' },
  { key: 'assignedDoctor', label: 'Assigned Doctor' },
  { key: 'admissionDate', label: 'Admission Date' },
  { key: 'status', label: 'Status', status: true },
]

export default function TotalPatients() {
  return (
    <div>
      <PageHeader
        title="Total Patients"
        subtitle="Monitor and manage all registered hospital patients"
        actions={<button className="btn-primary"><Plus className="h-4 w-4" /> Add New Patient</button>}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Total Registered" value="12,847" trend={8.2} icon={Users} sparkline={sparkline()} />
        <StatCard title="New Today" value="24" trend={15.3} icon={UserPlus} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
        <StatCard title="Admitted" value="342" trend={5.1} icon={Bed} iconColor="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400" sparkline={sparkline()} />
        <StatCard title="Discharged" value="18" trend={-3.2} icon={LogOut} iconColor="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" sparkline={sparkline()} />
        <StatCard title="Emergency" value="7" trend={12.0} icon={AlertTriangle} iconColor="bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400" sparkline={sparkline()} />
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <ChartCard title="Patient Growth" subtitle="Year-over-year trend">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={patientGrowthData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="patients" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Monthly Registrations">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyRegistrations}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="registrations" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <ChartCard title="Distribution by Department">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={departmentDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={3}>
                {departmentDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Admissions vs Discharges">
          <ResponsiveContainer width="100%" height={220}>
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

      <div className="mb-6">
        <DataTable
          data={patients}
          columns={patientColumns}
          searchKeys={['fullName', 'id', 'department']}
          filters={[
            { key: 'department', label: 'Department', options: ['Cardiology', 'ICU', 'Emergency', 'Surgery', 'Pediatrics', 'Maternity', 'General'] },
            { key: 'status', label: 'Status', options: ['admitted', 'discharged', 'emergency', 'critical'] },
          ]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <WidgetCard title="Recent Admissions">
          <div className="space-y-2">
            {recentAdmissions.map((a, i) => (
              <div key={i} className="rounded-lg bg-slate-50 p-2.5 text-sm dark:bg-slate-800/50">
                <p className="font-medium">{a.name}</p>
                <p className="text-xs text-slate-500">{a.dept} · {a.time}</p>
              </div>
            ))}
          </div>
        </WidgetCard>
        <WidgetCard title="Critical Patients">
          <div className="space-y-2">
            {criticalPatients.map((p, i) => (
              <div key={i} className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-sm dark:border-red-900/50 dark:bg-red-900/20">
                <p className="font-medium text-red-700 dark:text-red-400">{p.name}</p>
                <p className="text-xs text-slate-500">{p.condition} · {p.ward}</p>
              </div>
            ))}
          </div>
        </WidgetCard>
        <WidgetCard title="Bed Occupancy">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-600">87%</p>
            <p className="text-sm text-slate-500">435 / 500 beds occupied</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div className="h-full w-[87%] rounded-full bg-primary-600" />
            </div>
          </div>
        </WidgetCard>
        <div className="space-y-4">
          <WidgetCard title="Appointments Today">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">156</p>
            <p className="text-xs text-slate-500">42 pending · 114 completed</p>
          </WidgetCard>
          <WidgetCard title="Insurance Verification">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-500" />
              <div>
                <p className="text-sm font-medium">94% Verified</p>
                <p className="text-xs text-slate-500">8 pending review</p>
              </div>
            </div>
          </WidgetCard>
        </div>
      </div>
    </div>
  )
}
