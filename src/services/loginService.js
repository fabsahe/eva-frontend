import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/login'

const signIn = async (credentials) => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

const signOut = () => {
  return true
}

export default { signIn, signOut }
