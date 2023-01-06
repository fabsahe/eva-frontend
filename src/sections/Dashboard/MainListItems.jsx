import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ViewListIcon from '@mui/icons-material/ViewList'
import AddBoxIcon from '@mui/icons-material/AddBox'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import AnalyticsIcon from '@mui/icons-material/Analytics'

export default function MainListItems () {
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <>
      <ListItemButton component={RouterLink} to="/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Panel de control" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <QuestionAnswerIcon />
        </ListItemIcon>
        <ListItemText primary="Cuestionarios" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            component={RouterLink}
            to="/dashboard/cuestionarios"
          >
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="Listado" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            component={RouterLink}
            to="/dashboard/nuevo-cuestionario"
          >
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Nuevo" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton component={RouterLink} to="/dashboard/estadisticas">
        <ListItemIcon>
          <AnalyticsIcon />
        </ListItemIcon>
        <ListItemText primary="Estadísticas" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="/dashboard/usuarios">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
      </ListItemButton>

    </>
  )
}
