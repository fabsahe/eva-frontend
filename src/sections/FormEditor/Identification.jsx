/* eslint-disable react/prop-types */
import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import OutlinedInput from '@mui/material/OutlinedInput'
import {
  useEmptyForm,
  useTitle,
  useYear,
  usePeriod,
  useCareers,
  useFormActions
} from '../../store/formStore'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const titleList = {
  create: 'Nuevo cuestionario',
  clone: 'Nuevo cuestionario (clon)',
  edit: 'Editar cuestionario'
}

export default function Identification({ mode, careerList, periodList }) {
  const emptyForm = useEmptyForm()
  const title = useTitle()
  const year = useYear()
  const period = usePeriod()
  const careers = useCareers()
  const { setTitle, setYear, setPeriod, setCareers } = useFormActions()

  const editorTitle = titleList[mode] || ''
  const careerEntries = careerList.map((career) => [career._id, career.nombre])
  const careerNames = Object.fromEntries(careerEntries)
  const yearOptions = periodList.map((item) => item.año).reverse()
  const periodOptions = periodList.find((item) => item.año === year)

  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleChangeYear = (event) => {
    setYear(event.target.value)
  }
  const handleChangePeriod = (event) => {
    setPeriod(event.target.value)
  }

  const handleChangeCareers = (event) => {
    const {
      target: { value }
    } = event
    setCareers(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        {editorTitle}
      </Typography>

      <TextField
        id="titulo-cuestionario"
        label="Título"
        variant="outlined"
        sx={{ mb: 2 }}
        value={title}
        onChange={handleChangeTitle}
        autoComplete="off"
        fullWidth
        required
      />

      <FormControl fullWidth sx={{ mb: 2 }} disabled={!emptyForm}>
        <InputLabel id="demo-multiple-chip-label">Carreras</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={careers}
          onChange={handleChangeCareers}
          input={<OutlinedInput id="select-multiple-chip" label="Carreras" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={careerNames[value]} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          required
        >
          {careerList.map((career) => (
            <MenuItem key={career._id} value={career._id}>
              {career.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={2}>
        <Grid item md={6} lg={6}>
          {yearOptions.length > 1 ? (
            <FormControl fullWidth disabled={!emptyForm}>
              <InputLabel id="year-select-label">Año</InputLabel>

              <Select
                labelId="year-select-label"
                id="year-form-select"
                value={year}
                label="Año"
                onChange={handleChangeYear}
                required
              >
                {yearOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}
        </Grid>
        <Grid item md={6} lg={6}>
          <FormControl fullWidth disabled={!emptyForm || !periodOptions}>
            <InputLabel id="period-select-label">Periodo</InputLabel>
            <Select
              labelId="period-select-label"
              id="period-form-select"
              value={periodOptions?.nombres.length > 1 ? period : ''}
              label="Periodo"
              onChange={handleChangePeriod}
              required
            >
              {periodOptions?.nombres &&
                periodOptions.nombres.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  )
}
