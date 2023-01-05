import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'

const theme = createTheme()

export default function FormVisualizer () {
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [period, setPeriod] = useState('')
  const [careers, setCareers] = useState([])
  const [questions, setQuestions] = useState([])
  const params = useParams()

  useEffect(() => {
    getForm()
  }, [])

  const getForm = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/form/${params.formId}`)
      const data = response.data.data
      // console.log(data)
      setTitle(data.titulo)
      setYear(data['año'])
      setPeriod(data.periodo)
      setCareers(data.carreras)
      setQuestions(data.items)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            spacing: 1
          }}
        >
          <Typography component="h1" variant="h5">
            { title }
          </Typography>
          <Typography component="h1" variant="h6">
            { `${year} - ${period}` }
          </Typography>

          <ul>
            {careers && careers.map((career) => (
              <li key={career._id}>{career.nombre} </li>
            ))}
          </ul>

          { questions && questions.map((item, index) => (
              <Card key={item._id} variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                <Typography variant="h5" component="div">
                  {`${index + 1} - ${item.pregunta}`}
                </Typography>
                {
                  item.opciones && item.opciones.map((opcion) => (
                    <Typography variant="body1" component="div" key={opcion._id}>
                      {`🍍 ${opcion.texto}`}
                    </Typography>
                  )
                  )
                }
                </CardContent>
              </Card>
          )) }
        </Box>

      </Container>
    </ThemeProvider>
  )
}
