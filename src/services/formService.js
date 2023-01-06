import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/forms'

const getOneForm = async formId => {
  const { data } = await axios.get(`${baseUrl}/${formId}`)
  return data
}

export default { getOneForm }
