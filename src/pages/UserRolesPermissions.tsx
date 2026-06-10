import { Plus, Shield, Users, Lock, UserCog, Key, Ban, CheckCircle } from 'lucide-react'
import {
  PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import PageHeader from '../components/layout/PageHeader'
import StatCard from '../components/ui/StatCard'
import ChartCard from '../components/ui/ChartCard'
import WidgetCard from '../components/ui/WidgetCard'
import DataTable from '../components/ui/DataTable'
import SectionTitle from '../components/ui/SectionTitle'
import AlertPanel from '../components/ui/AlertPanel'
import { sparkline, roles, permissions, permissionActions, auditLogs, alerts } from '../data/dummyData'

const roleColumns = [
  { key: 'name', label: 'Role Name' },
  { key: 'description', label: 'Description' },
  { key: 'usersAssigned', label: 'Users' },
  { key: 'accessLevel', label: 'Access Level' },
  { key: 'lastModified', label: 'Last Modified' },
  { key: 'status', label: 'Status', status: true },
]

const userAccessData = [
  { id: 'U-01', fullName: 'Dr. Admin', email: 'admin@medicare.com', department: 'Administration', assignedRole: 'Super Admin', accessLevel: 'Full', status: 'active', lastLogin: '2025-06-10 09:15' },
  { id: 'U-02', fullName: 'Dr. Michael Chen', email: 'mchen@medicare.com', department: 'Cardiology', assignedRole: 'Doctor', accessLevel: 'Partial', status: 'active', lastLogin: '2025-06-10 08:30' },
  { id: 'U-03', fullName: 'Nurse Patricia Moore', email: 'pmoore@medicare.com', department: 'ICU', assignedRole: 'Nurse', accessLevel: 'Partial', status: 'active', lastLogin: '2025-06-10 07:45' },
  { id: 'U-04', fullName: 'Rachel Green', email: 'rgreen@medicare.com', department: 'Administration', assignedRole: 'Receptionist', accessLevel: 'Limited', status: 'inactive', lastLogin: '2025-06-05 16:20' },
]

const userColumns = [
  { key: 'id', label: 'User ID' },
  { key: 'fullName', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'department', label: 'Department' },
  { key: 'assignedRole', label: 'Role' },
  { key: 'accessLevel', label: 'Access' },
  { key: 'status', label: 'Status', status: true },
  { key: 'lastLogin', label: 'Last Login' },
]

const roleDistribution = [
  { name: 'Doctor', value: 48, color: '#2563eb' },
  { name: 'Nurse', value: 120, color: '#10b981' },
  { name: 'Admin', value: 7, color: '#f59e0b' },
  { name: 'Other', value: 45, color: '#64748b' },
]

export default function UserRolesPermissions() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="User Roles & Permissions"
        subtitle="Manage system access, roles, privileges, and security permissions across all hospital modules"
        actions={<button className="btn-primary"><Plus className="h-4 w-4" /> Create New Role</button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Roles" value="12" trend={0} icon={Shield} sparkline={sparkline()} />
        <StatCard title="Active Users" value="892" trend={3.2} icon={Users} sparkline={sparkline()} />
        <StatCard title="Admin Users" value="7" trend={0} icon={UserCog} iconColor="bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400" sparkline={sparkline()} />
        <StatCard title="Restricted Users" value="23" trend={-5.0} icon={Ban} iconColor="bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400" sparkline={sparkline()} />
        <StatCard title="Custom Roles" value="4" trend={25.0} icon={Key} sparkline={sparkline()} />
        <StatCard title="Permissions Granted" value="1,248" trend={2.1} icon={CheckCircle} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
        <StatCard title="Restricted Perms" value="186" trend={0} icon={Lock} iconColor="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" sparkline={sparkline()} />
        <StatCard title="Compliance Score" value="96%" trend={1.5} icon={Shield} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" sparkline={sparkline()} />
      </div>

      <section>
        <SectionTitle title="Role Management System" />
        <DataTable data={roles} columns={roleColumns} searchKeys={['name', 'description']} />
      </section>

      <section>
        <SectionTitle title="Permission Matrix" subtitle="Role-based access control grid" />
        <div className="glass-card overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
                <th className="sticky left-0 bg-slate-50 px-3 py-2 text-left font-semibold dark:bg-slate-800/50">Module</th>
                {permissionActions.map((a) => (
                  <th key={a} className="px-2 py-2 text-center font-semibold text-slate-600 dark:text-slate-400">{a}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((mod) => (
                <tr key={mod} className="border-b border-slate-100 dark:border-slate-800">
                  <td className="sticky left-0 bg-white px-3 py-2 font-medium dark:bg-slate-900">{mod}</td>
                  {permissionActions.map((_, i) => (
                    <td key={i} className="px-2 py-2 text-center">
                      <input type="checkbox" defaultChecked={Math.random() > 0.3} className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <SectionTitle title="User Access Assignment" />
        <DataTable
          data={userAccessData}
          columns={userColumns}
          searchKeys={['fullName', 'email', 'id']}
          filters={[{ key: 'assignedRole', label: 'Role', options: ['Super Admin', 'Doctor', 'Nurse', 'Receptionist'] }]}
        />
      </section>

      <section>
        <SectionTitle title="Access Control Analytics" />
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Role Distribution">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={roleDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={3}>
                  {roleDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Security Activity (7 days)">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={[
                { day: 'Mon', events: 120 }, { day: 'Tue', events: 98 },
                { day: 'Wed', events: 145 }, { day: 'Thu', events: 110 },
                { day: 'Fri', events: 132 }, { day: 'Sat', events: 45 }, { day: 'Sun', events: 38 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="events" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>

      <section>
        <SectionTitle title="Security Audit Logs" />
        <DataTable
          data={auditLogs}
          columns={[
            { key: 'timestamp', label: 'Timestamp' },
            { key: 'user', label: 'User' },
            { key: 'action', label: 'Action' },
            { key: 'module', label: 'Module' },
            { key: 'status', label: 'Status', status: true },
            { key: 'ip', label: 'IP Address' },
            { key: 'device', label: 'Device' },
          ]}
          searchKeys={['user', 'action']}
        />
      </section>

      <section>
        <SectionTitle title="System Security Status" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Security Score', value: '96/100', color: 'text-emerald-600' },
            { label: 'Active Sessions', value: '342', color: 'text-primary-600' },
            { label: 'Suspicious Activities', value: '3', color: 'text-amber-600' },
            { label: 'Firewall', value: 'Active', color: 'text-emerald-600' },
          ].map((s) => (
            <div key={s.label} className="glass-card p-4 text-center">
              <p className="text-sm text-slate-500">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      <AlertPanel alerts={alerts} title="Security Alerts" />
    </div>
  )
}
