import axios from 'axios'
import API_URL from '../constants/api'

const baseURL = `${API_URL}/api/version`

const getVersion = async () => {
  const { data } = await axios.get(baseURL)
  const versions = data.data
  if (versions.length > 0) {
    return versions[0]
  }
  return null
}

export default { getVersion }
