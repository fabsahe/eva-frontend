import React from 'react'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import Paper from '@mui/material/Paper'

export default function UsersList () {
  return (
    <>

      <Container maxWidth="lg" sx={{ mb: 2 }}>

          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 520
            }}
          >

            <Typography variant="h4" sx={{ mb: 2 }}>
              Lista de usuarios
            </Typography>

          </Paper>

      </Container>
    </>
  )
}
