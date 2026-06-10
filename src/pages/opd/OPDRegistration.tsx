import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ClipboardPlus, Users, Stethoscope, CircleCheck as CheckCircle, Search, FileText, DollarSign, User } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import StatCard from '../../components/ui/StatCard'
import WidgetCard from '../../components/ui/WidgetCard'
import ChartCard from '../../components/ui/ChartCard'
import DataTable from '../../components/ui/DataTable'
import SectionTitle from '../../components/ui/SectionTitle'
import AlertPanel from '../../components/ui/AlertPanel'
import StatusBadge from '../../components/ui/StatusBadge'
import {
  opdPatients,
  opdDoctors,
  opdDepartments,
  walkInPatients,
  queueByDept,
  timeSlots,
  opdAlerts,
} from '../../data/opdData'
import { sparkline } from '../../data/dummyData'

export default function OPDRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    emergency: '',
    patientType: 'New',
    category: 'General',
    symptoms: '',
    department: '',
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [priority, setPriority] = useState('Normal')
  const [insuranceProvider, setInsuranceProvider] = useState('')
  const [policyNo, setPolicyNo] = useState('')
  const [consultFee, setConsultFee] = useState('500')
  const [labCharges, setLabCharges] = useState('0')
  const [medicationCharges, setMedicationCharges] = useState('0')

  const availableDoctors = opdDoctors.filter((d) => d.status === 'available')
  const filteredPatients = opdPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const waitingPatients = opdPatients.filter((p) => p.status === 'waiting' || p.status === 'in_consultation')
  const totalFee = parseInt(consultFee || '0') + parseInt(labCharges || '0') + parseInt(medicationCharges || '0')

  const walkInColumns = [
    { key: 'token' as const, label: 'Token' },
    { key: 'name' as const, label: 'Patient Name' },
    {
      key: 'severity' as const,
      label: 'Severity',
      render: (row: any) => (
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
            row.severity === 'critical'
              ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
              : row.severity === 'urgent'
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
          }`}
        >
          {row.severity}
        </span>
      ),
    },
    { key: 'dept' as const, label: 'Department' },
    {
      key: 'status' as const,
      label: 'Status',
      render: (row: any) => <StatusBadge status={row.status} />,
    },
    { key: 'waitMin' as const, label: 'Wait (min)' },
  ]

  const patientColumns = [
    { key: 'token' as const, label: 'Token' },
    { key: 'name' as const, label: 'Name' },
    { key: 'age' as const, label: 'Age' },
    { key: 'dept' as const, label: 'Department' },
    { key: 'doctor' as const, label: 'Doctor' },
    {
      key: 'status' as const,
      label: 'Status',
      render: (row: any) => <StatusBadge status={row.status} />,
    },
  ]

  const doctorColumns = [
    { key: 'name' as const, label: 'Doctor' },
    { key: 'dept' as const, label: 'Department' },
    { key: 'queue' as const, label: 'Queue' },
    {
      key: 'status' as const,
      label: 'Status',
      render: (row: any) => <StatusBadge status={row.status} />,
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="OPD Patient Registration"
        subtitle="Register OPD patients, manage consultation flow, assign doctors, and track outpatient service delivery in real time"
      />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total OPD Today" value={24} trend={12} icon={ClipboardPlus} sparkline={sparkline()} />
        <StatCard title="Waiting" value={8} trend={-5} icon={Users} sparkline={sparkline()} />
        <StatCard title="In Consultation" value={4} trend={10} icon={Stethoscope} sparkline={sparkline()} />
        <StatCard title="Completed" value={12} trend={8} icon={CheckCircle} sparkline={sparkline()} />
      </div>

      <WidgetCard title="Quick Registration">
        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="input-field"
          />
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="select-field"
          >
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input
            type="tel"
            placeholder="Contact Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="input-field"
          />
          <input
            type="tel"
            placeholder="Emergency Contact"
            value={formData.emergency}
            onChange={(e) => setFormData({ ...formData, emergency: e.target.value })}
            className="input-field"
          />
          <select
            value={formData.patientType}
            onChange={(e) => setFormData({ ...formData, patientType: e.target.value })}
            className="select-field"
          >
            <option>New</option>
            <option>Returning</option>
          </select>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="select-field"
          >
            <option>General</option>
            <option>Specialist</option>
            <option>Emergency OPD</option>
          </select>
          <select
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="select-field"
          >
            <option value="">Select Department</option>
            {opdDepartments.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <textarea
            placeholder="Symptoms/Reason for Visit"
            value={formData.symptoms}
            onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
            className="input-field col-span-1 md:col-span-3"
            rows={2}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="btn-secondary text-sm">Auto-generate ID</button>
          <button className="btn-secondary text-sm flex items-center gap-1">
            <Search className="h-4 w-4" /> Search Existing
          </button>
          <button className="btn-primary text-sm ml-auto">Register Patient</button>
          <button className="btn-secondary text-sm">Save Draft</button>
        </div>
      </WidgetCard>

      <WidgetCard title="Appointment Booking">
        <div className="grid gap-3 md:grid-cols-4">
          <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} className="select-field">
            <option value="">Select Doctor</option>
            {availableDoctors.map((d) => (
              <option key={d.id}>{d.name}</option>
            ))}
          </select>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="input-field"
          />
          <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="select-field">
            <option value="">Time Slot</option>
            {timeSlots.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="select-field">
            <option>Normal</option>
            <option>Urgent</option>
            <option>Emergency</option>
          </select>
        </div>
        <button className="btn-primary mt-3">Book Appointment</button>
      </WidgetCard>

      <SectionTitle title="Walk-in Patient Queue" />
      <DataTable data={walkInPatients} columns={walkInColumns} searchKeys={['name', 'dept']} pageSize={5} />

      <ChartCard title="Queue Management by Department">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={queueByDept}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dept" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="waiting" fill="#f59e0b" />
            <Bar dataKey="inConsult" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <SectionTitle title="Patient Search & History" />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search patients by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field max-w-md"
        />
      </div>
      <DataTable data={filteredPatients} columns={patientColumns} searchKeys={['name', 'id']} pageSize={6} />

      <WidgetCard title="Insurance Verification">
        <div className="grid gap-3 md:grid-cols-3">
          <select
            value={insuranceProvider}
            onChange={(e) => setInsuranceProvider(e.target.value)}
            className="select-field"
          >
            <option value="">Select Provider</option>
            <option>BlueCross</option>
            <option>Aetna</option>
            <option>UnitedHealth</option>
            <option>Cigna</option>
          </select>
          <input
            type="text"
            placeholder="Policy Number"
            value={policyNo}
            onChange={(e) => setPolicyNo(e.target.value)}
            className="input-field"
          />
          <button className="btn-primary">Verify</button>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg bg-emerald-50 p-3 text-center dark:bg-emerald-900/20">
            <p className="text-2xl font-bold text-emerald-700">3</p>
            <p className="text-xs text-emerald-600">Approved</p>
          </div>
          <div className="rounded-lg bg-amber-50 p-3 text-center dark:bg-amber-900/20">
            <p className="text-2xl font-bold text-amber-700">2</p>
            <p className="text-xs text-amber-600">Pending</p>
          </div>
          <div className="rounded-lg bg-red-50 p-3 text-center dark:bg-red-900/20">
            <p className="text-2xl font-bold text-red-700">1</p>
            <p className="text-xs text-red-600">Rejected</p>
          </div>
        </div>
      </WidgetCard>

      <WidgetCard title="Billing Initiation">
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">Consultation Fee</label>
            <input
              type="number"
              value={consultFee}
              onChange={(e) => setConsultFee(e.target.value)}
              className="input-field mt-1"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">Lab Charges</label>
            <input
              type="number"
              value={labCharges}
              onChange={(e) => setLabCharges(e.target.value)}
              className="input-field mt-1"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">Medication Charges</label>
            <input
              type="number"
              value={medicationCharges}
              onChange={(e) => setMedicationCharges(e.target.value)}
              className="input-field mt-1"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary-600" />
            <span className="text-lg font-bold text-slate-900 dark:text-white">Total: ₵{totalFee}</span>
          </div>
          <button className="btn-primary flex items-center gap-1">
            <FileText className="h-4 w-4" /> Generate Invoice
          </button>
        </div>
      </WidgetCard>

      <SectionTitle title="Doctor Assignment" />
      <DataTable data={opdDoctors} columns={doctorColumns} pageSize={5} showActions={false} />

      <SectionTitle title="Consultation Status Tracking" />
      <div className="space-y-2">
        {waitingPatients.map((p) => (
          <div key={p.id} className="glass-card flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-slate-400" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{p.name}</p>
                <p className="text-xs text-slate-500">{p.dept}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div
                  className={`h-3 w-3 rounded-full ${
                    p.status === 'waiting'
                      ? 'bg-amber-500'
                      : p.status === 'in_consultation'
                        ? 'bg-blue-500'
                        : 'bg-emerald-500'
                  }`}
                />
                <div className={`h-3 w-3 rounded-full ${p.status === 'in_consultation' || p.status === 'completed' ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                <div className={`h-3 w-3 rounded-full ${p.status === 'completed' ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
              </div>
              <StatusBadge status={p.status} />
            </div>
          </div>
        ))}
      </div>

      <AlertPanel alerts={opdAlerts} title="OPD Alerts" />
    </div>
  )
}
