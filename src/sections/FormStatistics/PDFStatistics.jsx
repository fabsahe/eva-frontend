/* eslint-disable react/prop-types */
import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PieChart from './PieChart'

const styles = {
  container: {
    zIndex: '-1000',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    overflow: 'hidden',
    width: '460px',
    minHeight: '590px',
    backgroundColor: 'white',
    padding: '15px 20px 0px 20px'
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: '1rem',
    color: 'black',
    textAlign: 'center'
  }
}

export default function PDFStatistics({ info, form, answers }) {
  return (
    <div style={styles.container}>
      <Typography
        component="h1"
        variant="h5"
        sx={{ mb: 0.4, fontSize: '16px' }}
      >
        Respuestas para el cuestionario{' '}
      </Typography>
      <Typography
        component="span"
        variant="h5"
        sx={{
          color: '#a8c256',
          borderTop: '1px dashed',
          borderBottom: '1px dashed',
          fontSize: '15px',
          pb: 0.2
        }}
      >
        {info.title}
      </Typography>
      <Typography
        component="h1"
        variant="h5"
        sx={{ mt: 0.5, mb: 3, fontSize: '13px' }}
      >
        Filtradas para {info.filterType}: {info.filterName}
      </Typography>

      {form &&
        form.map((itemQ, index) => (
          <Box
            key={itemQ._id}
            sx={{
              p: 2,
              mb: 0,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ mt: -4, mb: -1.4, fontSize: '11px' }}
            >
              {`${index + 1} - ${itemQ.pregunta}`}
            </Typography>

            {itemQ.opciones.length !== 0 ? (
              <Box sx={{ mt: 1 }}>
                <PieChart raw={answers ? answers[itemQ._id] : []} />
              </Box>
            ) : (
              <ul
                style={{
                  fontSize: '11px',
                  color: '#565656',
                  paddingLeft: '26px'
                }}
              >
                {answers &&
                  answers[itemQ._id].map((itemA) => (
                    <li key={itemA.id} style={{ paddingLeft: '6px' }}>
                      {itemA.texto}
                    </li>
                  ))}
              </ul>
            )}
          </Box>
        ))}
    </div>
  )
}
