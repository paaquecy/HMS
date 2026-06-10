import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Search, FileText, Users, TriangleAlert as AlertTriangle, Calendar, Phone, Eye, Clock, Pill, Beaker, CreditCard, FileCheck, Lock, Plus, Printer } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import StatCard from '../../components/ui/StatCard'
import ChartCard from '../../components/ui/ChartCard'
import DataTable from '../../components/ui/DataTable'
import WidgetCard from '../../components/ui/WidgetCard'
import SectionTitle from '../../components/ui/SectionTitle'
import AlertPanel from '../../components/ui/AlertPanel'
import StatusBadge from '../../components/ui/StatusBadge'
import { patientHistory, opdPatients, opdAlerts } from '../../data/opdData'
import { sparkline, months } from '../../data/dummyData'

export default function OPDSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<typeof opdPatients[0] | null>(null)
  const [patientIdFilter, setPatientIdFilter] = useState('')
  const [phoneFilter, setPhoneFilter] = useState('')
  const [deptFilter, setDeptFilter] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [expandedVisit, setExpandedVisit] = useState<number | null>(null)
  const [expandedNote, setExpandedNote] = useState<number | null>(null)

  const filteredPatients = opdPatients.filter((p) => {
    const matchName = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchId = patientIdFilter ? p.id.includes(patientIdFilter) : true
    const matchPhone = phoneFilter ? p.phone.includes(phoneFilter) : true
    const matchDept = deptFilter ? p.dept === deptFilter : true
    return matchName && matchId && matchPhone && matchDept
  })

  const patientData = selectedPatient ? patientHistory.find((h) => h.id === selectedPatient.id) : null

  const dummyVisits = [
    { date: '2025-05-28', dept: 'Cardiology', diagnosis: 'Hypertension Stage 2', doctor: 'Dr. Michael Chen', notes: 'Patient shows elevated BP readings...' },
    { date: '2025-05-15', dept: 'Cardiology', diagnosis: 'Chest pain - Non-cardiac', doctor: 'Dr. Michael Chen', notes: 'EKG normal, referred for stress test...' },
    { date: '2025-04-20', dept: 'General', diagnosis: 'Routine checkup', doctor: 'Dr. Emily Roberts', notes: 'All vitals normal, continue current medication...' },
    { date: '2025-03-10', dept: 'Cardiology', diagnosis: 'Initial consultation', doctor: 'Dr. Michael Chen', notes: 'New patient presenting with chest discomfort...' },
    { date: '2025-02-01', dept: 'General', diagnosis: 'Health screening', doctor: 'Dr. Emily Roberts', notes: 'Preventive care visit, labs ordered...' },
  ]

  const dummyNotes = [
    { date: '2025-05-28', doctor: 'Dr. Michael Chen', diagnosis: 'Hypertension', treatment: 'Amlodipine 5mg daily, reduce sodium', followUp: '2 weeks' },
    { date: '2025-05-15', doctor: 'Dr. Michael Chen', diagnosis: 'Chest pain', treatment: 'Aspirin 75mg, lifestyle modification', followUp: '1 week' },
    { date: '2025-04-20', doctor: 'Dr. Emily Roberts', diagnosis: 'Routine checkup', treatment: 'Continue current medication', followUp: '3 months' },
  ]

  const visitFreqData = months.slice(0, 6).map((m, i) => ({
    month: m,
    visits: Math.floor(Math.random() * 8) + 2,
  }))

  const patientColumns = [
    { key: 'id' as const, label: 'Patient ID' },
    { key: 'name' as const, label: 'Name' },
    {
      key: 'age' as const,
      label: 'Age/Gender',
      render: (row: any) => `${row.age}/${row.gender.charAt(0)}`,
    },
    { key: 'phone' as const, label: 'Phone' },
    {
      key: 'dept' as const,
      label: 'Last Department',
      render: (row: any) => <span className="text-xs font-medium">{row.dept}</span>,
    },
    {
      key: 'status' as const,
      label: 'Status',
      render: (row: any) => <StatusBadge status={row.status} />,
    },
    {
      key: 'actions' as const,
      label: 'Actions',
      render: (row: any) => (
        <div className="flex gap-2">
          <button onClick={() => setSelectedPatient(row)} className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400">
            View History
          </button>
          <button className="text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">Book</button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="OPD Patient Search & History Lookup"
        subtitle="Quickly find patients and access complete outpatient medical history, visits, prescriptions, and clinical records"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Patients" value="12,847" trend={8} icon={Users} sparkline={sparkline()} />
        <StatCard title="Searches Today" value="156" trend={12} icon={Search} iconColor="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400" sparkline={sparkline()} />
        <StatCard title="Active Records" value="12,500" trend={3} icon={FileText} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
        <StatCard title="Follow-up Required" value="245" trend={-5} icon={AlertTriangle} iconColor="bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400" sparkline={sparkline()} />
      </div>

      <div className="glass-card space-y-4 p-5">
        <SectionTitle title="Advanced Search" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <input
            type="text"
            placeholder="Patient Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Patient ID"
            value={patientIdFilter}
            onChange={(e) => setPatientIdFilter(e.target.value)}
            className="input-field"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phoneFilter}
            onChange={(e) => setPhoneFilter(e.target.value)}
            className="input-field"
          />
          <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="select-field">
            <option value="">All Departments</option>
            <option>General</option>
            <option>Cardiology</option>
            <option>Neurology</option>
            <option>Dermatology</option>
            <option>Surgery</option>
            <option>Orthopedics</option>
          </select>
          <div className="flex gap-2">
            <button className="btn-primary w-full" onClick={() => setSearchQuery(searchQuery)}>
              Search
            </button>
            <button
              className="btn-secondary w-full"
              onClick={() => {
                setSearchQuery('')
                setPatientIdFilter('')
                setPhoneFilter('')
                setDeptFilter('')
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <DataTable columns={patientColumns} data={filteredPatients} />

      {selectedPatient && patientData && (
        <div className="glass-card space-y-4 p-5">
          <SectionTitle title="Patient Profile Overview" />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm text-slate-500">Name</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{selectedPatient.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-500">Age & Gender</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{selectedPatient.age} years, {selectedPatient.gender}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-500">Contact</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{selectedPatient.phone}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-500">Insurance Status</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{patientData.insurance}</p>
            </div>
            <div className="space-y-2 md:col-span-2">
              <p className="text-sm text-slate-500">Chronic Conditions</p>
              <div className="flex flex-wrap gap-2">
                {patientData.conditions.map((c) => (
                  <span key={c} className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-slate-200 pt-4 dark:border-slate-700">
            <button className="btn-primary flex items-center gap-2">
              <Plus size={16} /> Start OPD Visit
            </button>
            <button className="btn-secondary flex items-center gap-2">
              <Calendar size={16} /> Book Appointment
            </button>
            <button className="btn-secondary flex items-center gap-2">
              <FileCheck size={16} /> Generate Report
            </button>
            <button className="btn-secondary flex items-center gap-2">
              <Printer size={16} /> Print Summary
            </button>
          </div>
        </div>
      )}

      {selectedPatient && (
        <div className="glass-card space-y-4 p-5">
          <SectionTitle title="Medical History Timeline" />
          <div className="space-y-3">
            {dummyVisits.map((v, i) => (
              <div key={i} className="cursor-pointer rounded-lg border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50" onClick={() => setExpandedVisit(expandedVisit === i ? null : i)}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{v.diagnosis}</p>
                    <p className="text-xs text-slate-500">{v.date} • {v.dept} • Dr. {v.doctor.split(' ')[1]}</p>
                  </div>
                  <span className={`transition ${expandedVisit === i ? 'rotate-180' : ''}`}>▼</span>
                </div>
                {expandedVisit === i && <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{v.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedPatient && patientData && (
        <>
          <div className="glass-card space-y-4 p-5">
            <SectionTitle title="Prescription History" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="px-4 py-2 text-left font-semibold text-slate-700 dark:text-slate-300">Medication</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700 dark:text-slate-300">Dosage</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700 dark:text-slate-300">Duration</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700 dark:text-slate-300">Doctor</th>
                  </tr>
                </thead>
                <tbody>
                  {patientData.prescriptions.map((p, i) => (
                    <tr key={i} className="border-b border-slate-100 dark:border-slate-700/50">
                      <td className="px-4 py-3 text-slate-900 dark:text-white">{p}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">As prescribed</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Ongoing</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Dr. Chen</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-card space-y-4 p-5">
            <SectionTitle title="Lab & Diagnostic History" />
            <div className="grid gap-4 md:grid-cols-2">
              {patientData.labs.map((l, i) => (
                <div key={i} className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{l.split(' — ')[0]}</p>
                  <p className="text-xs text-slate-500">Status</p>
                  <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${l.includes('Normal') ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400'}`}>
                    {l.split(' — ')[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card space-y-4 p-5">
            <SectionTitle title="Billing & Payment History" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="px-4 py-2 text-left font-semibold text-slate-700 dark:text-slate-300">Date</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700 dark:text-slate-300">Service</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700 dark:text-slate-300">Amount</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700 dark:text-slate-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 dark:border-slate-700/50">
                    <td className="px-4 py-3 text-slate-900 dark:text-white">2025-05-28</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Consultation + ECG</td>
                    <td className="px-4 py-3 text-slate-900 dark:text-white font-semibold">₵2,500</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">Paid</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-card space-y-4 p-5">
            <SectionTitle title="Doctor Notes" />
            <div className="space-y-3">
              {dummyNotes.map((n, i) => (
                <div key={i} className="cursor-pointer rounded-lg border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50" onClick={() => setExpandedNote(expandedNote === i ? null : i)}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{n.diagnosis}</p>
                      <p className="text-xs text-slate-500">{n.date} • {n.doctor}</p>
                    </div>
                    <span className={`transition ${expandedNote === i ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                  {expandedNote === i && (
                    <div className="mt-3 space-y-2 border-t border-slate-200 pt-3 dark:border-slate-700">
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        <span className="font-semibold">Treatment:</span> {n.treatment}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        <span className="font-semibold">Follow-up:</span> {n.followUp}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card space-y-4 p-5">
            <SectionTitle title="Insurance Eligibility" />
            <WidgetCard title="" className="border-0 bg-transparent p-0 shadow-none">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm text-slate-500">Provider</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">BlueCross</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-500">Policy</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">BC-558221</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-500">Coverage Status</p>
                  <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">Active</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-500">Claims History</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">3 approved, 0 pending</p>
                </div>
              </div>
            </WidgetCard>
          </div>
        </>
      )}

      <div className="glass-card space-y-4 p-5">
        <SectionTitle title="Quick Actions" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <button className="btn-primary flex items-center justify-center gap-2 py-3">
            <Plus size={18} /> New OPD Visit
          </button>
          <button className="btn-secondary flex items-center justify-center gap-2 py-3">
            <Calendar size={18} /> Book Appointment
          </button>
          <button className="btn-secondary flex items-center justify-center gap-2 py-3">
            <FileCheck size={18} /> Generate Report
          </button>
          <button className="btn-secondary flex items-center justify-center gap-2 py-3">
            <Printer size={18} /> Print History
          </button>
          <button className="btn-secondary flex items-center justify-center gap-2 py-3">
            <Lock size={18} /> Verify Insurance
          </button>
          <button className="btn-secondary flex items-center justify-center gap-2 py-3">
            <CreditCard size={18} /> Initiate Billing
          </button>
        </div>
      </div>

      {selectedPatient && (
        <ChartCard title="Visit Frequency Trend" subtitle="Patient visit history over 6 months">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={visitFreqData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="visits" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      <AlertPanel alerts={opdAlerts} />
    </div>
  )
}
