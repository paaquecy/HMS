export const opdDepartments = ['General', 'Cardiology', 'Pediatrics', 'Surgery', 'Orthopedics', 'ENT', 'Dermatology', 'Ophthalmology', 'Neurology', 'Gynecology']

export const opdDoctors = [
  { id: 'D-301', name: 'Dr. Michael Chen', dept: 'Cardiology', shift: 'Day', status: 'available', queue: 4, capacity: 8 },
  { id: 'D-302', name: 'Dr. Emily Roberts', dept: 'General', shift: 'Day', status: 'available', queue: 6, capacity: 10 },
  { id: 'D-303', name: 'Dr. David Kim', dept: 'Pediatrics', shift: 'Day', status: 'busy', queue: 8, capacity: 8 },
  { id: 'D-304', name: 'Dr. Lisa Park', dept: 'Gynecology', shift: 'Day', status: 'available', queue: 3, capacity: 8 },
  { id: 'D-305', name: 'Dr. James Miller', dept: 'Surgery', shift: 'Evening', status: 'available', queue: 2, capacity: 6 },
  { id: 'D-306', name: 'Dr. Anna Lee', dept: 'Dermatology', shift: 'Day', status: 'available', queue: 5, capacity: 10 },
  { id: 'D-307', name: 'Dr. Robert White', dept: 'Orthopedics', shift: 'Day', status: 'on_leave', queue: 0, capacity: 8 },
  { id: 'D-308', name: 'Dr. Susan Clark', dept: 'Neurology', shift: 'Evening', status: 'available', queue: 3, capacity: 6 },
]

export const opdPatients = [
  { id: 'OPD-1001', name: 'Sarah Johnson', age: 34, gender: 'Female', phone: '+1 555-0101', type: 'New', category: 'General', symptoms: 'Chest pain, shortness of breath', dept: 'Cardiology', doctor: 'Dr. Michael Chen', priority: 'normal', status: 'waiting', checkIn: '09:15 AM', token: 'T-001' },
  { id: 'OPD-1002', name: 'James Wilson', age: 67, gender: 'Male', phone: '+1 555-0102', type: 'Returning', category: 'Specialist', symptoms: 'Persistent headache, dizziness', dept: 'Neurology', doctor: 'Dr. Susan Clark', priority: 'urgent', status: 'in_consultation', checkIn: '08:45 AM', token: 'T-002' },
  { id: 'OPD-1003', name: 'Maria Garcia', age: 28, gender: 'Female', phone: '+1 555-0103', type: 'New', category: 'General', symptoms: 'Fever, sore throat', dept: 'General', doctor: 'Dr. Emily Roberts', priority: 'normal', status: 'waiting', checkIn: '09:30 AM', token: 'T-003' },
  { id: 'OPD-1004', name: 'Robert Taylor', age: 45, gender: 'Male', phone: '+1 555-0104', type: 'New', category: 'Emergency', symptoms: 'Acute abdominal pain', dept: 'Surgery', doctor: 'Dr. James Miller', priority: 'critical', status: 'in_consultation', checkIn: '08:20 AM', token: 'T-004' },
  { id: 'OPD-1005', name: 'Emily Brown', age: 52, gender: 'Female', phone: '+1 555-0105', type: 'Returning', category: 'Specialist', symptoms: 'Skin rash, itching', dept: 'Dermatology', doctor: 'Dr. Anna Lee', priority: 'normal', status: 'waiting', checkIn: '09:45 AM', token: 'T-005' },
  { id: 'OPD-1006', name: 'Ahmed Hassan', age: 39, gender: 'Male', phone: '+1 555-0106', type: 'New', category: 'General', symptoms: 'Joint pain, swelling', dept: 'Orthopedics', doctor: '—', priority: 'normal', status: 'waiting', checkIn: '10:00 AM', token: 'T-006' },
  { id: 'OPD-1007', name: 'Jennifer Davis', age: 61, gender: 'Female', phone: '+1 555-0107', type: 'Returning', category: 'Specialist', symptoms: 'Vision blur, eye irritation', dept: 'Ophthalmology', doctor: '—', priority: 'urgent', status: 'waiting', checkIn: '09:50 AM', token: 'T-007' },
  { id: 'OPD-1008', name: 'Thomas Anderson', age: 73, gender: 'Male', phone: '+1 555-0108', type: 'Returning', category: 'General', symptoms: 'Cough, breathing difficulty', dept: 'General', doctor: 'Dr. Emily Roberts', priority: 'normal', status: 'completed', checkIn: '08:00 AM', token: 'T-008' },
  { id: 'OPD-1009', name: 'Lisa Thompson', age: 31, gender: 'Female', phone: '+1 555-0109', type: 'New', category: 'General', symptoms: 'Ear pain, hearing difficulty', dept: 'ENT', doctor: '—', priority: 'normal', status: 'waiting', checkIn: '10:10 AM', token: 'T-009' },
  { id: 'OPD-1010', name: 'Kevin Martinez', age: 48, gender: 'Male', phone: '+1 555-0110', type: 'Returning', category: 'Specialist', symptoms: 'Back pain, numbness', dept: 'Neurology', doctor: 'Dr. Susan Clark', priority: 'normal', status: 'completed', checkIn: '08:30 AM', token: 'T-010' },
  { id: 'OPD-1011', name: 'Nancy White', age: 55, gender: 'Female', phone: '+1 555-0111', type: 'New', category: 'General', symptoms: 'Stomach ache, nausea', dept: 'General', doctor: 'Dr. Emily Roberts', priority: 'normal', status: 'waiting', checkIn: '10:20 AM', token: 'T-011' },
  { id: 'OPD-1012', name: 'David Harris', age: 42, gender: 'Male', phone: '+1 555-0112', type: 'New', category: 'Emergency', symptoms: 'Chest tightness, palpitations', dept: 'Cardiology', doctor: 'Dr. Michael Chen', priority: 'critical', status: 'in_consultation', checkIn: '08:10 AM', token: 'T-012' },
]

export const walkInPatients = [
  { id: 'WI-2001', name: 'Paul Robinson', age: 56, gender: 'Male', phone: '+1 555-0201', severity: 'critical', symptoms: 'Severe chest pain', dept: 'Cardiology', token: 'E-001', status: 'in_consultation', arrival: '08:15 AM', waitMin: 5 },
  { id: 'WI-2002', name: 'Susan Adams', age: 34, gender: 'Female', phone: '+1 555-0202', severity: 'urgent', symptoms: 'High fever, chills', dept: 'General', token: 'E-002', status: 'waiting', arrival: '09:00 AM', waitMin: 45 },
  { id: 'WI-2003', name: 'George Clark', age: 70, gender: 'Male', phone: '+1 555-0203', severity: 'urgent', symptoms: 'Breathing difficulty', dept: 'General', token: 'E-003', status: 'waiting', arrival: '09:20 AM', waitMin: 30 },
  { id: 'WI-2004', name: 'Betty Lewis', age: 45, gender: 'Female', phone: '+1 555-0204', severity: 'normal', symptoms: 'Headache, fatigue', dept: 'General', token: 'E-004', status: 'waiting', arrival: '09:45 AM', waitMin: 15 },
  { id: 'WI-2005', name: 'Edward Hall', age: 62, gender: 'Male', phone: '+1 555-0205', severity: 'normal', symptoms: 'Knee pain', dept: 'Orthopedics', token: 'E-005', status: 'waiting', arrival: '10:00 AM', waitMin: 10 },
  { id: 'WI-2006', name: 'Helen Young', age: 28, gender: 'Female', phone: '+1 555-0206', severity: 'critical', symptoms: 'Allergic reaction, swelling', dept: 'Emergency', token: 'E-006', status: 'in_consultation', arrival: '08:30 AM', waitMin: 0 },
]

export const appointments = [
  { id: 'APT-5001', patient: 'Sarah Johnson', patientId: 'OPD-1001', doctor: 'Dr. Michael Chen', dept: 'Cardiology', date: '2025-06-10', time: '09:00 AM', type: 'First Visit', priority: 'Normal', status: 'confirmed', reason: 'Chest pain follow-up' },
  { id: 'APT-5002', patient: 'James Wilson', patientId: 'OPD-1002', doctor: 'Dr. Susan Clark', dept: 'Neurology', date: '2025-06-10', time: '09:30 AM', type: 'Follow-up', priority: 'Urgent', status: 'in_progress', reason: 'Headache evaluation' },
  { id: 'APT-5003', patient: 'Emily Brown', patientId: 'OPD-1005', doctor: 'Dr. Anna Lee', dept: 'Dermatology', date: '2025-06-10', time: '10:00 AM', type: 'Follow-up', priority: 'Normal', status: 'confirmed', reason: 'Skin rash treatment review' },
  { id: 'APT-5004', patient: 'Thomas Anderson', patientId: 'OPD-1008', doctor: 'Dr. Emily Roberts', dept: 'General', date: '2025-06-10', time: '10:30 AM', type: 'Follow-up', priority: 'Normal', status: 'completed', reason: 'Respiratory checkup' },
  { id: 'APT-5005', patient: 'Kevin Martinez', patientId: 'OPD-1010', doctor: 'Dr. Susan Clark', dept: 'Neurology', date: '2025-06-10', time: '11:00 AM', type: 'First Visit', priority: 'Normal', status: 'completed', reason: 'Back pain assessment' },
  { id: 'APT-5006', patient: 'Maria Garcia', patientId: 'OPD-1003', doctor: 'Dr. Emily Roberts', dept: 'General', date: '2025-06-10', time: '11:30 AM', type: 'First Visit', priority: 'Normal', status: 'pending', reason: 'Fever and sore throat' },
  { id: 'APT-5007', patient: 'Jennifer Davis', patientId: 'OPD-1007', doctor: '—', dept: 'Ophthalmology', date: '2025-06-10', time: '02:00 PM', type: 'First Visit', priority: 'Urgent', status: 'pending', reason: 'Vision problems' },
  { id: 'APT-5008', patient: 'Ahmed Hassan', patientId: 'OPD-1006', doctor: '—', dept: 'Orthopedics', date: '2025-06-10', time: '02:30 PM', type: 'First Visit', priority: 'Normal', status: 'pending', reason: 'Joint pain' },
  { id: 'APT-5009', patient: 'Nancy White', patientId: 'OPD-1011', doctor: 'Dr. Emily Roberts', dept: 'General', date: '2025-06-10', time: '03:00 PM', type: 'First Visit', priority: 'Normal', status: 'cancelled', reason: 'Patient cancelled' },
  { id: 'APT-5010', patient: 'David Harris', patientId: 'OPD-1012', doctor: 'Dr. Michael Chen', dept: 'Cardiology', date: '2025-06-10', time: '08:30 AM', type: 'Emergency OPD', priority: 'Critical', status: 'in_progress', reason: 'Chest tightness' },
]

export const queueEntries = [
  { token: 'T-004', patient: 'Robert Taylor', id: 'OPD-1004', dept: 'Surgery', doctor: 'Dr. James Miller', priority: 'critical', status: 'in_consultation', checkIn: '08:20 AM', waitMin: 0 },
  { token: 'T-012', patient: 'David Harris', id: 'OPD-1012', dept: 'Cardiology', doctor: 'Dr. Michael Chen', priority: 'critical', status: 'in_consultation', checkIn: '08:10 AM', waitMin: 0 },
  { token: 'T-002', patient: 'James Wilson', id: 'OPD-1002', dept: 'Neurology', doctor: 'Dr. Susan Clark', priority: 'urgent', status: 'in_consultation', checkIn: '08:45 AM', waitMin: 0 },
  { token: 'T-007', patient: 'Jennifer Davis', id: 'OPD-1007', dept: 'Ophthalmology', doctor: '—', priority: 'urgent', status: 'waiting', checkIn: '09:50 AM', waitMin: 25 },
  { token: 'T-001', patient: 'Sarah Johnson', id: 'OPD-1001', dept: 'Cardiology', doctor: 'Dr. Michael Chen', priority: 'normal', status: 'waiting', checkIn: '09:15 AM', waitMin: 55 },
  { token: 'T-003', patient: 'Maria Garcia', id: 'OPD-1003', dept: 'General', doctor: 'Dr. Emily Roberts', priority: 'normal', status: 'waiting', checkIn: '09:30 AM', waitMin: 40 },
  { token: 'T-005', patient: 'Emily Brown', id: 'OPD-1005', dept: 'Dermatology', doctor: 'Dr. Anna Lee', priority: 'normal', status: 'waiting', checkIn: '09:45 AM', waitMin: 30 },
  { token: 'T-006', patient: 'Ahmed Hassan', id: 'OPD-1006', dept: 'Orthopedics', doctor: '—', priority: 'normal', status: 'waiting', checkIn: '10:00 AM', waitMin: 15 },
  { token: 'T-009', patient: 'Lisa Thompson', id: 'OPD-1009', dept: 'ENT', doctor: '—', priority: 'normal', status: 'waiting', checkIn: '10:10 AM', waitMin: 10 },
  { token: 'T-011', patient: 'Nancy White', id: 'OPD-1011', dept: 'General', doctor: 'Dr. Emily Roberts', priority: 'normal', status: 'waiting', checkIn: '10:20 AM', waitMin: 5 },
]

export const checkInOutPatients = [
  { id: 'OPD-1008', name: 'Thomas Anderson', dept: 'General', doctor: 'Dr. Emily Roberts', checkIn: '08:00 AM', checkOut: '09:15 AM', status: 'checked_out', duration: '1h 15m' },
  { id: 'OPD-1010', name: 'Kevin Martinez', dept: 'Neurology', doctor: 'Dr. Susan Clark', checkIn: '08:30 AM', checkOut: '09:40 AM', status: 'checked_out', duration: '1h 10m' },
  { id: 'OPD-1012', name: 'David Harris', dept: 'Cardiology', doctor: 'Dr. Michael Chen', checkIn: '08:10 AM', checkOut: '—', status: 'in_consultation', duration: '—' },
  { id: 'OPD-1004', name: 'Robert Taylor', dept: 'Surgery', doctor: 'Dr. James Miller', checkIn: '08:20 AM', checkOut: '—', status: 'in_consultation', duration: '—' },
  { id: 'OPD-1002', name: 'James Wilson', dept: 'Neurology', doctor: 'Dr. Susan Clark', checkIn: '08:45 AM', checkOut: '—', status: 'in_consultation', duration: '—' },
  { id: 'OPD-1001', name: 'Sarah Johnson', dept: 'Cardiology', doctor: 'Dr. Michael Chen', checkIn: '09:15 AM', checkOut: '—', status: 'waiting', duration: '—' },
  { id: 'OPD-1003', name: 'Maria Garcia', dept: 'General', doctor: 'Dr. Emily Roberts', checkIn: '09:30 AM', checkOut: '—', status: 'waiting', duration: '—' },
  { id: 'OPD-1005', name: 'Emily Brown', dept: 'Dermatology', doctor: 'Dr. Anna Lee', checkIn: '09:45 AM', checkOut: '—', status: 'waiting', duration: '—' },
  { id: 'OPD-1011', name: 'Nancy White', dept: 'General', doctor: 'Dr. Emily Roberts', checkIn: '10:20 AM', checkOut: '—', status: 'checked_in', duration: '—' },
  { id: 'OPD-1006', name: 'Ahmed Hassan', dept: 'Orthopedics', doctor: '—', checkIn: '10:00 AM', checkOut: '—', status: 'checked_in', duration: '—' },
  { id: 'OPD-1009', name: 'Lisa Thompson', dept: 'ENT', doctor: '—', checkIn: '10:10 AM', checkOut: '—', status: 'checked_in', duration: '—' },
  { id: 'OPD-MIS1', name: 'Frank Moore', dept: 'General', doctor: 'Dr. Emily Roberts', checkIn: '09:00 AM', checkOut: '—', status: 'no_show', duration: '—' },
]

export const patientHistory = [
  { id: 'OPD-1001', name: 'Sarah Johnson', visits: 3, lastVisit: '2025-05-28', dept: 'Cardiology', conditions: ['Hypertension', 'Chest pain'], prescriptions: ['Amlodipine 5mg', 'Aspirin 75mg'], labs: ['ECG — Normal', 'Blood work — Pending'], bills: '₵12,500', insurance: 'BlueCross — Active' },
  { id: 'OPD-1002', name: 'James Wilson', visits: 5, lastVisit: '2025-06-02', dept: 'Neurology', conditions: ['Chronic migraine', 'Dizziness'], prescriptions: ['Sumatriptan 50mg', 'Propranolol 40mg'], labs: ['MRI Brain — Normal', 'EEG — Scheduled'], bills: '₵28,900', insurance: 'Aetna — Active' },
  { id: 'OPD-1005', name: 'Emily Brown', visits: 2, lastVisit: '2025-05-15', dept: 'Dermatology', conditions: ['Contact dermatitis'], prescriptions: ['Hydrocortisone 1% cream', 'Cetirizine 10mg'], labs: ['Skin biopsy — Pending'], bills: '₵4,200', insurance: 'UnitedHealth — Active' },
]

export const insuranceVerifications = [
  { id: 'INS-001', patient: 'Sarah Johnson', provider: 'BlueCross', policyNo: 'BC-558221', type: 'Private', coverage: '80%', deductible: '₵500', copay: '₵150', status: 'approved', verifiedAt: '09:00 AM' },
  { id: 'INS-002', patient: 'James Wilson', provider: 'Aetna', policyNo: 'AE-334455', type: 'Private', coverage: '75%', deductible: '₵750', copay: '₵200', status: 'approved', verifiedAt: '08:50 AM' },
  { id: 'INS-003', patient: 'Robert Taylor', provider: 'Self-Pay', policyNo: 'N/A', type: 'Self-Pay', coverage: '0%', deductible: 'N/A', copay: 'Full', status: 'self_pay', verifiedAt: '08:25 AM' },
  { id: 'INS-004', patient: 'Emily Brown', provider: 'UnitedHealth', policyNo: 'UH-778899', type: 'Corporate', coverage: '90%', deductible: '₵300', copay: '₵100', status: 'approved', verifiedAt: '09:40 AM' },
  { id: 'INS-005', patient: 'Maria Garcia', provider: 'Cigna', policyNo: 'CG-112233', type: 'Private', coverage: '70%', deductible: '₵1,000', copay: '₵250', status: 'pending', verifiedAt: '—' },
  { id: 'INS-006', patient: 'Ahmed Hassan', provider: 'Ghana NHIS', policyNo: 'NHIS-445566', type: 'Government', coverage: '60%', deductible: '₵200', copay: '₵300', status: 'pending', verifiedAt: '—' },
  { id: 'INS-007', patient: 'Jennifer Davis', provider: 'BlueCross', policyNo: 'BC-990011', type: 'Private', coverage: '0%', deductible: 'N/A', copay: 'Full', status: 'rejected', verifiedAt: '09:55 AM' },
]

export const insuranceProviders = [
  { name: 'BlueCross', status: 'active', approvalRate: '88%', avgResponse: '12s', integrated: true },
  { name: 'Aetna', status: 'active', approvalRate: '82%', avgResponse: '15s', integrated: true },
  { name: 'UnitedHealth', status: 'active', approvalRate: '90%', avgResponse: '10s', integrated: true },
  { name: 'Cigna', status: 'active', approvalRate: '75%', avgResponse: '18s', integrated: true },
  { name: 'Ghana NHIS', status: 'active', approvalRate: '65%', avgResponse: '25s', integrated: true },
  { name: 'MetLife', status: 'maintenance', approvalRate: '—', avgResponse: '—', integrated: false },
]

export const hourlyFlow = [
  { hour: '7AM', walkIn: 3, appointment: 2, completed: 0 },
  { hour: '8AM', walkIn: 8, appointment: 5, completed: 2 },
  { hour: '9AM', walkIn: 12, appointment: 8, completed: 4 },
  { hour: '10AM', walkIn: 15, appointment: 10, completed: 6 },
  { hour: '11AM', walkIn: 10, appointment: 7, completed: 8 },
  { hour: '12PM', walkIn: 6, appointment: 4, completed: 5 },
  { hour: '1PM', walkIn: 4, appointment: 3, completed: 4 },
  { hour: '2PM', walkIn: 8, appointment: 6, completed: 3 },
]

export const queueByDept = [
  { dept: 'General', waiting: 8, inConsult: 2, completed: 5 },
  { dept: 'Cardiology', waiting: 3, inConsult: 2, completed: 2 },
  { dept: 'Neurology', waiting: 2, inConsult: 1, completed: 1 },
  { dept: 'Surgery', waiting: 1, inConsult: 1, completed: 0 },
  { dept: 'Dermatology', waiting: 2, inConsult: 0, completed: 1 },
  { dept: 'Pediatrics', waiting: 4, inConsult: 1, completed: 3 },
]

export const timeSlots = ['08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM']

export const opdAlerts = [
  { id: '1', type: 'critical' as const, message: '2 critical patients waiting — immediate attention required', time: '5 min ago' },
  { id: '2', type: 'warning' as const, message: 'Orthopedics has no available doctor today — reassign patients', time: '15 min ago' },
  { id: '3', type: 'info' as const, message: 'Dr. Emily Roberts completed 3 consultations this morning', time: '30 min ago' },
  { id: '4', type: 'warning' as const, message: 'Insurance verification pending for 2 patients', time: '1 hour ago' },
]
