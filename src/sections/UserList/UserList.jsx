import React, { useState, useEffect } from 'react'
import { DataGrid, esES } from '@mui/x-data-grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import userService from '../../services/userService'
import ActionButtons from './ActionButtons'
import PasswordDialog from './PasswordDialog'
import { useUserToken, useAuthActions } from '../../store/authStore'
import { useUserSelected, useUserActions } from '../../store/userStore'

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'uid' },
  { field: 'name', headerName: 'Nombre', width: 350 },
  { field: 'email', headerName: 'Correo', width: 220 },
  { field: 'type', headerName: 'Tipo', width: 200 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 130,
    sortable: false,
    renderCell: (params) => {
      return <ActionButtons userId={params.row.uid} />
    }
  }
]

export default function UsersList() {
  const [users, setUsers] = useState([])
  const [rows, setRows] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  const token = useUserToken()
  const { getUserToken } = useAuthActions()

  const userSelected = useUserSelected()
  const { showPasswordDialog } = useUserActions()

  const getAllUsers = async () => {
    try {
      const response = await userService.getAllUsers(token)
      const { data } = response
      setUsers(data)
      const rowsData = data.map((user, index) => ({
        id: index + 1,
        uid: user._id,
        name: user.name,
        email: user.email,
        type: user.type === 'admin' ? 'Administrador' : user.type
      }))
      setRows(rowsData)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getUserToken()
  }, [])

  useEffect(() => {
    if (token) {
      getAllUsers()
    }
  }, [token])

  useEffect(() => {
    if (userSelected) {
      const userFound = users.find((form) => form._id === userSelected)
      setCurrentUser(userFound)
      showPasswordDialog()
    }
  }, [userSelected])

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
          Lista de usuarios
        </Typography>

        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={rows}
            columns={columns}
            columnVisibilityModel={{
              uid: false
            }}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 }
              }
            }}
          />
        </div>
      </Paper>
      {currentUser ? <PasswordDialog token={token} user={currentUser} /> : null}
    </Container>
  )
}
