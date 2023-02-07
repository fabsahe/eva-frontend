import { useState } from 'react'

// eslint-disable-next-line import/prefer-default-export
export const useLocalStorage = () => {
  const [value, setValue] = useState(null)

  const setItem = (key, localValue) => {
    localStorage.setItem(key, localValue)
    setValue(localValue)
  }

  const getItem = (key) => {
    const localValue = localStorage.getItem(key)
    setValue(localValue)
    return localValue
  }

  const removeItem = (key) => {
    localStorage.removeItem(key)
    setValue(null)
  }

  return { value, setItem, getItem, removeItem }
}
