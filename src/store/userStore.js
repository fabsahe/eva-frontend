import { create } from 'zustand'

const useUserStore = create((set) => ({
  passwordDialog: false,
  userSelected: null,
  actions: {
    showPasswordDialog: () => set({ passwordDialog: true }),
    selectUser: (userId) => set({ userSelected: userId }),
    hidePasswordDialog: () => set({ passwordDialog: false, userSelected: null })
  }
}))

export const usePasswordDialog = () =>
  useUserStore((state) => state.passwordDialog)
export const useUserSelected = () => useUserStore((state) => state.userSelected)
export const useUserActions = () => useUserStore((state) => state.actions)
