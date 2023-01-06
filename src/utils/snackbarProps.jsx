import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const snackbarProps = {
  maxSnack: 3,
  autoHideDuration: 2000,
  iconVariant: {
    success: <CheckCircleOutlineIcon color="success" sx={{ mr: 1, ml: -1 }} />,
    error: <ErrorOutlineIcon color="error" sx={{ mr: 1, ml: -1 }} />
  }
}

export default snackbarProps
