/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import TextField from '@mui/material/TextField'
import {
  useAnswers,
  useFormViewerActions
} from '../../../store/formViewerStore'

export default function OpenEnded({ questionId }) {
  const answers = useAnswers()
  const { setAnswers } = useFormViewerActions()

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
    <TextField
      fullWidth
      hiddenLabel
      variant="outlined"
      autoComplete="off"
      sx={{ mb: 1 }}
      onBlur={(e) => handleChangeAnswer(e)}
    />
  )
}
