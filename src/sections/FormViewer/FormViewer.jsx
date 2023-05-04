import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import axios from 'axios'
// import { useSnackbar } from 'notistack'
import Loader from '../../common/Loader'
import FormBar from './FormBar'
import FormStepper from './FormStepper'
import FormQuestions from './FormQuestions'
// import { NOTI_ERROR } from '../../constants/notiConstants'
// import answerService from '../../services/answerService'
import { useSection, useFormViewerActions } from '../../store/formViewerStore'

const sectionMap = {
  stepper: <FormStepper />,
  questions: <FormQuestions />,
  finished: <p>Adiós</p>
}

export default function FormViewer() {
  const [title, setTitle] = useState('')
  const [visible, setVisible] = useState(null)
  // const [answers, setAnswers] = useState([])
  // const [finished, setFinished] = useState(false)
  const [loading, setLoading] = useState(true)

  const params = useParams()
  const { formId } = params
  // const { enqueueSnackbar: noti } = useSnackbar()

  const section = useSection()
  const { setSection, setCareers, setYear, setPeriod, setQuestions } =
    useFormViewerActions()

  const getForm = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/forms/${formId}`
      )
      const { data } = response.data
      setTitle(data.title)
      setCareers(data.careers)
      setYear(data.year)
      setPeriod(data.period)
      setQuestions(data.questions)
      setVisible(data.visible)
      setSection('stepper')

      /* const emptyAnswers = data.questions.map((item) => ({
        question: item._id,
        answer: ''
      }))
      setAnswers(emptyAnswers) */
    } catch (err) {
      console.error(err)
    }
  }

  /* const handleSubmit = async () => {
    const newAnsweredForm = {
      cuestionario: formId,
      carrera: career,
      grupo: group,
      profesor: professor,
      respuestas: answers
    }
    try {
      const response = await answerService.createNewAnswer(newAnsweredForm)
      if (response.data.status === 'OK') {
        setFinished(true)
      }
    } catch (error) {
      noti(error.mesage, NOTI_ERROR)
    }
  } */

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      await getForm()
      setLoading(false)
    }
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
