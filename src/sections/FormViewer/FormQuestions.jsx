import React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import OpenEnded from './types/OpenEnded'
import Radios from './types/Radios'
import Checkboxes from './types/Checkboxes'
import Scale from './types/Scale'
import RadioGrid from './types/RadioGrid'
import { useQuestions } from '../../store/formViewerStore'

export default function FormViewer() {
  const questions = useQuestions()
  /* const year = useYear()
  const period = usePeriod()
  const { setSection, setCareers, setYear, setPeriod } = useFormViewerActions() */

  const getInputs = (type, options) => {
    const typeMap = {
      'open-ended': <OpenEnded />,
      radios: <Radios options={options} />,
      checkboxes: <Checkboxes options={options} />,
      scale: <Scale options={options} />,
      grid: <RadioGrid options={options} />
    }
    return typeMap[type] ?? null
  }

  const handleSubmit = () => {
    console.log('enviar...')
  }

  return (
    <Grid container spacing={2}>
      {questions.map((item, index) => (
        <Grid item key={item._id} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column'
            }}
            variant="outlined"
          >
            <Typography variant="h6" component="div" sx={{ mb: 1 }}>
              {`${index + 1}.- ${item.sentence}`}
            </Typography>

            {getInputs(item.type, item.options)}

            {/* item.opciones && item.opciones.length === 0 ? (
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
                        ) */}
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
