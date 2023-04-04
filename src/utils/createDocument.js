const filterPDF = {
  career: 'la carrera',
  professor: 'el profesor',
  group: 'el grupo'
}

const styles = {
  header: {
    fontSize: 18,
    bold: true
  },
  subheader: {
    fontSize: 15,
    bold: true
  },
  question: {
    fontSize: 13
  },
  center: {
    alignment: 'center'
  }
}

const createDocument = (info, questions, answers, imageData) => {
  const { title, filterType, filterList, filter } = info

  const foundFilter = filterList.find((item) => item._id === filter)
  const filterName = foundFilter.nombre
  const filterTypeText = filterPDF[filterType]

  const header = {
    text: `Respuestas para el cuestionario ${title}\n`,
    style: 'header'
  }
  const subheader = {
    text: `Filtradas para ${filterTypeText}: ${filterName}`,
    style: 'subheader'
  }

  const queries = questions
    .map((question, questionIndex) => {
      const questionElement = {
        text: question.pregunta,
        style: 'question',
        margin: [0, 20, 0, 0]
      }

      const hasOptions = question.opciones.length > 0
      const answersElement = hasOptions
        ? {
            image: imageData.find((img) => img.index === questionIndex)?.data,
            width: 190,
            style: 'center'
          }
        : {
            ul: answers[question._id].map((item) => item.texto)
          }

      return [questionElement, answersElement]
    })
    .flat()

  const orderedQueries = {
    ol: queries
  }

  const content = [header, subheader, orderedQueries]
  return {
    content,
    styles
  }
}

export default createDocument
