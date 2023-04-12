import { create } from 'zustand'

const useAuthStore = create((set) => ({
  token: null,
  username: '',
  isAdmin: false,
  actions: {
    getUserToken: () => {
      const loggedUserJSON = window.localStorage.getItem('loggedEvaAppUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        set({ token: user.token })
        set({ username: user.email })
      }
    }
  }
}))

export const useUserToken = () => useAuthStore((state) => state.token)
export const useUsername = () => useAuthStore((state) => state.username)
export const useAuthActions = () => useAuthStore((state) => state.actions)
