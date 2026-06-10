-- Profiles table: links Supabase Auth users to roles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'receptionist'
    CHECK (role IN ('super_admin', 'hospital_admin', 'doctor', 'nurse', 'receptionist', 'pharmacist', 'limited')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "delete_own_profile" ON profiles FOR DELETE
  TO authenticated USING (auth.uid() = id);

-- Staff table for employee onboarding
CREATE TABLE staff (
  id TEXT PRIMARY KEY DEFAULT ('S-' || (300 + floor(random() * 700)::int)),
  full_name TEXT NOT NULL,
  role TEXT,
  department TEXT,
  branch TEXT,
  contact TEXT,
  employment_type TEXT DEFAULT 'Full-time',
  shift_schedule TEXT DEFAULT 'Day',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'on_leave', 'suspended', 'pending_verification')),
  joining_date DATE DEFAULT CURRENT_DATE,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
  national_id TEXT,
  email TEXT,
  address TEXT,
  emergency_contact_name TEXT,
  emergency_contact_number TEXT,
  photo_url TEXT,
  medical_license_number TEXT,
  specialization TEXT,
  years_of_experience INTEGER,
  qualifications TEXT,
  certifications TEXT[],
  registration_body TEXT,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  system_username TEXT,
  system_password_temp TEXT,
  access_role TEXT,
  account_status TEXT DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'pending_verification')),
  two_factor_enabled BOOLEAN DEFAULT false,
  password_reset_on_login BOOLEAN DEFAULT true,
  base_salary NUMERIC(12,2),
  housing_allowance NUMERIC(12,2) DEFAULT 0,
  transport_allowance NUMERIC(12,2) DEFAULT 0,
  medical_allowance NUMERIC(12,2) DEFAULT 0,
  overtime_rate NUMERIC(12,2) DEFAULT 0,
  bank_account TEXT,
  tax_id TEXT,
  payment_frequency TEXT DEFAULT 'Monthly' CHECK (payment_frequency IN ('Monthly', 'Bi-weekly')),
  work_days TEXT[] DEFAULT '{"Mon","Tue","Wed","Thu","Fri"}',
  emergency_duty_eligible BOOLEAN DEFAULT false,
  rotation_schedule BOOLEAN DEFAULT false,
  medical_fitness_status TEXT,
  vaccination_records TEXT,
  background_check_status TEXT DEFAULT 'pending' CHECK (background_check_status IN ('pending', 'passed', 'failed')),
  compliance_approval TEXT DEFAULT 'pending' CHECK (compliance_approval IN ('pending', 'approved', 'rejected')),
  documents TEXT[],
  draft BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE staff ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_staff" ON staff FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "insert_staff" ON staff FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_staff" ON staff FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_staff" ON staff FOR DELETE
  TO authenticated USING (true);
