import { create } from 'zustand'

const useFormStore = create((set) => ({
  modalDetails: false,
  formSelected: null,
  actions: {
    showModalDetails: () => set({ modalDetails: true }),
    selectForm: (formId) => set({ formSelected: formId }),
    hideModalDetails: () => set({ modalDetails: false, formSelected: null })
  }
}))

export const useModalDetails = () => useFormStore((state) => state.modalDetails)
export const useFormSelected = () => useFormStore((state) => state.formSelected)
export const useFormActions = () => useFormStore((state) => state.actions)
