import React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { useSnackbar } from 'notistack'
import OpenEnded from './types/OpenEnded'
import Radios from './types/Radios'
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

export default function FormViewer() {
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
      checkboxes: <Checkboxes questionId={id} options={options} />,
      scale: <Scale questionId={id} options={options} />,
      grid: <RadioGrid questionId={id} options={options} />
    }
    return typeMap[type] ?? null
  }

  const handleSubmit = async () => {
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

  return (
    <Grid container spacing={2}>
      {questions.map((question, index) => (
        <Grid item key={question._id} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column'
            }}
            variant="outlined"
          >
            <Typography variant="h6" component="div" sx={{ mb: 1 }}>
              {`${index + 1}.- ${question.sentence}`}
            </Typography>

            {getInputs(question)}
          </Paper>
        </Grid>
      ))}

      <Grid item md={12} lg={12}>
        <Box
          sx={{ mt: 2, mb: 4 }}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button
            variant="contained"
            color="avocado"
            size="large"
            onClick={handleSubmit}
          >
            Enviar respuestas
          </Button>
        </Box>
        <Divider />
      </Grid>
    </Grid>
  )
}
