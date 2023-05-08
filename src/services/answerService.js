import axios from 'axios'
import API_URL from '../constants/api'

const baseURL = `${API_URL}/api/answers`

const getAnswers = async (formId) => {
  const { data } = await axios.get(`${baseURL}/${formId}`)
  return data
}

const createNewAnswers = async (answers) => {
  const response = await axios.post(baseURL, answers)
  return response
}

export default { getAnswers, createNewAnswers }
