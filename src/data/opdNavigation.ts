import {
  ClipboardPlus, CalendarCheck, Footprints, ListOrdered, LogIn, Search, ShieldCheck, DollarSign, ArrowRightLeft, Stethoscope, Activity,
} from 'lucide-react'

export const opdNavItems = [
  { label: 'OPD Registration', path: '/opd/registration', icon: ClipboardPlus },
  { label: 'Appointments', path: '/opd/appointments', icon: CalendarCheck },
  { label: 'Walk-in Patients', path: '/opd/walk-in', icon: Footprints },
  { label: 'Queue Management', path: '/opd/queue', icon: ListOrdered },
  { label: 'Check-in / Check-out', path: '/opd/checkin', icon: LogIn },
  { label: 'Patient Search', path: '/opd/search', icon: Search },
  { label: 'Insurance Verify', path: '/opd/insurance', icon: ShieldCheck },
  { label: 'Billing Initiation', path: '/opd/billing', icon: DollarSign },
  { label: 'Referral Handling', path: '/opd/referrals', icon: ArrowRightLeft },
  { label: 'Doctor Assignment', path: '/opd/doctor-assign', icon: Stethoscope },
  { label: 'Consultation Status', path: '/opd/consultation', icon: Activity },
]
