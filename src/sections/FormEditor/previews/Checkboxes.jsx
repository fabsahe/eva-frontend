/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'

export default function Checkboxes({ options }) {
  const [checkboxes, setCheckboxes] = useState(options.checkboxes)

  const handleChangeCheckboxes = (event, id) => {
    const newCheckboxes = [...checkboxes]
    newCheckboxes[id].checked = event.target.checked
    setCheckboxes(newCheckboxes)
  }

  return (
    <FormControl sx={{ m: 0 }} component="fieldset" variant="standard">
      <FormLabel component="legend">Respuestas</FormLabel>
      <FormGroup>
        {checkboxes.map((checkbox) => (
          <FormControlLabel
            key={checkbox.key}
            value={checkbox.value}
            control={
              <Checkbox
                checked={checkbox.checked}
                onChange={(event) =>
                  handleChangeCheckboxes(event, checkbox.key)
                }
                name={checkbox.value}
              />
            }
            label={checkbox.value}
          />
        ))}
      </FormGroup>
    </FormControl>
  )
}
