import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/answers'

const createNewAnswer = async (answers) => {
  const response = await axios.post(baseUrl, answers)
  return response
}

export default { createNewAnswer }
