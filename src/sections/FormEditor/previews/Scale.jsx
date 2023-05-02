/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

export default function Scale({ options }) {
  const { scale, labels } = options
  const [sliderValue, setSliderValue] = useState(scale[0].value)

  const handleChangeSlider = (_, newValue) => {
    setSliderValue(newValue)
  }

  const valuetext = (value) => {
    return `${value}`
  }

  const valueLabelFormat = (value) => {
    const step = scale[1].value - scale[0].value
    const firstValue = value - step + (value === step ? 0 : 1)
    return `De ${firstValue}% a ${value}%`
  }

  return (
    <Grid container>
      <Grid item md={2} lg={2}>
        <Box display="flex" justifyContent="center" alignItems="flex-end">
          <p>{labels[0]}</p>
        </Box>
      </Grid>
      <Grid item md={8} lg={8}>
        <Slider
          sx={{ mt: 4, mb: 2 }}
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
      <Grid item md={2} lg={2}>
        <Box display="flex" justifyContent="center" alignItems="flex-end">
          <p>{labels[1]}</p>
        </Box>
      </Grid>
    </Grid>
  )
}
