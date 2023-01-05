import React, { useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import validator from 'validator'

/* eslint react/prop-types: 0 */
export default function EmailField ({
  email,
  setEmail,
  error,
  setError,
  focus
}) {
  const [emailValidate, setEmailValidate] = useState(false)

  const validateEmail = (e, source) => {
    e.preventDefault()

    if (
      (emailValidate || source === 'onblur') &&
      !validator.isEmail(e.target.value)
    ) {
      setError(true)
    } else {
      setError(false)
    }

    setEmail(e.target.value)
  }

  const activateValidation = (e) => {
    e.preventDefault()
    if (e.relatedTarget && e.relatedTarget.href) {
      return
    }

    e.target.value = validator.trim(e.target.value)
    if (emailValidate === false) {
      setEmailValidate(true)
    }
    validateEmail(e, 'onblur')
  }

  return (
    <FormControl sx={{ my: 1 }} variant="outlined" fullWidth>
      <InputLabel htmlFor="email-field" error={error} required>
        Correo electrónico
      </InputLabel>
      <OutlinedInput
        required
        fullWidth
        type="text"
        label="Correo electrónico"
        name="email-field-eva"
        id="email-field"
        autoComplete="email-field-eva"
        value={email}
        onBlur={(e) => activateValidation(e)}
        onChange={(e) => validateEmail(e, 'change')}
        error={error}
        autoFocus={focus}
      />
      <FormHelperText id="email-error" error={error} sx={{ height: 4 }}>
        {error ? 'El correo tiene un formato incorrecto' : ''}
      </FormHelperText>
    </FormControl>
  )
}
