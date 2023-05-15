import axios from 'axios'
import API_URL from '../constants/api'

const baseURL = `${API_URL}/api/periods`

const getAllPeriods = async () => {
  const { data } = await axios.get(baseURL)
  return data
}

export default { getAllPeriods }
