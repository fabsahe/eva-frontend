import React, { useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import validator from 'validator'

/* eslint react/prop-types: 0 */
export default function PasswordField({
  label,
  password,
  setPassword,
  error,
  setError,
  focus
}) {
  const [passValidate, setPassValidate] = useState(false)
  const [show, setShow] = useState(false)

  const inputId = `password-field-${Math.random().toString(16).slice(2)}`

  const validatePassword = (e, source) => {
    e.preventDefault()

    if ((passValidate || source === 'onblur') && e.target.value.length < 6) {
      setError(true)
    } else {
      setError(false)
    }

    setPassword(e.target.value)
  }

  const activateValidation = (e) => {
    e.preventDefault()
    if (e.relatedTarget && e.relatedTarget.href) {
      return
    }
    e.target.value = validator.trim(e.target.value)
    if (passValidate === false) {
      setPassValidate(true)
    }

    validatePassword(e, 'onblur')
  }

  const handleClickShow = () => {
    setShow(!show)
  }

  const handleMouseDownPassword = (e) => {
    e.preventDefault()
  }

  return (
    <FormControl sx={{ my: 1 }} variant="outlined" fullWidth>
      <InputLabel htmlFor="password-field" error={error} required>
        {label}
      </InputLabel>
      <OutlinedInput
        required
        fullWidth
        type={show ? 'text' : 'password'}
        label={label}
        name="password-field"
        id={inputId}
        autoComplete="password-field"
        value={password}
        onBlur={(e) => activateValidation(e)}
        onChange={(e) => validatePassword(e, 'change')}
        error={error}
        autoFocus={focus}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShow}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText
        id="password-error"
        error={error}
        sx={{ height: 4, mt: -0.1 }}
      >
        {error ? 'La contraseña debe contener al menos 6 caracteres' : ''}
      </FormHelperText>
    </FormControl>
  )
}
