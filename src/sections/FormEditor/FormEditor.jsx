/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import OutlinedInput from '@mui/material/OutlinedInput'
import axios from 'axios'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { es } from 'dayjs/locale/es'
import { useSnackbar } from 'notistack'
import { NOTI_SUCCESS, NOTI_ERROR } from '../../constants/notiConstants'
import dayjs from 'dayjs'
import formService from '@/services/formService'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}
const today = dayjs().format('YYYY-MM-DD')
const titleList = {
  create: 'Nuevo cuestionario',
  clone: 'Nuevo cuestionario (clon)',
  edit: 'Editar cuestionario'
}
const modeSubmitButtons = {
  create: 'Crear cuestionario',
  clone: 'Clonar cuestionario',
  edit: 'Editar cuestionario'
}

export default function FormEditor ({ mode }) {
  const [careerList, setCareerList] = useState([])
  const [periodList, setPeriodList] = useState([])
  const [careers, setCareers] = useState([])
  const [form, setForm] = useState([])
  const [question, setQuestion] = useState('')
  const [type, setType] = useState('')
  const [options, setOptions] = useState([])
  const [postMessage, setPostMessage] = useState('')
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [period, setPeriod] = useState('')
  const [formLink, setFormLink] = useState('')
  const [token, setToken] = useState('')
  const [startDate, setStartDate] = useState(today)
  const [endDate, setEndDate] = useState(today)

  const { enqueueSnackbar: noti } = useSnackbar()
  const navigate = useNavigate()
  const params = useParams()
  const formId = params.id

  const editorTitle = titleList[mode] || ''
  const submitButtonText = modeSubmitButtons[mode] || 'enviar'
  const careerEntries = careerList.map(career => [career._id, career.nombre])
  const careerNames = Object.fromEntries(careerEntries)
  const yearOptions = periodList.map(item => item.año)
  const periodOptions = periodList.find(item => item.año === year)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedEvaAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.data.token)
    }
    getCareers()
    getPeriods()

    if (mode === 'clone' || mode === 'edit') {
      getForm(mode)
    }
  }, [])

  const getForm = async (mode) => {
    const response = await formService.getOneForm(formId)
    if (response.status === 'OK') {
      const data = response.data
      const appendTitle = mode === 'clone' ? '(clon)' : ''
      setTitle(`${data.titulo} ${appendTitle}`)
      setCareers(data.carreras.map(carrera => carrera._id))
      setYear(data.año)
      setPeriod(data.periodo)

      setStartDate(dayjs(data.fechaInicio).format('YYYY-MM-DD'))
      setEndDate(dayjs(data.fechaFin).format('YYYY-MM-DD'))

      setForm(data.items)
    }
  }

  const getCareers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/careers')
      // console.log(response.data.data)
      setCareerList(response.data.data)
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

  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleChangeYear = (event) => {
    setYear(event.target.value)
    const res = periodList.find(item => item.año === year)
    //  console.log({ res })
  }
  const handleChangePeriod = (event) => {
    setPeriod(event.target.value)
  }

  const handleChangeQuestion = (event) => {
    setQuestion(event.target.value)
  }

  const handleChangeType = (event) => {
    setType(event.target.value)
    if (event.target.value === 'open') {
      setOptions([])
      return
    }
    if (event.target.value === 'options') {
      setOptions(prevOptions => [...prevOptions, {
        _id: 1,
        texto: 'Texto de la opción'
      }])
    }
  }

  const handleChangeOptions = (event, id) => {
    const index = id - 1
    const newOptions = [...options]
    newOptions[index].texto = event.target.value
    setOptions(newOptions)
  }

  const newQuestion = () => {
    if (question === '' || type === '') {
      console.log('Faltan datos')
      return
    }
    if (options.length > 0 && options.at(-1).texto === 'Texto de la opción') {
      options.pop()
    }
    if (form.length === 0) {
      setForm(prevForm => [...prevForm, {
        _id: 0,
        pregunta: question,
        opciones: options
      }]
      )
      setQuestion('')
      setType('')
      setOptions([])
      return
    }
    const _id = form.at(-1)._id + 1
    setForm(prevForm => [...prevForm, { _id, pregunta: question, opciones: options }])
    setQuestion('')
    setType('')
    setOptions([])
  }

  const addOption = () => {
    const lastId = options.at(-1)._id
    const newId = lastId + 1
    setOptions(prevOptions => [...prevOptions, {
      _id: newId,
      texto: 'Texto de la opción'
    }])
  }

  const handleChange = (event) => {
    const {
      target: { value }
    } = event
    setCareers(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const createNewForm = async (form) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.post('http://localhost:3001/api/forms', form, config)
      if (response.data.status === 'OK') {
        noti('Cuestionario creado', NOTI_SUCCESS)
        navigate('/dashboard/cuestionarios')
      }
    } catch (error) {
      noti(error.mesage, NOTI_ERROR)
    }
  }

  const updateOneForm = async (form) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.put(`http://localhost:3001/api/forms/${formId}`, form, config)
      if (response.data.status === 'OK') {
        noti('Cuestionario actualizado', NOTI_SUCCESS)
        navigate('/dashboard/cuestionarios')
      }
    } catch (error) {
      noti(error.mesage, NOTI_ERROR)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (form.length === 0) {
      noti('El cuestionario está vacío', NOTI_ERROR)
      return
    }

    const questions = form.map(item => ({
      pregunta: item.pregunta,
      opciones: item.opciones.map(op => ({ texto: op.texto }))
    }))

    const newForm = {
      titulo: title,
      año: year,
      periodo: period,
      carreras: careers,
      items: questions,
      fechaInicio: typeof startDate === 'string' ? startDate : startDate.format('YYYY-MM-DD'),
      fechaFin: typeof endDate === 'string' ? endDate : endDate.format('YYYY-MM-DD')
    }

    // console.log(newForm)
    if (mode === 'create' || mode === 'clone') {
      createNewForm(newForm)
    } else if (mode === 'edit') {
      updateOneForm(newForm)
    }
  }

  return (

    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={3} >
          <Grid item xs={12} md={8} lg={8}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                { editorTitle }
              </Typography>

              <TextField
                id="titulo-cuestionario"
                label="Título"
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 2 }}
                value={title}
                onChange={handleChangeTitle} />

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="demo-multiple-chip-label">Carreras</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={careers}
                  onChange={handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Carreras" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={careerNames[value]} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  required
                >
                  {careerList.map((career) => (
                    <MenuItem
                      key={career._id}
                      value={career._id}
                    >
                      {career.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Grid container spacing={2}>
                <Grid item md={6} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel id="year-select-label">Año</InputLabel>
                    <Select
                      labelId="year-select-label"
                      id="year-form-select"
                      value={year}
                      label="Año"
                      onChange={handleChangeYear}
                      required
                    >
                      {yearOptions && yearOptions.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={6} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel id="period-select-label">Periodo</InputLabel>
                    <Select
                      labelId="period-select-label"
                      id="period-form-select"
                      value={period}
                      label="Periodo"
                      onChange={handleChangePeriod}
                      required
                    >
                      {periodOptions?.nombres && periodOptions.nombres.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography component="h1" variant="h6" sx={{ mb: 2 }}>
                Configuración
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'es'}>
                <DatePicker
                  label="Fecha de inicio"
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  disablePast
                />
                <Box sx={{ my: 1 }}/>
                <DatePicker
                  label="Fecha de finalización"
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  disablePast
                />
              </LocalizationProvider>
            </Paper>
          </Grid>

          { form && form.map((item, index) => (
            <Grid item key={item._id} xs={12} md={8} lg={8}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                  {`${index + 1} - ${item.pregunta}`}
                </Typography>
                {
                  item.opciones && item.opciones.length === 0
                    ? <TextField
                        fullWidth
                        hiddenLabel
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                    : <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Respuestas</FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="radio-buttons-group"
                        >
                          {
                            item.opciones.map((opcion) => (
                              <FormControlLabel
                                key={opcion._id}
                                value={opcion._id}
                                control={<Radio />}
                                label={opcion.texto} />
                            ))
                          }

                        </RadioGroup>
                      </FormControl>
                }
              </Paper>
            </Grid>

          )) }

          <Grid item xs={12} md={8} lg={8}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography component="h1" variant="h6" sx={{ mb: 2 }}>
                Agregar pregunta
              </Typography>

              <TextField
                fullWidth
                hiddenLabel
                variant="outlined"
                placeholder="Texto de la pregunta"
                sx={{ mb: 1 }}
                onChange={handleChangeQuestion}
                value={question}
              />

              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Tipo</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={type}
                  onChange={handleChangeType}
                >
                  <FormControlLabel value="open" control={<Radio />} label="Pregunta abierta" />
                  <FormControlLabel value="options" control={<Radio />} label="Opciones" />
                </RadioGroup>
              </FormControl>

              { type === 'options' && (
                <Typography component="h1" variant="subtitle2">
                  Opciones
                </Typography>
              )
              }
              <Stack sx={{ width: '100%' }}>
                {
                  options && options.map((option) => (
                    <TextField
                      key={option._id}
                      hiddenLabel
                      variant="outlined"
                      placeholder="Texto de la opción"
                      sx={{ mb: 1 }}
                      onChange={
                        (event) => handleChangeOptions(event, option._id)
                      }
                      onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
                    />
                  ))
                }
              </Stack>

              {
                type === 'options' && (
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={addOption}
                    sx={{ mt: 1, mb: 1 }}
                  >
                    Agregar opción
                  </Button>
                )
              }

              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={newQuestion}
              >
                Agregar pregunta
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="hookgreen"
          sx={{ mt: 3, mb: 2 }}
        >
          { submitButtonText }
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
          <Box sx={{ my: 2 }}>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

FormEditor.propTypes = {
  mode: PropTypes.string
}
