/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import {
  useAnswers,
  useFormViewerActions
} from '../../../store/formViewerStore'

function RadioRow({ questionId, rowKey, cols }) {
  const [selectedValue, setSelectedValue] = useState('')

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

  const handleChange = (event) => {
    setSelectedValue(event.target.value)
    const parts = event.target.value.split('-')
    const row = parseInt(parts[0], 10)
    const col = parseInt(parts[1], 10)
    const answerList = answers.find(
      (answer) => answer.question === questionId
    ).answers
    answerList[row] = cols[col].value

    handleChangeAnswer(answerList)
  }

  return (
    <>
      {cols.map((col) => (
        <TableCell key={`${rowKey}-${col.key}`} align="center">
          <Radio
            checked={selectedValue === `${rowKey}-${col.key}`}
            onChange={handleChange}
            value={`${rowKey}-${col.key}`}
            name={`radio-buttons-${rowKey}`}
            inputProps={{ 'aria-label': 'A' }}
          />
        </TableCell>
      ))}
    </>
  )
}

export default function RadioGrid({ questionId, options }) {
  const { rows, cols } = options

  return (
    <TableContainer component={Box}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ th: { border: 0 } }}>
            <TableCell />
            {cols.map((col) => (
              <TableCell key={`c-${col.key}`} align="center" sx={{ pb: 0 }}>
                {col.value}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={`r-${row.key}`} sx={{ 'td, th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.value}
              </TableCell>
              <RadioRow questionId={questionId} rowKey={row.key} cols={cols} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
