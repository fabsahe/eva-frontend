import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
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
    <Typography component="h1" variant="h4">
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
    <Box sx={{ display: 'flex' }}>
      <FormBar />

      {loading ? (
        <Box component="main" sx={{ flexGrow: 1, mt: 9 }}>
          <Loader />
        </Box>
      ) : (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: '80vh'
          }}
        >
          {visible ? (
            <Container maxWidth="md" sx={{ mt: 9 }}>
              <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
                {title}
              </Typography>
              {sectionMap[section] ?? null}
            </Container>
          ) : (
            <Container maxWidth="md" sx={{ mt: 9 }}>
              <Typography component="h1" variant="h4">
                El cuestionario no se encuentra activo
              </Typography>
            </Container>
          )}
        </Box>
      )}
    </Box>
  )
}
