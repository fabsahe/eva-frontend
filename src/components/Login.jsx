/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import EmailField from './inputs/EmailField'
import PasswordField from './inputs/PasswordField'
import loginService from '../services/login'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [user, setUser] = useState(null)
  const [authenticated, setAuthenticated] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (authenticated) {
      navigate('/dashboard')
    }
  }, [authenticated])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: email,
        password
      })

      window.localStorage.setItem(
        'loggedEvaAppUser', JSON.stringify(user)
      )
      setUser(user)
      setEmail('')
      setPassword('')
      setAuthenticated(true)
    } catch (e) {
      setAuthenticated(false)
      setErrorMessage('Credenciales no válidas')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (

          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {location.state &&
                !location.state.from.pathname.includes('product') && (
                  <Alert severity="info">
                    Necesitas identificarte para acceder a esta página
                  </Alert>
              )}
              {errorMessage && (
                <Alert severity="error">
                  El correo o la contraseña son incorrectos
                </Alert>
              )}
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Ingresar
              </Typography>
              <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                <EmailField
                  email={email}
                  setEmail={setEmail}
                  error={emailError}
                  setError={setEmailError}
                />

                <PasswordField
                  label="Contraseña"
                  password={password}
                  setPassword={setPassword}
                  error={passwordError}
                  setError={setPasswordError}
                />

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Recordarme"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Iniciar sesión
                </Button>
              </Box>

              {/* <Grid container spacing={2}>
                <Grid item xs>
                  <Button
                    component={RouterLink}
                    to="/password/forgot"
                    variant="outlined"
                    sx={{
                      textAlign: 'center',
                      textTransform: 'none',
                      fontWeight: 400
                    }}
                    fullWidth
                  >
                    ¿Contraseña olvidada?
                  </Button>
                </Grid>
                <Grid item xs>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="outlined"
                    sx={{
                      textAlign: 'center',
                      textTransform: 'none',
                      fontWeight: 400
                    }}
                    fullWidth
                  >
                    Registrarse
                  </Button>
                </Grid>
                  </Grid> */}
            </Box>
          </Container>

  )
}
