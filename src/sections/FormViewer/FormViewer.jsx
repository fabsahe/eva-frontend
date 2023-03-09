/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import Logo from '../../assets/images/utm-header.jpg'
import { NOTI_SUCCESS, NOTI_ERROR } from '../../constants/notiConstants'
import answerService from '../../services/answerService'

const steps = [
  'Seleccionar carrera',
  'Selecionar grupo',
  'Seleccionar profesor'
]

export default function FormViewer() {
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [period, setPeriod] = useState('')
  const [careers, setCareers] = useState([])
  const [career, setCareer] = useState('')
  const [questions, setQuestions] = useState([])
  const [groups, setGroups] = useState([])
  const [group, setGroup] = useState('')
  const [professors, setProfessors] = useState([])
  const [professor, setProfessor] = useState('')
  const [visible, setVisible] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)

  const params = useParams()
  const { formId } = params
  const { enqueueSnackbar: noti } = useSnackbar()

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
      setQuestions(data.preguntas)
      setVisible(data.visible)

      const emptyAnswers = data.preguntas.map((item) => ({
        pregunta: item._id,
        respuesta: ''
      }))
      setAnswers(emptyAnswers)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChangeCareer = async (event) => {
    setCareer(event.target.value)
    const assignments = await axios.get(
      `http://localhost:3001/api/assignments/${event.target.value}`
    )
    const allGroups = assignments.data.data.map(
      (assignment) => assignment.grupo
    )
    const currentGroups = allGroups.filter(
      (item, index) => allGroups.indexOf(item) === index
    )
    setGroups(currentGroups)
  }

  const handleChangeGroup = async (event) => {
    setGroup(event.target.value)
    const professorsResponse = await axios.get(
      `http://localhost:3001/api/assignments/professors/${event.target.value}`
    )
    setProfessors(professorsResponse.data.data)
  }

  const handleChangeProfessor = (event) => {
    setProfessor(event.target.value)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleNextGroups = () => {
    setActiveStep(1)
  }

  const handleNextProfessors = () => {
    setActiveStep(2)
  }

  const handleStart = () => {
    setShowForm(true)
  }

  const handleChangeAnswer = (event) => {
    let questionId = ''
    if (event.target.type === 'text') {
      questionId = event.target.id
    }
    if (event.target.type === 'radio') {
      questionId = event.target.name
    }
    const newAnswers = answers.map((item) => {
      if (item.pregunta === questionId) {
        return { pregunta: item.pregunta, respuesta: event.target.value }
      }
      return item
    })
    setAnswers(newAnswers)
  }

  const handleSubmit = async () => {
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
  }

  useEffect(() => {
    getForm()
  }, [])

  return (
    <Box
      sx={{
        display: 'flex'
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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: finished ? '80vh' : '100vh',
          overflow: 'auto'
        }}
      >
        {visible && !showForm && !finished ? (
          <Container maxWidth="sm" sx={{ mt: 9 }}>
            <Typography component="h1" variant="h4">
              {visible ? title : 'El cuestionario no se encuentra activo'}
            </Typography>
            <Box sx={{ mb: 2 }} />

            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {}
                const labelProps = {}
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                )
              })}
            </Stepper>
            <Box sx={{ mb: 2 }} />

            {activeStep === 0 && (
              <>
                <FormControl fullWidth>
                  <InputLabel id="career-select-label">Carrera</InputLabel>
                  <Select
                    labelId="career-select-label"
                    id="carer-form-select"
                    value={career}
                    label="Carrera"
                    onChange={handleChangeCareer}
                    required
                  >
                    {careers.map((careerItem) => (
                      <MenuItem key={careerItem._id} value={careerItem._id}>
                        {careerItem.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNextGroups}>Continuar</Button>
                </Box>
              </>
            )}

            {activeStep === 1 && (
              <>
                <FormControl fullWidth>
                  <InputLabel id="group-select-label">Grupo</InputLabel>
                  <Select
                    labelId="group-select-label"
                    id="group-form-select"
                    value={group}
                    label="Grupo"
                    onChange={handleChangeGroup}
                    required
                  >
                    {groups.map((groupItem) => (
                      <MenuItem key={groupItem} value={groupItem}>
                        {groupItem}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Regresar
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNextProfessors}>Continuar</Button>
                </Box>
              </>
            )}

            {activeStep === 2 && (
              <>
                <FormControl fullWidth>
                  <InputLabel id="professor-select-label">Profesor</InputLabel>
                  <Select
                    labelId="professor-select-label"
                    id="professor-form-select"
                    value={professor}
                    label="Grupo"
                    onChange={handleChangeProfessor}
                    required
                  >
                    {professors.map((professorItem) => (
                      <MenuItem
                        key={professorItem.profesor._id}
                        value={professorItem.profesor._id}
                      >
                        {`${professorItem.profesor.nombre} - ${professorItem.materia.nombre}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Regresar
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleStart}>Continuar</Button>
                </Box>
              </>
            )}
          </Container>
        ) : null}

        {visible && showForm && !finished ? (
          <Container maxWidth="md" sx={{ mt: 9 }}>
            <Typography component="h1" variant="h4">
              {visible ? title : 'El cuestionario no se encuentra activo'}
            </Typography>
            <Box sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              {questions &&
                questions.map((item, index) => (
                  <Grid item key={item._id} md={12} lg={12}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      variant="outlined"
                    >
                      <Grid container>
                        <Grid item md={9}>
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ mb: 1 }}
                          >
                            {`${index + 1} - ${item.pregunta}`}
                          </Typography>
                        </Grid>
                        <Grid item md={3} />
                      </Grid>

                      {item.opciones && item.opciones.length === 0 ? (
                        <TextField
                          id={item._id}
                          fullWidth
                          hiddenLabel
                          variant="outlined"
                          sx={{ mb: 1 }}
                          placeholder="Respuesta"
                          onBlur={(e) => handleChangeAnswer(e)}
                        />
                      ) : (
                        <FormControl>
                          <FormLabel id="demo-radio-buttons-group-label">
                            Respuestas
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name={item._id}
                            onChange={(e) => handleChangeAnswer(e)}
                          >
                            {item.opciones.map((opcion) => (
                              <FormControlLabel
                                key={opcion._id}
                                value={opcion.texto}
                                control={<Radio />}
                                label={opcion.texto}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      )}
                    </Paper>
                  </Grid>
                ))}
            </Grid>

            <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Button variant="contained" onClick={handleSubmit}>
                Enviar
              </Button>
            </Box>
          </Container>
        ) : null}

        {finished ? (
          <Container maxWidth="md" sx={{ mt: 9 }}>
            <Typography component="h1" variant="h4">
              {title}
            </Typography>

            <Typography component="h1" variant="h5">
              Las respuestas se han enviado
            </Typography>
          </Container>
        ) : null}

        {!visible ? (
          <Container maxWidth="sm" sx={{ mt: 9 }}>
            <Typography component="h1" variant="h4">
              {visible ? title : 'El cuestionario no se encuentra activo'}
            </Typography>
          </Container>
        ) : null}
      </Box>
    </Box>
  )
}
