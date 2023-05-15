/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import {
  useCareers,
  useYear,
  usePeriod,
  useCareer,
  useGroup,
  useProfessor,
  useFormViewerActions
} from '../../store/formViewerStore'
import assignmentService from '../../services/assignmentService'

const steps = [
  'Seleccionar carrera',
  'Selecionar grupo',
  'Seleccionar profesor'
]

export default function FormStepper() {
  const [groups, setGroups] = useState([])
  const [professors, setProfessors] = useState([])
  const [activeStep, setActiveStep] = useState(0)

  const careers = useCareers()
  const year = useYear()
  const period = usePeriod()
  const career = useCareer()
  const group = useGroup()
  const professor = useProfessor()
  const { setSection, setCareer, setGroup, setProfessor } =
    useFormViewerActions()

  const getNumberByTokens = (tokens) => {
    const a = parseInt(tokens[0], 10) * 10
    const b = tokens[1].charCodeAt(0) - 97
    return a + b
  }

  const handleChangeCareer = async (event) => {
    const careerId = event.target.value
    setCareer(careerId)
    const assignments = await assignmentService.getAssignmentsByCareer(
      careerId,
      year,
      period
    )
    const allGroups = assignments.data.map((assignment) => assignment.grupo)
    // eliminar repetidos
    const currentGroups = allGroups.filter(
      (item, index) => allGroups.indexOf(item) === index
    )
    // Sub-arreglo de los que tienen la forma 'NUMERO-LETRA'
    const subArray1 = currentGroups.filter((item) =>
      /^\d+-[A-Za-z]$/.test(item)
    )
    // Sub-arreglo de los que empiezan con 'P'
    const subArray2 = currentGroups.filter((item) => item.startsWith('P'))
    // Sub-arreglo de los que empiezan con 'M' o 'D'
    const subArray3 = currentGroups.filter(
      (item) => item.startsWith('M') || item.startsWith('D')
    )
    // ordenar grupos
    subArray1.sort((a, b) => {
      const aTokens = a.split('-')
      const bTokens = b.split('-')
      const aNum = getNumberByTokens(aTokens)
      const bNum = getNumberByTokens(bTokens)
      return aNum - bNum
    })
    const sortedGroups = [...subArray1, ...subArray2, ...subArray3]
    setGroups(sortedGroups)
  }

  const handleChangeGroup = async (event) => {
    const groupName = event.target.value
    setGroup(groupName)
    const professorsResponse = await assignmentService.getProfessorsByGroup(
      groupName,
      year,
      period
    )
    setProfessors(professorsResponse.data)
  }

  const handleChangeProfessor = (event) => {
    setProfessor(event.target.value)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleNextGroups = () => {
    if (career) {
      setActiveStep(1)
    }
  }

  const handleNextProfessors = () => {
    if (group) {
      setActiveStep(2)
    }
  }

  const handleStart = () => {
    if (professor) {
      setSection('questions')
    }
  }

  return (
    <Box>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {}
          const labelProps = {}
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      <Box sx={{ mb: 2 }} />

      {activeStep === 0 && (
        <>
          <FormControl fullWidth>
            <InputLabel id="career-select-label">Carrera</InputLabel>
            <Select
              labelId="career-select-label"
              id="carer-form-select"
              value={career}
              label="Carrera"
              onChange={handleChangeCareer}
              required
            >
              {careers.map((careerItem) => (
                <MenuItem key={careerItem._id} value={careerItem._id}>
                  {careerItem.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNextGroups}>Continuar</Button>
          </Box>
        </>
      )}

      {activeStep === 1 && (
        <>
          <FormControl fullWidth>
            <InputLabel id="group-select-label">Grupo</InputLabel>
            <Select
              labelId="group-select-label"
              id="group-form-select"
              value={group}
              label="Grupo"
              onChange={handleChangeGroup}
              required
            >
              {groups.map((groupItem) => (
                <MenuItem key={groupItem} value={groupItem}>
                  {groupItem}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Regresar
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNextProfessors}>Continuar</Button>
          </Box>
        </>
      )}

      {activeStep === 2 && (
        <>
          <FormControl fullWidth>
            <InputLabel id="professor-select-label">Profesor</InputLabel>
            <Select
              labelId="professor-select-label"
              id="professor-form-select"
              value={professor}
              label="Grupo"
              onChange={handleChangeProfessor}
              required
            >
              {professors &&
                professors.map((professorItem) => (
                  <MenuItem
                    key={professorItem.profesor._id}
                    value={professorItem.profesor._id}
                  >
                    {`${professorItem.profesor.nombre} - ${professorItem.materia.nombre}`}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Regresar
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleStart}>Continuar</Button>
          </Box>
        </>
      )}
    </Box>
  )
}
