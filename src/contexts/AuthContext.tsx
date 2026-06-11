import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

type Role = 'super_admin' | 'hospital_admin' | 'doctor' | 'nurse' | 'receptionist' | 'pharmacist' | 'limited' | 'opd_staff'

interface AuthContextType {
  user: User | null
  session: Session | null
  role: Role | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  isDemoMode: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  role: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => {},
  isDemoMode: false,
})

const DEMO_USERS: Record<string, { password: string; role: Role }> = {
  'admin@medicare.com': { password: 'admin', role: 'super_admin' },
  'admin': { password: 'admin', role: 'super_admin' },
  'opd@medicare.com': { password: 'opd', role: 'opd_staff' },
  'opd': { password: 'opd', role: 'opd_staff' },
  'doctor@medicare.com': { password: 'doctor', role: 'doctor' },
  'nurse@medicare.com': { password: 'nurse', role: 'nurse' },
}

const isSupabaseConfigured = (): boolean => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  return !!(url && key && url !== 'https://placeholder.supabase.co')
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [role, setRole] = useState<Role | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured())

  // Check for persisted demo session
  useEffect(() => {
    const demoSession = localStorage.getItem('hms-demo-session')
    if (demoSession) {
      try {
        const parsed = JSON.parse(demoSession)
        setRole(parsed.role)
        setUser({ email: parsed.email } as User)
      } catch {}
    }
    setLoading(false)
  }, [])

  const fetchRole = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single()
    if (data?.role) setRole(data.role as Role)
    else setRole(null)
  }, [])

  useEffect(() => {
    if (isDemoMode) return

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user) fetchRole(s.user.id)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user) fetchRole(s.user.id)
      else { setRole(null); setLoading(false) }
    })

    return () => subscription.unsubscribe()
  }, [fetchRole, isDemoMode])

  useEffect(() => {
    if (user !== null && role !== null) setLoading(false)
    if (user === null && !isDemoMode) setLoading(false)
  }, [user, role, isDemoMode])

  const signIn = async (email: string, password: string) => {
    const emailLookup = email.includes('@') ? email : `${email}@medicare.com`

    // Check demo credentials first
    const demoUser = DEMO_USERS[emailLookup] || DEMO_USERS[email]
    if (demoUser && demoUser.password === password) {
      setRole(demoUser.role)
      setUser({ email: emailLookup } as User)
      localStorage.setItem('hms-demo-session', JSON.stringify({ email: emailLookup, role: demoUser.role }))
      return { error: null }
    }

    // If not demo user, try Supabase auth
    if (!isDemoMode) {
      const { error } = await supabase.auth.signInWithPassword({ email: emailLookup, password })
      if (error) return { error: error.message }
      return { error: null }
    }

    return { error: 'Invalid credentials. Try admin/admin' }
  }

  const signOut = async () => {
    if (isDemoMode) {
      localStorage.removeItem('hms-demo-session')
      setUser(null)
      setSession(null)
      setRole(null)
      return
    }
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    setRole(null)
  }

  return (
    <AuthContext.Provider value={{ user, session, role, loading, signIn, signOut, isDemoMode }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
