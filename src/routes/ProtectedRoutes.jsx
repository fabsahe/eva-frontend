import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'

/* eslint-disable no-unused-vars */
/* eslint react/prop-types: 0 */
function NoUserRoute({ admin, location }) {
  return admin ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  )
}

export default function ProtectedRoute(props) {
  const location = useLocation()

  const loggedUserJSON = window.localStorage.getItem('loggedEvaAppUser')

  const { isAdmin } = props

  return loggedUserJSON ? <Outlet /> : <Navigate to="/" />
}
