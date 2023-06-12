/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import EmailField from './inputs/EmailField'
import PasswordField from './inputs/PasswordField'
import { useAuth } from '../../context/AuthContext'
import careerService from '../../services/careerService'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [user, setUser] = useState(null)
  const [authenticated, setAuthenticated] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [check, setCheck] = useState(null)

  const { login } = useAuth()

  const location = useLocation()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (e) {
      setErrorMessage('Credenciales no válidas')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const checkDB = async () => {
    const response = await careerService.getAllCareers()
    const { data } = response
    setCheck(data)
  }

  useEffect(() => {
    checkDB()
  }, [])

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
          <Box sx={{ mt: 0.2 }} />

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
            sx={{ mt: 1, mb: 2 }}
          >
            Iniciar sesión
          </Button>
        </Box>

        {check &&
          check.map((item) => (
            <Typography key={item._id} variant="body2" component="div">
              {item.nombre}
            </Typography>
          ))}
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
