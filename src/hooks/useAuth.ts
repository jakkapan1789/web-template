import { useEffect } from 'react'
import { usePersistentState } from './usePersistentState'

const AUTH_STORAGE_KEY = 'web-template-authenticated'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = usePersistentState(
    AUTH_STORAGE_KEY,
    false,
  )

  useEffect(() => {
    const handleLogout = () => setIsAuthenticated(false)

    window.addEventListener('app:logout', handleLogout)
    return () => window.removeEventListener('app:logout', handleLogout)
  }, [setIsAuthenticated])

  return {
    isAuthenticated,
    login: () => setIsAuthenticated(true),
    logout: () => setIsAuthenticated(false),
  }
}
