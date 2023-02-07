import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import evaTheme from './theme/evaTheme'
import snackbarProps from './utils/snackbarProps'
import ProtectedRoutes from './routes/ProtectedRoutes'
import FormViewer from './sections/FormViewer/FormViewer'
import Dashboard from './sections/Dashboard/Dashboard'
import Login from './sections/Login/Login'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  return (
    <ThemeProvider theme={evaTheme}>
      <SnackbarProvider {...snackbarProps}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cuestionarios/:formId" element={<FormViewer />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/:section" element={<Dashboard />} />
              <Route path="/dashboard/:section/:id" element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
