import React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useOptions, useFormActions } from '../../../store/formStore'

export default function Dropdown() {
  const options = useOptions()
  const { dropdown } = options
  const { setOptions } = useFormActions()

  const handleChangeOption = (event, key) => {
    const index = key
    const newDropdown = [...dropdown]
    newDropdown[index].value = event.target.value
    setOptions({ dropdown: newDropdown })
  }

  const handleAddOption = () => {
    const lastElement = dropdown.at(-1)
    const newElement = {
      key: lastElement.key + 1,
      value: `Opción ${lastElement.key + 2}`
    }
    const newDropdown = [...dropdown, newElement]
    setOptions({ dropdown: newDropdown })
  }

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item md={6}>
        <Typography component="h1" variant="subtitle2">
          Opciones
        </Typography>

        <Stack sx={{ width: '100%' }}>
          {dropdown.map((element) => (
            <TextField
              key={element.key}
              variant="outlined"
              placeholder="Texto de la opción"
              sx={{ mb: 1 }}
              value={element.value}
              onChange={(event) => handleChangeOption(event, element.key)}
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
