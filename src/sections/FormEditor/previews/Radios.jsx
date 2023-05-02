/* eslint-disable react/prop-types */
import React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

export default function Radios({ options }) {
  const { radios } = options

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Respuestas</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {radios.map((radio) => (
          <FormControlLabel
            key={radio.id}
            value={radio.value}
            control={<Radio />}
            label={radio.value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
