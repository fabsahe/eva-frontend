/* eslint-disable react/prop-types */
import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

export default function OpenEnded({ answers }) {
  const answersArr = answers.flat().map((answer, index) => ({
    id: index,
    value: answer
  }))

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <Box sx={{ pt: 0, px: 2, mt: -1, mb: 1 }}>
          <ul>
            {answersArr.map((answer) => (
              <li key={answer.id}>{answer.value}</li>
            ))}
          </ul>
        </Box>
      </Grid>
    </Grid>
  )
}
