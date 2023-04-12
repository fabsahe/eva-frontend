import axios from 'axios'
import API_URL from '../constants/api'

const baseURL = `${API_URL}/api/users`

const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.get(`${baseURL}/`, config)
  return data
}

const updatePassword = async (token, userId, password) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const userData = { userId, password }
  const { data } = await axios.post(
    `${baseURL}/update-password`,
    userData,
    config
  )
  return data
}

export default { getAllUsers, updatePassword }
