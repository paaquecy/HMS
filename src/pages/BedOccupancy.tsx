import { BedDouble, Users, CheckCircle, Heart, Siren, Baby, Stethoscope } from 'lucide-react'
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
import { sparkline, wardOccupancy, beds, alerts } from '../data/dummyData'

const bedColumns = [
  { key: 'id', label: 'Bed ID' },
  { key: 'ward', label: 'Ward' },
  { key: 'patientName', label: 'Patient' },
  { key: 'doctorAssigned', label: 'Doctor' },
  { key: 'admissionDate', label: 'Admission' },
  { key: 'conditionSeverity', label: 'Severity' },
  { key: 'status', label: 'Status', status: true },
  { key: 'estimatedDischarge', label: 'Est. Discharge' },
]

const occupancyTrend = [
  { hour: '6AM', rate: 72 }, { hour: '9AM', rate: 78 }, { hour: '12PM', rate: 85 },
  { hour: '3PM', rate: 88 }, { hour: '6PM', rate: 87 }, { hour: '9PM', rate: 82 },
]

const bedStatuses = {
  available: 'bg-emerald-400 hover:bg-emerald-500',
  occupied: 'bg-red-400 hover:bg-red-500',
  reserved: 'bg-amber-400 hover:bg-amber-500',
  maintenance: 'bg-slate-400 hover:bg-slate-500',
}

type BedStatus = keyof typeof bedStatuses

function BedGrid({ ward, count, occupied }: { ward: string; count: number; occupied: number }) {
  const beds = Array.from({ length: count }, (_, i) => {
    if (i < occupied) return 'occupied'
    if (i === occupied) return 'reserved'
    if (i === count - 1) return 'maintenance'
    return 'available'
  })
  return (
    <div className="glass-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-semibold text-slate-900 dark:text-white">{ward}</h4>
        <span className="text-xs text-slate-500">{occupied}/{count} occupied</span>
      </div>
      <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-8">
        {beds.map((status, i) => (
          <div
            key={i}
            title={`Bed ${i + 1}: ${status}`}
            className={`aspect-square cursor-pointer rounded-md transition ${bedStatuses[status as BedStatus]}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function BedOccupancy() {
  return (
    <div className="space-y-8">
      <PageHeader title="Bed Occupancy" subtitle="Real-time monitoring of hospital bed availability, ward capacity, and patient admission flow" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Beds" value="500" trend={0} icon={BedDouble} sparkline={sparkline()} />
        <StatCard title="Occupied" value="435" trend={3.2} icon={Users} iconColor="bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400" sparkline={sparkline()} />
        <StatCard title="Available" value="65" trend={-8.5} icon={CheckCircle} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
        <StatCard title="ICU Occupancy" value="90%" trend={5.0} icon={Heart} iconColor="bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400" sparkline={sparkline()} />
        <StatCard title="Emergency Beds" value="3/15" trend={-20} icon={Siren} iconColor="bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400" sparkline={sparkline()} />
        <StatCard title="General Ward" value="85%" trend={2.1} icon={BedDouble} sparkline={sparkline()} />
        <StatCard title="Pediatric" value="60%" trend={-1.5} icon={Baby} iconColor="bg-pink-100 text-pink-600 dark:bg-pink-900/50 dark:text-pink-400" sparkline={sparkline()} />
        <StatCard title="Maternity" value="73%" trend={4.0} icon={Stethoscope} iconColor="bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400" sparkline={sparkline()} />
      </div>

      <section>
        <SectionTitle title="Real-Time Bed Status Map" subtitle="Interactive ward layout — hover for details" />
        <div className="mb-4 flex flex-wrap gap-3 text-xs">
          {Object.entries({ Available: 'bg-emerald-400', Occupied: 'bg-red-400', Reserved: 'bg-amber-400', Maintenance: 'bg-slate-400' }).map(([l, c]) => (
            <span key={l} className="flex items-center gap-1.5"><span className={`h-3 w-3 rounded ${c}`} />{l}</span>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <BedGrid ward="ICU" count={20} occupied={18} />
          <BedGrid ward="Emergency" count={15} occupied={12} />
          <BedGrid ward="General Ward" count={40} occupied={34} />
          <BedGrid ward="Maternity" count={20} occupied={15} />
          <BedGrid ward="Pediatrics" count={15} occupied={9} />
          <BedGrid ward="Surgery Recovery" count={25} occupied={20} />
        </div>
      </section>

      <section>
        <SectionTitle title="Ward Occupancy Analytics" />
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Ward-wise Occupancy">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={wardOccupancy}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis dataKey="ward" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="occupied" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Peak Occupancy Hours">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={occupancyTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>

      <section>
        <SectionTitle title="Patient Admission Flow" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'New Admissions Today', value: '24' },
            { label: 'Pending Allocation', value: '7' },
            { label: 'Emergency Queue', value: '3' },
            { label: 'Discharge Processing', value: '12' },
          ].map((s) => (
            <div key={s.label} className="glass-card p-4 text-center">
              <p className="text-sm text-slate-500">{s.label}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="ICU & Emergency Critical Monitoring" />
        <div className="grid gap-4 lg:grid-cols-3">
          <WidgetCard title="ICU Capacity Warning">
            <div className="text-center">
              <p className="text-4xl font-bold text-red-500">90%</p>
              <p className="text-sm text-slate-500">18/20 beds occupied</p>
              <p className="mt-2 text-xs text-red-500 font-medium">⚠ Near capacity threshold</p>
            </div>
          </WidgetCard>
          <WidgetCard title="Critical Patients">
            {['James Wilson — Cardiac', 'Thomas Anderson — Respiratory'].map((p, i) => (
              <div key={i} className="mb-2 rounded-lg border border-red-200 bg-red-50 p-2 text-sm dark:border-red-900/50 dark:bg-red-900/20">
                {p}
              </div>
            ))}
          </WidgetCard>
          <WidgetCard title="Emergency Overflow">
            <p className="text-sm text-slate-600 dark:text-slate-400">3 beds available in Emergency. 2 patients in overflow holding area.</p>
          </WidgetCard>
        </div>
      </section>

      <section>
        <SectionTitle title="Ward Performance" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {wardOccupancy.map((w) => (
            <div key={w.ward} className="glass-card p-4">
              <p className="font-semibold text-slate-900 dark:text-white">{w.ward}</p>
              <p className="mt-1 text-2xl font-bold text-primary-600">{Math.round((w.occupied / w.total) * 100)}%</p>
              <p className="text-xs text-slate-500">{w.occupied}/{w.total} beds · Staff ratio 1:4</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-full rounded-full bg-primary-600" style={{ width: `${(w.occupied / w.total) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Bed Assignment Management" />
        <DataTable
          data={beds}
          columns={bedColumns}
          searchKeys={['patientName', 'id', 'ward']}
          filters={[
            { key: 'ward', label: 'Ward', options: ['ICU', 'Emergency', 'General Ward', 'Maternity', 'Pediatrics'] },
            { key: 'status', label: 'Status', options: ['occupied', 'available'] },
          ]}
        />
      </section>

      <section>
        <SectionTitle title="Discharge & Cleaning Pipeline" />
        <div className="grid gap-4 lg:grid-cols-3">
          <WidgetCard title="Recently Vacated">
            <p className="text-sm">B-GW-22, B-ICU-04, B-PED-08</p>
            <p className="text-xs text-slate-500 mt-1">Awaiting cleaning</p>
          </WidgetCard>
          <WidgetCard title="Cleaning Status">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>In progress</span><span className="font-medium">3</span></div>
              <div className="flex justify-between"><span>Ready</span><span className="font-medium text-emerald-600">5</span></div>
              <div className="flex justify-between"><span>Maintenance</span><span className="font-medium text-amber-600">2</span></div>
            </div>
          </WidgetCard>
          <WidgetCard title="AI Capacity Forecast">
            <p className="text-sm text-slate-600 dark:text-slate-400">Predicted 92% occupancy by Friday. Consider opening overflow ward B-East.</p>
          </WidgetCard>
        </div>
      </section>

      <AlertPanel alerts={alerts} title="Real-Time Alerts" />
    </div>
  )
}
