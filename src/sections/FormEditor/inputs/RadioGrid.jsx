import React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useOptions, useFormActions } from '../../../store/formStore'

export default function RadioGrid() {
  const options = useOptions()
  const { rows, cols } = options
  const { setOptions } = useFormActions()

  const handleChangeRow = (event, id) => {
    const index = id
    const newRows = [...rows]
    newRows[index].value = event.target.value
    setOptions({ rows: newRows, cols })
  }

  const handleAddRow = () => {
    const lastRow = rows.at(-1)
    const newRow = {
      id: lastRow.id + 1,
      value: `Fila ${lastRow.id + 2}`
    }
    const newRows = [...rows, newRow]
    setOptions({ rows: newRows, cols })
  }

  const handleChangeCol = (event, id) => {
    const index = id
    const newCols = [...cols]
    newCols[index].value = event.target.value
    setOptions({ rows, cols: newCols })
  }

  const handleAddCol = () => {
    const lastCol = cols.at(-1)
    const newCol = {
      id: lastCol.id + 1,
      value: `Columna ${lastCol.id + 2}`
    }
    const newCols = [...cols, newCol]
    setOptions({ rows, cols: newCols })
  }

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item md={6}>
        <Typography component="h1" variant="subtitle2">
          Filas
        </Typography>

        <Stack sx={{ width: '100%' }}>
          {rows.map((row) => (
            <TextField
              key={row.id}
              variant="outlined"
              placeholder="Texto de la opción"
              sx={{ mb: 1 }}
              value={row.value}
              onChange={(event) => handleChangeRow(event, row.id)}
              onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
              autoComplete="off"
              hiddenLabel
            />
          ))}
        </Stack>

        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAddRow}
          fullWidth
          sx={{ mt: 1, mb: 1 }}
        >
          Agregar fila
        </Button>
      </Grid>

      <Grid item md={6}>
        <Typography component="h1" variant="subtitle2">
          Columnas
        </Typography>

        <Stack sx={{ width: '100%' }}>
          {cols.map((col) => (
            <TextField
              key={col.id}
              variant="outlined"
              placeholder="Texto de la opción"
              sx={{ mb: 1 }}
              value={col.value}
              onChange={(event) => handleChangeCol(event, col.id)}
              onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
              autoComplete="off"
              hiddenLabel
            />
          ))}
        </Stack>

        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAddCol}
          fullWidth
          sx={{ mt: 1, mb: 1 }}
        >
          Agregar columna
        </Button>
      </Grid>
    </Grid>
  )
}
