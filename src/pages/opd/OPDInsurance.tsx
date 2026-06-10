import { useState } from 'react'
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { ShieldCheck, CircleCheck as CheckCircle, Clock, Circle as XCircle, CircleAlert as AlertCircle, Download, Printer, ArrowRight, RefreshCw, Activity } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import StatCard from '../../components/ui/StatCard'
import DataTable, { Column } from '../../components/ui/DataTable'
import ChartCard from '../../components/ui/ChartCard'
import WidgetCard from '../../components/ui/WidgetCard'
import SectionTitle from '../../components/ui/SectionTitle'
import AlertPanel from '../../components/ui/AlertPanel'
import StatusBadge from '../../components/ui/StatusBadge'
import { insuranceVerifications, insuranceProviders, opdAlerts } from '../../data/opdData'
import { sparkline } from '../../data/dummyData'

interface InsuranceVerification {
  id: string
  patient: string
  provider: string
  policyNo: string
  type: string
  coverage: string
  deductible: string
  copay: string
  status: string
  verifiedAt: string
}

export default function OPDInsurance() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    patient: '',
    provider: '',
    policyNo: '',
    memberId: '',
    insuranceType: 'Private',
    coverageCategory: 'OPD',
  })

  const approved = insuranceVerifications.filter(v => v.status === 'approved').length
  const pending = insuranceVerifications.filter(v => v.status === 'pending').length
  const rejected = insuranceVerifications.filter(v => v.status === 'rejected').length

  const handleVerify = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  const verificationColumns: Column<InsuranceVerification>[] = [
    { key: 'id', label: 'ID' },
    { key: 'patient', label: 'Patient' },
    { key: 'provider', label: 'Provider' },
    { key: 'policyNo', label: 'Policy No.' },
    { key: 'type', label: 'Type' },
    { key: 'coverage', label: 'Coverage' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    { key: 'verifiedAt', label: 'Verified At' },
    {
      key: 'id',
      label: 'Actions',
      render: () => (
        <button className="rounded-lg px-2 py-1 text-xs bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900/40 dark:text-primary-400">
          View
        </button>
      ),
    },
  ]

  const claimReasons = [
    { reason: 'Policy expired', count: 3 },
    { reason: 'Insufficient coverage', count: 2 },
    { reason: 'Invalid policy', count: 1 },
    { reason: 'Non-covered service', count: 1 },
  ]

  const providerApprovalData = insuranceProviders.map(p => ({
    name: p.name,
    approved: parseInt(p.approvalRate) || 0,
  }))

  const pieData = [
    { name: 'Approved', value: approved, color: '#10b981' },
    { name: 'Pending', value: pending, color: '#f59e0b' },
    { name: 'Rejected', value: rejected, color: '#ef4444' },
  ]

  const recentActivity = [
    { time: '10:15 AM', event: 'Insurance verification approved for Sarah Johnson', icon: 'check' },
    { time: '09:45 AM', event: 'Policy expired for Jennifer Davis', icon: 'alert' },
    { time: '09:20 AM', event: 'Claim submitted for Robert Taylor', icon: 'activity' },
    { time: '08:50 AM', event: 'Coverage limit updated for Aetna', icon: 'update' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 md:p-6">
      <PageHeader
        title="Insurance Verification – OPD Services"
        subtitle="Verify patient insurance eligibility, coverage limits, and claim status before OPD consultation and billing"
      />

      {/* Stats Grid */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <StatCard
          title="Verifications Today"
          value={7}
          trend={10}
          icon={ShieldCheck}
          sparkline={sparkline()}
        />
        <StatCard
          title="Approved"
          value={approved}
          trend={15}
          icon={CheckCircle}
          iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400"
          sparkline={sparkline()}
        />
        <StatCard
          title="Pending"
          value={pending}
          trend={-5}
          icon={Clock}
          iconColor="bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400"
          sparkline={sparkline()}
        />
        <StatCard
          title="Rejected"
          value={rejected}
          trend={-20}
          icon={XCircle}
          iconColor="bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400"
          sparkline={sparkline()}
        />
      </div>

      {/* Insurance Lookup & Verification Form */}
      <div className="mb-6 glass-card p-5">
        <SectionTitle title="Insurance Lookup & Verification" />
        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Patient Name"
            className="input-field"
            value={formData.patient}
            onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
          />
          <select
            className="select-field"
            value={formData.provider}
            onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
          >
            <option value="">Select Provider</option>
            {insuranceProviders.map(p => <option key={p.name}>{p.name}</option>)}
          </select>
          <input
            type="text"
            placeholder="Policy Number"
            className="input-field"
            value={formData.policyNo}
            onChange={(e) => setFormData({ ...formData, policyNo: e.target.value })}
          />
          <input
            type="text"
            placeholder="Member ID"
            className="input-field"
            value={formData.memberId}
            onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
          />
          <select
            className="select-field"
            value={formData.insuranceType}
            onChange={(e) => setFormData({ ...formData, insuranceType: e.target.value })}
          >
            <option value="Private">Private</option>
            <option value="Government">Government</option>
            <option value="Corporate">Corporate</option>
          </select>
          <select
            className="select-field"
            value={formData.coverageCategory}
            onChange={(e) => setFormData({ ...formData, coverageCategory: e.target.value })}
          >
            <option value="OPD">OPD</option>
            <option value="Emergency">Emergency</option>
            <option value="Full">Full</option>
          </select>
        </div>
        <button onClick={handleVerify} className="btn-primary mt-4" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify Insurance'}
        </button>
      </div>

      {/* Eligibility Results Panel */}
      <div className="mb-6 glass-card p-5">
        <SectionTitle title="Eligibility Results" />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400">Status</span>
            <span className="inline-flex rounded-full px-3 py-1 text-sm font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
              Approved
            </span>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-slate-600 dark:text-slate-400">Coverage</span>
              <span className="font-semibold text-slate-900 dark:text-white">80%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
              <div className="h-2 rounded-full bg-emerald-500" style={{ width: '80%' }} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Deductible:</span>
              <span className="font-semibold text-slate-900 dark:text-white">₵500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Copay:</span>
              <span className="font-semibold text-slate-900 dark:text-white">₵150</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Policy Limit:</span>
              <span className="font-semibold text-slate-900 dark:text-white">₵50,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Remaining:</span>
              <span className="font-semibold text-emerald-600">₵42,500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Claim Pre-check & Estimation */}
      <WidgetCard
        title="Claim Pre-check & Estimation"
      >
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Consultation Fee:</span>
            <span className="font-semibold text-slate-900 dark:text-white">₵500</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Lab Coverage (80%):</span>
            <span className="font-semibold text-slate-900 dark:text-white">₵240</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Medication Coverage (70%):</span>
            <span className="font-semibold text-slate-900 dark:text-white">₵105</span>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span className="text-slate-900 dark:text-white">Insurance Covers:</span>
              <span className="text-emerald-600 dark:text-emerald-400">₵845</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-slate-900 dark:text-white">Patient Pays:</span>
              <span className="text-slate-900 dark:text-white">₵150 (Copay)</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={[
            { name: 'Consultation', insurance: 400, patient: 100 },
            { name: 'Lab', insurance: 240, patient: 60 },
            { name: 'Medication', insurance: 105, patient: 45 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(203, 213, 225)" />
            <XAxis dataKey="name" stroke="rgb(100, 116, 139)" />
            <YAxis stroke="rgb(100, 116, 139)" />
            <Tooltip contentStyle={{ backgroundColor: 'rgb(15, 23, 42)', border: 'none', borderRadius: '8px', color: 'white' }} />
            <Bar dataKey="insurance" fill="#10b981" name="Insurance" />
            <Bar dataKey="patient" fill="#f59e0b" name="Patient" />
          </BarChart>
        </ResponsiveContainer>
      </WidgetCard>

      {/* Provider Management */}
      <div className="mb-6">
        <SectionTitle title="Provider Management" subtitle="Integration status and response times" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {insuranceProviders.map(p => (
            <div key={p.name} className="glass-card p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{p.name}</p>
                  <p className={`text-xs ${p.status === 'active' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {p.status === 'active' ? '● Active' : '● Maintenance'}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm mb-3">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Approval Rate:</span>
                  <span className="font-medium text-slate-900 dark:text-white">{p.approvalRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Avg Response:</span>
                  <span className="font-medium text-slate-900 dark:text-white">{p.avgResponse}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Integration:</span>
                  <span className={`text-xs font-medium ${p.integrated ? 'text-emerald-600' : 'text-red-600'}`}>
                    {p.integrated ? 'Connected' : 'Offline'}
                  </span>
                </div>
              </div>
              <button className="btn-secondary w-full text-xs">Test Connection</button>
            </div>
          ))}
        </div>
      </div>

      {/* Verification History */}
      <div className="mb-6">
        <SectionTitle title="Verification History" />
        <DataTable data={insuranceVerifications as InsuranceVerification[]} columns={verificationColumns} searchKeys={['patient', 'provider']} pageSize={5} showActions={false} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        {/* Denied Claims Analysis */}
        <WidgetCard title="Denied Claims Analysis">
          <div className="space-y-3">
            {claimReasons.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">{item.reason}</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700" style={{ width: '120px' }}>
                    <div className="h-2 rounded-full bg-red-500" style={{ width: `${(item.count / 3) * 100}%` }} />
                  </div>
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 text-xs font-bold">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>

        {/* Real-time Status Feed */}
        <WidgetCard title="Real-time Status Feed">
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${activity.icon === 'check' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' : activity.icon === 'alert' ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'}`}>
                  {activity.icon === 'check' && <CheckCircle className="h-4 w-4" />}
                  {activity.icon === 'alert' && <AlertCircle className="h-4 w-4" />}
                  {activity.icon === 'activity' && <Activity className="h-4 w-4" />}
                  {activity.icon === 'update' && <RefreshCw className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900 dark:text-white">{activity.event}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>

      {/* Quick Actions */}
      <div className="mb-6 glass-card p-5">
        <SectionTitle title="Quick Actions" />
        <div className="flex flex-wrap gap-3">
          <button className="btn-primary text-sm"><RefreshCw className="h-4 w-4" /> Re-run Verification</button>
          <button className="btn-primary text-sm"><ArrowRight className="h-4 w-4" /> Proceed to Billing</button>
          <button className="btn-primary text-sm"><CheckCircle className="h-4 w-4" /> Start Consultation</button>
          <button className="btn-secondary text-sm"><Download className="h-4 w-4" /> Generate Report</button>
          <button className="btn-secondary text-sm"><Printer className="h-4 w-4" /> Print Summary</button>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <ChartCard title="Coverage Status Distribution" subtitle="Verification outcomes">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'rgb(15, 23, 42)', border: 'none', borderRadius: '8px', color: 'white' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Provider Approval Rates" subtitle="Performance comparison">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={providerApprovalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(203, 213, 225)" />
              <XAxis dataKey="name" stroke="rgb(100, 116, 139)" />
              <YAxis stroke="rgb(100, 116, 139)" />
              <Tooltip contentStyle={{ backgroundColor: 'rgb(15, 23, 42)', border: 'none', borderRadius: '8px', color: 'white' }} />
              <Bar dataKey="approved" fill="#3b82f6" name="Approval Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Alerts */}
      <AlertPanel alerts={opdAlerts} />
    </div>
  )
}
