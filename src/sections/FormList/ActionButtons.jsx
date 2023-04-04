import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useFormActions } from '../../store/formStore'

export default function ActionButtons({ formId }) {
  const { selectForm } = useFormActions()

  const handleClickDetails = (formSelected) => {
    selectForm(formSelected)
  }

  return (
    <>
      <Tooltip title="Clonar" arrow>
        <IconButton
          aria-label="clonar"
          size="medium"
          component={RouterLink}
          to={`/dashboard/clonar-cuestionario/${formId}`}
          color="secondary"
        >
          <FileCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Editar" arrow>
        <IconButton
          aria-label="editar"
          size="medium"
          component={RouterLink}
          to={`/dashboard/editar-cuestionario/${formId}`}
          color="secondary"
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Detalles" arrow>
        <IconButton
          aria-label="editar"
          size="medium"
          onClick={() => handleClickDetails(formId)}
          color="applegreen"
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  )
}

ActionButtons.propTypes = {
  formId: PropTypes.string.isRequired
}
