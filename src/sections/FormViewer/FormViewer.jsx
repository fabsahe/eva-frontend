import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
// import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Loader from '../../common/Loader'
import FormBar from './FormBar'
import FormStepper from './FormStepper'
import FormQuestions from './FormQuestions'
import formService from '../../services/formService'
import { useSection, useFormViewerActions } from '../../store/formViewerStore'

const sectionMap = {
  stepper: <FormStepper />,
  questions: <FormQuestions />,
  finished: (
    <Typography variant="h5" component="h1">
      Las respuestas se han enviado
    </Typography>
  )
}

export default function FormViewer() {
  const [title, setTitle] = useState('')
  const [visible, setVisible] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()
  const { formId } = params

  const section = useSection()
  const {
    setFormId,
    setSection,
    setCareers,
    setYear,
    setPeriod,
    setQuestions,
    setAnswers
  } = useFormViewerActions()

  const getForm = async () => {
    try {
      const response = await formService.getOneForm(formId)
      const { data } = response
      setTitle(data.title)
      setCareers(data.careers)
      setYear(data.year)
      setPeriod(data.period)
      setQuestions(data.questions)
      setVisible(data.visible)
      setSection('stepper')

      const emptyAnswers = data.questions.map((item) => ({
        question: item._id,
        answers: []
      }))
      setAnswers(emptyAnswers)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      await getForm()
      setLoading(false)
    }
    setFormId(formId)
    fetchData()
  }, [])

  return (
    <Box sx={{ backgroundColor: '#F1F5F6' }}>
      <CssBaseline />
      <FormBar />

      {loading ? (
        <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
          <Loader />
        </Container>
      ) : (
        <Container
          component="main"
          maxWidth="md"
          sx={{ pt: 10, mb: 0, minHeight: '100vh' }}
        >
          {visible ? (
            <>
              <Paper
                sx={{
                  mb: 2,
                  px: 2,
                  pt: 1.2,
                  pb: 1,
                  borderTop: '10px solid #346187'
                }}
              >
                <Typography variant="h4" component="h1" sx={{ fontSize: 32 }}>
                  {title}
                </Typography>
              </Paper>

              {sectionMap[section] ?? null}
            </>
          ) : (
            <Typography component="h1" variant="h4">
              El cuestionario no se encuentra activo
            </Typography>
          )}
        </Container>
      )}
    </Box>
  )
}
