import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

// eslint-disable-next-line import/prefer-default-export
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("There isn't a auth context")
  return context
}
