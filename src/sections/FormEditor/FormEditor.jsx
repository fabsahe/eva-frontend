import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
// import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { NOTI_SUCCESS, NOTI_ERROR } from '../../constants/notiConstants'
import formService from '../../services/formService'
import careerService from '../../services/careerService'
import periodService from '../../services/periodService'
import Identification from './Identification'
import Configuration from './Configuration'
import QuestionPreview from './QuestionPreview'
import QuestionEditor from './QuestionEditor'
import Loader from '../../common/Loader'
import { useUserToken, useAuthActions } from '../../store/authStore'
import {
  useScroll,
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
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const bottomRef = useRef(null)

  const token = useUserToken()
  const { getUserToken } = useAuthActions()

  const scroll = useScroll()
  const emptyForm = useEmptyForm()
  const title = useTitle()
  const year = useYear()
  const period = usePeriod()
  const careers = useCareers()
  const startDate = useStartDate()
  const endDate = useEndDate()
  const questions = useQuestions()
  const {
    setScroll,
    setEmptyForm,
    setTitle,
    setCareers,
    setYear,
    setPeriod,
    setStartDate,
    setEndDate,
    setQuestions
  } = useFormActions()

  const { enqueueSnackbar: noti } = useSnackbar()
  const navigate = useNavigate()
  const params = useParams()
  const formId = params.id

  const submitButtonText = modeSubmitButtons[mode] || 'enviar'

  const executeScroll = () => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

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
      const response = await careerService.getAllCareers()
      const { data } = response
      const sortedCareers = sortCareers(data)
      setCareerList(sortedCareers)
    } catch (err) {
      console.error(err)
    }
  }

  const getPeriods = async () => {
    try {
      const response = await periodService.getAllPeriods()
      const { data } = response
      setPeriodList(data)
    } catch (err) {
      console.error(err)
    }
  }

  const getForm = async () => {
    const response = await formService.getOneForm(formId)
    if (response.status === 'OK') {
      const { data } = response
      const appendTitle = mode === 'clone' ? '(clon)' : ''
      const newTitle = `${data.title} ${appendTitle}`
      setTitle(newTitle.trim())
      setCareers(data.careers.map((career) => career._id))
      setYear(data.year)
      setPeriod(data.period)

      setStartDate(dayjs(data.startDate))
      setEndDate(dayjs(data.endDate))

      setQuestions(data.questions)

      if (mode === 'edit') {
        setEmptyForm(data.answersNumber === 0)
      }
    }
  }

  const createNewForm = async (formData) => {
    try {
      const response = await formService.createNewForm(token, formData)
      if (response.status === 'OK') {
        noti('Cuestionario creado', NOTI_SUCCESS)
        navigate('/dashboard/cuestionarios')
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

    setSaving(true)
    const formIdToCheck = mode === 'clone' ? null : formId
    const isAvailable = await formService.availableTitle(
      title.trim(),
      formIdToCheck
    )
    if (!isAvailable) {
      noti('El título ya existe', NOTI_ERROR)
      return
    }
    if (startDate > endDate) {
      noti('Las fechas son incorrectas', NOTI_ERROR)
      return
    }

    const newForm = {
      title: title.trim(),
      year,
      period,
      careers,
      questions,
      startDate:
        typeof startDate === 'string'
          ? startDate
          : startDate.format('YYYY-MM-DD'),
      endDate:
        typeof endDate === 'string' ? endDate : endDate.format('YYYY-MM-DD')
    }

    if (mode === 'create' || mode === 'clone') {
      await createNewForm(newForm)
    } else if (mode === 'edit') {
      newForm.isEmpty = emptyForm
      await updateOneForm(newForm)
    }
    setSaving(false)
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      await getCareers()
      await getPeriods()
      if (mode === 'clone' || mode === 'edit') {
        await getForm()
      }
      setLoading(false)
    }
    getUserToken()
    fetchData()
  }, [])

  useEffect(() => {
    if (scroll) {
      executeScroll()
      setScroll(false)
    }
  }, [scroll])

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
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
            </Grid>

            {questions.map((question, index) => (
              <QuestionPreview
                key={question.key}
                question={question}
                index={index}
              />
            ))}

            <div ref={bottomRef} style={{ scrollMargin: 80 }} />
            {emptyForm ? <QuestionEditor /> : null}

            <LoadingButton
              loading={saving}
              loadingPosition="start"
              type="submit"
              fullWidth
              variant="contained"
              color="hookgreen"
              sx={{ mt: 3, mb: 2 }}
            >
              {submitButtonText}
            </LoadingButton>
          </Box>

          <Box sx={{ mt: 4 }} />
          <Divider />
          <Box sx={{ my: 2 }} />
        </>
      )}
    </Container>
  )
}

FormEditor.propTypes = {
  mode: PropTypes.string.isRequired
}
