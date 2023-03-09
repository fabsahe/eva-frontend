/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import axios from 'axios'
import formService from '../../services/formService'
import answerService from '../../services/answerService'
import PieChart from './PieChart'

const filterLabel = {
  career: 'Carrera',
  professor: 'Profesor',
  group: 'Grupo'
}

export default function FormStatistics() {
  const [questions, setQuestions] = useState([])
  const [allAnswers, setAllAnswers] = useState([])
  const [form, setForm] = useState([])
  const [title, setTitle] = useState('')
  const [answers, setAnswers] = useState(null)
  const [filterType, setFilterType] = useState('career')
  const [filterList, setFilterList] = useState([])
  const [filter, setFilter] = useState('')
  const [careerList, setCareerList] = useState([])
  const [professorList, setProfessorList] = useState([])
  const [groupList, setGroupList] = useState([])

  const params = useParams()
  const formId = params.id

  // eslint-disable-next-line no-unused-vars
  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index)
  }

  const getCareers = async (answerSet) => {
    const careerResponse = await axios.get('http://localhost:3001/api/careers')
    const allCareers = careerResponse.data.data
    const currentCareers = answerSet.map((item) => item.carrera)
    const careerIdList = removeDuplicates(currentCareers)
    const careerListArr = allCareers.filter((item) =>
      careerIdList.includes(item._id)
    )
    setCareerList(careerListArr)
    setFilterList(careerListArr)
    setFilter(careerListArr[0]._id)
  }

  const getProfessors = async (answerSet) => {
    const professorResponse = await axios.get(
      'http://localhost:3001/api/professors'
    )
    const allProfessors = professorResponse.data.data
    const currentProfessors = answerSet.map((item) => item.profesor)
    const professorIdList = removeDuplicates(currentProfessors)
    const professorListArr = allProfessors.filter((item) =>
      professorIdList.includes(item._id)
    )
    setProfessorList(professorListArr)
  }

  const getGroups = (answerSet) => {
    const currentGroups = answerSet.map((item) => item.grupo)
    const groupListArr = removeDuplicates(currentGroups)
    const groupListArrObj = groupListArr.map((item) => ({
      _id: item,
      nombre: item
    }))
    setGroupList(groupListArrObj)
  }

  const getFilters = async () => {
    const response = await answerService.getAnswers(formId)
    const answerSet = response.data

    setAllAnswers(answerSet)

    await getCareers(answerSet)
    await getProfessors(answerSet)
    getGroups(answerSet)
  }

  const getAnswers = () => {
    // console.log('filter = ', filterType, filter)
    // console.log({ allAnswers })
    const filterProp = filterLabel[filterType].toLowerCase()

    const filterAnswers = allAnswers.filter(
      (item) => item[filterProp] === filter
    )

    const emptyAnswers = questions.map((item) => ({
      key: item._id,
      value: []
    }))

    const groupedAnswers = emptyAnswers.reduce(
      (obj, item) => Object.assign(obj, { [item.key]: item.value }),
      {}
    )

    for (const answerList of filterAnswers) {
      for (const answer of answerList.respuestas) {
        groupedAnswers[answer.pregunta].push({
          id: answer._id,
          texto: answer.respuesta
        })
      }
    }
    // console.log({ groupedAnswers })
    setAnswers(groupedAnswers)
  }

  const getForm = async () => {
    const response = await formService.getOneForm(formId)
    if (response.status === 'OK') {
      const { data } = response
      // console.log('form = ', data.preguntas)
      setForm(data.preguntas)
      setTitle(data.titulo)
      setQuestions(data.preguntas)

      getFilters()
    }
  }

  const handleChangeFilterType = (event) => {
    setFilterType(event.target.value)
  }

  const handleChangeFilter = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    getForm()
  }, [])

  useEffect(() => {
    if (filterType) {
      const filtersMap = {
        career: careerList,
        professor: professorList,
        group: groupList
      }
      setFilterList(filtersMap[filterType])
      setFilter('')
    }
  }, [filterType])

  useEffect(() => {
    if (filter) {
      getAnswers()
    }
  }, [filter])

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={8}>
          <Paper
            sx={{
              p: 2,
              mb: 3,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Respuestas para el cuestionario{' '}
              <Typography
                component="span"
                variant="h5"
                sx={{ color: '#a8c256', borderBottom: '1px dashed' }}
              >
                {title}
              </Typography>
            </Typography>
          </Paper>

          {form &&
            form.map((itemQ, index) => (
              <Paper
                key={itemQ._id}
                sx={{
                  p: 2,
                  mb: 3,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography variant="h6" component="div" sx={{ mb: 0 }}>
                  {`${index + 1} - ${itemQ.pregunta}`}
                </Typography>

                {itemQ.opciones.length !== 0 ? (
                  <PieChart raw={answers ? answers[itemQ._id] : []} />
                ) : (
                  <ul>
                    {answers &&
                      answers[itemQ._id].map((itemA) => (
                        <li key={itemA.id}>{itemA.texto}</li>
                      ))}
                  </ul>
                )}
              </Paper>
            ))}
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography component="h1" variant="h6" sx={{ mb: 2 }}>
              Filtros
            </Typography>

            <FormControl fullWidth>
              <InputLabel id="filter-type-select-label">Filtrar por</InputLabel>
              <Select
                labelId="filter-type-select-label"
                id="filter-type-form-select"
                value={filterType}
                label="Filtrar por"
                onChange={handleChangeFilterType}
                required
              >
                <MenuItem value="career">Carrera</MenuItem>
                <MenuItem value="professor">Profesor</MenuItem>
                <MenuItem value="group">Grupo</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ mb: 2 }} />

            <FormControl fullWidth>
              <InputLabel id="filter-select-label">
                {filterLabel[filterType]}
              </InputLabel>
              <Select
                labelId="filter-select-label"
                id="filter-form-select"
                label={filterLabel[filterType]}
                value={filter}
                onChange={handleChangeFilter}
                required
              >
                {filterList &&
                  filterList.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.nombre}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
