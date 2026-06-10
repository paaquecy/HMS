import { Plus, Stethoscope, UserCheck, Award, Coffee, Siren } from 'lucide-react'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from 'recharts'
import PageHeader from '../components/layout/PageHeader'
import StatCard from '../components/ui/StatCard'
import ChartCard from '../components/ui/ChartCard'
import WidgetCard from '../components/ui/WidgetCard'
import DataTable from '../components/ui/DataTable'
import { sparkline, doctorByDept, doctors } from '../data/dummyData'

const doctorColumns = [
  { key: 'id', label: 'Doctor ID' },
  { key: 'fullName', label: 'Full Name' },
  { key: 'specialization', label: 'Specialization' },
  { key: 'department', label: 'Department' },
  { key: 'experience', label: 'Experience' },
  { key: 'contact', label: 'Contact' },
  { key: 'shiftSchedule', label: 'Shift Schedule' },
  { key: 'status', label: 'Status', status: true },
]

const specialistData = [
  { name: 'Cardiology', value: 12, color: '#2563eb' },
  { name: 'Surgery', value: 15, color: '#10b981' },
  { name: 'Pediatrics', value: 10, color: '#f59e0b' },
  { name: 'Neurology', value: 8, color: '#8b5cf6' },
  { name: 'Other', value: 42, color: '#64748b' },
]

const attendanceData = [
  { month: 'Jan', rate: 96 }, { month: 'Feb', rate: 94 }, { month: 'Mar', rate: 97 },
  { month: 'Apr', rate: 95 }, { month: 'May', rate: 98 }, { month: 'Jun', rate: 96 },
]

const performanceData = [
  { metric: 'Patient Satisfaction', score: 92 },
  { metric: 'Punctuality', score: 88 },
  { metric: 'Cases Handled', score: 95 },
  { metric: 'Team Collaboration', score: 90 },
  { metric: 'Documentation', score: 85 },
]

const onDutyDoctors = [
  { name: 'Dr. Michael Chen', dept: 'Cardiology', shift: 'Day' },
  { name: 'Dr. Emily Roberts', dept: 'ICU', shift: 'Night' },
  { name: 'Dr. David Kim', dept: 'Emergency', shift: 'Rotating' },
]

export default function TotalDoctors() {
  return (
    <div>
      <PageHeader
        title="Total Doctors"
        subtitle="Manage and monitor all hospital doctors and specialists"
        actions={<button className="btn-primary"><Plus className="h-4 w-4" /> Add New Doctor</button>}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Total Doctors" value="87" trend={3.1} icon={Stethoscope} sparkline={sparkline()} />
        <StatCard title="Active Doctors" value="82" trend={2.5} icon={UserCheck} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
        <StatCard title="Specialists" value="47" trend={5.0} icon={Award} iconColor="bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400" sparkline={sparkline()} />
        <StatCard title="On Leave" value="5" trend={-8.0} icon={Coffee} iconColor="bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400" sparkline={sparkline()} />
        <StatCard title="Emergency Duty" value="12" trend={0} icon={Siren} iconColor="bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400" sparkline={sparkline()} />
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <ChartCard title="Doctors by Department">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={doctorByDept}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="dept" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Monthly Attendance">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        <ChartCard title="Specialist Distribution">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={specialistData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" paddingAngle={3}>
                {specialistData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Performance Analytics">
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={performanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10 }} />
              <Radar dataKey="score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Availability Overview">
          <div className="space-y-3">
            {['Available', 'On Duty', 'On Leave', 'On-call'].map((s, i) => (
              <div key={s} className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">{s}</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div className="h-full rounded-full bg-primary-600" style={{ width: `${[65, 45, 8, 22][i]}%` }} />
                  </div>
                  <span className="text-sm font-medium">{[57, 39, 5, 12][i]}</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="mb-6">
        <DataTable
          data={doctors}
          columns={doctorColumns}
          searchKeys={['fullName', 'id', 'specialization']}
          filters={[
            { key: 'department', label: 'Department', options: ['Cardiology', 'ICU', 'Emergency', 'Surgery', 'Pediatrics', 'Maternity', 'General', 'Neurology'] },
            { key: 'specialization', label: 'Specialization', options: ['Cardiologist', 'Intensivist', 'Emergency Medicine', 'Surgeon', 'Pediatrician', 'General Physician', 'Neurologist', 'Obstetrician'] },
            { key: 'status', label: 'Status', options: ['active', 'on_leave'] },
          ]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <WidgetCard title="On-Duty Doctors">
          {onDutyDoctors.map((d, i) => (
            <div key={i} className="mb-2 rounded-lg bg-slate-50 p-2.5 text-sm dark:bg-slate-800/50">
              <p className="font-medium">{d.name}</p>
              <p className="text-xs text-slate-500">{d.dept} · {d.shift}</p>
            </div>
          ))}
        </WidgetCard>
        <WidgetCard title="Emergency Response Team">
          <div className="space-y-2 text-sm">
            <p className="font-medium text-red-600">Team Alpha — Active</p>
            <p className="text-slate-500">Dr. Kim, Dr. Roberts, 4 nurses</p>
            <p className="mt-3 font-medium text-emerald-600">Team Beta — Standby</p>
            <p className="text-slate-500">Dr. Miller, Dr. Chen, 3 nurses</p>
          </div>
        </WidgetCard>
        <WidgetCard title="Top Performing Doctors">
          {['Dr. James Miller', 'Dr. Michael Chen', 'Dr. Lisa Park'].map((n, i) => (
            <div key={i} className="mb-2 flex items-center gap-3 rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/50">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">{i + 1}</span>
              <span className="text-sm font-medium">{n}</span>
            </div>
          ))}
        </WidgetCard>
      </div>
    </div>
  )
}
