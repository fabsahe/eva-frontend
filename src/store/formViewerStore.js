import { create } from 'zustand'

const useFormViewerStore = create((set) => ({
  formId: '',
  section: '',
  careers: [],
  year: '',
  period: '',
  career: '',
  group: '',
  professor: '',
  questions: [],
  answers: [],
  actions: {
    setFormId: (value) => set({ formId: value }),
    setSection: (value) => set({ section: value }),
    setCareers: (value) => set({ careers: value }),
    setYear: (value) => set({ year: value }),
    setPeriod: (value) => set({ period: value }),
    setCareer: (value) => set({ career: value }),
    setGroup: (value) => set({ group: value }),
    setProfessor: (value) => set({ professor: value }),
    setQuestions: (newQuestions) => set({ questions: newQuestions }),
    setAnswers: (newAnswers) => set({ answers: newAnswers })
  }
}))

export const useFormId = () => useFormViewerStore((state) => state.formId)
export const useSection = () => useFormViewerStore((state) => state.section)
export const useCareers = () => useFormViewerStore((state) => state.careers)
export const useYear = () => useFormViewerStore((state) => state.year)
export const usePeriod = () => useFormViewerStore((state) => state.period)
export const useCareer = () => useFormViewerStore((state) => state.career)
export const useGroup = () => useFormViewerStore((state) => state.group)
export const useProfessor = () => useFormViewerStore((state) => state.professor)
export const useQuestions = () => useFormViewerStore((state) => state.questions)
export const useAnswers = () => useFormViewerStore((state) => state.answers)
export const useFormViewerActions = () =>
  useFormViewerStore((state) => state.actions)
