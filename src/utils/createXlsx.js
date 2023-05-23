/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import INFO_COL_NAMES from '../constants/infoColNames'
import timestampService from '../services/timestampService'

const COL_NAMES_ALIGN_V = 'bottom'
const BORDER_COLOR = '#9A9A9A'

function getSpan(question) {
  if (question.type === 'grid' || question.type === 'checkboxes') {
    return question.subSentences.length
  }
  return 1
}

function getRowSpan(question) {
  if (question.type === 'grid' || question.type === 'checkboxes') {
    return 1
  }
  return 2
}

function getBorder(type) {
  if (type === 'grid' || type === 'checkboxes') {
    return 'none'
  }
  return 'thick'
}

function getBorderColor(type) {
  if (type === 'grid' || type === 'checkboxes') {
    return null
  }
  return BORDER_COLOR
}

export const generateXlsxQuestions = (questions) => {
  const xlsxQuestions = questions.map((question) => {
    const { id, sentence, type, answers } = question
    const newQuestion = { id, sentence, subSentences: [], type, answers }

    if (type === 'grid') {
      newQuestion.subSentences = question.subQuestions.map((item) => item.value)
    } else if (type === 'checkboxes') {
      newQuestion.subSentences = [...question.labels]
    }

    return newQuestion
  })

  return xlsxQuestions
}

export const createTable = async (questions, filterType, filterValue) => {
  const filter = {
    [filterType]: filterValue
  }

  /*  Generación de la fila de cabecera, 
      conformada por los enunciados de cada pregunta */
  const infoCols = INFO_COL_NAMES.map((item) => ({
    value: item,
    alignVertical: COL_NAMES_ALIGN_V,
    fontWeight: 'bold',
    rowSpan: 2,
    wrap: true,
    bottomBorderStyle: 'thick',
    bottomBorderColor: BORDER_COLOR
  }))

  const sentenceCols = []
  questions.forEach((question) => {
    sentenceCols.push({
      value: question.sentence,
      alignVertical: COL_NAMES_ALIGN_V,
      fontWeight: 'bold',
      span: getSpan(question),
      rowSpan: getRowSpan(question),
      wrap: true,
      bottomBorderStyle: getBorder(question.type),
      bottomBorderColor: getBorderColor(question.type)
    })
    if (question.type === 'grid' || question.type === 'checkboxes') {
      const number = question.subSentences.length - 1
      for (let i = 0; i < number; i++) {
        sentenceCols.push(null)
      }
    }
  })
  const headerRow = infoCols.concat(sentenceCols)

  /*  La segunda fila también pertenece a la cabecera, 
      conformada por los sub-enunciados de las preguntas de 
      cuadrícula o checkboxes */
  const initialSpan = Array(INFO_COL_NAMES.length).fill(null)

  const optionCols = []
  questions.forEach((question) => {
    if (question.type === 'grid' || question.type === 'checkboxes') {
      const number = question.subSentences.length
      for (let i = 0; i < number; i++) {
        optionCols.push({
          value: question.subSentences[i],
          alignVertical: 'bottom',
          wrap: true,
          bottomBorderStyle: 'thick',
          bottomBorderColor: BORDER_COLOR
        })
      }
    } else {
      optionCols.push(null)
    }
  })
  const optionsRow = initialSpan.concat(optionCols)

  /* Recuperación de respuestas por marcas de tiempo */
  const response = await timestampService.getTimestamps(filter)

  const timestamps = response.data

  const answerRows = timestamps.map((timestamp) => {
    const currentAnswerRow = [null, null, null, null]
    questions.forEach((question) => {
      const currentAnswerObj = timestamp.answers.find(
        (ans) => ans.question === question.id
      )
      const currentAnswers = currentAnswerObj.answers
      if (question.type === 'checkboxes') {
        const checkAns = question.subSentences.map((element) =>
          currentAnswers.includes(element) ? 'Sí' : 'No'
        )
        checkAns.forEach((element) => {
          currentAnswerRow.push({ value: element })
        })
      } else {
        currentAnswers.forEach((element) => {
          currentAnswerRow.push({ value: element })
        })
      }
    })
    return currentAnswerRow
  })

  const data = [headerRow, optionsRow, ...answerRows]

  return data
}

export const createColumns = (questions) => {
  const infoColumns = Array(INFO_COL_NAMES.length).fill({ width: 35 })
  const questionColumns = []

  questions.forEach((question) => {
    if (question.type === 'grid' || question.type === 'checkboxes') {
      const number = question.subSentences.length
      for (let i = 0; i < number; i++) {
        questionColumns.push({ width: 35 })
      }
    } else {
      questionColumns.push({ width: 30 })
    }
  })

  const columns = infoColumns.concat(questionColumns)
  return columns
}
