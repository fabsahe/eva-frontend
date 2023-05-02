/* eslint-disable react/prop-types */
import React from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { grey } from '@mui/material/colors'
import OpenEnded from './previews/OpenEnded'
import Radios from './previews/Radios'
import Checkboxes from './previews/Checkboxes'
import Scale from './previews/Scale'
import RadioGrid from './previews/RadioGrid'
import {
  useEmptyForm,
  useQuestions,
  useFormActions
} from '../../store/formStore'

export default function QuestionPreview({ question, index }) {
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

  const previews = {
    'open-ended': <OpenEnded />,
    radios: <Radios options={question.options} />,
    checkboxes: <Checkboxes options={question.options} />,
    scale: <Scale options={question.options} />,
    grid: <RadioGrid options={question.options} />
  }

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
          <Typography
            variant="subtitle1"
            component="h1"
            sx={{ mb: 0.7, fontWeight: 500, fontSize: 18 }}
          >
            {`${index + 1}.- ${question.sentence}`}
          </Typography>

          {previews[question.type] ?? null}
        </Paper>
      </Grid>

      <Grid item xs={12} md={1} lg={1} justifyContent="center">
        {emptyForm ? (
          <Paper sx={{ py: 1, px: 0, width: '65%' }}>
            <Grid container justifyContent="center">
              <Tooltip title="Editar pregunta" placement="right">
                <IconButton aria-label="add-question" onClick={editQuestion}>
                  <EditIcon sx={{ color: grey[700] }} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Eliminar pregunta" placement="right">
                <IconButton aria-label="undo" onClick={removeQuestion}>
                  <DeleteIcon sx={{ color: grey[700] }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Paper>
        ) : null}
      </Grid>
    </Grid>
  )
}
