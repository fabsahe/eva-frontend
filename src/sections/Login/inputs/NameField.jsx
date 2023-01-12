import React, { useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import validator from 'validator'

/* eslint react/prop-types: 0 */
export default function NameField({ name, setName, error, setError, focus }) {
  const [nameValidate, setNameValidate] = useState(false)

  const validateName = (e, source) => {
    e.preventDefault()

    if ((nameValidate || source === 'onblur') && e.target.value.length > 25) {
      setError(true)
    } else {
      setError(false)
    }

    setName(e.target.value)
  }

  const activateValidation = (e) => {
    e.target.value = validator.trim(e.target.value)
    if (nameValidate === false) {
      setNameValidate(true)
    }
    validateName(e, 'onblur')
  }

  return (
    <FormControl sx={{ my: 2 }} variant="outlined" fullWidth>
      <InputLabel htmlFor="name-field" error={error} required>
        Nombre
      </InputLabel>
      <OutlinedInput
        required
        fullWidth
        type="text"
        label="Nombre"
        name="name-field"
        id="name-field"
        autoComplete="name-field"
        value={name}
        onBlur={(e) => activateValidation(e)}
        onChange={(e) => validateName(e, 'change')}
        error={error}
        autoFocus={focus}
      />
      <FormHelperText id="name-error" error={error} sx={{ height: 4 }}>
        {error ? 'El nombre no puede exceder de 25 caracteres' : ''}
      </FormHelperText>
    </FormControl>
  )
}
