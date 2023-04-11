/* eslint-disable react/prop-types */
import React from 'react'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Typography from '@mui/material/Typography'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useSnackbar } from 'notistack'
import {
  useEmptyForm,
  useQuestions,
  useQuestionMode,
  useQuestionToEdit,
  useQuestionSentence,
  useQuestionType,
  useOptions,
  useFormActions
} from '../../store/formStore'

export default function QuestionEditor() {
  const emptyForm = useEmptyForm()
  const questions = useQuestions()
  const questionMode = useQuestionMode()
  const questionToEdit = useQuestionToEdit()
  const questionSentence = useQuestionSentence()
  const questionType = useQuestionType()
  const options = useOptions()
  const {
    setQuestions,
    setQuestionMode,
    setQuestionSentence,
    setQuestionType,
    setOptions
  } = useFormActions()

  const { enqueueSnackbar: noti } = useSnackbar()

  const questionModeText =
    questionMode === 'new' ? 'Agregar pregunta' : 'Actualizar pregunta'

  const handleChangeQuestion = (event) => {
    setQuestionSentence(event.target.value)
  }

  const handleChangeType = (event) => {
    setQuestionType(event.target.value)
    if (event.target.value === 'open') {
      setOptions([])
      return
    }
    if (event.target.value === 'options') {
      const prevOptions = options
      const newOptions = [
        ...prevOptions,
        {
          _id: 1,
          texto: ''
        }
      ]
      setOptions(newOptions)
    }
  }

  const handleChangeOptions = (event, id) => {
    const index = id - 1
    const newOptions = [...options]
    newOptions[index].texto = event.target.value
    setOptions(newOptions)
  }

  const addOption = () => {
    const lastId = options.at(-1)._id
    const newId = lastId + 1
    const prevOptions = options
    const newOptions = [...prevOptions, { _id: newId, texto: '' }]
    setOptions(newOptions)
  }

  const newQuestion = () => {
    const prevQuestions = questions
    if (questionSentence === '' || questionType === '') {
      noti('Faltan datos')
      return
    }
    if (options.length > 0 && options.at(-1).texto === 'Texto de la opción') {
      options.pop()
    }
    if (questions.length === 0) {
      const newQuestions = [
        ...prevQuestions,
        {
          _id: 0,
          pregunta: questionSentence,
          opciones: options
        }
      ]
      setQuestions(newQuestions)
      setQuestionSentence('')
      setQuestionType('')
      setOptions([])
      return
    }
    const _id = questions.at(-1)._id + 1
    const newQuestions = [
      ...prevQuestions,
      { _id, pregunta: questionSentence, opciones: options }
    ]
    setQuestions(newQuestions)
    setQuestionSentence('')
    setQuestionType('')
    setOptions([])
  }

  const updateQuestion = () => {
    const questionIndex = questions.findIndex(
      (item) => item._id === questionToEdit
    )
    const newQuestionsUpdate = questions
    newQuestionsUpdate[questionIndex].pregunta = questionSentence
    newQuestionsUpdate[questionIndex].opciones = options

    console.log(newQuestionsUpdate)
    setQuestions([...newQuestionsUpdate])

    setQuestionSentence('')
    setQuestionType('')
    setOptions([])
    setQuestionMode('new')
  }

  const handleQuestion = () => {
    if (questionMode === 'new') {
      newQuestion()
    } else if (questionMode === 'edit') {
      updateQuestion()
    }
  }

  return (
    <div>
      {emptyForm ? (
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography component="h1" variant="h6" sx={{ mb: 2 }}>
            {questionModeText}
          </Typography>

          <TextField
            variant="outlined"
            placeholder="Texto de la pregunta"
            sx={{ mb: 1 }}
            onChange={handleChangeQuestion}
            value={questionSentence}
            autoComplete="off"
            fullWidth
            hiddenLabel
          />

          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Tipo</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={questionType}
              onChange={handleChangeType}
            >
              <FormControlLabel
                value="open"
                control={<Radio />}
                label="Pregunta abierta"
              />
              <FormControlLabel
                value="options"
                control={<Radio />}
                label="Opciones"
              />
            </RadioGroup>
          </FormControl>

          {questionType === 'options' && (
            <Typography component="h1" variant="subtitle2">
              Opciones
            </Typography>
          )}
          <Stack sx={{ width: '100%' }}>
            {options &&
              options.map((option) => (
                <TextField
                  key={option._id}
                  variant="outlined"
                  placeholder="Texto de la opción"
                  sx={{ mb: 1 }}
                  value={option.texto}
                  onChange={(event) => handleChangeOptions(event, option._id)}
                  onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
                  autoComplete="off"
                  hiddenLabel
                />
              ))}
          </Stack>

          {questionType === 'options' && (
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              onClick={addOption}
              sx={{ mt: 1, mb: 1 }}
            >
              Agregar opción
            </Button>
          )}

          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleQuestion}
          >
            {questionModeText}
          </Button>
        </Paper>
      ) : null}
    </div>
  )
}
