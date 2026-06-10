import { Server, Users, Shield, Bell, Plug, Database, Gauge } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import PageHeader from '../components/layout/PageHeader'
import StatCard from '../components/ui/StatCard'
import ChartCard from '../components/ui/ChartCard'
import WidgetCard from '../components/ui/WidgetCard'
import SectionTitle from '../components/ui/SectionTitle'
import { sparkline } from '../data/dummyData'

function Toggle({ label, description, defaultOn = false }: { label: string; description?: string; defaultOn?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-700">
      <div>
        <p className="text-sm font-medium text-slate-900 dark:text-white">{label}</p>
        {description && <p className="text-xs text-slate-500">{description}</p>}
      </div>
      <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" defaultChecked={defaultOn} className="peer sr-only" />
        <div className="h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-primary-600 peer-checked:after:translate-x-full dark:bg-slate-700" />
      </label>
    </div>
  )
}

function SettingInput({ label, value, type = 'text' }: { label: string; value: string; type?: string }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <input type={type} defaultValue={value} className="input-field" />
    </div>
  )
}

const perfData = [
  { time: '00:00', cpu: 35, memory: 52 },
  { time: '04:00', cpu: 28, memory: 48 },
  { time: '08:00', cpu: 62, memory: 68 },
  { time: '12:00', cpu: 78, memory: 72 },
  { time: '16:00', cpu: 65, memory: 70 },
  { time: '20:00', cpu: 45, memory: 58 },
]

const integrations = [
  { name: 'Laboratory System (LIS)', status: 'connected' },
  { name: 'Radiology System (RIS)', status: 'connected' },
  { name: 'Pharmacy System', status: 'connected' },
  { name: 'BlueCross Insurance API', status: 'connected' },
  { name: 'Stripe Payment Gateway', status: 'connected' },
  { name: 'Twilio SMS Gateway', status: 'disconnected' },
  { name: 'SendGrid Email', status: 'connected' },
]

export default function SystemSettings() {
  return (
    <div className="space-y-8">
      <PageHeader title="System Settings" subtitle="Configure global hospital system preferences, security policies, integrations, and operational rules" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="System Status" value="Online" trend={0} icon={Server} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
        <StatCard title="Users Online" value="342" trend={5.2} icon={Users} sparkline={sparkline()} />
        <StatCard title="Uptime" value="99.97%" trend={0.1} icon={Gauge} sparkline={sparkline()} />
        <StatCard title="Last Backup" value="2h ago" trend={0} icon={Database} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
        <StatCard title="Security Level" value="High" trend={0} icon={Shield} sparkline={sparkline()} />
        <StatCard title="API Health" value="Healthy" trend={0} icon={Plug} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
        <StatCard title="Database" value="Healthy" trend={0} icon={Database} sparkline={sparkline()} />
        <StatCard title="Notifications" value="Active" trend={0} icon={Bell} sparkline={sparkline()} />
      </div>

      <div className="glass-card p-4">
        <input type="search" placeholder="Search settings..." className="input-field max-w-md" />
        <div className="mt-3 flex flex-wrap gap-2">
          {['General', 'Security', 'Notifications', 'Integrations', 'Backup', 'Performance'].map((s) => (
            <button key={s} className="rounded-lg bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">{s}</button>
          ))}
        </div>
      </div>

      <section>
        <SectionTitle title="General System Configuration" />
        <div className="glass-card grid gap-4 p-5 sm:grid-cols-2">
          <SettingInput label="Hospital Name" value="MediCare Hospital System" />
          <SettingInput label="Time Zone" value="America/New_York" />
          <SettingInput label="Language" value="English (US)" />
          <SettingInput label="Currency" value="GHS (₵)" />
          <SettingInput label="Date Format" value="MM/DD/YYYY" />
          <SettingInput label="Default Branch" value="Main Campus" />
        </div>
      </section>

      <section>
        <SectionTitle title="Authentication & Security" />
        <div className="grid gap-3 sm:grid-cols-2">
          <Toggle label="Two-Factor Authentication (2FA)" description="Require 2FA for all admin users" defaultOn />
          <Toggle label="Force Password Reset" description="Every 90 days" defaultOn />
          <Toggle label="Suspicious Login Detection" defaultOn />
          <Toggle label="Device Login Tracking" defaultOn />
          <SettingInput label="Session Timeout (minutes)" value="30" type="number" />
          <SettingInput label="Max Login Attempts" value="5" type="number" />
        </div>
      </section>

      <section>
        <SectionTitle title="Notification Settings" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {['Patient Updates', 'Billing Alerts', 'Emergency Alerts', 'Staff Notifications', 'System Alerts', 'Appointment Reminders'].map((n) => (
            <Toggle key={n} label={n} defaultOn />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Integration Settings" />
        <div className="space-y-2">
          {integrations.map((int) => (
            <div key={int.name} className="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <Plug className="h-5 w-5 text-slate-400" />
                <span className="text-sm font-medium">{int.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium ${int.status === 'connected' ? 'text-emerald-600' : 'text-red-500'}`}>
                  {int.status === 'connected' ? '● Connected' : '● Disconnected'}
                </span>
                <button className="btn-secondary text-xs py-1 px-2">Test</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Data & Backup Settings" />
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="glass-card space-y-3 p-5">
            <Toggle label="Automatic Daily Backup" defaultOn />
            <SettingInput label="Backup Time" value="02:00 AM" type="time" />
            <SettingInput label="Retention Period (days)" value="30" type="number" />
            <button className="btn-primary mt-2">Trigger Manual Backup</button>
          </div>
          <WidgetCard title="Storage Usage">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">68%</p>
              <p className="text-sm text-slate-500">340 GB / 500 GB used</p>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-full w-[68%] rounded-full bg-primary-600" />
              </div>
            </div>
          </WidgetCard>
        </div>
      </section>

      <section>
        <SectionTitle title="Performance & Optimization" />
        <ChartCard title="System Load Monitoring">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={perfData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="cpu" stroke="#2563eb" strokeWidth={2} name="CPU %" />
              <Line type="monotone" dataKey="memory" stroke="#10b981" strokeWidth={2} name="Memory %" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section>
        <SectionTitle title="Maintenance Mode" />
        <div className="glass-card p-5">
          <Toggle label="Enable Maintenance Mode" description="Restrict access to super admins only" />
          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium">Maintenance Message</label>
            <textarea
              defaultValue="System is undergoing scheduled maintenance. Expected completion: 2 hours."
              className="input-field h-20 resize-none"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
