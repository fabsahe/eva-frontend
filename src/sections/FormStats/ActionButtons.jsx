import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import SummarizeIcon from '@mui/icons-material/Summarize'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useFormActions } from '../../store/formStatsStore'

export default function ActionButtons({ formId, count }) {
  const { selectForm } = useFormActions()

  const handleClickDetails = (formSelected) => {
    selectForm(formSelected)
  }

  return (
    <>
      {count > 0 ? (
        <Tooltip title="Ver respuestas" arrow>
          <IconButton
            aria-label="respuestas"
            size="medium"
            component={RouterLink}
            to={`/dashboard/estadisticas-cuestionario/${formId}`}
            color="secondary"
          >
            <SummarizeIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : null}

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
  formId: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
}
