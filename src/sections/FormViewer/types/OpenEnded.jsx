import React from 'react'
import TextField from '@mui/material/TextField'

export default function OpenEnded() {
  return (
    <TextField
      fullWidth
      hiddenLabel
      variant="outlined"
      autoComplete="off"
      sx={{ mb: 1 }}
    />
  )
}
