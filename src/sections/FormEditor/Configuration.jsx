/* eslint-disable react/prop-types */
import React from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
// eslint-disable-next-line no-unused-vars
import { es } from 'dayjs/locale/es'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useStartDate, useEndDate, useFormActions } from '../../store/formStore'

export default function Configuration({ mode }) {
  const startDate = useStartDate()
  const endDate = useEndDate()
  const { setStartDate, setEndDate } = useFormActions()

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography component="h1" variant="h6" sx={{ mb: 2 }}>
        Configuración
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <DatePicker
          label="Fecha de inicio"
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue)
          }}
          disablePast={mode !== 'edit'}
        />
        <Box sx={{ my: 1 }} />
        <DatePicker
          label="Fecha de finalización"
          value={endDate}
          onChange={(newValue) => {
            setEndDate(newValue)
          }}
          disablePast={mode !== 'edit'}
        />
      </LocalizationProvider>
    </Paper>
  )
}
