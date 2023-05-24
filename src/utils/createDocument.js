const filterPDF = {
  career: 'la carrera',
  professor: 'el profesor',
  group: 'el grupo'
}

const styles = {
  header: {
    fontSize: 17,
    bold: true
  },
  subheader: {
    fontSize: 14,
    bold: true
  },
  question: {
    fontSize: 12
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

  const queries = questions.map((question, questionIndex) => {
    const questionElement = {
      text: question.sentence,
      style: 'question',
      margin: [0, 20, 0, 8]
    }
    if (question.type === 'grid') {
      questionElement.pageBreak = 'before'
    }

    let answersElement = null
    if (question.type === 'open-ended') {
      answersElement = {
        ul: answers[question.id].flat().map((item) => item)
      }
    } else if (question.type === 'radios') {
      answersElement = {
        image: imageData.find((img) => img.index === questionIndex)?.data,
        width: 340,
        style: 'center',
        margin: [0, 5, 0, 0]
      }
    } else if (question.type === 'dropdown') {
      answersElement = {
        image: imageData.find((img) => img.index === questionIndex)?.data,
        width: 340,
        style: 'center'
      }
    } else if (question.type === 'checkboxes' || question.type === 'scale') {
      answersElement = {
        image: imageData.find((img) => img.index === questionIndex)?.data,
        width: 360,
        style: 'center',
        margin: [0, 15, 15, 0]
      }
    } else if (question.type === 'grid') {
      const subImages = imageData.filter((img) => img.index === questionIndex)
      const subQuestionSentences = question.subQuestions.map((item) => ({
        text: item.value,
        margin: [0, 10, 0, 5]
      }))
      const subQuestionImages = subImages.map((img) => ({
        image: img.data,
        width: 410,
        style: 'center'
      }))

      const { length } = question.subQuestions
      const mergedArr = []
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < length; j++) {
        const subPair = {
          stack: [subQuestionSentences[j], subQuestionImages[j]],
          unbreakable: true
        }
        mergedArr.push(subPair)
      }
      answersElement = {
        ul: mergedArr
      }
    }
    const pair = {
      stack: [questionElement, answersElement],
      unbreakable: question.type !== 'grid'
    }
    return pair
  })

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
