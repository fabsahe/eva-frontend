/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
// import Card from '@mui/material/Card'
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
import { NOTI_ERROR } from '../constants/notiConstants'
import dayjs from 'dayjs'

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

export default function FormEditor () {
  const [careerList, setCareerList] = useState([])
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

  const navigate = useNavigate()
  const { enqueueSnackbar: noti } = useSnackbar()

  const careerEntries = careerList.map(career => [career._id, career.nombre])
  const careerNames = Object.fromEntries(careerEntries)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedEvaAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.data.token)
    }
    getCareers()
    getPeriods()
  }, [])

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
    } catch (err) {
      console.log(err)
    }
  }

  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleChangeYear = (event) => {
    setYear(event.target.value)
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
        id: 1,
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
    console.log(options)
    if (options.length > 0 && options.at(-1).texto === 'Texto de la opción') {
      options.pop()
    }
    if (form.length === 0) {
      setForm(prevForm => [...prevForm, {
        id: 0,
        pregunta: question,
        opciones: options
      }]
      )
      setQuestion('')
      setType('')
      setOptions([])
      return
    }
    const id = form.at(-1).id + 1
    setForm(prevForm => [...prevForm, { id, pregunta: question, opciones: options }])
    setQuestion('')
    setType('')
    setOptions([])
  }

  const addOption = () => {
    const lastId = options.at(-1).id
    const newId = lastId + 1
    setOptions(prevOptions => [...prevOptions, {
      id: newId,
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

  const postForm = async (form) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.post('http://localhost:3001/api/form/create', form, config)
      if (response.data.status === 'OK') {
        setPostMessage(
          'Se ha creado un nuevo formulario con id: '
        )
        setFormLink(`${response.data.data._id}`)
        navigate('/dashboard/cuestionarios')
      }
    } catch (error) {
      setPostMessage(error.mesage)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (form.length === 0) {
      noti('El cuestionario está vacío', NOTI_ERROR)
      return
    }

    const newForm = {
      titulo: title,
      año: year,
      periodo: period,
      carreras: careers,
      items: form,
      fechaInicio: typeof startDate === 'string' ? startDate : startDate.format('YYYY-MM-DD'),
      fechaFin: typeof endDate === 'string' ? endDate : endDate.format('YYYY-MM-DD')
    }

    // console.log(newForm)
    postForm(newForm)
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
                Nuevo cuestionario
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
                      <MenuItem value={2022}>2022</MenuItem>
                      <MenuItem value={2021}>2021</MenuItem>
                      <MenuItem value={2022}>2020</MenuItem>
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
                      <MenuItem value={'A'}>A</MenuItem>
                      <MenuItem value={'B'}>B</MenuItem>
                      <MenuItem value={'VERANO'}>Verano</MenuItem>
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
                />
                <Box sx={{ my: 1 }}/>
                <DatePicker
                  label="Fecha de finalización"
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Paper>
          </Grid>

          { form && form.map((item, index) => (
            <Grid item key={item.id} xs={12} md={8} lg={8}>
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
                                key={opcion.id}
                                value={opcion.id}
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
                      key={option.id}
                      hiddenLabel
                      variant="outlined"
                      placeholder="Texto de la opción"
                      sx={{ mb: 1 }}
                      onChange={
                        (event) => handleChangeOptions(event, option.id)
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
          color="success"
          sx={{ mt: 3, mb: 2 }}
        >
          Crear cuestionario
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
