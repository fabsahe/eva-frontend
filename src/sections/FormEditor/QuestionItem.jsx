/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  useEmptyForm,
  useQuestions,
  useFormActions
} from '../../store/formStore'

export default function QuestionItem({ question, index }) {
  const emptyForm = useEmptyForm()
  const questions = useQuestions()
  const {
    setScroll,
    setQuestions,
    setQuestionMode,
    setQuestionToEdit,
    setQuestionSentence,
    setQuestionType,
    setOptions
  } = useFormActions()

  const editQuestion = (questionId) => {
    setQuestionMode('edit')
    setQuestionToEdit(questionId)
    const questionSelected = questions.find((item) => item._id === questionId)
    setQuestionSentence(questionSelected.pregunta)
    if (questionSelected.opciones.length === 0) {
      setQuestionType('open')
    } else {
      setQuestionType('options')
      const currentOptions = questionSelected.opciones.map((item, k) => ({
        _id: k + 1,
        texto: item.texto
      }))
      setOptions(currentOptions)
    }
    setScroll(true)
  }

  const removeQuestion = (questionId) => {
    const questionSelected = questions.findIndex(
      (item) => item._id === questionId
    )
    const formStr = JSON.stringify(questions)
    const updatedForm = JSON.parse(formStr)
    updatedForm.splice(questionSelected, 1)
    setQuestions(updatedForm)
  }

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Grid container>
        <Grid item md={9}>
          <Typography variant="h6" component="h1" sx={{ mb: 1 }}>
            {`${index + 1} - ${question.pregunta}`}
          </Typography>
        </Grid>
        <Grid item md={3}>
          {emptyForm ? (
            <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
              {/* <Button
                sx={{ mr: 0.5 }}
                variant="outlined"
                size="small"
                color="success"
                onClick={() => editQuestion(question._id)}
              >
                Editar
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={() => removeQuestion(question._id)}
              >
                Eliminar
          </Button> */}
              <Tooltip title="Editar">
                <IconButton
                  aria-label="edit-question"
                  color="success"
                  onClick={() => editQuestion(question._id)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Eliminar">
                <IconButton
                  aria-label="delete-question"
                  color="error"
                  onClick={() => removeQuestion(question._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          ) : null}
        </Grid>
      </Grid>

      {question.opciones && question.opciones.length === 0 ? (
        <TextField fullWidth hiddenLabel variant="outlined" sx={{ mb: 1 }} />
      ) : (
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Respuestas</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            {question.opciones.map((opcion) => (
              <FormControlLabel
                key={opcion._id}
                value={opcion._id}
                control={<Radio />}
                label={opcion.texto}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    </Paper>
  )
}
