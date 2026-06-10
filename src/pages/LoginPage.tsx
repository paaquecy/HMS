import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader as Loader2, Activity, Shield, Lock, Server, FileText, Moon, Sun } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

const ROLE_ROUTES: Record<string, string> = {
  super_admin: '/',
  hospital_admin: '/',
  doctor: '/patients',
  nurse: '/patients',
  receptionist: '/patients',
  pharmacist: '/patients',
  limited: '/patients',
}

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { signIn, role } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!username.trim()) { setError('Username is required'); return }
    if (!password) { setError('Password is required'); return }

    const email = username.includes('@') ? username : `${username}@medicare.com`

    setSubmitting(true)
    const { error: authError } = await signIn(email, password)
    setSubmitting(false)

    if (authError) {
      if (authError.toLowerCase().includes('invalid login')) {
        setError('Invalid username or password. Please try again.')
      } else {
        setError(authError)
      }
    }
  }

  if (role) {
    navigate(ROLE_ROUTES[role] ?? '/', { replace: true })
  }

  const securityFeatures = [
    { icon: Shield, label: 'Role-Based Access Control' },
    { icon: Lock, label: 'End-to-End Encryption' },
    { icon: Server, label: 'Secure Session Management' },
    { icon: FileText, label: 'Audit Logging Enabled' },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/20" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-white/10" />
          <div className="absolute left-1/3 top-1/2 h-60 w-60 rounded-full bg-white/15" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">MediCare HMS</p>
              <p className="text-xs text-white/70">Hospital Management System</p>
            </div>
          </div>

          <div className="max-w-md">
            <h1 className="text-4xl font-bold leading-tight text-white">
              Secure Super Admin<br />Access Portal
            </h1>
            <p className="mt-4 text-base text-white/70 leading-relaxed">
              Access your hospital management dashboard with enterprise-grade security.
              All sessions are encrypted and monitored for compliance.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {securityFeatures.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                  <Icon className="h-5 w-5 shrink-0 text-white/80" />
                  <span className="text-sm font-medium text-white/90">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Hospital Management System &middot; v1.0.0
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex w-full flex-col lg:w-1/2">
        {/* Top bar with theme toggle */}
        <div className="flex items-center justify-between px-6 py-4 sm:px-10">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-600/30">
              <Activity className="h-5 w-5" />
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">MediCare HMS</p>
          </div>
          <button
            onClick={toggleTheme}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
        </div>

        {/* Form container */}
        <div className="flex flex-1 items-center justify-center px-6 py-8 sm:px-10">
          <div className="w-full max-w-md">
            {/* Mobile branding */}
            <div className="mb-8 text-center lg:hidden">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Hospital Management System</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Secure Super Admin Access Portal</p>
            </div>

            <div className="glass-card p-8">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 shadow-md dark:bg-primary-900/50">
                  <Shield className="h-7 w-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Sign In</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Enter your credentials to access the dashboard</p>
              </div>

              {error && (
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
                  <Shield className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Username / Email
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username or email"
                      className="input-field pl-10"
                      autoComplete="username"
                      autoFocus
                    />
                    <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="input-field pl-10 pr-10"
                      autoComplete="current-password"
                    />
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
                  </label>
                  <button type="button" className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center py-2.5 text-base"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>
            </div>

            {/* Security badges — mobile */}
            <div className="mt-6 grid grid-cols-2 gap-2 lg:hidden">
              {securityFeatures.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-800/50">
                  <Icon className="h-4 w-4 shrink-0 text-primary-600 dark:text-primary-400" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
              &copy; {new Date().getFullYear()} Hospital Management System &middot; v1.0.0
              <br />
              <span className="inline-flex gap-3 mt-1">
                <button className="hover:text-primary-500">Privacy Policy</button>
                <button className="hover:text-primary-500">Terms of Service</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
