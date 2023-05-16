import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RestoreIcon from '@mui/icons-material/Restore'
import { grey } from '@mui/material/colors'
import { useSnackbar } from 'notistack'
import TypeSelect from './inputs/TypeSelect'
import Radios from './inputs/Radios'
import Dropdown from './inputs/Dropdown'
import Checkboxes from './inputs/Checkboxes'
import Scale from './inputs/Scale'
import RadioGrid from './inputs/RadioGrid'
import {
  useQuestions,
  useQuestionMode,
  useQuestionToEdit,
  useQuestionSentence,
  useQuestionType,
  useOptions,
  useFormActions
} from '../../store/formStore'

const typeEditor = {
  'open-ended': null,
  radios: <Radios />,
  dropdown: <Dropdown />,
  checkboxes: <Checkboxes />,
  scale: <Scale />,
  grid: <RadioGrid />
}

const titles = {
  new: 'Agregar pregunta',
  edit: 'Actualizar pregunta'
}

export default function QuestionEditor() {
  const questions = useQuestions()
  const questionMode = useQuestionMode()
  const questionToEdit = useQuestionToEdit()
  const questionSentence = useQuestionSentence()
  const questionType = useQuestionType()
  const options = useOptions()
  const { setQuestions, setQuestionSentence, resetQuestion } = useFormActions()

  const { enqueueSnackbar: noti } = useSnackbar()

  const editorTitle = titles[questionMode] ?? ''

  const handleChangeQuestion = (event) => {
    setQuestionSentence(event.target.value)
  }

  const newQuestion = () => {
    const prevQuestions = questions
    const key = questions.length === 0 ? 0 : questions.at(-1).key + 1
    const newQuestions = [
      ...prevQuestions,
      { key, sentence: questionSentence, type: questionType, options }
    ]
    console.log(newQuestions)
    setQuestions(newQuestions)
  }

  const updateQuestion = () => {
    const questionIndex = questions.findIndex(
      (question) => question.key === questionToEdit
    )
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].sentence = questionSentence
    updatedQuestions[questionIndex].type = questionType
    updatedQuestions[questionIndex].options = { ...options }

    setQuestions(updatedQuestions)
  }

  const handleAddQuestion = () => {
    if (questionSentence === '' || questionType === '') {
      noti('Faltan datos')
      return
    }
    if (questionMode === 'new') {
      newQuestion()
    } else if (questionMode === 'edit') {
      updateQuestion()
    }
    resetQuestion()
  }

  const undoQuestion = () => {
    resetQuestion()
  }

  return (
    <Grid container spacing={2} sx={{ mt: 1 }} alignItems="center">
      <Grid item xs={12} md={8} lg={8}>
        <Paper
          sx={{
            py: 1.8,
            px: 2,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Grid container>
            <Grid item md={12}>
              <Typography
                variant="subtitle1"
                component="h1"
                sx={{ mb: 1.5, fontWeight: 500, fontSize: 18 }}
              >
                {editorTitle}
              </Typography>
            </Grid>
          </Grid>

          <TextField
            variant="outlined"
            label="Texto de la pregunta"
            sx={{ mb: 2 }}
            onChange={handleChangeQuestion}
            value={questionSentence}
            autoComplete="off"
            fullWidth
          />

          <Grid container spacing={2}>
            <Grid item md={6}>
              <TypeSelect />
            </Grid>
            <Grid item md={6}>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-start"
              />
            </Grid>
          </Grid>

          {typeEditor[questionType] ?? null}

          <Box sx={{ my: 1 }} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={1} lg={1} justifyContent="center">
        <Paper sx={{ py: 1, px: 0, width: '65%' }}>
          <Grid container justifyContent="center">
            <Tooltip title={editorTitle} placement="right">
              <IconButton aria-label="add-question" onClick={handleAddQuestion}>
                <AddCircleOutlineIcon sx={{ color: grey[700] }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Deshacer" placement="right">
              <IconButton aria-label="undo" onClick={undoQuestion}>
                <RestoreIcon sx={{ color: grey[700] }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
