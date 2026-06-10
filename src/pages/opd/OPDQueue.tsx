import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { ListOrdered, Users, Clock, TriangleAlert as AlertTriangle, SkipForward, UserCheck, ArrowRight, RefreshCw } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import StatCard from '../../components/ui/StatCard'
import DataTable, { Column } from '../../components/ui/DataTable'
import ChartCard from '../../components/ui/ChartCard'
import WidgetCard from '../../components/ui/WidgetCard'
import SectionTitle from '../../components/ui/SectionTitle'
import AlertPanel from '../../components/ui/AlertPanel'
import StatusBadge from '../../components/ui/StatusBadge'
import { queueEntries, opdDoctors, queueByDept, hourlyFlow, opdAlerts } from '../../data/opdData'
import { sparkline } from '../../data/dummyData'

const priorityColors: Record<string, string> = {
  critical: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
  urgent: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
  normal: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
}

const statusFlow = [
  { label: 'Waiting', key: 'waiting', color: 'bg-amber-500' },
  { label: 'In Consultation', key: 'in_consultation', color: 'bg-blue-500' },
  { label: 'Completed', key: 'completed', color: 'bg-emerald-500' },
]

export default function OPDQueue() {
  const [searchQuery, setSearchQuery] = useState('')
  const [deptFilter, setDeptFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')

  const waiting = queueEntries.filter(e => e.status === 'waiting').length
  const inConsult = queueEntries.filter(e => e.status === 'in_consultation').length
  const criticalCount = queueEntries.filter(e => e.priority === 'critical').length
  const avgWait = Math.round(queueEntries.filter(e => e.status === 'waiting').reduce((s, e) => s + e.waitMin, 0) / Math.max(waiting, 1))

  const filtered = queueEntries.filter(e => {
    const matchSearch = !searchQuery || e.patient.toLowerCase().includes(searchQuery.toLowerCase()) || e.token.toLowerCase().includes(searchQuery.toLowerCase())
    const matchDept = !deptFilter || e.dept === deptFilter
    const matchPriority = !priorityFilter || e.priority === priorityFilter
    return matchSearch && matchDept && matchPriority
  })

  const queueColumns: Column<typeof queueEntries[0]>[] = [
    { key: 'token', label: 'Token' },
    { key: 'patient', label: 'Patient' },
    { key: 'dept', label: 'Department' },
    { key: 'doctor', label: 'Doctor' },
    {
      key: 'priority',
      label: 'Priority',
      render: (row) => (
        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${priorityColors[row.priority]}`}>
          {row.priority}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'waitMin',
      label: 'Wait Time',
      render: (row) => `${row.waitMin} min`,
    },
    {
      key: 'token',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <button className="rounded-lg px-2 py-1 text-xs bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900/40 dark:text-primary-400">
            Call
          </button>
          <button className="rounded-lg px-2 py-1 text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400">
            <SkipForward className="h-3 w-3" />
          </button>
          {row.priority === 'critical' && (
            <button className="rounded-lg px-2 py-1 text-xs bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-400">
              Urgent
            </button>
          )}
        </div>
      ),
    },
  ]

  const pieData = [
    { name: 'Waiting', value: waiting, color: '#f59e0b' },
    { name: 'In Consultation', value: inConsult, color: '#3b82f6' },
    { name: 'Critical', value: criticalCount, color: '#ef4444' },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="OPD Queue Management"
        subtitle="Manage patient queues, prioritize consultations, and monitor real-time OPD flow across all departments"
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total in Queue" value={queueEntries.length} trend={10} icon={ListOrdered} sparkline={sparkline()} />
        <StatCard title="Waiting" value={waiting} trend={-5} icon={Users} iconColor="bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400" sparkline={sparkline()} />
        <StatCard title="In Consultation" value={inConsult} trend={8} icon={UserCheck} iconColor="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400" sparkline={sparkline()} />
        <StatCard title="Avg Wait Time" value={`${avgWait} min`} trend={-3} icon={Clock} sparkline={sparkline()} />
      </div>

      {/* Queue Flow Pipeline */}
      <SectionTitle title="Queue Flow Pipeline" subtitle="Patient progression through OPD stages" />
      <div className="glass-card p-5">
        <div className="flex items-center justify-between gap-2 overflow-x-auto">
          {statusFlow.map((stage, i) => {
            const count = stage.key === 'waiting' ? waiting : stage.key === 'in_consultation' ? inConsult : queueEntries.length - waiting - inConsult
            return (
              <div key={stage.label} className="flex flex-1 flex-col items-center gap-2 min-w-max">
                <div className={`rounded-lg p-3 text-white font-semibold text-sm text-center ${stage.color} min-w-max`}>
                  {stage.label} ({count})
                </div>
                {i < statusFlow.length - 1 && (
                  <div className="text-2xl text-slate-300 dark:text-slate-600">&rarr;</div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Critical Patients Alert */}
      {criticalCount > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/20">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <div>
              <p className="font-semibold text-red-700 dark:text-red-400">{criticalCount} Critical Patient{criticalCount > 1 ? 's' : ''} in Queue</p>
              <p className="text-sm text-red-600 dark:text-red-300">Immediate consultation required</p>
            </div>
          </div>
        </div>
      )}

      {/* Queue Table */}
      <SectionTitle title="Live Queue" />
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search by name or token..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field flex-1 max-w-xs"
          />
          <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="select-field">
            <option value="">All Departments</option>
            {['General', 'Cardiology', 'Neurology', 'Surgery', 'Dermatology', 'Orthopedics', 'Ophthalmology', 'ENT'].map(d => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="select-field">
            <option value="">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="urgent">Urgent</option>
            <option value="normal">Normal</option>
          </select>
          <button className="btn-secondary text-xs">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>
        <DataTable data={filtered} columns={queueColumns} searchKeys={['patient', 'token']} pageSize={8} />
      </div>

      {/* Doctor Queue Status */}
      <SectionTitle title="Doctor Queue Status" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {opdDoctors.filter(d => d.status === 'available' || d.status === 'busy').map(doc => (
          <div key={doc.id} className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-sm text-slate-900 dark:text-white">{doc.name}</p>
              <StatusBadge status={doc.status} />
            </div>
            <p className="text-xs text-slate-500">{doc.dept} &middot; {doc.shift}</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Queue</span>
                <span className="font-medium">{doc.queue}/{doc.capacity}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className="h-full rounded-full bg-primary-500" style={{ width: `${(doc.queue / doc.capacity) * 100}%` }} />
              </div>
            </div>
            <button className="btn-secondary w-full text-xs mt-3">
              <ArrowRight className="h-3.5 w-3.5" /> Assign Next
            </button>
          </div>
        ))}
      </div>

      {/* Department Queue Analytics */}
      <SectionTitle title="Department Queue Analytics" />
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Queue by Department" subtitle="Waiting, In Consultation, and Completed patients">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={queueByDept}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="dept" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="waiting" fill="#f59e0b" name="Waiting" />
              <Bar dataKey="inConsult" fill="#3b82f6" name="In Consultation" />
              <Bar dataKey="completed" fill="#10b981" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Queue Status Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={3} label={({ name, value }) => `${name}: ${value}`}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Hourly Flow */}
      <ChartCard title="Hourly Patient Flow" subtitle="Walk-in vs appointment trends">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={hourlyFlow}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
            <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="walkIn" fill="#f59e0b" name="Walk-in" />
            <Bar dataKey="appointment" fill="#3b82f6" name="Appointment" />
            <Bar dataKey="completed" fill="#10b981" name="Completed" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Alerts */}
      <AlertPanel alerts={opdAlerts} title="Queue Alerts" />
    </div>
  )
}
