import axios from 'axios'
import API_URL from '../constants/api'

const baseURL = `${API_URL}/api/assignments`

const getAssignmentsByCareer = async (careerId, year, period) => {
  const { data } = await axios.get(
    `${baseURL}/${careerId}?year=${year}&period=${period}`
  )
  return data
}

const getProfessorsByGroup = async (groupName, year, period) => {
  const { data } = await axios.get(
    `${baseURL}/professors/${groupName}?year=${year}&period=${period}`
  )
  return data
}

export default { getAssignmentsByCareer, getProfessorsByGroup }
