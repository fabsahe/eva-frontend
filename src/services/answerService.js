import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/answers'

const getAnswers = async (formId) => {
  const { data } = await axios.get(`${baseUrl}/${formId}`)
  return data
}

const createNewAnswer = async (answers) => {
  const response = await axios.post(baseUrl, answers)
  return response
}

export default { getAnswers, createNewAnswer }
