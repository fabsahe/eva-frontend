import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import axios from 'axios'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { NOTI_SUCCESS, NOTI_ERROR } from '../../constants/notiConstants'
import formService from '../../services/formService'
import answerService from '../../services/answerService'
import Identification from './Identification'
import Configuration from './Configuration'
import QuestionItem from './QuestionItem'
import QuestionEditor from './QuestionEditor'
import {
  useEmptyForm,
  useTitle,
  useYear,
  usePeriod,
  useCareers,
  useStartDate,
  useEndDate,
  useQuestions,
  useFormActions
} from '../../store/formStore'

const modeSubmitButtons = {
  create: 'Crear cuestionario',
  clone: 'Clonar cuestionario',
  edit: 'Actualizar cuestionario'
}

export default function FormEditor({ mode }) {
  const [careerList, setCareerList] = useState([])
  const [periodList, setPeriodList] = useState([])
  const [token, setToken] = useState('')

  const emptyForm = useEmptyForm()
  const title = useTitle()
  const year = useYear()
  const period = usePeriod()
  const careers = useCareers()
  const startDate = useStartDate()
  const endDate = useEndDate()
  const questions = useQuestions()
  const {
    setEmptyForm,
    setTitle,
    setCareers,
    setYear,
    setPeriod,
    setStartDate,
    setEndDate,
    setQuestions,
    reset
  } = useFormActions()

  const { enqueueSnackbar: noti } = useSnackbar()
  const navigate = useNavigate()
  const params = useParams()
  const formId = params.id

  const submitButtonText = modeSubmitButtons[mode] || 'enviar'

  const sortCareers = (allCareers) => {
    allCareers.sort((a, b) => {
      if (a.codigo.length >= 3 && b.codigo.length < 3) {
        return 1 // a va después de b
      }
      if (a.codigo.length < 3 && b.codigo.length >= 3) {
        return -1 // a va antes de b
      }
      return a.codigo.localeCompare(b.codigo) // ordenar por codigo
    })
    return allCareers
  }

  const getCareers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/careers')
      const sortedCareers = sortCareers(response.data.data)
      setCareerList(sortedCareers)
    } catch (err) {
      console.log(err)
    }
  }

  const getPeriods = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/periods')
      setPeriodList(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getForm = async () => {
    const response = await formService.getOneForm(formId)
    if (response.status === 'OK') {
      const { data } = response
      const appendTitle = mode === 'clone' ? '(clon)' : ''
      const newTitle = `${data.titulo} ${appendTitle}`
      setTitle(newTitle.trim())
      setCareers(data.carreras.map((carrera) => carrera._id))
      setYear(data.año)
      setPeriod(data.periodo)

      setStartDate(dayjs(data.fechaInicio))
      setEndDate(dayjs(data.fechaFin))

      setQuestions(data.preguntas)

      // obtener respuestas
      const answersResponse = await answerService.getAnswers(formId)
      if (mode === 'edit') {
        setEmptyForm(answersResponse.data.length === 0)
      }
    }
  }

  const createNewForm = async (formData) => {
    try {
      const response = await formService.createNewForm(token, formData)
      if (response.status === 'OK') {
        noti('Cuestionario creado', NOTI_SUCCESS)
        navigate('/dashboard/cuestionarios')
        reset()
      }
    } catch (error) {
      noti(error.mesage, NOTI_ERROR)
    }
  }

  const updateOneForm = async (formData) => {
    try {
      const response = await formService.updateOneForm(token, formId, formData)
      if (response.status === 'OK') {
        noti('Cuestionario actualizado', NOTI_SUCCESS)
        navigate('/dashboard/cuestionarios')
        reset()
      }
    } catch (error) {
      noti(error.mesage, NOTI_ERROR)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (questions.length === 0) {
      noti('El cuestionario está vacío', NOTI_ERROR)
      return
    }
    const isAvailable = await formService.availableTitle(title.trim(), formId)
    if (!isAvailable) {
      noti('El título ya existe', NOTI_ERROR)
      return
    }
    if (startDate > endDate) {
      noti('Las fechas son incorrectas', NOTI_ERROR)
      return
    }

    const newQuestions = questions.map((item) => ({
      pregunta: item.pregunta,
      opciones: item.opciones.map((op) => ({ texto: op.texto }))
    }))

    const newForm = {
      titulo: title.trim(),
      año: year,
      periodo: period,
      carreras: careers,
      items: newQuestions,
      fechaInicio:
        typeof startDate === 'string'
          ? startDate
          : startDate.format('YYYY-MM-DD'),
      fechaFin:
        typeof endDate === 'string' ? endDate : endDate.format('YYYY-MM-DD')
    }

    if (mode === 'create' || mode === 'clone') {
      createNewForm(newForm)
    } else if (mode === 'edit') {
      newForm.isEmpty = emptyForm
      updateOneForm(newForm)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedEvaAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.token)
    }
    getCareers()
    getPeriods()

    if (mode === 'clone' || mode === 'edit') {
      getForm()
    }
  }, [])

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={8}>
            <Identification
              mode={mode}
              careerList={careerList}
              periodList={periodList}
            />
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Configuration mode={mode} />
          </Grid>

          {questions &&
            questions.map((question, index) => (
              <Grid item key={question._id} xs={12} md={8} lg={8}>
                <QuestionItem question={question} index={index} />
              </Grid>
            ))}

          <Grid item xs={12} md={8} lg={8}>
            <QuestionEditor />
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="hookgreen"
          sx={{ mt: 3, mb: 2 }}
        >
          {submitButtonText}
        </Button>
      </Box>

      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          spacing: 1
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: '100%' }}
        >
          <Divider />
          <Box sx={{ my: 2 }} />
        </Box>
      </Box>
    </Container>
  )
}

FormEditor.propTypes = {
  mode: PropTypes.string.isRequired
}
