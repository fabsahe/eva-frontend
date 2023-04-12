import axios from 'axios'
import API_URL from '../constants/api'

const baseURL = `${API_URL}/api/forms`

const getOneForm = async (formId) => {
  const { data } = await axios.get(`${baseURL}/${formId}`)
  return data
}

const availableTitle = async (title, formId) => {
  const { data } = await axios.post(`${baseURL}/check`, { title, formId })
  return data.data
}

const createNewForm = async (token, formData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.post(baseURL, formData, config)
  return data
}

const updateOneForm = async (token, formId, formData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.put(`${baseURL}/${formId}`, formData, config)
  return data
}

export default { getOneForm, availableTitle, createNewForm, updateOneForm }
