/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import { useSnackbar } from 'notistack'
import OpenEnded from './types/OpenEnded'
import Radios from './types/Radios'
import Dropdown from './types/Dropdown'
import Checkboxes from './types/Checkboxes'
import Scale from './types/Scale'
import RadioGrid from './types/RadioGrid'
import { NOTI_ERROR } from '../../constants/notiConstants'
import answerService from '../../services/answerService'
import {
  useFormId,
  useCareer,
  useGroup,
  useProfessor,
  useQuestions,
  useAnswers,
  useFormViewerActions
} from '../../store/formViewerStore'

const normalPaper = {
  p: 2,
  display: 'flex',
  flexDirection: 'column'
}

const errorPaper = {
  p: 2,
  display: 'flex',
  flexDirection: 'column',
  border: '2px solid #F8EDEE'
}

export default function FormViewer() {
  const [errorList, setErrorList] = useState([])
  const [validForm, setValidForm] = useState(true)
  const [submitClicked, setSubmitClicked] = useState(0)

  const alertRef = useRef(null)

  const formId = useFormId()
  const career = useCareer()
  const group = useGroup()
  const professor = useProfessor()
  const questions = useQuestions()
  const answers = useAnswers()

  const { setSection } = useFormViewerActions()

  const { enqueueSnackbar: noti } = useSnackbar()

  const getInputs = (question) => {
    const { _id: id, type, options } = question
    const typeMap = {
      'open-ended': <OpenEnded questionId={id} />,
      radios: <Radios questionId={id} options={options} />,
      dropdown: <Dropdown questionId={id} options={options} />,
      checkboxes: <Checkboxes questionId={id} options={options} />,
      scale: <Scale questionId={id} options={options} />,
      grid: <RadioGrid questionId={id} options={options} />
    }
    return typeMap[type] ?? null
  }

  const validateAnswers = () => {
    const questionsToValidate = questions
      .filter((question) => question.type !== 'checkboxes')
      .map((question) => question._id)
    const answersToValidate = answers.filter((answer) =>
      questionsToValidate.includes(answer.question)
    )
    const validations = answersToValidate.map((answer) => ({
      question: answer.question,
      error: answer.answers.length === 0
    }))
    const errors = validations.reduce((acc, { question, error }) => {
      acc[question] = error
      return acc
    }, {})
    setErrorList(errors)
    return !Object.values(errors).includes(true)
  }

  const handleSubmit = async () => {
    const isValid = validateAnswers()
    if (!isValid) {
      setValidForm(false)
      setSubmitClicked(submitClicked + 1)
      return
    }
    setValidForm(true)

    const newAnswers = answers.map((answer) => ({
      career,
      group,
      professor,
      question: answer.question,
      answers: answer.answers
    }))
    try {
      const response = await answerService.createNewAnswers(formId, newAnswers)
      if (response.data.status === 'OK') {
        setSection('finished')
      }
    } catch (error) {
      noti(error.mesage, NOTI_ERROR)
    }
  }

  useEffect(() => {
    if (!validForm) {
      alertRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [validForm, submitClicked])

  return (
    <Grid container spacing={2}>
      {!validForm ? (
        <Grid item md={12} lg={12} ref={alertRef}>
          <Alert severity="error">
            Parece que olvidaste responder algunas preguntas
          </Alert>
        </Grid>
      ) : null}

      {questions.map((question, index) => (
        <Grid item key={question._id} md={12} lg={12}>
          <Paper
            sx={!errorList[question._id] ? normalPaper : errorPaper}
            variant="outlined"
          >
            <Typography
              variant="subtitle1"
              component="h1"
              sx={{ mb: 0.7, fontWeight: 500, fontSize: 18 }}
            >
              {`${index + 1}.- ${question.sentence}`}
            </Typography>

            {getInputs(question)}
          </Paper>

          {errorList[question._id] ? (
            <Box>
              <Typography
                variant="body2"
                component="h1"
                sx={{
                  backgroundColor: '#F8EDEE',
                  color: '#4B2124',
                  py: 1,
                  px: 2
                }}
              >
                ¿Olvidaste esta pregunta?
              </Typography>
            </Box>
          ) : null}
        </Grid>
      ))}

      <Grid item md={12} lg={12}>
        <Box
          sx={{ mt: 2, mb: 4 }}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button variant="contained" color="avocado" onClick={handleSubmit}>
            Enviar respuestas
          </Button>
        </Box>
        <Divider />
      </Grid>
    </Grid>
  )
}
