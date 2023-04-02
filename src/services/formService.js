import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/forms'

const getOneForm = async (formId) => {
  const { data } = await axios.get(`${baseUrl}/${formId}`)
  return data
}

const findForm = async (title) => {
  const { data } = await axios.post(`${baseUrl}/find`, { title })
  return data.data
}

const createNewForm = async (token, formData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.post(
    'http://localhost:3001/api/forms',
    formData,
    config
  )
  return data
}

const updateOneForm = async (token, formId, formData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.put(
    `http://localhost:3001/api/forms/${formId}`,
    formData,
    config
  )
  return data
}

export default { getOneForm, findForm, createNewForm, updateOneForm }
