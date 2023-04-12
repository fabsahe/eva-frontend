import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import LockIcon from '@mui/icons-material/Lock'
import { useUserActions } from '../../store/userStore'

export default function ActionButtons({ userId }) {
  const { selectUser } = useUserActions()

  const handleChangePassword = (userSelected) => {
    selectUser(userSelected)
  }

  return (
    <Tooltip title="Cambiar contraseña" arrow>
      <IconButton
        aria-label="editar"
        size="medium"
        onClick={() => handleChangePassword(userId)}
        color="applegreen"
      >
        <LockIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  )
}

ActionButtons.propTypes = {
  userId: PropTypes.string.isRequired
}
