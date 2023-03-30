import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Snackbar from '@mui/material/Snackbar'
import FileCopyIcon from '@mui/icons-material/FileCopy'

import EventIcon from '@mui/icons-material/Event'
import axios from 'axios'
import dayjs from 'dayjs'

export default function FormListStatistics() {
  const [forms, setForms] = useState([])
  const [formUrl, setFormUrl] = useState('')
  const [open, setOpen] = useState(false)
  const [urlCopied, setUrlCopied] = useState(false)

  const navigate = useNavigate()

  const getAllForms = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/forms')
      const { data } = response.data
      console.log(data)
      setForms(data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getAllForms()
  }, [])

  const handleChangeUrl = (event) => {
    setFormUrl(event.target.value)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseSnackbar = () => {
    setUrlCopied(false)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formUrl)
      setUrlCopied(true)
    } catch (err) {
      console.log('NO COPIADO :(')
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Paper
        sx={{
          px: 2,
          pt: 2,
          pb: 5,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Estadísticas de cuestionarios
        </Typography>

        {forms &&
          forms.map((form) => (
            <Card
              sx={{ minWidth: 275, mb: 1 }}
              key={form._id}
              variant="outlined"
            >
              <CardContent>
                <Grid container>
                  <Grid item md={10} lg={10}>
                    <Typography variant="h5" component="div" sx={{ mb: 0.5 }}>
                      {form.titulo}
                    </Typography>
                    {form.carreras &&
                      form.carreras.map((carrera) => (
                        <Chip
                          key={carrera._id}
                          label={carrera.nombre}
                          color="success"
                          variant="outlined"
                          sx={{ mr: 1 }}
                        />
                      ))}
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      Creado por {form.usuario.name}
                    </Typography>
                    <Box component="div" sx={{ mt: 1, mb: -1 }}>
                      <Typography variant="body2">
                        <EventIcon sx={{ mr: 0.4, mb: -1 }} />
                        {`Del ${dayjs(form.fechaInicio).format('DD-MM-YYYY')}
                          al ${dayjs(form.fechaFin).format('DD-MM-YYYY')}`}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item md={2} lg={2}>
                    <Stack spacing={1} sx={{ ml: 1, mr: 2 }}>
                      <Button
                        variant="outlined"
                        startIcon={<FileCopyIcon />}
                        sx={{ mr: 1 }}
                        onClick={() =>
                          navigate(
                            `/dashboard/estadisticas-cuestionario/${form._id}`
                          )
                        }
                        fullWidth
                      >
                        Respuestas
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
      </Paper>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Enlace del cuestionario</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={formUrl}
            onChange={handleChangeUrl}
            margin="dense"
            id="form-url"
            type="text"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={copyToClipboard}>Copiar enlace</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={urlCopied}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Enlace copiado al portapapeles"
      />
    </Container>
  )
}
