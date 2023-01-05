import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Logout from '@mui/icons-material/Logout'

/* eslint react/prop-types: 0 */
export default function AccountMenu ({ username }) {
  const [anchorEl, setAnchorEl] = useState(null)

  const navigate = useNavigate()

  const open = Boolean(anchorEl)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedEvaAppUser')
    navigate('/')
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Ajustes de cuenta">
          <Chip
            icon={<AccountCircleIcon />}
            label={username}
            onClick={handleClick}
            sx={{
              '&': {
                height: 38,
                borderRadius: 20,
                marginLeft: 1
              },
              '& .MuiChip-icon': {
                color: '#ffffff',
                marginLeft: 1.5
              },
              '& .MuiChip-label': {
                color: '#ffffff',
                fontSize: 14,
                marginLeft: 0,
                marginRight: 0.5
              }
            }}
          />
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  )
}
