/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { useSnackbar } from 'notistack'
import { NOTI_SUCCESS, NOTI_ERROR } from '../../constants/notiConstants'
import PasswordField from '../Login/inputs/PasswordField'
import userService from '../../services/userService'
import { usePasswordDialog, useUserActions } from '../../store/userStore'

export default function PasswordDialog({ token, user }) {
  const [open, setOpen] = useState(false)
  const [password1, setPassword1] = useState('')
  const [passwordError1, setPasswordError1] = useState(false)
  const [password2, setPassword2] = useState('')
  const [passwordError2, setPasswordError2] = useState(false)

  const { enqueueSnackbar: noti } = useSnackbar()

  const passwordDialog = usePasswordDialog()
  const { hidePasswordDialog } = useUserActions()

  const handleClose = () => {
    setPassword1('')
    setPassword2('')
    setPasswordError1(false)
    setPasswordError2(false)
    hidePasswordDialog()
    setOpen(false)
  }

  const isValidForm = () => {
    if (passwordError1 === false && passwordError2 === false) {
      return true
    }
    return false
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isValidForm) {
      return
    }
    if (password1 !== password2) {
      noti('Las contraseñas no coinciden', NOTI_ERROR)
      return
    }
    const userId = user._id
    try {
      const response = await userService.updatePassword(
        token,
        userId,
        password1
      )
      if (response.status === 'OK') {
        noti('Contraseña actualizada', NOTI_SUCCESS)
        handleClose()
      }
    } catch (error) {
      noti(error.mesage, NOTI_ERROR)
    }
  }

  useEffect(() => {
    if (passwordDialog) {
      setOpen(true)
    }
  }, [passwordDialog])

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Cambiar contraseña</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <PasswordField
            label="Nueva contraseña"
            password={password1}
            setPassword={setPassword1}
            error={passwordError1}
            setError={setPasswordError1}
          />
          <Box sx={{ mt: 0.2 }} />
          <PasswordField
            label="Confirme la contraseña"
            password={password2}
            setPassword={setPassword2}
            error={passwordError2}
            setError={setPasswordError2}
          />

          <Grid container sx={{ mt: 2 }}>
            <Grid item md={6}>
              <Button type="submit" variant="contained" color="success">
                Aceptar
              </Button>
            </Grid>
            <Grid item md={6}>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Button onClick={handleClose}>Cancelar</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
