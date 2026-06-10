import { useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Check, Upload, X, Eye, EyeOff, Copy, Plus,
  User, Briefcase, Stethoscope, Shield, DollarSign, Clock, FileText,
  Heart, ClipboardCheck, Camera, AlertCircle, Loader2,
} from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import { supabase } from '../lib/supabase'

// ── Types ──────────────────────────────────────────────────────────────
interface FormData {
  fullName: string; dateOfBirth: string; gender: string; nationalId: string;
  phone: string; email: string; address: string;
  emergencyContactName: string; emergencyContactNumber: string; photoUrl: string;
  role: string; department: string; branch: string; employmentType: string;
  joiningDate: string; shiftSchedule: string;
  medicalLicenseNumber: string; specialization: string; yearsOfExperience: string;
  qualifications: string; certifications: string[]; registrationBody: string;
  verificationStatus: string;
  systemUsername: string; systemPasswordTemp: string; accessRole: string;
  accountStatus: string; twoFactorEnabled: boolean; passwordResetOnLogin: boolean;
  baseSalary: string; housingAllowance: string; transportAllowance: string;
  medicalAllowance: string; overtimeRate: string;
  bankAccount: string; taxId: string; paymentFrequency: string;
  workDays: string[]; emergencyDutyEligible: boolean; rotationSchedule: boolean;
  medicalFitnessStatus: string; vaccinationRecords: string;
  backgroundCheckStatus: string; complianceApproval: string;
  documents: string[];
}

const initialForm: FormData = {
  fullName: '', dateOfBirth: '', gender: '', nationalId: '',
  phone: '', email: '', address: '',
  emergencyContactName: '', emergencyContactNumber: '', photoUrl: '',
  role: '', department: '', branch: '', employmentType: 'Full-time',
  joiningDate: new Date().toISOString().split('T')[0], shiftSchedule: 'Day',
  medicalLicenseNumber: '', specialization: '', yearsOfExperience: '',
  qualifications: '', certifications: [], registrationBody: '',
  verificationStatus: 'pending',
  systemUsername: '', systemPasswordTemp: '', accessRole: '',
  accountStatus: 'active', twoFactorEnabled: false, passwordResetOnLogin: true,
  baseSalary: '', housingAllowance: '0', transportAllowance: '0',
  medicalAllowance: '0', overtimeRate: '0',
  bankAccount: '', taxId: '', paymentFrequency: 'Monthly',
  workDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  emergencyDutyEligible: false, rotationSchedule: false,
  medicalFitnessStatus: '', vaccinationRecords: '',
  backgroundCheckStatus: 'pending', complianceApproval: 'pending',
  documents: [],
}

// ── Constants ──────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: 'Basic Info', icon: User },
  { id: 2, label: 'Job & Role', icon: Briefcase },
  { id: 3, label: 'Professional', icon: Stethoscope },
  { id: 4, label: 'System Access', icon: Shield },
  { id: 5, label: 'Compensation', icon: DollarSign },
  { id: 6, label: 'Schedule', icon: Clock },
  { id: 7, label: 'Documents', icon: FileText },
  { id: 8, label: 'Health & Compliance', icon: Heart },
  { id: 9, label: 'Review & Submit', icon: ClipboardCheck },
]

const ROLES = ['Doctor', 'Nurse', 'Pharmacist', 'Lab Technician', 'Admin Staff', 'Receptionist', 'Accountant', 'Radiology Tech', 'Security Officer', 'Head Nurse']
const DEPARTMENTS = ['ICU', 'Emergency', 'Surgery', 'Laboratory', 'Pharmacy', 'Radiology', 'Administration', 'Security', 'Cardiology', 'Neurology', 'Pediatrics', 'Maternity', 'General']
const BRANCHES = ['Main Campus', 'East Wing', 'North Branch', 'West Clinic']
const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Contract', 'Intern']
const SHIFTS = ['Day', 'Evening', 'Night', 'Morning', 'Rotating', 'On-call']
const WORK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const SPECIALIZATIONS = ['Cardiology', 'Neurology', 'Pediatrics', 'Emergency Medicine', 'Surgery', 'Obstetrics', 'Intensive Care', 'General Practice', 'Radiology', 'Oncology']
const ACCESS_ROLES = ['Super Admin', 'Hospital Admin', 'Doctor', 'Nurse', 'Receptionist', 'Pharmacist', 'Limited']
const DOC_TYPES = ['National ID', 'Academic Certificate', 'Professional License', 'Passport Photo', 'Employment Contract']
const MEDICAL_ROLES = ['Doctor', 'Nurse', 'Pharmacist', 'Lab Technician', 'Radiology Tech', 'Head Nurse']

// ── Helpers ────────────────────────────────────────────────────────────
function generateStaffId() {
  return `S-${300 + Math.floor(Math.random() * 700)}`
}
function generateUsername(name: string) {
  return name.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z.]/g, '') + Math.floor(Math.random() * 100)
}
function generatePassword() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$'
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}
function formatCurrency(val: string) {
  const n = parseFloat(val)
  return isNaN(n) ? '$0.00' : n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

// ── Reusable Input ─────────────────────────────────────────────────────
function FormField({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}{required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 flex items-center gap-1 text-xs text-red-500"><AlertCircle className="h-3 w-3" />{error}</p>}
    </div>
  )
}

function TextInput({ value, onChange, placeholder, type = 'text' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="input-field" />
}

function SelectInput({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder?: string
}) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} className="select-field w-full">
      <option value="">{placeholder || 'Select...'}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

function ToggleInput({ checked, onChange, label }: {
  checked: boolean; onChange: (v: boolean) => void; label: string
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-700">
      <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
      <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="peer sr-only" />
        <div className="h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-primary-600 peer-checked:after:translate-x-full dark:bg-slate-700" />
      </label>
    </div>
  )
}

function ChipSelect({ selected, onToggle, options }: {
  selected: string[]; onToggle: (v: string) => void; options: string[]
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => (
        <button key={o} type="button" onClick={() => onToggle(o)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            selected.includes(o)
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
          }`}>
          {o}
        </button>
      ))}
    </div>
  )
}

// ── Section wrapper ────────────────────────────────────────────────────
function SectionCard({ title, icon: Icon, children }: {
  title: string; icon: React.ElementType; children: React.ReactNode
}) {
  return (
    <div className="glass-card p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-primary-100 p-2.5 dark:bg-primary-900/50">
          <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
      </div>
      {children}
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────
export default function AddNewEmployee() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>({ ...initialForm })
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState('')

  const set = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm(f => ({ ...f, [key]: value }))
    setErrors(e => { const next = { ...e }; delete next[key]; return next })
  }, [])

  const isMedical = useMemo(() => MEDICAL_ROLES.includes(form.role), [form.role])

  const totalCompensation = useMemo(() => {
    const base = parseFloat(form.baseSalary) || 0
    const housing = parseFloat(form.housingAllowance) || 0
    const transport = parseFloat(form.transportAllowance) || 0
    const medical = parseFloat(form.medicalAllowance) || 0
    return base + housing + transport + medical
  }, [form.baseSalary, form.housingAllowance, form.transportAllowance, form.medicalAllowance])

  const toggleCertification = useCallback((v: string) => {
    setForm(f => ({
      ...f,
      certifications: f.certifications.includes(v)
        ? f.certifications.filter(c => c !== v)
        : [...f.certifications, v]
    }))
  }, [])

  const toggleWorkDay = useCallback((d: string) => {
    setForm(f => ({
      ...f,
      workDays: f.workDays.includes(d) ? f.workDays.filter(w => w !== d) : [...f.workDays, d]
    }))
  }, [])

  const toggleDocument = useCallback((d: string) => {
    setForm(f => ({
      ...f,
      documents: f.documents.includes(d) ? f.documents.filter(x => x !== d) : [...f.documents, d]
    }))
  }, [])

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  const validate = useCallback((): boolean => {
    const e: Record<string, string> = {}
    if (step === 1) {
      if (!form.fullName.trim()) e.fullName = 'Full name is required'
      if (!form.gender) e.gender = 'Gender is required'
      if (!form.phone.trim()) e.phone = 'Phone number is required'
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format'
    }
    if (step === 2) {
      if (!form.role) e.role = 'Job role is required'
      if (!form.department) e.department = 'Department is required'
      if (!form.branch) e.branch = 'Branch is required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }, [step, form])

  const nextStep = () => { if (validate()) setStep(s => Math.min(s + 1, STEPS.length)) }
  const prevStep = () => setStep(s => Math.max(s - 1, 1))

  const handleSubmit = async (asDraft: boolean) => {
    setSubmitting(true)
    setSubmitError('')
    try {
      const row: Record<string, unknown> = {
        full_name: form.fullName,
        role: form.role,
        department: form.department,
        branch: form.branch,
        contact: form.phone,
        employment_type: form.employmentType,
        shift_schedule: form.shiftSchedule,
        status: asDraft ? 'active' : form.accountStatus === 'suspended' ? 'on_leave' : 'active',
        joining_date: form.joiningDate || new Date().toISOString().split('T')[0],
        date_of_birth: form.dateOfBirth || null,
        gender: form.gender || null,
        national_id: form.nationalId || null,
        email: form.email || null,
        address: form.address || null,
        emergency_contact_name: form.emergencyContactName || null,
        emergency_contact_number: form.emergencyContactNumber || null,
        photo_url: form.photoUrl || null,
        medical_license_number: form.medicalLicenseNumber || null,
        specialization: form.specialization || null,
        years_of_experience: form.yearsOfExperience ? parseInt(form.yearsOfExperience) : null,
        qualifications: form.qualifications || null,
        certifications: form.certifications.length ? form.certifications : null,
        registration_body: form.registrationBody || null,
        verification_status: form.verificationStatus,
        system_username: form.systemUsername || null,
        system_password_temp: form.systemPasswordTemp || null,
        access_role: form.accessRole || null,
        account_status: form.accountStatus,
        two_factor_enabled: form.twoFactorEnabled,
        password_reset_on_login: form.passwordResetOnLogin,
        base_salary: form.baseSalary ? parseFloat(form.baseSalary) : null,
        housing_allowance: form.housingAllowance ? parseFloat(form.housingAllowance) : 0,
        transport_allowance: form.transportAllowance ? parseFloat(form.transportAllowance) : 0,
        medical_allowance: form.medicalAllowance ? parseFloat(form.medicalAllowance) : 0,
        overtime_rate: form.overtimeRate ? parseFloat(form.overtimeRate) : 0,
        bank_account: form.bankAccount || null,
        tax_id: form.taxId || null,
        payment_frequency: form.paymentFrequency,
        work_days: form.workDays,
        emergency_duty_eligible: form.emergencyDutyEligible,
        rotation_schedule: form.rotationSchedule,
        medical_fitness_status: form.medicalFitnessStatus || null,
        vaccination_records: form.vaccinationRecords || null,
        background_check_status: form.backgroundCheckStatus,
        compliance_approval: form.complianceApproval,
        documents: form.documents.length ? form.documents : null,
        draft: asDraft,
      }
      const { error } = await supabase.from('staff').insert([row])
      if (error) throw error
      navigate('/staff')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to create employee')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Render ──────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Employee"
        subtitle="Onboard new hospital staff including doctors, nurses, technicians, and administrative personnel"
        actions={
          <button onClick={() => navigate('/staff')} className="btn-secondary">
            <ArrowLeft className="h-4 w-4" /> Back to Staff
          </button>
        }
      />

      {/* Step indicator */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between gap-1 overflow-x-auto">
          {STEPS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setStep(id)}
              className={`group flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                step === id
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
                  : step > id
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                  : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}>
              {step > id ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{id}</span>
            </button>
          ))}
        </div>
      </div>

      {submitError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
          <AlertCircle className="mr-2 inline h-4 w-4" />{submitError}
        </div>
      )}

      {/* ── Step 1: Basic Info ────────────────────────────── */}
      {step === 1 && (
        <SectionCard title="Employee Basic Information" icon={User}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Photo */}
            <div className="sm:col-span-2 lg:col-span-3">
              <div className="flex items-center gap-4">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 dark:border-slate-600 dark:bg-slate-800">
                  {form.photoUrl ? (
                    <img src={form.photoUrl} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <Camera className="h-6 w-6 text-slate-400" />
                  )}
                </div>
                <div>
                  <FormField label="Profile Photo">
                    <div className="flex gap-2">
                      <input type="text" value={form.photoUrl} onChange={e => set('photoUrl', e.target.value)}
                        placeholder="Image URL (e.g. https://...)" className="input-field max-w-sm" />
                      <button type="button" className="btn-secondary text-xs"><Upload className="h-3.5 w-3.5" />Upload</button>
                    </div>
                  </FormField>
                </div>
              </div>
            </div>

            <FormField label="Full Name" required error={errors.fullName}>
              <TextInput value={form.fullName} onChange={v => set('fullName', v)} placeholder="Dr. Jane Smith" />
            </FormField>
            <FormField label="Date of Birth">
              <TextInput type="date" value={form.dateOfBirth} onChange={v => set('dateOfBirth', v)} />
            </FormField>
            <FormField label="Gender" required error={errors.gender}>
              <SelectInput value={form.gender} onChange={v => set('gender', v)} options={['Male', 'Female', 'Other']} placeholder="Select gender" />
            </FormField>
            <FormField label="National ID / Hospital ID">
              <div className="flex gap-2">
                <TextInput value={form.nationalId} onChange={v => set('nationalId', v)} placeholder="ID number" />
                <button type="button" onClick={() => set('nationalId', generateStaffId())} className="btn-secondary shrink-0 text-xs whitespace-nowrap"><Plus className="h-3.5 w-3.5" />Auto</button>
              </div>
            </FormField>
            <FormField label="Phone Number" required error={errors.phone}>
              <TextInput type="tel" value={form.phone} onChange={v => set('phone', v)} placeholder="+1 555-0100" />
            </FormField>
            <FormField label="Email Address" error={errors.email}>
              <TextInput type="email" value={form.email} onChange={v => set('email', v)} placeholder="jane.smith@medicare.com" />
            </FormField>
            <FormField label="Residential Address">
              <TextInput value={form.address} onChange={v => set('address', v)} placeholder="123 Health Ave, New York" />
            </FormField>
            <FormField label="Emergency Contact Name">
              <TextInput value={form.emergencyContactName} onChange={v => set('emergencyContactName', v)} placeholder="John Smith" />
            </FormField>
            <FormField label="Emergency Contact Number">
              <TextInput type="tel" value={form.emergencyContactNumber} onChange={v => set('emergencyContactNumber', v)} placeholder="+1 555-0199" />
            </FormField>
          </div>
        </SectionCard>
      )}

      {/* ── Step 2: Job & Role ────────────────────────────── */}
      {step === 2 && (
        <SectionCard title="Job & Role Assignment" icon={Briefcase}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FormField label="Job Role" required error={errors.role}>
              <SelectInput value={form.role} onChange={v => set('role', v)} options={ROLES} placeholder="Select role" />
            </FormField>
            <FormField label="Department" required error={errors.department}>
              <SelectInput value={form.department} onChange={v => set('department', v)} options={DEPARTMENTS} placeholder="Select department" />
            </FormField>
            <FormField label="Branch Assignment" required error={errors.branch}>
              <SelectInput value={form.branch} onChange={v => set('branch', v)} options={BRANCHES} placeholder="Select branch" />
            </FormField>
            <FormField label="Employment Type">
              <SelectInput value={form.employmentType} onChange={v => set('employmentType', v)} options={EMPLOYMENT_TYPES} />
            </FormField>
            <FormField label="Join Date">
              <TextInput type="date" value={form.joiningDate} onChange={v => set('joiningDate', v)} />
            </FormField>
            <FormField label="Work Shift">
              <SelectInput value={form.shiftSchedule} onChange={v => set('shiftSchedule', v)} options={SHIFTS} />
            </FormField>
          </div>
          {form.role && (
            <div className="mt-4 rounded-xl border border-primary-200 bg-primary-50/50 p-4 dark:border-primary-900/30 dark:bg-primary-900/10">
              <p className="text-sm font-medium text-primary-700 dark:text-primary-400">Role: {form.role}</p>
              <p className="mt-1 text-xs text-slate-500">
                {isMedical
                  ? 'Medical staff — professional details and license verification will be required in the next step.'
                  : 'Non-medical role — professional license section will be skipped.'}
              </p>
            </div>
          )}
        </SectionCard>
      )}

      {/* ── Step 3: Professional Details ────────────────────── */}
      {step === 3 && (
        <SectionCard title="Professional Details" icon={Stethoscope}>
          {isMedical ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FormField label="Medical License Number">
                <TextInput value={form.medicalLicenseNumber} onChange={v => set('medicalLicenseNumber', v)} placeholder="ML-XXXXX" />
              </FormField>
              <FormField label="Specialization">
                {form.role === 'Doctor' ? (
                  <SelectInput value={form.specialization} onChange={v => set('specialization', v)} options={SPECIALIZATIONS} placeholder="Select specialization" />
                ) : (
                  <TextInput value={form.specialization} onChange={v => set('specialization', v)} placeholder="Enter specialization" />
                )}
              </FormField>
              <FormField label="Years of Experience">
                <TextInput type="number" value={form.yearsOfExperience} onChange={v => set('yearsOfExperience', v)} placeholder="0" />
              </FormField>
              <FormField label="Qualifications">
                <TextInput value={form.qualifications} onChange={v => set('qualifications', v)} placeholder="MD, PhD, etc." />
              </FormField>
              <div className="sm:col-span-2">
                <FormField label="Certifications">
                  <ChipSelect selected={form.certifications} onToggle={toggleCertification}
                    options={['BLS', 'ACLS', 'PALS', 'CPR', 'HIPAA', 'OSHA', 'Infection Control', 'Trauma Care']} />
                </FormField>
              </div>
              <FormField label="Registration Body">
                <TextInput value={form.registrationBody} onChange={v => set('registrationBody', v)} placeholder="e.g. American Medical Association" />
              </FormField>
              <div className="sm:col-span-2 lg:col-span-3">
                <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Certificate Upload</p>
                      <p className="text-xs text-slate-500">Upload professional certificates (PDF, JPG, PNG)</p>
                    </div>
                    <button type="button" className="btn-secondary text-xs"><Upload className="h-3.5 w-3.5" />Upload Files</button>
                  </div>
                </div>
              </div>
              <FormField label="Verification Status">
                <SelectInput value={form.verificationStatus} onChange={v => set('verificationStatus', v)}
                  options={['pending', 'verified', 'rejected']} />
              </FormField>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                <Briefcase className="h-8 w-8 text-slate-400" />
              </div>
              <p className="mt-4 font-medium text-slate-900 dark:text-white">No professional details required</p>
              <p className="mt-1 text-sm text-slate-500">This section is for medical staff only. You can skip to the next step.</p>
            </div>
          )}
        </SectionCard>
      )}

      {/* ── Step 4: System Access ────────────────────────────── */}
      {step === 4 && (
        <SectionCard title="Login & System Access Setup" icon={Shield}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FormField label="System Username">
              <div className="flex gap-2">
                <TextInput value={form.systemUsername} onChange={v => set('systemUsername', v)} placeholder="Auto-generated" />
                <button type="button" onClick={() => set('systemUsername', generateUsername(form.fullName || 'employee'))}
                  className="btn-secondary shrink-0 text-xs whitespace-nowrap"><Plus className="h-3.5 w-3.5" />Auto</button>
              </div>
            </FormField>
            <FormField label="Temporary Password">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input type={showPassword ? 'text' : 'password'} value={form.systemPasswordTemp}
                    onChange={e => set('systemPasswordTemp', e.target.value)} placeholder="Auto-generated" className="input-field pr-10" />
                  <button type="button" onClick={() => setShowPassword(p => !p)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <button type="button" onClick={() => { const pw = generatePassword(); set('systemPasswordTemp', pw) }}
                  className="btn-secondary shrink-0 text-xs whitespace-nowrap"><Plus className="h-3.5 w-3.5" />Auto</button>
                <button type="button" onClick={() => copyToClipboard(form.systemPasswordTemp)}
                  className="btn-secondary shrink-0 text-xs" disabled={!form.systemPasswordTemp}>
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </FormField>
            <FormField label="Access Role">
              <SelectInput value={form.accessRole} onChange={v => set('accessRole', v)} options={ACCESS_ROLES} placeholder="Assign access level" />
            </FormField>
            <FormField label="Account Status">
              <SelectInput value={form.accountStatus} onChange={v => set('accountStatus', v)}
                options={['active', 'suspended', 'pending_verification']} />
            </FormField>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <ToggleInput label="Two-Factor Authentication" checked={form.twoFactorEnabled} onChange={v => set('twoFactorEnabled', v)} />
            <ToggleInput label="Password Reset on First Login" checked={form.passwordResetOnLogin} onChange={v => set('passwordResetOnLogin', v)} />
          </div>
        </SectionCard>
      )}

      {/* ── Step 5: Compensation ────────────────────────────── */}
      {step === 5 && (
        <SectionCard title="Salary & Compensation Details" icon={DollarSign}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FormField label="Base Salary">
              <TextInput type="number" value={form.baseSalary} onChange={v => set('baseSalary', v)} placeholder="0.00" />
            </FormField>
            <FormField label="Housing Allowance">
              <TextInput type="number" value={form.housingAllowance} onChange={v => set('housingAllowance', v)} placeholder="0" />
            </FormField>
            <FormField label="Transport Allowance">
              <TextInput type="number" value={form.transportAllowance} onChange={v => set('transportAllowance', v)} placeholder="0" />
            </FormField>
            <FormField label="Medical Allowance">
              <TextInput type="number" value={form.medicalAllowance} onChange={v => set('medicalAllowance', v)} placeholder="0" />
            </FormField>
            <FormField label="Overtime Rate (/hr)">
              <TextInput type="number" value={form.overtimeRate} onChange={v => set('overtimeRate', v)} placeholder="0" />
            </FormField>
            <FormField label="Payment Frequency">
              <SelectInput value={form.paymentFrequency} onChange={v => set('paymentFrequency', v)} options={['Monthly', 'Bi-weekly']} />
            </FormField>
            <FormField label="Bank Account">
              <TextInput value={form.bankAccount} onChange={v => set('bankAccount', v)} placeholder="XXXX-XXXX-XXXX" />
            </FormField>
            <FormField label="Tax ID">
              <TextInput value={form.taxId} onChange={v => set('taxId', v)} placeholder="SSN or Tax ID" />
            </FormField>
          </div>
          {/* Salary breakdown card */}
          <div className="mt-5 rounded-xl border border-primary-200 bg-primary-50/50 p-5 dark:border-primary-900/30 dark:bg-primary-900/10">
            <h3 className="text-sm font-semibold text-primary-700 dark:text-primary-400">Salary Breakdown Preview</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Base Salary</span><span className="font-medium">{formatCurrency(form.baseSalary)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Housing Allowance</span><span className="font-medium">{formatCurrency(form.housingAllowance)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Transport Allowance</span><span className="font-medium">{formatCurrency(form.transportAllowance)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Medical Allowance</span><span className="font-medium">{formatCurrency(form.medicalAllowance)}</span></div>
              <div className="border-t border-primary-200 pt-2 dark:border-primary-800">
                <div className="flex justify-between text-base font-bold">
                  <span className="text-primary-700 dark:text-primary-400">Total Compensation</span>
                  <span className="text-primary-700 dark:text-primary-400">{formatCurrency(String(totalCompensation))}</span>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>
      )}

      {/* ── Step 6: Schedule ──────────────────────────────── */}
      {step === 6 && (
        <SectionCard title="Shift & Schedule Assignment" icon={Clock}>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Default Shift">
              <SelectInput value={form.shiftSchedule} onChange={v => set('shiftSchedule', v)} options={SHIFTS} />
            </FormField>
            <FormField label="Work Days">
              <ChipSelect selected={form.workDays} onToggle={toggleWorkDay} options={WORK_DAYS} />
            </FormField>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <ToggleInput label="Emergency Duty Eligible" checked={form.emergencyDutyEligible} onChange={v => set('emergencyDutyEligible', v)} />
            <ToggleInput label="Rotation Schedule" checked={form.rotationSchedule} onChange={v => set('rotationSchedule', v)} />
          </div>
          {/* Weekly preview */}
          <div className="mt-5 grid grid-cols-7 gap-2">
            {WORK_DAYS.map(d => (
              <div key={d} className={`rounded-xl p-3 text-center text-xs font-medium transition ${
                form.workDays.includes(d)
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
              }`}>
                <p>{d}</p>
                <p className="mt-1 text-[10px]">{form.workDays.includes(d) ? form.shiftSchedule : 'Off'}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* ── Step 7: Documents ──────────────────────────────── */}
      {step === 7 && (
        <SectionCard title="Document Upload Center" icon={FileText}>
          <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">Select and upload required employee documents</p>
          <div className="space-y-3">
            {DOC_TYPES.map(doc => (
              <div key={doc} className={`flex items-center justify-between rounded-xl border p-4 transition ${
                form.documents.includes(doc)
                  ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/30 dark:bg-emerald-900/10'
                  : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => toggleDocument(doc)}
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition ${
                      form.documents.includes(doc)
                        ? 'border-emerald-500 bg-emerald-500 text-white'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}>
                    {form.documents.includes(doc) && <Check className="h-3.5 w-3.5" />}
                  </button>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{doc}</p>
                    <p className="text-xs text-slate-500">PDF, JPG, PNG accepted</p>
                  </div>
                </div>
                <button type="button" className="btn-secondary text-xs" disabled={!form.documents.includes(doc)}>
                  <Upload className="h-3.5 w-3.5" />Upload
                </button>
              </div>
            ))}
          </div>
          {/* Upload progress mock */}
          <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-8 text-center dark:border-slate-600 dark:bg-slate-800/30">
            <Upload className="mx-auto h-8 w-8 text-slate-400" />
            <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">Drag & drop files here</p>
            <p className="text-xs text-slate-500">or click to browse</p>
          </div>
        </SectionCard>
      )}

      {/* ── Step 8: Health & Compliance ─────────────────────── */}
      {step === 8 && (
        <SectionCard title="Health & Compliance" icon={Heart}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FormField label="Medical Fitness Status">
              <SelectInput value={form.medicalFitnessStatus} onChange={v => set('medicalFitnessStatus', v)}
                options={['Fit', 'Unfit', 'Pending Assessment', 'Exempt']} placeholder="Select status" />
            </FormField>
            <FormField label="Vaccination Records">
              <TextInput value={form.vaccinationRecords} onChange={v => set('vaccinationRecords', v)} placeholder="e.g. COVID-19, Hep B, Flu" />
            </FormField>
            <FormField label="Background Check Status">
              <SelectInput value={form.backgroundCheckStatus} onChange={v => set('backgroundCheckStatus', v)}
                options={['pending', 'passed', 'failed']} />
            </FormField>
            <FormField label="Compliance Approval">
              <SelectInput value={form.complianceApproval} onChange={v => set('complianceApproval', v)}
                options={['pending', 'approved', 'rejected']} />
            </FormField>
          </div>
          {/* Compliance summary */}
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Medical Fitness', value: form.medicalFitnessStatus || 'Not Set', ok: form.medicalFitnessStatus === 'Fit' },
              { label: 'Background Check', value: form.backgroundCheckStatus, ok: form.backgroundCheckStatus === 'passed' },
              { label: 'Compliance', value: form.complianceApproval, ok: form.complianceApproval === 'approved' },
            ].map(c => (
              <div key={c.label} className="rounded-xl border border-slate-200 p-4 text-center dark:border-slate-700">
                <p className="text-xs text-slate-500">{c.label}</p>
                <p className={`mt-1 text-lg font-bold capitalize ${c.ok ? 'text-emerald-600' : c.value === 'pending' ? 'text-amber-600' : 'text-slate-400'}`}>
                  {c.value}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* ── Step 9: Review & Submit ─────────────────────────── */}
      {step === 9 && (
        <div className="space-y-4">
          <SectionCard title="Employee Profile Summary" icon={ClipboardCheck}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Photo + Name */}
              <div className="flex items-center gap-4 sm:col-span-2 lg:col-span-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-primary-100 dark:bg-primary-900/50">
                  {form.photoUrl ? <img src={form.photoUrl} alt="" className="h-full w-full object-cover" />
                    : <User className="h-6 w-6 text-primary-600" />}
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{form.fullName || 'Unnamed Employee'}</p>
                  <p className="text-sm text-slate-500">{form.role || 'No role assigned'} · {form.department || 'No department'}</p>
                </div>
              </div>

              {[
                { label: 'Gender', value: form.gender },
                { label: 'Date of Birth', value: form.dateOfBirth },
                { label: 'National ID', value: form.nationalId },
                { label: 'Phone', value: form.phone },
                { label: 'Email', value: form.email },
                { label: 'Branch', value: form.branch },
                { label: 'Employment Type', value: form.employmentType },
                { label: 'Join Date', value: form.joiningDate },
                { label: 'Shift', value: form.shiftSchedule },
                { label: 'Work Days', value: form.workDays.join(', ') },
                { label: 'Access Role', value: form.accessRole },
                { label: 'Account Status', value: form.accountStatus },
                { label: '2FA', value: form.twoFactorEnabled ? 'Enabled' : 'Disabled' },
                { label: 'Specialization', value: form.specialization },
                { label: 'License #', value: form.medicalLicenseNumber },
                { label: 'Base Salary', value: formatCurrency(form.baseSalary) },
                { label: 'Total Compensation', value: formatCurrency(String(totalCompensation)) },
                { label: 'Background Check', value: form.backgroundCheckStatus },
                { label: 'Compliance', value: form.complianceApproval },
              ].filter(f => f.value && f.value !== '0' && f.value !== '$0.00').map(f => (
                <div key={f.label}>
                  <p className="text-xs text-slate-500">{f.label}</p>
                  <p className="text-sm font-medium capitalize text-slate-900 dark:text-white">{f.value}</p>
                </div>
              ))}
            </div>

            {/* Documents list */}
            {form.documents.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-sm font-medium text-slate-900 dark:text-white">Uploaded Documents</p>
                <div className="flex flex-wrap gap-2">
                  {form.documents.map(d => (
                    <span key={d} className="rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">{d}</span>
                  ))}
                </div>
              </div>
            )}

            {form.certifications.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-sm font-medium text-slate-900 dark:text-white">Certifications</p>
                <div className="flex flex-wrap gap-2">
                  {form.certifications.map(c => (
                    <span key={c} className="rounded-lg bg-primary-100 px-2.5 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">{c}</span>
                  ))}
                </div>
              </div>
            )}
          </SectionCard>

          {/* Jump-back buttons */}
          <div className="glass-card p-4">
            <p className="mb-3 text-sm font-medium text-slate-900 dark:text-white">Quick Edit</p>
            <div className="flex flex-wrap gap-2">
              {STEPS.slice(0, -1).map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setStep(id)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">
                  <Icon className="h-3.5 w-3.5" />{label}
                </button>
              ))}
            </div>
          </div>

          {/* Terms & confirmation */}
          <div className="glass-card p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" id="confirm" className="mt-1 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                I confirm that the information provided is accurate and I accept the hospital's employment terms and data privacy policies.
              </span>
            </label>
          </div>
        </div>
      )}

      {/* ── Navigation ────────────────────────────────────── */}
      <div className="glass-card flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex gap-2">
          {step > 1 && (
            <button onClick={prevStep} className="btn-secondary">
              <ArrowLeft className="h-4 w-4" />Previous
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {step < STEPS.length && (
            <button onClick={nextStep} className="btn-primary">
              Next<ArrowRight className="h-4 w-4" />
            </button>
          )}
          {step === STEPS.length && (
            <>
              <button onClick={() => handleSubmit(true)} disabled={submitting}
                className="btn-secondary">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}Save as Draft
              </button>
              <button onClick={() => handleSubmit(false)} disabled={submitting}
                className="btn-primary">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}Create Employee
              </button>
            </>
          )}
          <button onClick={() => { setForm({ ...initialForm }); setStep(1); setErrors({}) }}
            className="btn-secondary text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
            <X className="h-4 w-4" />Reset
          </button>
        </div>
      </div>
    </div>
  )
}
