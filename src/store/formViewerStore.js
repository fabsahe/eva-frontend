import { create } from 'zustand'

const useFormViewerStore = create((set) => ({
  section: '',
  careers: [],
  year: '',
  period: '',
  questions: [],
  actions: {
    setSection: (value) => set({ section: value }),
    setCareers: (value) => set({ careers: value }),
    setYear: (value) => set({ year: value }),
    setPeriod: (value) => set({ period: value }),
    setQuestions: (newQuestions) => set({ questions: newQuestions })
  }
}))

export const useSection = () => useFormViewerStore((state) => state.section)
export const useCareers = () => useFormViewerStore((state) => state.careers)
export const useYear = () => useFormViewerStore((state) => state.year)
export const usePeriod = () => useFormViewerStore((state) => state.period)
export const useQuestions = () => useFormViewerStore((state) => state.questions)
export const useFormViewerActions = () =>
  useFormViewerStore((state) => state.actions)
