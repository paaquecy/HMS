export const sparkline = () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 50) + 20)

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const patientGrowthData = months.slice(0, 8).map((m, i) => ({
  month: m,
  patients: 1200 + i * 180 + Math.floor(Math.random() * 100),
}))

export const monthlyRegistrations = months.slice(0, 6).map((m) => ({
  month: m,
  registrations: Math.floor(Math.random() * 200) + 80,
}))

export const departmentDistribution = [
  { name: 'Cardiology', value: 245, color: '#2563eb' },
  { name: 'Emergency', value: 189, color: '#ef4444' },
  { name: 'Pediatrics', value: 156, color: '#10b981' },
  { name: 'Surgery', value: 134, color: '#f59e0b' },
  { name: 'ICU', value: 98, color: '#8b5cf6' },
  { name: 'Other', value: 178, color: '#64748b' },
]

export const admissionsVsDischarges = months.slice(0, 7).map((m) => ({
  month: m,
  admissions: Math.floor(Math.random() * 80) + 40,
  discharges: Math.floor(Math.random() * 70) + 35,
}))

export const patients = [
  { id: 'P-1001', fullName: 'Sarah Johnson', age: 34, gender: 'Female', department: 'Cardiology', assignedDoctor: 'Dr. Michael Chen', admissionDate: '2025-06-08', status: 'admitted' },
  { id: 'P-1002', fullName: 'James Wilson', age: 67, gender: 'Male', department: 'ICU', assignedDoctor: 'Dr. Emily Roberts', admissionDate: '2025-06-07', status: 'critical' },
  { id: 'P-1003', fullName: 'Maria Garcia', age: 28, gender: 'Female', department: 'Maternity', assignedDoctor: 'Dr. Lisa Park', admissionDate: '2025-06-09', status: 'admitted' },
  { id: 'P-1004', fullName: 'Robert Taylor', age: 45, gender: 'Male', department: 'Emergency', assignedDoctor: 'Dr. David Kim', admissionDate: '2025-06-09', status: 'emergency' },
  { id: 'P-1005', fullName: 'Emily Brown', age: 52, gender: 'Female', department: 'Surgery', assignedDoctor: 'Dr. James Miller', admissionDate: '2025-06-05', status: 'discharged' },
  { id: 'P-1006', fullName: 'Ahmed Hassan', age: 39, gender: 'Male', department: 'Pediatrics', assignedDoctor: 'Dr. Anna Lee', admissionDate: '2025-06-08', status: 'admitted' },
  { id: 'P-1007', fullName: 'Jennifer Davis', age: 61, gender: 'Female', department: 'Cardiology', assignedDoctor: 'Dr. Michael Chen', admissionDate: '2025-06-06', status: 'admitted' },
  { id: 'P-1008', fullName: 'Thomas Anderson', age: 73, gender: 'Male', department: 'ICU', assignedDoctor: 'Dr. Emily Roberts', admissionDate: '2025-06-04', status: 'critical' },
  { id: 'P-1009', fullName: 'Lisa Thompson', age: 31, gender: 'Female', department: 'General', assignedDoctor: 'Dr. Robert White', admissionDate: '2025-06-09', status: 'admitted' },
  { id: 'P-1010', fullName: 'Kevin Martinez', age: 48, gender: 'Male', department: 'Emergency', assignedDoctor: 'Dr. David Kim', admissionDate: '2025-06-03', status: 'discharged' },
]

export const doctors = [
  { id: 'D-201', fullName: 'Dr. Michael Chen', specialization: 'Cardiologist', department: 'Cardiology', experience: '15 yrs', contact: '+1 555-0101', shiftSchedule: 'Day (8AM-4PM)', status: 'active' },
  { id: 'D-202', fullName: 'Dr. Emily Roberts', specialization: 'Intensivist', department: 'ICU', experience: '12 yrs', contact: '+1 555-0102', shiftSchedule: 'Night (8PM-8AM)', status: 'active' },
  { id: 'D-203', fullName: 'Dr. David Kim', specialization: 'Emergency Medicine', department: 'Emergency', experience: '10 yrs', contact: '+1 555-0103', shiftSchedule: 'Rotating', status: 'active' },
  { id: 'D-204', fullName: 'Dr. Lisa Park', specialization: 'Obstetrician', department: 'Maternity', experience: '18 yrs', contact: '+1 555-0104', shiftSchedule: 'Day (7AM-3PM)', status: 'active' },
  { id: 'D-205', fullName: 'Dr. James Miller', specialization: 'Surgeon', department: 'Surgery', experience: '20 yrs', contact: '+1 555-0105', shiftSchedule: 'On-call', status: 'active' },
  { id: 'D-206', fullName: 'Dr. Anna Lee', specialization: 'Pediatrician', department: 'Pediatrics', experience: '8 yrs', contact: '+1 555-0106', shiftSchedule: 'Day (9AM-5PM)', status: 'active' },
  { id: 'D-207', fullName: 'Dr. Robert White', specialization: 'General Physician', department: 'General', experience: '14 yrs', contact: '+1 555-0107', shiftSchedule: 'Day (8AM-4PM)', status: 'on_leave' },
  { id: 'D-208', fullName: 'Dr. Susan Clark', specialization: 'Neurologist', department: 'Neurology', experience: '16 yrs', contact: '+1 555-0108', shiftSchedule: 'Day (10AM-6PM)', status: 'active' },
]

export const staff = [
  { id: 'S-301', fullName: 'Nurse Patricia Moore', role: 'Head Nurse', department: 'ICU', branch: 'Main Campus', contact: '+1 555-0201', employmentType: 'Full-time', shiftSchedule: 'Day', status: 'active', joiningDate: '2018-03-15' },
  { id: 'S-302', fullName: 'John Richards', role: 'Lab Technician', department: 'Laboratory', branch: 'Main Campus', contact: '+1 555-0202', employmentType: 'Full-time', shiftSchedule: 'Morning', status: 'active', joiningDate: '2020-07-01' },
  { id: 'S-303', fullName: 'Amanda Foster', role: 'Pharmacist', department: 'Pharmacy', branch: 'East Wing', contact: '+1 555-0203', employmentType: 'Full-time', shiftSchedule: 'Day', status: 'active', joiningDate: '2019-11-20' },
  { id: 'S-304', fullName: 'Carlos Mendez', role: 'Radiology Tech', department: 'Radiology', branch: 'Main Campus', contact: '+1 555-0204', employmentType: 'Part-time', shiftSchedule: 'Evening', status: 'active', joiningDate: '2021-02-10' },
  { id: 'S-305', fullName: 'Rachel Green', role: 'Receptionist', department: 'Administration', branch: 'North Branch', contact: '+1 555-0205', employmentType: 'Full-time', shiftSchedule: 'Day', status: 'on_leave', joiningDate: '2022-05-18' },
  { id: 'S-306', fullName: 'Mark Stevens', role: 'Security Officer', department: 'Security', branch: 'Main Campus', contact: '+1 555-0206', employmentType: 'Full-time', shiftSchedule: 'Night', status: 'active', joiningDate: '2017-09-01' },
]

export const transactions = [
  { id: 'TX-5001', patientName: 'Sarah Johnson', serviceType: 'Consultation', department: 'Cardiology', paymentMethod: 'Insurance', insuranceProvider: 'BlueCross', amount: '₵5,580', status: 'paid', date: '2025-06-09' },
  { id: 'TX-5002', patientName: 'James Wilson', serviceType: 'ICU Stay', department: 'ICU', paymentMethod: 'Insurance', insuranceProvider: 'Aetna', amount: '₵155,000', status: 'pending', date: '2025-06-08' },
  { id: 'TX-5003', patientName: 'Robert Taylor', serviceType: 'Emergency', department: 'Emergency', paymentMethod: 'Cash', insuranceProvider: 'N/A', amount: '₵14,880', status: 'paid', date: '2025-06-09' },
  { id: 'TX-5004', patientName: 'Emily Brown', serviceType: 'Surgery', department: 'Surgery', paymentMethod: 'Insurance', insuranceProvider: 'UnitedHealth', amount: '₵108,300', status: 'paid', date: '2025-06-07' },
  { id: 'TX-5005', patientName: 'Kevin Martinez', serviceType: 'Lab Tests', department: 'Laboratory', paymentMethod: 'Card', insuranceProvider: 'Cigna', amount: '₵3,960', status: 'paid', date: '2025-06-06' },
]

export const beds = [
  { id: 'B-ICU-01', ward: 'ICU', patientName: 'James Wilson', doctorAssigned: 'Dr. Emily Roberts', admissionDate: '2025-06-07', conditionSeverity: 'Critical', status: 'occupied', estimatedDischarge: '2025-06-15' },
  { id: 'B-ICU-02', ward: 'ICU', patientName: 'Thomas Anderson', doctorAssigned: 'Dr. Emily Roberts', admissionDate: '2025-06-04', conditionSeverity: 'Critical', status: 'occupied', estimatedDischarge: '2025-06-12' },
  { id: 'B-GW-15', ward: 'General Ward', patientName: 'Sarah Johnson', doctorAssigned: 'Dr. Michael Chen', admissionDate: '2025-06-08', conditionSeverity: 'Stable', status: 'occupied', estimatedDischarge: '2025-06-11' },
  { id: 'B-ER-03', ward: 'Emergency', patientName: '—', doctorAssigned: '—', admissionDate: '—', conditionSeverity: '—', status: 'available', estimatedDischarge: '—' },
  { id: 'B-MAT-07', ward: 'Maternity', patientName: 'Maria Garcia', doctorAssigned: 'Dr. Lisa Park', admissionDate: '2025-06-09', conditionSeverity: 'Stable', status: 'occupied', estimatedDischarge: '2025-06-12' },
  { id: 'B-PED-04', ward: 'Pediatrics', patientName: '—', doctorAssigned: '—', admissionDate: '—', conditionSeverity: '—', status: 'available', estimatedDischarge: '—' },
]

export const roles = [
  { id: 'R-01', name: 'Super Admin', description: 'Full system access', usersAssigned: 2, accessLevel: 'Full', lastModified: '2025-05-01', status: 'active' },
  { id: 'R-02', name: 'Hospital Admin', description: 'Hospital-wide management', usersAssigned: 5, accessLevel: 'Full', lastModified: '2025-04-15', status: 'active' },
  { id: 'R-03', name: 'Doctor', description: 'Clinical access', usersAssigned: 48, accessLevel: 'Partial', lastModified: '2025-06-01', status: 'active' },
  { id: 'R-04', name: 'Nurse', description: 'Patient care access', usersAssigned: 120, accessLevel: 'Partial', lastModified: '2025-05-20', status: 'active' },
  { id: 'R-05', name: 'Receptionist', description: 'Front desk operations', usersAssigned: 15, accessLevel: 'Limited', lastModified: '2025-03-10', status: 'active' },
  { id: 'R-06', name: 'Pharmacist', description: 'Pharmacy module access', usersAssigned: 8, accessLevel: 'Limited', lastModified: '2025-04-22', status: 'active' },
]

export const branches = [
  { id: 'BR-01', name: 'MediCare Main Campus', location: 'Accra, Greater Accra', manager: 'Dr. Richard Hayes', contact: '+233 555-1000', totalStaff: 450, totalPatients: 2840, bedCapacity: 500, occupancyRate: '87%', monthlyRevenue: '₵52M', status: 'active' },
  { id: 'BR-02', name: 'MediCare East Wing', location: 'Kumasi, Ashanti', manager: 'Dr. Susan Wright', contact: '+233 555-1001', totalStaff: 180, totalPatients: 1120, bedCapacity: 200, occupancyRate: '92%', monthlyRevenue: '₵22.3M', status: 'active' },
  { id: 'BR-03', name: 'MediCare North Branch', location: 'Tamale, Northern', manager: 'Dr. Mark Johnson', contact: '+233 555-1002', totalStaff: 220, totalPatients: 1450, bedCapacity: 250, occupancyRate: '78%', monthlyRevenue: '₵26M', status: 'active' },
  { id: 'BR-04', name: 'MediCare West Clinic', location: 'Takoradi, Western', manager: 'Dr. Laura Kim', contact: '+233 555-1003', totalStaff: 95, totalPatients: 680, bedCapacity: 100, occupancyRate: '65%', monthlyRevenue: '₵11M', status: 'under_review' },
]

export const auditLogs = [
  { id: 'AL-001', timestamp: '2025-06-10 09:15:32', user: 'Dr. Admin', action: 'Login', module: 'Authentication', status: 'success', ip: '192.168.1.100', device: 'Chrome / macOS' },
  { id: 'AL-002', timestamp: '2025-06-10 09:12:18', user: 'Nurse Moore', action: 'Patient Record Update', module: 'Patients', status: 'success', ip: '192.168.1.45', device: 'Safari / iOS' },
  { id: 'AL-003', timestamp: '2025-06-10 08:55:42', user: 'Unknown', action: 'Failed Login', module: 'Authentication', status: 'failed', ip: '203.0.113.55', device: 'Firefox / Linux' },
  { id: 'AL-004', timestamp: '2025-06-10 08:30:10', user: 'Dr. Chen', action: 'Schedule Change', module: 'Doctors', status: 'success', ip: '192.168.1.22', device: 'Chrome / Windows' },
  { id: 'AL-005', timestamp: '2025-06-10 08:15:00', user: 'Admin System', action: 'Backup Completed', module: 'Backup', status: 'success', ip: '10.0.0.1', device: 'Server' },
]

export const recentAdmissions = [
  { name: 'Sarah Johnson', dept: 'Cardiology', time: '2 hours ago', severity: 'Stable' },
  { name: 'Robert Taylor', dept: 'Emergency', time: '45 min ago', severity: 'Critical' },
  { name: 'Maria Garcia', dept: 'Maternity', time: '1 hour ago', severity: 'Stable' },
]

export const criticalPatients = [
  { name: 'James Wilson', condition: 'Cardiac arrest recovery', ward: 'ICU', doctor: 'Dr. Emily Roberts' },
  { name: 'Thomas Anderson', condition: 'Respiratory failure', ward: 'ICU', doctor: 'Dr. Emily Roberts' },
]

export const alerts = [
  { id: '1', type: 'critical' as const, message: 'ICU occupancy at 95% — capacity warning', time: '5 min ago' },
  { id: '2', type: 'warning' as const, message: '3 insurance claims pending approval over 7 days', time: '15 min ago' },
  { id: '3', type: 'info' as const, message: 'Daily backup completed successfully', time: '1 hour ago' },
  { id: '4', type: 'warning' as const, message: 'Dr. Robert White on extended leave — coverage needed', time: '2 hours ago' },
]

export const revenueBySource = [
  { name: 'Consultations', value: 28, color: '#2563eb' },
  { name: 'Surgeries', value: 22, color: '#10b981' },
  { name: 'Laboratory', value: 15, color: '#f59e0b' },
  { name: 'Pharmacy', value: 12, color: '#8b5cf6' },
  { name: 'Emergency', value: 10, color: '#ef4444' },
  { name: 'Other', value: 13, color: '#64748b' },
]

export const doctorByDept = [
  { dept: 'Cardiology', count: 12 },
  { dept: 'Emergency', count: 18 },
  { dept: 'ICU', count: 8 },
  { dept: 'Surgery', count: 15 },
  { dept: 'Pediatrics', count: 10 },
  { dept: 'General', count: 14 },
]

export const staffByDept = [
  { dept: 'ICU', count: 45 },
  { dept: 'Emergency', count: 38 },
  { dept: 'Surgery', count: 52 },
  { dept: 'Laboratory', count: 22 },
  { dept: 'Pharmacy', count: 18 },
  { dept: 'Admin', count: 35 },
]

export const wardOccupancy = [
  { ward: 'ICU', occupied: 18, total: 20 },
  { ward: 'Emergency', occupied: 12, total: 15 },
  { ward: 'General', occupied: 85, total: 100 },
  { ward: 'Maternity', occupied: 22, total: 30 },
  { ward: 'Pediatrics', occupied: 15, total: 25 },
  { ward: 'Surgery Recovery', occupied: 28, total: 35 },
]

export const permissions = [
  'Patients', 'Doctors', 'Staff', 'Appointments', 'Billing', 'Pharmacy',
  'Laboratory', 'Radiology', 'Bed Management', 'Revenue', 'Reports', 'Settings',
]

export const permissionActions = ['View', 'Create', 'Edit', 'Delete', 'Export', 'Approve']
