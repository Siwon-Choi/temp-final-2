import { useEffect } from 'react'
import { getMe } from '../../api/users'
import { useAuthStore } from '../../store/authStore'

function AuthBootstrap() {
  const setAuthState = useAuthStore((state) => state.setAuthState)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const markInitialized = useAuthStore((state) => state.markInitialized)

  useEffect(() => {
    let isMounted = true

    const initializeAuth = async () => {
      try {
        await getMe()

        if (isMounted) {
          setAuthState({ isAuthenticated: true })
        }
      } catch {
        if (isMounted) {
          clearAuth()
        }
      } finally {
        if (isMounted) {
          markInitialized()
        }
      }
    }

    void initializeAuth()

    return () => {
      isMounted = false
    }
  }, [clearAuth, markInitialized, setAuthState])

  return null
}

export default AuthBootstrap
