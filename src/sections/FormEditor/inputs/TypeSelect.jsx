import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import CreateIcon from '@mui/icons-material/Create'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import CheckBoxIcon from '@mui/icons-material/CheckBoxOutlined'
import LinearScaleIcon from '@mui/icons-material/LinearScale'
import AppsRoundedIcon from '@mui/icons-material/AppsRounded'
import { grey } from '@mui/material/colors'
import { useQuestionType, useFormActions } from '../../../store/formStore'

const iconStyle = { color: grey[700], my: 0, mr: 1.4 }
const iconStyle2 = { color: grey[700], my: -0.9, ml: 0.1, mr: 1 }

const types = [
  {
    value: 'open-ended',
    icon: <CreateIcon sx={iconStyle} />,
    icon2: <CreateIcon sx={iconStyle2} />,
    text: 'Respuesta libre'
  },
  {
    value: 'radios',
    icon: <RadioButtonCheckedIcon sx={iconStyle} />,
    icon2: <RadioButtonCheckedIcon sx={iconStyle2} />,
    text: 'Opción múltiple'
  },
  {
    value: 'checkboxes',
    icon: <CheckBoxIcon sx={iconStyle} />,
    icon2: <CheckBoxIcon sx={iconStyle2} />,
    text: 'Casillas de verificación'
  },
  {
    value: 'scale',
    icon: <LinearScaleIcon sx={iconStyle} />,
    icon2: <LinearScaleIcon sx={iconStyle2} />,
    text: 'Escala lineal'
  },
  {
    value: 'grid',
    icon: <AppsRoundedIcon sx={iconStyle} />,
    icon2: <AppsRoundedIcon sx={iconStyle2} />,
    text: 'Cuadrícula de opción múltiple'
  }
]

const typeOptionsMap = {
  'open-ended': {},
  radios: {
    radios: [{ id: 0, value: 'Opción 1' }]
  },
  checkboxes: {
    checkboxes: [{ id: 0, value: 'Opción 1', checked: false }]
  },
  scale: {
    scale: Array.from({ length: 10 }, (_, i) => ({
      value: (i + 1) * 10
    })),
    labels: ['', '']
  },
  grid: {
    rows: [{ id: 0, value: 'Fila 1' }],
    cols: [{ id: 0, value: 'Columna 1' }]
  }
}

export default function TypeSelect() {
  const questionType = useQuestionType()
  const { setQuestionType, setOptions } = useFormActions()

  const handleChangeType = (event) => {
    const type = event.target.value
    const options = typeOptionsMap[type]

    if (options) {
      setQuestionType(type)
      setOptions(options)
    }
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="question-type-select-label">Tipo</InputLabel>
      <Select
        labelId="question-type-select-label"
        id="question-type-select"
        value={questionType}
        renderValue={(value) => {
          const typeSelected = types.find((type) => type.value === value)
          return (
            <div>
              {typeSelected.icon2} {typeSelected.text}
            </div>
          )
        }}
        onChange={handleChangeType}
        label="Tipo"
      >
        {types.map((type) => (
          <MenuItem key={type.value} value={type.value}>
            {type.icon} {type.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
