import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent'
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import axios from 'axios'

export default function InfoCard () {
  const [number, setNumber] = useState(0)

  useEffect(() => {
    getFormsNumber()
  })

  const getFormsNumber = async () => {
    const response = await axios.get('http://localhost:3001/api/forms')
    const data = response.data.data
    setNumber(data.length)
  }

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
            { number === 1 ? `${number} cuestionario creado` : `${number} cuestionarios creados` }
          </Typography>
        </CardContent>
      </Card>

    </Box>
  )
}
