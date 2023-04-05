import React, { useState, useEffect } from 'react'
import { DataGrid, esES } from '@mui/x-data-grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import axios from 'axios'
import Loader from '../../common/Loader'
import ActionButtons from './ActionButtons'
import FormDetailsStats from './FormDetailsStats'
import { useFormSelected, useFormActions } from '../../store/formStatsStore'

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'uid' },
  { field: 'count' },
  { field: 'title', headerName: 'Título', width: 440 },
  { field: 'period', headerName: 'Periodo', width: 130 },
  { field: 'user', headerName: 'Usuario', width: 200 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 130,
    sortable: false,
    renderCell: (params) => {
      return <ActionButtons formId={params.row.uid} count={params.row.count} />
    }
  }
]

export default function FormListStatistics() {
  const [forms, setForms] = useState([])
  const [currentForm, setCurrentForm] = useState(null)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  const formSelected = useFormSelected()
  const { showModalDetails } = useFormActions()

  const getAllForms = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:3001/api/forms')
      const { data } = response.data
      setForms(data)
      const rowsData = data.map((form, index) => ({
        id: index + 1,
        uid: form._id,
        title: form.titulo,
        period: `${form.año}-${form.periodo}`,
        user: form.usuario.name,
        count: form.numeroRespuestas
      }))
      setRows(rowsData)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllForms()
  }, [])

  useEffect(() => {
    if (formSelected) {
      const formFound = forms.find((form) => form._id === formSelected)
      setCurrentForm(formFound)
      showModalDetails()
    }
  }, [formSelected])

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Paper
        sx={{
          px: 2,
          pt: 2,
          pb: 5,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Estadísticas de cuestionarios
        </Typography>

        {loading ? (
          <Loader />
        ) : (
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              rows={rows}
              columns={columns}
              columnVisibilityModel={{
                uid: false,
                count: false
              }}
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5, page: 0 }
                }
              }}
            />
          </div>
        )}
      </Paper>
      {currentForm ? <FormDetailsStats form={currentForm} /> : null}
    </Container>
  )
}
