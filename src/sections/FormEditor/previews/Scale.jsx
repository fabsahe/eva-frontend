/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'

function ScaleLabel({ label }) {
  return (
    <Typography
      variant="body1"
      component="div"
      sx={{ fontSize: 15, textAlign: 'center' }}
    >
      {label}
    </Typography>
  )
}

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
    return `${firstValue}% - ${value}%`
  }

  useEffect(() => {
    setSliderValue(scale[0].value)
  }, [options])
  return (
    <Grid container>
      <Grid item md={2} lg={2}>
        <Box display="flex" justifyContent="center" sx={{ pt: 3 }}>
          <ScaleLabel label={labels[0]} />
        </Box>
      </Grid>
      <Grid item md={8} lg={8}>
        <Slider
          sx={{ mt: 6, mb: 2 }}
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
        <Box display="flex" justifyContent="center" sx={{ pt: 3 }}>
          <ScaleLabel label={labels[1]} />
        </Box>
      </Grid>
    </Grid>
  )
}
