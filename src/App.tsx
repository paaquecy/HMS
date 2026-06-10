import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './components/layout/DashboardLayout'
import ProtectedRoute from './components/layout/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import TotalPatients from './pages/TotalPatients'
import TotalDoctors from './pages/TotalDoctors'
import StaffManagement from './pages/StaffManagement'
import RevenueAnalytics from './pages/RevenueAnalytics'
import BedOccupancy from './pages/BedOccupancy'
import UserRolesPermissions from './pages/UserRolesPermissions'
import HospitalBranches from './pages/HospitalBranches'
import SystemSettings from './pages/SystemSettings'
import AuditLogs from './pages/AuditLogs'
import ReportsAnalytics from './pages/ReportsAnalytics'
import BackupSecurity from './pages/BackupSecurity'
import AddNewEmployee from './pages/AddNewEmployee'
import OPDRegistration from './pages/opd/OPDRegistration'
import OPDAppointments from './pages/opd/OPDAppointments'
import OPDWalkIn from './pages/opd/OPDWalkIn'
import OPDQueue from './pages/opd/OPDQueue'
import OPDCheckIn from './pages/opd/OPDCheckIn'
import OPDSearch from './pages/opd/OPDSearch'
import OPDInsurance from './pages/opd/OPDInsurance'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="patients" element={<TotalPatients />} />
        <Route path="doctors" element={<TotalDoctors />} />
        <Route path="staff" element={<StaffManagement />} />
        <Route path="staff/add" element={<AddNewEmployee />} />
        <Route path="revenue" element={<RevenueAnalytics />} />
        <Route path="beds" element={<BedOccupancy />} />
        <Route path="roles" element={<UserRolesPermissions />} />
        <Route path="branches" element={<HospitalBranches />} />
        <Route path="settings" element={<SystemSettings />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="reports" element={<ReportsAnalytics />} />
        <Route path="backup-security" element={<BackupSecurity />} />
        <Route path="opd/registration" element={<OPDRegistration />} />
        <Route path="opd/appointments" element={<OPDAppointments />} />
        <Route path="opd/walk-in" element={<OPDWalkIn />} />
        <Route path="opd/queue" element={<OPDQueue />} />
        <Route path="opd/checkin" element={<OPDCheckIn />} />
        <Route path="opd/search" element={<OPDSearch />} />
        <Route path="opd/insurance" element={<OPDInsurance />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
