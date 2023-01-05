import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import EditIcon from '@mui/icons-material/Edit'
import axios from 'axios'

export default function FormsList () {
  const [forms, setForms] = useState([])

  useEffect(() => {
    getAllForms()
  }, [])

  const getAllForms = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/forms')
      const data = response.data.data
      console.log(data)
      setForms(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 3 }}>

        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 520
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Lista de cuestionarios
          </Typography>

          { forms && forms.map((form) => (
            <Card sx={{ minWidth: 275, mb: 3 }} key={form._id} variant="outlined">
            <CardContent>
              <Grid container>
                <Grid item md={9} lg={9}>
                  <Typography variant="h5" component="div" sx={{ mb: 0.5 }}>
                    {form.titulo}
                  </Typography>
                  {
                    form.carreras && form.carreras.map((carrera) => (
                      <Chip
                        key={carrera._id}
                        label={carrera.nombre}
                        color="success"
                        variant="outlined"
                        sx={{ mr: 1 }}
                      />
                    ))
                  }
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Creado por {form.user.name}
                  </Typography>
                </Grid>
                <Grid item md={3} lg={3}>
                  <Button variant="outlined" startIcon={<FileCopyIcon />} sx={{ mr: 1 }}>
                    Clonar
                  </Button>
                  <Button variant="outlined" startIcon={<EditIcon />}>
                    Editar
                  </Button>
                </Grid>
              </Grid>

            </CardContent>
          </Card>
          )) }

        </Paper>

      </Container>
    </>
  )
}
