import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import evaTheme from '@/theme/evaTheme'
import snackbarProps from '@/utils/snackbarProps'
import ProtectedRoutes from '@/routes/ProtectedRoutes'
import FormVisualizer from '@/sections/FormVisualizer/FormVisualizer'
import Dashboard from '@/sections/Dashboard/Dashboard'
import Login from '@/sections/Login/Login'

export default function App () {
  return (
    <ThemeProvider theme={evaTheme}>
      <SnackbarProvider {...snackbarProps}>
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/formulario/:formId" element={<FormVisualizer />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/:section" element={<Dashboard />} />
              <Route path="/dashboard/:section/:id" element={<Dashboard />} />
            </Route>
          </Routes>
        </main>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
