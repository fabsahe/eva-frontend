/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import axios from 'axios'

export default function FormVisualizer () {
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [period, setPeriod] = useState('')
  const [careers, setCareers] = useState([])
  const [questions, setQuestions] = useState([])
  const [visible, setVisible] = useState(null)
  const params = useParams()
  const { formId } = params

  useEffect(() => {
    getForm()
  }, [])

  const getForm = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/forms/${formId}`)
      const data = response.data.data
      console.log(data)
      setTitle(data.titulo)
      setYear(data['año'])
      setPeriod(data.periodo)
      setCareers(data.carreras)
      setQuestions(data.items)
      setVisible(data.visible)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          spacing: 1
        }}
      >
        <Typography component="h1" variant="h4">
          { visible ? title : 'El cuestionario no se encuentra activo' }
        </Typography>
      </Box>
    </>

  )
}
