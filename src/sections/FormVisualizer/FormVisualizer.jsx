/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import axios from 'axios'
import Logo from '../../assets/images/utm-header.jpg'

export default function FormVisualizer() {
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [period, setPeriod] = useState('')
  const [careers, setCareers] = useState([])
  const [questions, setQuestions] = useState([])
  const [visible, setVisible] = useState(null)

  const params = useParams()
  const { formId } = params

  const getForm = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/forms/${formId}`
      )
      const { data } = response.data
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
  useEffect(() => {
    getForm()
  }, [])

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        spacing: 1
      }}
    >
      <AppBar
        position="absolute"
        sx={{
          backgroundColor: '#ffffff',
          borderBottom: 1,
          borderColor: '#d4d4d4'
        }}
        elevation={0}
      >
        <Toolbar
          sx={{
            pr: '24px' // keep right padding when drawer closed
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            width="55"
            style={{
              marginTop: 7,
              marginLeft: -8,
              display: { xs: 'none', md: 'flex' },
              flexGrow: 0
            }}
          />
        </Toolbar>
      </AppBar>

      <Typography component="h1" variant="h4">
        {visible ? title : 'El cuestionario no se encuentra activo'}
      </Typography>
    </Box>
  )
}
