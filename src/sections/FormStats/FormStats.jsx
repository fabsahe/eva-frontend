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
// import Button from '@mui/material/Button'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import Downloads from './Downloads'
import Loader from '../../common/Loader'
import Radios from './types/Radios'
import Dropdown from './types/Dropdown'
import Checkboxes from './types/Checkboxes'
import Scale from './types/Scale'
import RadioGrid from './types/RadioGrid'
import OpenEnded from './types/OpenEnded'
import answerService from '../../services/answerService'
import { useImageData, useChartActions } from '../../store/chartStore'
import createDocument from '../../utils/createDocument'

pdfMake.vfs = pdfFonts.pdfMake.vfs

const filterLabel = {
  career: 'Carrera',
  professor: 'Profesor',
  group: 'Grupo'
}

export default function FormStats() {
  const [questions, setQuestions] = useState([])
  const [title, setTitle] = useState('')
  const [answers, setAnswers] = useState(null)
  const [filterType, setFilterType] = useState('career')
  const [filterList, setFilterList] = useState([])
  const [filter, setFilter] = useState('')
  const [careerList, setCareerList] = useState([])
  const [professorList, setProfessorList] = useState([])
  const [groupList, setGroupList] = useState([])
  const [memoFilter, setMemoFilter] = useState(null)
  const [loading, setLoading] = useState(true)

  const imageData = useImageData()
  const { startDownload, finishDownload } = useChartActions()

  const params = useParams()
  const formId = params.id

  const getResult = (index, type, labels, subQuestions, answerList) => {
    const typeMap = {
      radios: <Radios answers={answerList} index={index} filter={memoFilter} />,
      dropdown: (
        <Dropdown answers={answerList} index={index} filter={memoFilter} />
      ),
      checkboxes: (
        <Checkboxes index={index} labels={labels} answers={answerList} />
      ),
      scale: <Scale answers={answerList} index={index} filter={memoFilter} />,
      grid: (
        <RadioGrid
          index={index}
          labels={labels}
          subQuestions={subQuestions}
          answers={answerList}
          filter={memoFilter}
        />
      ),
      'open-ended': <OpenEnded answers={answerList} />
    }
    return typeMap[type] ?? null
  }

  const getForm = async () => {
    const response = await answerService.getFormAnswers(formId)
    if (response.status === 'OK') {
      const { data } = response
      setTitle(data.title)
      setQuestions(data.questions)

      setCareerList(data.careers)
      setFilterList(data.careers)
      setFilter(data.careers[0]._id)

      setProfessorList(data.professors)

      setGroupList(data.groups)
    }
  }

  const getAnswers = (noFilter = false) => {
    const filteredArr = questions.map((question) => {
      const questionAnswers = question.answers
      let questionsFiltered = questionAnswers
      if (!noFilter) {
        questionsFiltered = questionAnswers.filter(
          (item) => item[filterType] === filter
        )
      }
      const answersArr = questionsFiltered.map((q) => q.answers)
      return {
        question: question.id,
        answers: answersArr
      }
    })
    const filteredAnswers = filteredArr.reduce((acc, curr) => {
      acc[curr.question] = curr.answers
      return acc
    }, {})
    setAnswers(filteredAnswers)
  }

  const handleChangeFilterType = (event) => {
    setFilterType(event.target.value)
  }

  const handleChangeFilter = (event) => {
    setFilter(event.target.value)
    setMemoFilter(event.target.value)
  }

  const handleGeneratePdf = () => {
    startDownload()
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      await getForm()
      setLoading(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (filterType === 'all') {
      getAnswers(true)
    } else if (filterType) {
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

  useEffect(() => {
    if (imageData.length > 0) {
      const invalidCharsRegex = /[^\w\s]/gi // expresión regular que busca todos los caracteres no válidos
      const formattedTitle = title
        .toLocaleLowerCase()
        .replace('á', 'a')
        .replace('é', 'e')
        .replace('í', 'i')
        .replace('ó', 'o')
        .replace('ú', 'u')
      const fileName = formattedTitle
        .replace(invalidCharsRegex, '_')
        .replace(/\s+/g, '_')

      const infoPDF = {
        title,
        filterType,
        filterList,
        filter
      }

      const docDefinition = createDocument(
        infoPDF,
        questions,
        answers,
        imageData
      )

      pdfMake.createPdf(docDefinition).download(`${fileName}.pdf`)
      finishDownload()
    }
  }, [imageData])

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={8}>
            <Paper
              sx={{
                p: 2,
                mb: 3
              }}
            >
              <Typography component="h1" variant="h5" sx={{ mb: 0.2 }}>
                Respuestas para el cuestionario:
              </Typography>
              <Typography
                component="span"
                variant="h5"
                sx={{
                  color: '#6e851d',
                  borderBottom: '1px dashed'
                }}
              >
                {title}
              </Typography>
            </Paper>

            {questions &&
              questions.map((question, index) => (
                <Paper
                  key={question.id}
                  sx={{
                    p: 2,
                    mb: 3,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    component="h1"
                    sx={{ mb: 0, fontWeight: 500, fontSize: 18 }}
                  >
                    {`${index + 1}.- ${question.sentence}`}
                  </Typography>

                  {answers &&
                    getResult(
                      index,
                      question.type,
                      question.labels ?? [],
                      question.subQuestions ?? [],
                      answers[question.id]
                    )}
                </Paper>
              ))}

            <Downloads
              generatePdf={handleGeneratePdf}
              generateXlsx={handleGeneratePdf}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            lg={4}
            style={{ position: 'fixed', top: 72, right: '2rem' }}
          >
            <Paper
              sx={{
                p: 2,
                width: '22rem',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography component="h1" variant="h6" sx={{ mb: 2 }}>
                Filtros
              </Typography>

              <FormControl fullWidth>
                <InputLabel id="filter-type-select-label">
                  Filtrar por
                </InputLabel>
                <Select
                  labelId="filter-type-select-label"
                  id="filter-type-form-select"
                  value={filterType}
                  label="Filtrar por"
                  onChange={handleChangeFilterType}
                  required
                >
                  <MenuItem value="all">Todas las respuestas</MenuItem>
                  <MenuItem value="career">Carrera</MenuItem>
                  <MenuItem value="professor">Profesor</MenuItem>
                  <MenuItem value="group">Grupo</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ mb: 2 }} />

              {filterType !== 'all' ? (
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
              ) : null}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  )
}
