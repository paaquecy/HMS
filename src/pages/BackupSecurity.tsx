import { Shield, AlertTriangle, Ban, LogIn, Users, Flame, HardDrive, Clock } from 'lucide-react'
import {
  LineChart, Line, PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import PageHeader from '../components/layout/PageHeader'
import StatCard from '../components/ui/StatCard'
import ChartCard from '../components/ui/ChartCard'
import WidgetCard from '../components/ui/WidgetCard'
import DataTable from '../components/ui/DataTable'
import SectionTitle from '../components/ui/SectionTitle'
import AlertPanel from '../components/ui/AlertPanel'
import { sparkline, alerts } from '../data/dummyData'

const backupHistory = [
  { id: 'BK-001', type: 'Full System', size: '42.5 GB', status: 'verified', date: '2025-06-10 02:00', duration: '45 min' },
  { id: 'BK-002', type: 'Incremental', size: '2.1 GB', status: 'verified', date: '2025-06-09 02:00', duration: '8 min' },
  { id: 'BK-003', type: 'Database Only', size: '8.3 GB', status: 'verified', date: '2025-06-08 02:00', duration: '12 min' },
  { id: 'BK-004', type: 'Full System', size: '41.8 GB', status: 'failed', date: '2025-06-07 02:00', duration: '—' },
]

const incidents = [
  { id: 'INC-101', type: 'Brute Force Attack', sourceIp: '198.51.100.42', module: 'Authentication', severity: 'High', status: 'investigating', timestamp: '2025-06-10 07:30' },
  { id: 'INC-102', type: 'Suspicious Login', sourceIp: '203.0.113.55', module: 'Authentication', severity: 'Medium', status: 'resolved', timestamp: '2025-06-09 22:15' },
  { id: 'INC-103', type: 'Port Scan Detected', sourceIp: '192.0.2.1', module: 'Firewall', severity: 'Low', status: 'resolved', timestamp: '2025-06-09 14:00' },
  { id: 'INC-104', type: 'Malware Signature', sourceIp: 'Internal', module: 'Endpoint', severity: 'Critical', status: 'active', timestamp: '2025-06-10 06:45' },
]

const intrusionData = [
  { hour: '00', attempts: 2 }, { hour: '04', attempts: 1 },
  { hour: '08', attempts: 8 }, { hour: '12', attempts: 5 },
  { hour: '16', attempts: 12 }, { hour: '20', attempts: 6 },
]

const threatDistribution = [
  { name: 'Brute Force', value: 35, color: '#ef4444' },
  { name: 'Port Scan', value: 25, color: '#f59e0b' },
  { name: 'Malware', value: 15, color: '#8b5cf6' },
  { name: 'Other', value: 25, color: '#64748b' },
]

export default function BackupSecurity() {
  return (
    <div className="space-y-8">
      <PageHeader title="Backup & Security Monitoring" subtitle="Ensure hospital data integrity, system protection, real-time threat detection, and secure recovery operations" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Security Status" value="Secure" trend={0} icon={Shield} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
        <StatCard title="Active Threats" value="2" trend={-33} icon={AlertTriangle} iconColor="bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400" sparkline={sparkline()} />
        <StatCard title="Blocked Intrusions" value="156" trend={8.0} icon={Ban} sparkline={sparkline()} />
        <StatCard title="Failed Logins" value="87" trend={-15} icon={LogIn} iconColor="bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400" sparkline={sparkline()} />
        <StatCard title="Active Sessions" value="342" trend={5.2} icon={Users} sparkline={sparkline()} />
        <StatCard title="Firewall" value="Active" trend={0} icon={Flame} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
        <StatCard title="Backup Health" value="Healthy" trend={0} icon={HardDrive} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
        <StatCard title="Last Backup" value="2h ago" trend={0} icon={Clock} sparkline={sparkline()} />
      </div>

      <section>
        <SectionTitle title="Backup Management System" />
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="glass-card space-y-4 p-5 lg:col-span-1">
            <button className="btn-primary w-full">Trigger Manual Backup</button>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Auto-backup</span><span className="text-emerald-600 font-medium">Enabled</span></div>
              <div className="flex justify-between"><span>Schedule</span><span>Daily 2:00 AM</span></div>
              <div className="flex justify-between"><span>Cloud Sync</span><span className="text-emerald-600">Connected</span></div>
              <div className="flex justify-between"><span>Storage Used</span><span>340/500 GB</span></div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div className="h-full w-[68%] rounded-full bg-primary-600" />
            </div>
          </div>
          <div className="lg:col-span-2">
            <DataTable
              data={backupHistory}
              columns={[
                { key: 'id', label: 'Backup ID' },
                { key: 'type', label: 'Type' },
                { key: 'size', label: 'Size' },
                { key: 'status', label: 'Status', status: true },
                { key: 'date', label: 'Date' },
                { key: 'duration', label: 'Duration' },
              ]}
              searchKeys={['id', 'type']}
              showActions={false}
              pageSize={4}
            />
          </div>
        </div>
      </section>

      <section>
        <SectionTitle title="System Restore & Recovery" />
        <div className="glass-card p-5">
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">Select a restore point to recover system data</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {backupHistory.filter((b) => b.status === 'verified').map((b) => (
              <div key={b.id} className="cursor-pointer rounded-xl border border-slate-200 p-4 transition hover:border-primary-500 hover:shadow-card dark:border-slate-700">
                <p className="font-medium text-sm">{b.date}</p>
                <p className="text-xs text-slate-500">{b.type} · {b.size}</p>
                <button className="mt-2 text-xs font-medium text-primary-600 hover:underline">Restore</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionTitle title="Real-Time Security Monitoring" />
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Intrusion Attempts (24h)">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={intrusionData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="attempts" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Threat Distribution">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={threatDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={3}>
                  {threatDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>

      <section>
        <SectionTitle title="Threat Detection & Incident Management" />
        <DataTable
          data={incidents}
          columns={[
            { key: 'id', label: 'Incident ID' },
            { key: 'type', label: 'Threat Type' },
            { key: 'sourceIp', label: 'Source IP' },
            { key: 'module', label: 'Module' },
            { key: 'severity', label: 'Severity', render: (r) => (
              <span className={`font-medium ${r.severity === 'Critical' ? 'text-red-600' : r.severity === 'High' ? 'text-orange-600' : 'text-amber-600'}`}>{r.severity}</span>
            )},
            { key: 'status', label: 'Status', status: true },
            { key: 'timestamp', label: 'Timestamp' },
          ]}
          searchKeys={['type', 'sourceIp']}
          filters={[{ key: 'status', label: 'Status', options: ['active', 'investigating', 'resolved'] }]}
        />
      </section>

      <section>
        <SectionTitle title="Firewall & Access Control" />
        <div className="grid gap-4 lg:grid-cols-2">
          <WidgetCard title="Allowed IPs">
            <p className="text-sm text-slate-600 dark:text-slate-400">192.168.1.0/24, 10.0.0.0/8, 172.16.0.0/12</p>
            <button className="mt-2 text-xs text-primary-600 hover:underline">Manage Rules</button>
          </WidgetCard>
          <WidgetCard title="Blocked IPs">
            <p className="text-sm">203.0.113.55, 198.51.100.42, 192.0.2.1</p>
            <button className="mt-2 text-xs text-primary-600 hover:underline">Add Block Rule</button>
          </WidgetCard>
        </div>
      </section>

      <section>
        <SectionTitle title="Emergency Security Mode" />
        <div className="glass-card border-2 border-red-200 p-5 dark:border-red-900/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-red-700 dark:text-red-400">System Lockdown</p>
              <p className="text-sm text-slate-500">Restrict all access except emergency admin override</p>
            </div>
            <button className="rounded-xl border-2 border-red-500 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20">
              Activate Lockdown
            </button>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle title="Data Integrity Validation" />
        <ChartCard title="Backup Verification Status">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={[
              { check: 'Database', score: 100 },
              { check: 'File Storage', score: 98 },
              { check: 'Config', score: 100 },
              { check: 'Patient Records', score: 99 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="check" tick={{ fontSize: 11 }} />
              <YAxis domain={[90, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="score" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <AlertPanel alerts={alerts} title="Security Alert Center" />
    </div>
  )
}
