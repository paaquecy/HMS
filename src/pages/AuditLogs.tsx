import { FileText, CheckCircle, XCircle, ShieldAlert, UserCog, AlertTriangle, LogIn, Settings } from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import PageHeader from '../components/layout/PageHeader'
import StatCard from '../components/ui/StatCard'
import ChartCard from '../components/ui/ChartCard'
import WidgetCard from '../components/ui/WidgetCard'
import DataTable from '../components/ui/DataTable'
import SectionTitle from '../components/ui/SectionTitle'
import AlertPanel from '../components/ui/AlertPanel'
import { sparkline, auditLogs, alerts } from '../data/dummyData'

const logStream = [
  ...auditLogs,
  { id: 'AL-006', timestamp: '2025-06-10 07:58:22', user: 'Amanda Foster', action: 'Billing Transaction', module: 'Billing', status: 'success', ip: '192.168.1.33', device: 'Chrome / Windows', severity: 'low' },
  { id: 'AL-007', timestamp: '2025-06-10 07:45:10', user: 'Dr. Admin', action: 'Permission Change', module: 'Roles', status: 'success', ip: '192.168.1.100', device: 'Chrome / macOS', severity: 'high' },
  { id: 'AL-008', timestamp: '2025-06-10 07:30:05', user: 'Unknown', action: 'Failed Login (x3)', module: 'Authentication', status: 'failed', ip: '198.51.100.42', device: 'Unknown', severity: 'critical' },
]

const userActivity = [
  { id: 'UA-01', fullName: 'Dr. Admin', role: 'Super Admin', totalActions: 245, failedActions: 0, lastActive: '2025-06-10 09:15', riskScore: 'Low' },
  { id: 'UA-02', fullName: 'Dr. Chen', role: 'Doctor', totalActions: 128, failedActions: 2, lastActive: '2025-06-10 08:30', riskScore: 'Low' },
  { id: 'UA-03', fullName: 'Unknown', role: '—', totalActions: 15, failedActions: 15, lastActive: '2025-06-10 07:30', riskScore: 'High' },
]

const eventDistribution = [
  { name: 'Login/Logout', value: 35, color: '#2563eb' },
  { name: 'Data Updates', value: 28, color: '#10b981' },
  { name: 'Config Changes', value: 12, color: '#f59e0b' },
  { name: 'Failed Access', value: 8, color: '#ef4444' },
  { name: 'Other', value: 17, color: '#64748b' },
]

export default function AuditLogs() {
  return (
    <div className="space-y-8">
      <PageHeader title="Audit Logs" subtitle="Track, monitor, and analyze all system activities, user actions, and security events across the hospital platform" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Events" value="48,291" trend={8.5} icon={FileText} sparkline={sparkline()} />
        <StatCard title="Successful" value="46,892" trend={7.2} icon={CheckCircle} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
        <StatCard title="Failed" value="1,399" trend={-2.1} icon={XCircle} iconColor="bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400" sparkline={sparkline()} />
        <StatCard title="Unauthorized Attempts" value="87" trend={-15.0} icon={ShieldAlert} iconColor="bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400" sparkline={sparkline()} />
        <StatCard title="Admin Actions" value="1,245" trend={3.5} icon={UserCog} sparkline={sparkline()} />
        <StatCard title="Critical Events" value="12" trend={-8.0} icon={AlertTriangle} iconColor="bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400" sparkline={sparkline()} />
        <StatCard title="Login Events" value="3,456" trend={5.0} icon={LogIn} sparkline={sparkline()} />
        <StatCard title="Config Changes" value="48" trend={12.0} icon={Settings} sparkline={sparkline()} />
      </div>

      <section>
        <SectionTitle title="Audit Log Stream" subtitle="Real-time activity monitoring" />
        <div className="glass-card divide-y divide-slate-100 dark:divide-slate-800">
          {logStream.map((log) => (
            <div key={log.id} className="flex items-start gap-4 p-4 transition hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${log.status === 'success' ? 'bg-emerald-500' : log.status === 'failed' ? 'bg-red-500' : 'bg-amber-500'}`} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400">{log.timestamp}</span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium dark:bg-slate-800">{log.module}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                  {log.user} — {log.action}
                </p>
                <p className="text-xs text-slate-500">{log.ip} · {log.device}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${log.status === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Advanced Filtering" />
        <div className="glass-card flex flex-wrap gap-3 p-4">
          <input type="date" className="select-field" />
          <input type="date" className="select-field" />
          <select className="select-field"><option>All Roles</option><option>Admin</option><option>Doctor</option><option>Nurse</option></select>
          <select className="select-field"><option>All Modules</option><option>Patients</option><option>Billing</option><option>Settings</option></select>
          <select className="select-field"><option>All Status</option><option>Success</option><option>Failed</option></select>
          <input type="search" placeholder="Keyword search..." className="input-field max-w-xs" />
          <button className="btn-secondary text-xs">Reset Filters</button>
        </div>
      </section>

      <section>
        <SectionTitle title="Security Event Analytics" />
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Activity Over Time">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={[
                { day: 'Mon', count: 820 }, { day: 'Tue', count: 750 },
                { day: 'Wed', count: 890 }, { day: 'Thu', count: 810 },
                { day: 'Fri', count: 920 }, { day: 'Sat', count: 340 }, { day: 'Sun', count: 280 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Event Distribution">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={eventDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={3}>
                  {eventDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>

      <section>
        <SectionTitle title="User Activity Breakdown" />
        <DataTable
          data={userActivity}
          columns={[
            { key: 'fullName', label: 'User' },
            { key: 'role', label: 'Role' },
            { key: 'totalActions', label: 'Total Actions' },
            { key: 'failedActions', label: 'Failed' },
            { key: 'lastActive', label: 'Last Active' },
            { key: 'riskScore', label: 'Risk Score', render: (r) => (
              <span className={`font-medium ${r.riskScore === 'High' ? 'text-red-500' : 'text-emerald-600'}`}>{r.riskScore}</span>
            )},
          ]}
          searchKeys={['fullName']}
        />
      </section>

      <section>
        <SectionTitle title="Security Incident Dashboard" />
        <div className="grid gap-4 lg:grid-cols-3">
          <WidgetCard title="Active Threats">
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm dark:border-red-900/50 dark:bg-red-900/20">
              <p className="font-medium text-red-700">3 failed logins from 198.51.100.42</p>
              <p className="text-xs text-slate-500 mt-1">Last attempt: 07:30 AM</p>
              <button className="mt-2 text-xs font-medium text-red-600 hover:underline">Block IP</button>
            </div>
          </WidgetCard>
          <WidgetCard title="Blocked IPs">
            <p className="text-sm">203.0.113.55, 198.51.100.42, 192.0.2.1</p>
          </WidgetCard>
          <WidgetCard title="Monitoring Controls">
            <Toggle label="Real-time monitoring" defaultOn />
            <Toggle label="Auto-refresh logs" defaultOn />
          </WidgetCard>
        </div>
      </section>

      <section>
        <SectionTitle title="Full Audit Log Table" />
        <DataTable
          data={auditLogs}
          columns={[
            { key: 'timestamp', label: 'Timestamp' },
            { key: 'user', label: 'User' },
            { key: 'action', label: 'Action' },
            { key: 'module', label: 'Module' },
            { key: 'status', label: 'Status', status: true },
            { key: 'ip', label: 'IP' },
            { key: 'device', label: 'Device' },
          ]}
          searchKeys={['user', 'action', 'module']}
        />
      </section>

      <AlertPanel alerts={alerts} title="Audit Alerts" />
    </div>
  )
}

function Toggle({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <input type="checkbox" defaultChecked={defaultOn} className="rounded border-slate-300 text-primary-600" />
    </div>
  )
}
