import axios from 'axios'
import API_URL from '../constants/api'

const baseURL = `${API_URL}/api/timestamps`

const getTimestamps = async (filter) => {
  const params = filter
  const { data } = await axios.get(baseURL, { params })
  return data
}

export default { getTimestamps }
