/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import LinkIcon from '@mui/icons-material/Link'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import Snackbar from '@mui/material/Snackbar'
import dayjs from 'dayjs'
import { useModalDetails, useFormActions } from '../../store/formListStore'
import WEB_APP_URL from '../../constants/appUrl'

const styles = {
  header1: {
    fontSize: 16,
    mb: -0.4
  },
  header2: {
    fontSize: 16,
    mt: 0.2,
    mb: -0.4
  },
  header3: {
    fontSize: 16,
    mt: 0.6,
    mb: 0
  }
}

export default function FormDetails({ form }) {
  const [open, setOpen] = useState(false)
  const [urlCopied, setUrlCopied] = useState(false)

  const modalDetails = useModalDetails()
  const { hideModalDetails } = useFormActions()

  const formURL = `http://${WEB_APP_URL}/cuestionarios/${form._id}`

  const handleClose = () => {
    hideModalDetails()
    setOpen(false)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formURL)
      setUrlCopied(true)
    } catch (err) {
      console.error('No se pudo copiar')
    }
  }

  const handleCloseSnackbar = () => {
    setUrlCopied(false)
  }

  useEffect(() => {
    if (modalDetails) {
      setOpen(true)
    }
  }, [modalDetails])

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle>Detalles del cuestionario</DialogTitle>
        <DialogContent>
          <Typography variant="h6" component="div" sx={styles.header1}>
            Título
          </Typography>
          <Typography variant="body1" component="div">
            {form.title}
          </Typography>

          <Typography variant="h6" component="div" sx={styles.header2}>
            Periodo
          </Typography>
          <Typography variant="body1" component="div">
            {form.year}-{form.period}
          </Typography>

          <Typography variant="h6" component="div" sx={styles.header2}>
            Fecha de aplicación
          </Typography>
          <Typography variant="body1" component="div">
            {`Del ${dayjs(form.startDate).format('DD-MM-YYYY')}
                          al ${dayjs(form.endDate).format('DD-MM-YYYY')}`}
          </Typography>

          <Typography variant="h6" component="div" sx={styles.header2}>
            Creado por
          </Typography>
          <Typography variant="body1" component="div">
            {form.user.name}
          </Typography>

          <Typography variant="h6" component="div" sx={styles.header2}>
            Carreras
          </Typography>
          {form.careers.map((career) => (
            <Chip
              key={career._id}
              label={career.nombre}
              color="success"
              variant="outlined"
              sx={{ mt: 0.6, mr: 1 }}
              onClick={() => {}}
            />
          ))}

          <Typography variant="h6" component="div" sx={styles.header3}>
            Enlace
          </Typography>
          <Alert
            severity="success"
            icon={<LinkIcon fontSize="inherit" />}
            action={
              window.isSecureContext ? (
                <Button color="inherit" size="small" onClick={copyToClipboard}>
                  COPIAR
                </Button>
              ) : null
            }
          >
            <Box sx={{ fontSize: 14, pr: 3 }}>{formURL}</Box>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={urlCopied}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Enlace copiado al portapapeles"
      />
    </>
  )
}
