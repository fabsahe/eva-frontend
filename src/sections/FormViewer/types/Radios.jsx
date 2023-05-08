/* eslint-disable react/prop-types */
import React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import {
  useAnswers,
  useFormViewerActions
} from '../../../store/formViewerStore'

export default function Radios({ questionId, options }) {
  const answers = useAnswers()
  const { setAnswers } = useFormViewerActions()

  const { radios } = options

  const handleChangeAnswer = (event) => {
    const newAnswers = answers.map((answer) => {
      if (answer.question === questionId) {
        return { question: answer.question, answers: [event.target.value] }
      }
      return answer
    })

    setAnswers(newAnswers)
  }

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Respuestas</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={(e) => handleChangeAnswer(e)}
      >
        {radios.map((radio) => (
          <FormControlLabel
            key={radio.key}
            value={radio.value}
            control={<Radio />}
            label={radio.value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
