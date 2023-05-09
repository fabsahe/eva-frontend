import axios from 'axios'
import API_URL from '../constants/api'

const baseURL = `${API_URL}/api/answers`

const getAnswers = async (formId) => {
  const { data } = await axios.get(`${baseURL}/${formId}`)
  return data
}

const createNewAnswers = async (formId, answers) => {
  const response = await axios.post(baseURL, { formId, answers })
  return response
}

export default { getAnswers, createNewAnswers }
