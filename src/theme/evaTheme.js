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
    lapizlazuli: {
      main: '#346187',
      dark: '#264969',
      contrastText: '#eee'
    },
    avocado: {
      main: '#6e851d',
      dark: '#5E7119',
      contrastText: '#fff'
    },
    hookgreen: {
      main: '#3b6a60',
      contrastText: '#fff'
    },
    applegreen: {
      main: '#8EA604'
    },
    glaucous: {
      main: '#777da7'
    },
    info: {
      main: '#3c91e6'
    },
    error: {
      main: '#ad2831'
    }
  }
})

export default evaTheme
