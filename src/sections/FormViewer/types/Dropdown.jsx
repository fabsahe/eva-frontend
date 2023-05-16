/* eslint-disable react/prop-types */
import React from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import {
  useAnswers,
  useFormViewerActions
} from '../../../store/formViewerStore'

export default function Dropdown({ questionId, options }) {
  const [element, setElement] = React.useState('')

  const answers = useAnswers()
  const { setAnswers } = useFormViewerActions()

  const { dropdown } = options

  const handleChangeAnswer = (event) => {
    setElement(event.target.value)

    const newAnswers = answers.map((answer) => {
      if (answer.question === questionId) {
        return { question: answer.question, answers: [event.target.value] }
      }
      return answer
    })

    setAnswers(newAnswers)
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
        onChange={handleChangeAnswer}
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
