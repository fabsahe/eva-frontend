import React from 'react'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

export default function Loader() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ pt: 3 }}
    >
      <CircularProgress />
    </Grid>
  )
}
