/* eslint-disable react/prop-types */
import React from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

export default function Dropdown({ options }) {
  const [element, setElement] = React.useState('')
  const { dropdown } = options

  const handleChange = (event) => {
    setElement(event.target.value)
  }

  return (
    <FormControl fullWidth sx={{ mt: 0.2, mb: 0.4 }}>
      <InputLabel id="demo-simple-select-label">
        Selecciona una opción
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={element}
        label="Selecciona una opción"
        onChange={handleChange}
      >
        {dropdown.map((item) => (
          <MenuItem key={item.key} value={item.value}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
