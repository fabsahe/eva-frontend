/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import formService from '../../services/formService'

export default function InfoCard({ token }) {
  const [number, setNumber] = useState(0)

  const getFormsNumber = async () => {
    const response = await formService.getAllForms(token)
    const { data } = response
    setNumber(data.length)
  }

  useEffect(() => {
    getFormsNumber()
  })

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card sx={{ backgroundColor: '#78722e', height: 140 }}>
        <CardContent>
          <QuestionAnswerIcon sx={{ color: '#f4f4f4', fontSize: 30 }} />
          <Typography
            variant="h5"
            component="div"
            sx={{
              mb: 2,
              color: '#f4f4f4',
              underline: 'none'
            }}
          >
            {number === 1
              ? `${number} cuestionario creado`
              : `${number} cuestionarios creados`}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
