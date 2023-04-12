import { create } from 'zustand'

const useAuthStore = create((set) => ({
  token: null,
  isAdmin: false,
  actions: {
    getUserToken: () => {
      const loggedUserJSON = window.localStorage.getItem('loggedEvaAppUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        set({ token: user.token })
      }
    }
  }
}))

export const useUserToken = () => useAuthStore((state) => state.token)
export const useAuthActions = () => useAuthStore((state) => state.actions)
