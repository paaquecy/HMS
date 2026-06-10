'use client'

import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { LogIn, Stethoscope, LogOut, UserX, Clock, Search, Filter, Printer as PrinterIcon, Download, Plus } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import StatCard from '../../components/ui/StatCard'
import ChartCard from '../../components/ui/ChartCard'
import DataTable, { Column } from '../../components/ui/DataTable'
import WidgetCard from '../../components/ui/WidgetCard'
import SectionTitle from '../../components/ui/SectionTitle'
import AlertPanel from '../../components/ui/AlertPanel'
import { checkInOutPatients, opdDoctors, queueByDept, hourlyFlow, opdAlerts } from '../../data/opdData'
import { sparkline } from '../../data/dummyData'

interface CheckInOutPatient {
  id: string
  name: string
  dept: string
  doctor: string
  checkIn: string
  checkOut: string
  status: string
  duration: string
}

export default function OPDCheckIn() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [deptFilter, setDeptFilter] = useState('all')
  const [selectedCheckout, setSelectedCheckout] = useState<string | null>(null)

  // Calculate stats
  const stats = useMemo(() => {
    const counts = {
      checkedIn: checkInOutPatients.filter((p) => p.status === 'checked_in').length,
      inConsult: checkInOutPatients.filter((p) => p.status === 'in_consultation').length,
      checkedOut: checkInOutPatients.filter((p) => p.status === 'checked_out').length,
      noShow: checkInOutPatients.filter((p) => p.status === 'no_show').length,
    }
    return counts
  }, [])

  // Pipeline stages
  const pipelineStages = [
    { label: 'Checked-in', count: stats.checkedIn, color: 'bg-blue-500' },
    { label: 'Waiting', count: stats.checkedIn + stats.inConsult, color: 'bg-amber-500' },
    { label: 'In Consultation', count: stats.inConsult, color: 'bg-purple-500' },
    { label: 'Ready for Checkout', count: stats.checkedOut - 1, color: 'bg-cyan-500' },
    { label: 'Checked-out', count: stats.checkedOut, color: 'bg-emerald-500' },
  ]

  // Filter patients
  const filteredPatients = useMemo(() => {
    let result = checkInOutPatients
    if (statusFilter !== 'all') {
      result = result.filter((p) => p.status === statusFilter)
    }
    if (deptFilter !== 'all') {
      result = result.filter((p) => p.dept === deptFilter)
    }
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return result
  }, [statusFilter, deptFilter, searchQuery])

  const missedPatients = checkInOutPatients.filter((p) => p.status === 'no_show')

  // Table columns
  const [tablePatients] = useState(checkInOutPatients)

  const columns: Column<CheckInOutPatient>[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Patient Name' },
    { key: 'dept', label: 'Department' },
    { key: 'doctor', label: 'Doctor' },
    { key: 'checkIn', label: 'Check-in Time' },
    { key: 'checkOut', label: 'Check-out Time' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => {
        const statusMap: Record<string, string> = {
          checked_in: 'Checked In',
          waiting: 'Waiting',
          in_consultation: 'In Consultation',
          checked_out: 'Checked Out',
          no_show: 'No-show',
        }
        const colors: Record<string, string> = {
          checked_in: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30',
          waiting: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30',
          in_consultation: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30',
          checked_out: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30',
          no_show: 'bg-red-100 text-red-700 dark:bg-red-900/30',
        }
        return (
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${colors[row.status]}`}>
            {statusMap[row.status]}
          </span>
        )
      },
    },
    { key: 'duration', label: 'Duration' },
  ]

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <PageHeader
        title="Patient Check-in / Check-out"
        subtitle="Track OPD patient arrivals, manage consultation lifecycle, and complete outpatient visit flow efficiently"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Checked-in Today"
          value={stats.checkedIn}
          trend={10}
          icon={LogIn}
          iconColor="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
          sparkline={sparkline()}
        />
        <StatCard
          title="In Consultation"
          value={stats.inConsult}
          trend={5}
          icon={Stethoscope}
          iconColor="bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
          sparkline={sparkline()}
        />
        <StatCard
          title="Checked-out"
          value={stats.checkedOut}
          trend={8}
          icon={LogOut}
          iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400"
          sparkline={sparkline()}
        />
        <StatCard
          title="No-show"
          value={stats.noShow}
          trend={-50}
          icon={UserX}
          iconColor="bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400"
          sparkline={sparkline()}
        />
      </div>

      {/* Quick Check-in & Check-out Panels */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Check-in */}
        <WidgetCard title="Quick Check-in" action={<Plus className="h-4 w-4 text-slate-400" />}>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Search Patient
              </label>
              <input
                type="text"
                placeholder="Enter patient ID or name..."
                className="input-field w-full"
              />
            </div>
            <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
              <p className="text-xs text-slate-500 dark:text-slate-400">No patient selected</p>
            </div>
            <button className="btn-primary w-full text-sm">
              <LogIn className="h-4 w-4" /> Check In
            </button>
          </div>
        </WidgetCard>

        {/* Check-out */}
        <WidgetCard title="Quick Check-out" action={<Plus className="h-4 w-4 text-slate-400" />}>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Search Active Consultation
              </label>
              <input
                type="text"
                placeholder="Search in-consultation patients..."
                className="input-field w-full"
              />
            </div>
            <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
              <p className="text-xs text-slate-500 dark:text-slate-400">No consultation selected</p>
            </div>
            <button className="btn-primary w-full text-sm">
              <LogOut className="h-4 w-4" /> Check Out
            </button>
          </div>
        </WidgetCard>
      </div>

      {/* Live Visit Tracking */}
      <div>
        <SectionTitle title="Live Visit Tracking" subtitle="Real-time patient flow and consultation status" />
        <DataTable
          data={filteredPatients}
          columns={columns}
          searchKeys={['name', 'id', 'dept']}
          filters={[
            {
              key: 'status',
              label: 'Status',
              options: ['checked_in', 'waiting', 'in_consultation', 'checked_out', 'no_show'],
            },
            {
              key: 'dept',
              label: 'Department',
              options: ['General', 'Cardiology', 'Neurology', 'Surgery', 'Dermatology', 'Orthopedics', 'ENT'],
            },
          ]}
          showActions={true}
        />
      </div>

      {/* Consultation Flow Pipeline */}
      <div>
        <SectionTitle title="Consultation Flow Pipeline" subtitle="Patient progression through OPD stages" />
        <div className="glass-card p-5">
          <div className="flex items-center justify-between gap-2 overflow-x-auto">
            {pipelineStages.map((stage, i) => (
              <div key={stage.label} className="flex flex-1 flex-col items-center gap-2 min-w-max">
                <div className={`rounded-lg p-3 text-white font-semibold text-sm text-center ${stage.color} min-w-max`}>
                  {stage.label} ({stage.count})
                </div>
                {i < pipelineStages.length - 1 && (
                  <div className="text-2xl text-slate-300 dark:text-slate-600">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Billing Integration */}
      <div>
        <SectionTitle title="Billing Integration at Checkout" subtitle="Service charges and insurance deduction" />
        <div className="glass-card p-5">
          <div className="mb-5 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Consultation Fee</span>
              <span className="font-semibold text-slate-900 dark:text-white">₵2,500</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Lab Charges</span>
              <span className="font-semibold text-slate-900 dark:text-white">₵1,800</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Medication Charges</span>
              <span className="font-semibold text-slate-900 dark:text-white">₵3,200</span>
            </div>
            <div className="border-t border-slate-200 pt-2 dark:border-slate-700">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Insurance Deduction (80%)</span>
                <span className="font-semibold text-emerald-600">-₵4,944</span>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-2 dark:border-slate-700">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-900 dark:text-white">Patient Pays</span>
                <span className="text-xl font-bold text-primary-600 dark:text-primary-400">₵2,556</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn-primary flex-1 text-sm">
              <PrinterIcon className="h-4 w-4" /> Print Invoice
            </button>
            <button className="btn-secondary flex-1 text-sm">
              <Download className="h-4 w-4" /> Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Missed/Delayed Patients */}
      {missedPatients.length > 0 && (
        <div>
          <SectionTitle title="Missed/Delayed Patient Monitor" subtitle="No-show patients requiring follow-up" />
          <div className="glass-card p-5">
            <div className="space-y-3">
              {missedPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{patient.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{patient.dept} • {patient.checkIn}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-secondary text-xs">Log Reason</button>
                    <button className="btn-primary text-xs">Reschedule</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Department Queue Analytics */}
      <div>
        <SectionTitle title="Department Queue Analytics" subtitle="Patient flow efficiency by department" />
        <ChartCard title="Queue by Department" subtitle="Waiting, In Consultation, and Completed patients">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={queueByDept}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
              <XAxis dataKey="dept" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="waiting" fill="#f59e0b" name="Waiting" />
              <Bar dataKey="inConsult" fill="#8b5cf6" name="In Consultation" />
              <Bar dataKey="completed" fill="#10b981" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Alerts */}
      <AlertPanel alerts={opdAlerts} title="OPD Alerts" />
    </div>
  )
}
