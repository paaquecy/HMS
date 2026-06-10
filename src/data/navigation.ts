import {
  LayoutDashboard,
  Users,
  Stethoscope,
  UserCog,
  DollarSign,
  BedDouble,
  Shield,
  Building2,
  Settings,
  FileText,
  BarChart3,
  HardDrive,
} from 'lucide-react'

export const navItems = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Total Patients', path: '/patients', icon: Users },
  { label: 'Total Doctors', path: '/doctors', icon: Stethoscope },
  { label: 'Staff Management', path: '/staff', icon: UserCog },
  { label: 'Revenue Analytics', path: '/revenue', icon: DollarSign },
  { label: 'Bed Occupancy', path: '/beds', icon: BedDouble },
  { label: 'User Roles & Permissions', path: '/roles', icon: Shield },
  { label: 'Hospital Branches Management', path: '/branches', icon: Building2 },
  { label: 'System Settings', path: '/settings', icon: Settings },
  { label: 'Audit Logs', path: '/audit-logs', icon: FileText },
  { label: 'Reports & Analytics', path: '/reports', icon: BarChart3 },
  { label: 'Backup & Security Monitoring', path: '/backup-security', icon: HardDrive },
]
