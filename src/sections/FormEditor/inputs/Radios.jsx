import React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useOptions, useFormActions } from '../../../store/formStore'

export default function Radios() {
  const options = useOptions()
  const { radios } = options
  const { setOptions } = useFormActions()

  const handleChangeOption = (event, key) => {
    const index = key
    const newRadios = [...radios]
    newRadios[index].value = event.target.value
    setOptions({ radios: newRadios })
  }

  const handleAddOption = () => {
    const lastRadio = radios.at(-1)
    const newRadio = {
      key: lastRadio.key + 1,
      value: `Opción ${lastRadio.key + 2}`
    }
    const newRadios = [...radios, newRadio]
    setOptions({ radios: newRadios })
  }

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item md={6}>
        <Typography component="h1" variant="subtitle2">
          Opciones
        </Typography>

        <Stack sx={{ width: '100%' }}>
          {radios.map((radio) => (
            <TextField
              key={radio.key}
              variant="outlined"
              placeholder="Texto de la opción"
              sx={{ mb: 1 }}
              value={radio.value}
              onChange={(event) => handleChangeOption(event, radio.key)}
              onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
              autoComplete="off"
              hiddenLabel
            />
          ))}
        </Stack>

        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAddOption}
          fullWidth
          sx={{ mb: 1 }}
        >
          Agregar opción
        </Button>
      </Grid>
    </Grid>
  )
}
