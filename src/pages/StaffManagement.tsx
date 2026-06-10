import { Plus, Users, UserCheck, CalendarOff, UserPlus, Building, Clock, TrendingUp, Star } from 'lucide-react'
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import PageHeader from '../components/layout/PageHeader'
import StatCard from '../components/ui/StatCard'
import ChartCard from '../components/ui/ChartCard'
import WidgetCard from '../components/ui/WidgetCard'
import DataTable from '../components/ui/DataTable'
import SectionTitle from '../components/ui/SectionTitle'
import AlertPanel from '../components/ui/AlertPanel'
import { sparkline, staff, staffByDept, alerts } from '../data/dummyData'

const staffColumns = [
  { key: 'id', label: 'Staff ID' },
  { key: 'fullName', label: 'Full Name' },
  { key: 'role', label: 'Role/Position' },
  { key: 'department', label: 'Department' },
  { key: 'branch', label: 'Branch' },
  { key: 'contact', label: 'Contact' },
  { key: 'employmentType', label: 'Employment Type' },
  { key: 'shiftSchedule', label: 'Shift' },
  { key: 'status', label: 'Status', status: true },
  { key: 'joiningDate', label: 'Joining Date' },
]

const attendanceData = [
  { day: 'Mon', present: 420, absent: 30 },
  { day: 'Tue', present: 435, absent: 15 },
  { day: 'Wed', present: 428, absent: 22 },
  { day: 'Thu', present: 440, absent: 10 },
  { day: 'Fri', present: 415, absent: 35 },
]

const payrollData = [
  { month: 'Jan', amount: 2.1 }, { month: 'Feb', amount: 2.2 },
  { month: 'Mar', amount: 2.15 }, { month: 'Apr', amount: 2.3 },
  { month: 'May', amount: 2.25 }, { month: 'Jun', amount: 2.35 },
]

const recruitmentPipeline = [
  { role: 'ICU Nurse', applicants: 24, status: 'Interviewing' },
  { role: 'Lab Technician', applicants: 18, status: 'Screening' },
  { role: 'Radiologist', applicants: 8, status: 'Offer Sent' },
]

export default function StaffManagement() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Staff Management"
        subtitle="Manage hospital employees, workforce operations, scheduling, attendance, and staff performance"
        actions={<button className="btn-primary"><Plus className="h-4 w-4" /> Add New Employee</button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Staff" value="945" trend={4.2} icon={Users} sparkline={sparkline()} />
        <StatCard title="Active Employees" value="892" trend={2.1} icon={UserCheck} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
        <StatCard title="On Leave" value="53" trend={-5.0} icon={CalendarOff} iconColor="bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400" sparkline={sparkline()} />
        <StatCard title="New This Month" value="18" trend={12.0} icon={UserPlus} iconColor="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400" sparkline={sparkline()} />
        <StatCard title="Departments" value="24" trend={0} icon={Building} sparkline={sparkline()} />
        <StatCard title="Shift Coverage" value="94%" trend={1.5} icon={Clock} iconColor="bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400" sparkline={sparkline()} />
        <StatCard title="Attendance Rate" value="96.2%" trend={0.8} icon={TrendingUp} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
        <StatCard title="Performance Score" value="8.7/10" trend={3.2} icon={Star} iconColor="bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400" sparkline={sparkline()} />
      </div>

      <section>
        <SectionTitle title="Staff Directory Management" subtitle="Advanced searchable employee database" />
        <DataTable
          data={staff}
          columns={staffColumns}
          searchKeys={['fullName', 'id', 'role']}
          filters={[
            { key: 'department', label: 'Department', options: ['ICU', 'Laboratory', 'Pharmacy', 'Radiology', 'Administration', 'Security'] },
            { key: 'branch', label: 'Branch', options: ['Main Campus', 'East Wing', 'North Branch'] },
            { key: 'status', label: 'Status', options: ['active', 'on_leave'] },
          ]}
        />
      </section>

      <section>
        <SectionTitle title="Department & Workforce Allocation" />
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Staff by Department">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={staffByDept}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis dataKey="dept" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Workforce Allocation">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={staffByDept.map((d, i) => ({ ...d, name: d.dept, value: d.count, color: ['#2563eb','#10b981','#f59e0b','#8b5cf6','#ef4444','#64748b'][i] }))} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                  {staffByDept.map((_, i) => <Cell key={i} fill={['#2563eb','#10b981','#f59e0b','#8b5cf6','#ef4444','#64748b'][i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {['ICU', 'Emergency', 'Surgery', 'Laboratory', 'Pharmacy', 'Admin'].map((d) => (
            <div key={d} className="glass-card p-3 text-center">
              <p className="text-xs text-slate-500">{d}</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{Math.floor(Math.random() * 30) + 70}%</p>
              <p className="text-xs text-emerald-600">Staffed</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Attendance & Time Management" />
        <div className="grid gap-4 lg:grid-cols-3">
          <ChartCard title="Present vs Absent (Weekly)" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <WidgetCard title="Punctuality Score">
            <p className="text-4xl font-bold text-primary-600">92%</p>
            <p className="mt-2 text-sm text-slate-500">Monthly average on-time rate</p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>Late arrivals</span><span className="font-medium text-amber-600">28</span></div>
              <div className="flex justify-between"><span>Overtime hours</span><span className="font-medium">342 hrs</span></div>
            </div>
          </WidgetCard>
        </div>
      </section>

      <section>
        <SectionTitle title="Shift & Scheduling Management" />
        <div className="grid gap-4 lg:grid-cols-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="glass-card p-4">
              <p className="mb-2 font-semibold text-slate-900 dark:text-white">{day}</p>
              <div className="space-y-1 text-xs">
                <div className="rounded bg-blue-100 p-1.5 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">Day: 142 staff</div>
                <div className="rounded bg-violet-100 p-1.5 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400">Evening: 98 staff</div>
                <div className="rounded bg-slate-100 p-1.5 text-slate-700 dark:bg-slate-800 dark:text-slate-400">Night: 76 staff</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Payroll & Compensation" />
        <ChartCard title="Monthly Payroll Overview ($M)">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={payrollData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section>
        <SectionTitle title="Staff Performance & Evaluation" />
        <div className="grid gap-4 lg:grid-cols-3">
          <WidgetCard title="Top Performing Staff">
            {['Nurse Patricia Moore', 'John Richards', 'Amanda Foster'].map((n, i) => (
              <div key={i} className="mb-2 flex items-center gap-3 rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/50">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">{i + 1}</span>
                <div>
                  <p className="text-sm font-medium">{n}</p>
                  <p className="text-xs text-slate-500">Score: {(9.5 - i * 0.3).toFixed(1)}/10</p>
                </div>
              </div>
            ))}
          </WidgetCard>
          <ChartCard title="Productivity Trend">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={payrollData.map((d, i) => ({ ...d, productivity: 85 + i * 2 }))}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="productivity" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
          <WidgetCard title="Certification Monitoring">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Valid certifications</span><span className="font-medium text-emerald-600">892</span></div>
              <div className="flex justify-between"><span>Expiring soon</span><span className="font-medium text-amber-600">12</span></div>
              <div className="flex justify-between"><span>Expired</span><span className="font-medium text-red-600">3</span></div>
            </div>
          </WidgetCard>
        </div>
      </section>

      <section>
        <SectionTitle title="Recruitment & Onboarding" />
        <div className="grid gap-4 lg:grid-cols-2">
          <WidgetCard title="Open Positions">
            {recruitmentPipeline.map((r, i) => (
              <div key={i} className="mb-2 flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                <div>
                  <p className="text-sm font-medium">{r.role}</p>
                  <p className="text-xs text-slate-500">{r.applicants} applicants</p>
                </div>
                <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/50 dark:text-primary-400">{r.status}</span>
              </div>
            ))}
          </WidgetCard>
          <WidgetCard title="Hiring Progress">
            <div className="space-y-3">
              {['Applications', 'Screening', 'Interviews', 'Offers', 'Onboarding'].map((stage, i) => (
                <div key={stage}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{stage}</span>
                    <span className="font-medium">{[50, 32, 18, 8, 5][i]}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div className="h-full rounded-full bg-primary-600" style={{ width: `${[100, 64, 36, 16, 10][i]}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </WidgetCard>
        </div>
      </section>

      <AlertPanel alerts={alerts} title="Alerts & Notifications" />
    </div>
  )
}
