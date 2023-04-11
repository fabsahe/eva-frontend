import { create } from 'zustand'

const useFormListStore = create((set) => ({
  modalDetails: false,
  formSelected: null,
  actions: {
    showModalDetails: () => set({ modalDetails: true }),
    selectForm: (formId) => set({ formSelected: formId }),
    hideModalDetails: () => set({ modalDetails: false, formSelected: null })
  }
}))

export const useModalDetails = () =>
  useFormListStore((state) => state.modalDetails)
export const useFormSelected = () =>
  useFormListStore((state) => state.formSelected)
export const useFormActions = () => useFormListStore((state) => state.actions)
