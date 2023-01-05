/* eslint-disable no-unused-vars */
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge'
import Logo from '../../images/utm-header.jpg'

export default function Header () {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: 1,
        borderColor: '#d4d4d4',
        height: '65px'
      }}
      elevation={0}
    >
      <Toolbar>
        <Link component={RouterLink} to="/">
          <img
            src={Logo}
            alt="Logo"
            width="58"
            style={{
              marginTop: 7,
              marginRight: 2,
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1
            }}
          />
        </Link>
        <Typography
          sx={{
            color: '#fde2ff',
            flexGrow: 1
          }}
        >
          -
        </Typography>

        <Button
          component={RouterLink}
          to="/about-us"
          sx={{ mr: 1 }}
        >
          Nosotros
        </Button>

        <Divider orientation="vertical" variant="middle" flexItem />

      </Toolbar>
    </AppBar>
  )
}
