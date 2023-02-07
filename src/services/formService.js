import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/forms'

const getOneForm = async (formId) => {
  const { data } = await axios.get(`${baseUrl}/${formId}`)
  return data
}

const createNewForm = async (token, formData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(
    'http://localhost:3001/api/forms',
    formData,
    config
  )
  return response
}

export default { getOneForm, createNewForm }
