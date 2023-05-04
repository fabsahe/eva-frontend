import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Logo from '../../assets/images/utm-header.jpg'

export default function FormBar() {
  return (
    <AppBar
      position="absolute"
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: 1,
        borderColor: '#d4d4d4'
      }}
      elevation={0}
    >
      <Toolbar
        sx={{
          pr: '24px' // keep right padding when drawer closed
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          width="55"
          style={{
            marginTop: 7,
            marginLeft: -8,
            display: { xs: 'none', md: 'flex' },
            flexGrow: 0
          }}
        />
      </Toolbar>
    </AppBar>
  )
}
