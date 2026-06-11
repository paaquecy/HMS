import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Loader as Loader2 } from 'lucide-react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (!user) {
    // Save the current path so we can redirect back after login
    sessionStorage.setItem('hms-redirect-path', location.pathname + location.search)
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
