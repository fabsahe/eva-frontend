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

export default function RadioGrid({ options }) {
  const [selectedValue, setSelectedValue] = useState('')

  const { rows, cols } = options

  const handleChange = (event) => {
    setSelectedValue(event.target.value)
  }

  return (
    <TableContainer component={Box}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ th: { border: 0 } }}>
            <TableCell />
            {cols.map((col) => (
              <TableCell key={`c-${col.id}`} align="center" sx={{ pb: 0 }}>
                {col.value}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={`r-${row.id}`} sx={{ 'td, th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.value}
              </TableCell>
              {cols.map((col) => (
                <TableCell key={`${row.id}-${col.id}`} align="center">
                  <Radio
                    checked={selectedValue === `${row.id}-${col.id}`}
                    onChange={handleChange}
                    value={`${row.id}-${col.id}`}
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'A' }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
