import React from 'react'
import DoneIcon from '@mui/icons-material/Done'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const snackbarProps = {
  maxSnack: 3,
  iconVariant: {
    success: <DoneIcon color="success" sx={{ mr: 1, ml: -1 }} />,
    error: <ErrorOutlineIcon color="error" sx={{ mr: 1, ml: -1 }} />
  }
}

export default snackbarProps
