import axios from 'axios'
import API_URL from '../constants/api'

const baseURL = `${API_URL}/api/login`

const signIn = async (credentials) => {
  const { data } = await axios.post(baseURL, credentials)
  return data
}

const signOut = () => {
  return true
}

export default { signIn, signOut }
