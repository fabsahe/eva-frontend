import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Slider from '@mui/material/Slider'
import { useOptions, useFormActions } from '../../../store/formStore'

export default function Scale() {
  const options = useOptions()
  const { scale, labels } = options
  const { setOptions } = useFormActions()
  const initial = scale[1].value - scale[0].value

  const [step, setStep] = useState(initial)
  const [sliderValue, setSliderValue] = useState(initial)
  const [label1, setLabel1] = useState(labels[0])
  const [label2, setLabel2] = useState(labels[1])

  const setSlider = (increment) => {
    const length = 100 / increment
    const newScale = Array.from({ length }, (_, i) => ({
      value: (i + 1) * increment
    }))
    setStep(increment)
    setSliderValue(newScale[0].value)
    setOptions({ scale: newScale, labels: [label1, label2] })
  }

  const handleChangeIncrement = (event) => {
    const increment = event.target.value
    setSlider(increment)
  }

  const handleChangeSlider = (_, newValue) => {
    setSliderValue(newValue)
  }

  const handleChangeLabel = (event, pos) => {
    if (pos === 1) {
      setLabel1(event.target.value)
      setOptions({ scale, labels: [event.target.value, label2] })
      return
    }
    if (pos === 2) {
      setLabel2(event.target.value)
      setOptions({ scale, labels: [label1, event.target.value] })
    }
  }

  const valuetext = (value) => {
    return `${value}`
  }

  const valueLabelFormat = (value) => {
    const firstValue = value - step + (value === step ? 0 : 1)
    return `De ${firstValue}% a ${value}%`
  }

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item md={6}>
        <FormControl fullWidth sx={{ mt: 2.6, mb: 1 }}>
          <InputLabel id="demo-simple-select-label">Pasos</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={step}
            label="Pasos"
            onChange={handleChangeIncrement}
          >
            <MenuItem value={10}>De 10 en 10</MenuItem>
            <MenuItem value={20}>De 20 en 20</MenuItem>
          </Select>
        </FormControl>

        <TextField
          variant="outlined"
          placeholder="Etiqueta inicial"
          sx={{ mb: 1 }}
          value={label1}
          onChange={(event) => handleChangeLabel(event, 1)}
          onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
          autoComplete="off"
          hiddenLabel
          fullWidth
        />

        <TextField
          variant="outlined"
          placeholder="Etiqueta final"
          sx={{ mb: 1 }}
          value={label2}
          onChange={(event) => handleChangeLabel(event, 2)}
          onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
          autoComplete="off"
          hiddenLabel
          fullWidth
        />

        <Slider
          sx={{ mt: 6 }}
          aria-label="Restricted values"
          value={sliderValue}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          step={null}
          valueLabelDisplay="on"
          marks={scale}
          onChange={handleChangeSlider}
        />
      </Grid>
    </Grid>
  )
}
