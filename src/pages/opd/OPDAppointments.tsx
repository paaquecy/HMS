import { useState } from 'react'
import { CalendarCheck, CircleCheck as CheckCircle, Clock, Users } from 'lucide-react'
import { Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts'
import { BarChart } from 'recharts'
import PageHeader from '../../components/layout/PageHeader'
import StatCard from '../../components/ui/StatCard'
import WidgetCard from '../../components/ui/WidgetCard'
import ChartCard from '../../components/ui/ChartCard'
import DataTable from '../../components/ui/DataTable'
import SectionTitle from '../../components/ui/SectionTitle'
import AlertPanel from '../../components/ui/AlertPanel'
import StatusBadge from '../../components/ui/StatusBadge'
import {
  appointments,
  opdDoctors,
  opdDepartments,
  timeSlots,
  hourlyFlow,
  opdAlerts,
} from '../../data/opdData'
import { sparkline } from '../../data/dummyData'

export default function OPDAppointments() {
  const [formData, setFormData] = useState({
    patient: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
    type: 'First Visit',
    priority: 'Normal',
    reason: '',
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const handleFormChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const filteredDoctors = formData.department
    ? opdDoctors.filter(d => d.dept === formData.department)
    : opdDoctors

  const filteredAppointments = appointments.filter(apt => {
    const matchSearch = !searchTerm || apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) || apt.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = !statusFilter || apt.status === statusFilter
    return matchSearch && matchStatus
  })

  const appointmentStats = {
    today: appointments.length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    pending: appointments.filter(a => a.status === 'pending').length,
    completed: appointments.filter(a => a.status === 'completed').length,
  }

  const getPriorityColor = (priority: string) =>
    priority === 'Critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' :
    priority === 'Urgent' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' :
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'

  const appointmentColumns = [
    { key: 'id' as const, label: 'Apt ID' },
    { key: 'patient' as const, label: 'Patient' },
    { key: 'doctor' as const, label: 'Doctor' },
    { key: 'dept' as const, label: 'Department' },
    { key: 'time' as const, label: 'Time' },
    { key: 'type' as const, label: 'Type' },
    { key: 'priority' as const, label: 'Priority', render: (row: any) => <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(row.priority)}`}>{row.priority}</span> },
    { key: 'status' as const, label: 'Status', status: true },
  ]

  const walkInVsAppointment = [
    { name: 'Walk-in', value: 60 },
    { name: 'Appointment', value: 40 },
  ]

  const COLORS = ['#f59e0b', '#3b82f6']

  return (
    <div>
      <PageHeader
        title="Appointment Booking & Scheduling"
        subtitle="Manage OPD appointments, allocate doctor time slots, and optimize outpatient consultation flow"
      />

      {/* Stat Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Appointments Today"
          value={appointmentStats.today}
          trend={5}
          icon={CalendarCheck}
          sparkline={sparkline()}
        />
        <StatCard
          title="Confirmed"
          value={appointmentStats.confirmed}
          trend={8}
          icon={CheckCircle}
          sparkline={sparkline()}
        />
        <StatCard
          title="Pending"
          value={appointmentStats.pending}
          trend={-2}
          icon={Clock}
          sparkline={sparkline()}
        />
        <StatCard
          title="Completed"
          value={appointmentStats.completed}
          trend={12}
          icon={Users}
          sparkline={sparkline()}
        />
      </div>

      {/* Daily Schedule & Appointment Form */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        {/* Calendar/Timeline View */}
        <div className="lg:col-span-2">
          <ChartCard title="Daily Schedule" subtitle="Time slots with scheduled appointments">
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {timeSlots.slice(0, 8).map(slot => {
                const slotAppt = appointments.find(a => a.time === slot)
                return (
                  <div key={slot} className="flex gap-3">
                    <div className="w-20 text-xs font-medium text-slate-600 dark:text-slate-400 pt-1">{slot}</div>
                    {slotAppt ? (
                      <div className={`flex-1 rounded-lg border-2 p-2 text-xs ${
                        slotAppt.status === 'confirmed' ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' :
                        slotAppt.status === 'in_progress' ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' :
                        slotAppt.status === 'pending' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20' :
                        'border-red-400 bg-red-50 dark:bg-red-900/20'
                      }`}>
                        <p className="font-medium text-slate-900 dark:text-white">{slotAppt.patient}</p>
                        <p className="text-slate-600 dark:text-slate-400">{slotAppt.doctor} • {slotAppt.dept}</p>
                      </div>
                    ) : (
                      <div className="flex-1 rounded-lg border border-dashed border-slate-300 p-2 text-xs text-slate-400 dark:border-slate-600">Available</div>
                    )}
                  </div>
                )
              })}
            </div>
          </ChartCard>
        </div>

        {/* Appointment Creation Form */}
        <div className="glass-card p-5">
          <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">Book Appointment</h3>
          <div className="space-y-3">
            <input
              type="text"
              name="patient"
              placeholder="Patient name"
              value={formData.patient}
              onChange={handleFormChange}
              className="input-field"
            />
            <select
              name="department"
              value={formData.department}
              onChange={handleFormChange}
              className="select-field"
            >
              <option value="">Select Department</option>
              {opdDepartments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleFormChange}
              className="select-field"
              disabled={!formData.department}
            >
              <option value="">Select Doctor</option>
              {filteredDoctors.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleFormChange}
              className="input-field"
            />
            <select
              name="time"
              value={formData.time}
              onChange={handleFormChange}
              className="select-field"
            >
              <option value="">Select Time</option>
              {timeSlots.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <select
              name="type"
              value={formData.type}
              onChange={handleFormChange}
              className="select-field"
            >
              <option value="First Visit">First Visit</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Emergency OPD">Emergency OPD</option>
            </select>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleFormChange}
              className="select-field"
            >
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
              <option value="Critical">Critical</option>
            </select>
            <textarea
              name="reason"
              placeholder="Reason for visit"
              value={formData.reason}
              onChange={handleFormChange}
              className="input-field h-16 resize-none"
            />
            <button className="btn-primary w-full">Book Appointment</button>
          </div>
        </div>
      </div>

      {/* Doctor Schedule Management */}
      <SectionTitle title="Doctor Schedule Management" />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {opdDoctors.map(doc => (
          <WidgetCard key={doc.id} title={doc.name}>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-600 dark:text-slate-400">{doc.dept}</span><span className="text-xs text-slate-500">{doc.shift}</span></div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs"><span className="text-slate-600 dark:text-slate-400">Queue</span><span className="font-medium">{doc.queue}/{doc.capacity}</span></div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"><div className="h-full bg-blue-500" style={{ width: `${(doc.queue / doc.capacity) * 100}%` }} /></div>
              </div>
              <div className="pt-1"><StatusBadge status={doc.status} /></div>
            </div>
          </WidgetCard>
        ))}
      </div>

      {/* Appointment Queue */}
      <SectionTitle title="Appointment Queue" />
      <div className="mb-6 space-y-3">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input-field flex-1"
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="select-field"
          >
            <option value="">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <DataTable
          data={filteredAppointments}
          columns={appointmentColumns}
          searchKeys={['patient', 'id']}
          pageSize={5}
          showActions={true}
        />
      </div>

      {/* Walk-in vs Appointment */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Walk-in vs Appointment" subtitle="Patient type distribution">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={walkInVsAppointment}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Notification & Reminders */}
        <WidgetCard title="Notification & Reminders">
          <div className="space-y-3">
            {[
              { label: 'SMS Reminders', id: 'sms' },
              { label: 'Email Confirmation', id: 'email' },
              { label: 'Missed Appointment Alerts', id: 'missed' },
              { label: 'Doctor Reminders', id: 'doctor' },
            ].map(item => (
              <label key={item.id} className="flex items-center gap-3">
                <input type="checkbox" className="h-4 w-4 rounded" defaultChecked />
                <span className="text-sm text-slate-700 dark:text-slate-300">{item.label}</span>
              </label>
            ))}
          </div>
        </WidgetCard>
      </div>

      {/* Performance Analytics */}
      <SectionTitle title="Performance Analytics" />
      <ChartCard title="Hourly Flow" subtitle="Walk-in vs appointment trends throughout the day" className="mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hourlyFlow}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="walkIn" fill="#f59e0b" name="Walk-in" />
            <Bar dataKey="appointment" fill="#3b82f6" name="Appointment" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Alerts */}
      <SectionTitle title="System Alerts" />
      <AlertPanel alerts={opdAlerts} title="OPD Alerts" />
    </div>
  )
}
