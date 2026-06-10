import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Footprints, Users, TriangleAlert as AlertTriangle, Clock, Phone, SkipForward, UserCheck, ArrowRight, Plus } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import StatCard from '../../components/ui/StatCard'
import DataTable, { Column } from '../../components/ui/DataTable'
import ChartCard from '../../components/ui/ChartCard'
import WidgetCard from '../../components/ui/WidgetCard'
import SectionTitle from '../../components/ui/SectionTitle'
import AlertPanel from '../../components/ui/AlertPanel'
import StatusBadge from '../../components/ui/StatusBadge'
import { walkInPatients, opdDoctors, opdDepartments, queueByDept, hourlyFlow, opdAlerts } from '../../data/opdData'
import { sparkline } from '../../data/dummyData'

const severityColors: Record<string, string> = {
  critical: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
  urgent: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
  normal: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
}

const severityLevels = [
  { level: 'Green', severity: 'normal', color: 'bg-emerald-50 border-emerald-200', count: 8 },
  { level: 'Yellow', severity: 'urgent', color: 'bg-yellow-50 border-yellow-200', count: 4 },
  { level: 'Orange', severity: 'urgent', color: 'bg-orange-50 border-orange-200', count: 3 },
  { level: 'Red', severity: 'critical', color: 'bg-red-50 border-red-200', count: 2 },
]

export default function OPDWalkIn() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    severity: 'normal',
    symptoms: '',
    dept: 'General',
    emergency: '',
  })

  const [patients] = useState(walkInPatients)

  const handleRegister = () => {
    console.log('Registering patient:', formData)
    setFormData({ name: '', age: '', gender: 'Male', phone: '', severity: 'normal', symptoms: '', dept: 'General', emergency: '' })
  }

  const walkInTableColumns: Column<typeof walkInPatients[0]>[] = [
    { key: 'token', label: 'Token' },
    { key: 'name', label: 'Patient Name' },
    {
      key: 'severity',
      label: 'Severity',
      render: (row) => (
        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${severityColors[row.severity]}`}>
          {row.severity}
        </span>
      ),
    },
    { key: 'dept', label: 'Department' },
    { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'waitMin', label: 'Wait Time', render: (row) => `${row.waitMin} min` },
    {
      key: 'id',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <button className="rounded-lg px-2 py-1 text-xs bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900/40 dark:text-primary-400">
            Call
          </button>
          <button className="rounded-lg px-2 py-1 text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400">
            <SkipForward className="h-3 w-3" />
          </button>
          <button className="rounded-lg px-2 py-1 text-xs bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-400">
            Reassign
          </button>
        </div>
      ),
    },
  ]

  const doctorAssignments = opdDoctors.filter(d => d.status === 'available')

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 md:p-6">
      <PageHeader
        title="Walk-in Patient Management"
        subtitle="Rapidly register, triage, and manage walk-in OPD patients for immediate consultation and queue allocation"
      />

      {/* Stats Grid */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <StatCard
          title="Total Walk-in Today"
          value={18}
          trend={15}
          icon={Footprints}
          sparkline={sparkline()}
        />
        <StatCard
          title="Currently Waiting"
          value={6}
          trend={-8}
          icon={Users}
          sparkline={sparkline()}
        />
        <StatCard
          title="Urgent/Emergency"
          value={4}
          trend={20}
          icon={AlertTriangle}
          iconColor="bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400"
          sparkline={sparkline()}
        />
        <StatCard
          title="Avg Wait Time"
          value="22 min"
          trend={-5}
          icon={Clock}
          sparkline={sparkline()}
        />
      </div>

      {/* Quick Registration Form */}
      <div className="mb-6 glass-card p-5">
        <SectionTitle title="Quick Walk-in Registration" />
        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Full Name"
            className="input-field"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Age"
            className="input-field"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
          <select className="select-field" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input
            type="tel"
            placeholder="Contact Number"
            className="input-field"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <select className="select-field" value={formData.severity} onChange={(e) => setFormData({ ...formData, severity: e.target.value })}>
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
            <option value="critical">Critical</option>
          </select>
          <select className="select-field" value={formData.dept} onChange={(e) => setFormData({ ...formData, dept: e.target.value })}>
            {opdDepartments.map((d) => <option key={d}>{d}</option>)}
          </select>
          <textarea
            placeholder="Symptoms"
            className="input-field md:col-span-2"
            rows={1}
            value={formData.symptoms}
            onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Emergency Contact"
            className="input-field"
            value={formData.emergency}
            onChange={(e) => setFormData({ ...formData, emergency: e.target.value })}
          />
        </div>
        <button onClick={handleRegister} className="btn-primary mt-4">
          <Plus className="h-4 w-4" /> Register & Add to Queue
        </button>
      </div>

      {/* Triage & Priority System */}
      <div className="mb-6">
        <SectionTitle title="Triage & Priority System" />
        <div className="grid gap-4 md:grid-cols-4">
          {severityLevels.map((item) => (
            <div key={item.level} className={`glass-card border-2 p-4 ${item.color}`}>
              <h4 className="font-semibold text-slate-900 dark:text-white">{item.level}</h4>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{item.count}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{item.severity}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Walk-in Queue Table */}
      <div className="mb-6">
        <SectionTitle title="Walk-in Queue Management" />
        <DataTable data={patients} columns={walkInTableColumns} searchKeys={['name', 'dept']} pageSize={6} showActions={false} />
      </div>

      {/* Doctor Assignment */}
      <div className="mb-6 glass-card p-5">
        <SectionTitle title="Doctor Assignment" subtitle="Available doctors for walk-in consultation" />
        <div className="space-y-2">
          {doctorAssignments.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3 dark:border-slate-700">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{doc.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{doc.dept} | Queue: {doc.queue}/{doc.capacity}</p>
              </div>
              <button className="btn-primary text-sm">
                <UserCheck className="h-3.5 w-3.5" /> Assign
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Patient Flow Timeline */}
        <div className="lg:col-span-1 glass-card p-5">
          <SectionTitle title="Patient Flow Timeline" subtitle="Status: In Progress" />
          <div className="space-y-3">
            {[
              { stage: 'Arrival', time: '09:15 AM', done: true },
              { stage: 'Triage', time: '09:20 AM', done: true },
              { stage: 'Queue', time: '09:25 AM', done: true },
              { stage: 'Consultation', time: '09:45 AM', done: false },
              { stage: 'Complete', time: '—', done: false },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${s.done ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}>
                  {s.done ? '✓' : ''}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{s.stage}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{s.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Walk-in vs Appointment Chart */}
        <div className="lg:col-span-2">
          <ChartCard title="Walk-in vs Appointment Flow" subtitle="Hourly comparison">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={hourlyFlow}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(203, 213, 225)" />
                <XAxis dataKey="hour" stroke="rgb(100, 116, 139)" />
                <YAxis stroke="rgb(100, 116, 139)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgb(15, 23, 42)', border: 'none', borderRadius: '8px', color: 'white' }} />
                <Legend />
                <Bar dataKey="walkIn" fill="#3b82f6" name="Walk-in" />
                <Bar dataKey="appointment" fill="#10b981" name="Appointment" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Billing & Alerts */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Billing Quick Init */}
        <WidgetCard
          title="Billing Quick Init"
          action={<button className="btn-primary text-sm"><Plus className="h-3.5 w-3.5" /> Generate Bill</button>}
        >
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Normal (Walk-in):</span>
              <span className="font-semibold text-slate-900 dark:text-white">₵450</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Urgent:</span>
              <span className="font-semibold text-slate-900 dark:text-white">₵650</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Critical/Emergency:</span>
              <span className="font-semibold text-slate-900 dark:text-white">₵1,200</span>
            </div>
          </div>
        </WidgetCard>

        {/* Emergency Alerts */}
        <AlertPanel alerts={opdAlerts} title="Emergency Alerts" />
      </div>
    </div>
  )
}
