import { create } from 'zustand'

const useFormStatsStore = create((set) => ({
  modalDetails: false,
  formSelected: null,
  actions: {
    showModalDetails: () => set({ modalDetails: true }),
    selectForm: (formId) => set({ formSelected: formId }),
    hideModalDetails: () => set({ modalDetails: false, formSelected: null })
  }
}))

export const useModalDetails = () =>
  useFormStatsStore((state) => state.modalDetails)
export const useFormSelected = () =>
  useFormStatsStore((state) => state.formSelected)
export const useFormActions = () => useFormStatsStore((state) => state.actions)
