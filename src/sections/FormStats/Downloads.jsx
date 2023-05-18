/* eslint-disable react/prop-types */
import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export default function Downloads({ generatePdf, generateXlsx }) {
  return (
    <Grid container sx={{ mb: 0.5 }}>
      <Grid item xs={12} md={6} lg={6}>
        <Button variant="contained" color="success" onClick={generatePdf}>
          Descargar PDF
        </Button>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Box display="flex" justifyContent="flex-end" alignItems="flex-start">
          <Button variant="contained" color="success" onClick={generateXlsx}>
            Descargar XLSX
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}
