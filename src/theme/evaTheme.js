import { createTheme } from '@mui/material/styles'

const evaTheme = createTheme({
  palette: {
    primary: {
      main: '#3974A6'
    },
    secondary: {
      main: '#BC2423'
    },
    success: {
      main: '#69a644',
      contrastText: '#fff'
    },
    hookgreen: {
      main: '#3b6a60',
      contrastText: '#fff'
    },
    info: {
      main: '#3c91e6'
    },
    error: {
      main: '#c3423f'
    }
  }
})

export default evaTheme
