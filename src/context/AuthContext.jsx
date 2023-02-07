import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect
} from 'react'
import loginService from '../services/loginService'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("There isn't a auth context")
  return context
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedEvaAppUser')
    setUser(loggedUserJSON)
  }, [])

  const login = async (email, password) => {
    setIsLoading(true)
    const userResponse = await loginService.signIn({ email, password })
    const currentUser = userResponse?.data
    setUser(currentUser)
    setIsLoading(false)
    window.localStorage.setItem('loggedEvaAppUser', JSON.stringify(currentUser))
    return true
  }

  const logout = () => {
    loginService.signOut()
    window.localStorage.removeItem('loggedEvaAppUser')
    setUser(null)
  }

  const memoizedValue = useMemo(
    () => ({ user, isLoading, login, logout }),
    [user, isLoading, login, logout]
  )

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  )
}
