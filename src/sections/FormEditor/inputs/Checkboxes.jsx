import React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useOptions, useFormActions } from '../../../store/formStore'

export default function Checkboxes() {
  const options = useOptions()
  const { checkboxes } = options
  const { setOptions } = useFormActions()

  const handleChangeOption = (event, key) => {
    const index = key
    const newCheckboxes = [...checkboxes]
    newCheckboxes[index].value = event.target.value
    setOptions({ checkboxes: newCheckboxes })
  }

  const handleAddOption = () => {
    const lastCheckbox = checkboxes.at(-1)
    const newCheckbox = {
      key: lastCheckbox.key + 1,
      value: `Opción ${lastCheckbox.key + 2}`,
      checked: false
    }
    const newCheckboxes = [...checkboxes, newCheckbox]
    setOptions({ checkboxes: newCheckboxes })
  }

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item md={6}>
        <Typography component="h1" variant="subtitle2">
          Opciones
        </Typography>

        <Stack sx={{ width: '100%' }}>
          {checkboxes.map((checkbox) => (
            <TextField
              key={checkbox.key}
              variant="outlined"
              placeholder="Texto de la opción"
              sx={{ mb: 1 }}
              value={checkbox.value}
              onChange={(event) => handleChangeOption(event, checkbox.key)}
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
