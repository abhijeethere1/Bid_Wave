import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] dark:bg-[#121212]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#4B0082] dark:border-[#9D4EDD] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[#737373] dark:text-[#A0A0A0]">Loading...</p>
      </div>
    </div>
  )

  if (!user) return <Navigate to="/login" replace />
  return children
}