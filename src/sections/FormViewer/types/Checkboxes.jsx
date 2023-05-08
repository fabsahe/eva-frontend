/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'
import {
  useAnswers,
  useFormViewerActions
} from '../../../store/formViewerStore'

export default function Checkboxes({ questionId, options }) {
  const [checkboxes, setCheckboxes] = useState([...options.checkboxes])

  const answers = useAnswers()
  const { setAnswers } = useFormViewerActions()

  const handleChangeAnswer = (answerList) => {
    const newAnswers = answers.map((answer) => {
      if (answer.question === questionId) {
        return { question: answer.question, answers: [...answerList] }
      }
      return answer
    })

    setAnswers(newAnswers)
  }

  const handleChangeCheckboxes = (event, id) => {
    const newCheckboxes = [...checkboxes]
    newCheckboxes[id].checked = event.target.checked
    setCheckboxes(newCheckboxes)

    const answerList = newCheckboxes
      .filter((obj) => obj.checked)
      .map((obj) => obj.value)
    handleChangeAnswer(answerList)
  }

  useEffect(() => {
    setCheckboxes([...options.checkboxes])
  }, [options])

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
