import { create } from 'zustand'
import dayjs from 'dayjs'

const today = dayjs()
const initOptions = {
  radios: [],
  checkboxes: [],
  scale: [],
  labels: [],
  rows: [],
  cols: []
}

const useFormStore = create((set) => ({
  scroll: false,
  emptyForm: true,
  title: '',
  year: '',
  period: '',
  careers: [],
  startDate: today,
  endDate: today,
  questions: [],
  questionMode: 'new',
  questionToEdit: null,
  questionSentence: '',
  questionType: '',
  options: { ...initOptions },
  actions: {
    setScroll: (value) => set({ scroll: value }),
    setEmptyForm: (value) => set({ emptyForm: value }),
    setTitle: (value) => set({ title: value }),
    setYear: (value) => set({ year: value }),
    setPeriod: (value) => set({ period: value }),
    setCareers: (value) => set({ careers: value }),
    setStartDate: (value) => set({ startDate: value }),
    setEndDate: (value) => set({ endDate: value }),
    setQuestions: (newQuestions) => set({ questions: newQuestions }),
    setQuestionMode: (newMode) => set({ questionMode: newMode }),
    setQuestionToEdit: (questionId) => set({ questionToEdit: questionId }),
    setQuestionSentence: (sentence) => set({ questionSentence: sentence }),
    setQuestionType: (type) => set({ questionType: type }),
    setOptions: (obj) => set({ options: obj }),
    reset: () =>
      set({
        emptyForm: true,
        title: '',
        year: '',
        period: '',
        careers: [],
        startDate: today,
        endDate: today,
        questions: [],
        questionMode: 'new',
        questionToEdit: null,
        questionSentence: '',
        questionType: '',
        options: { ...initOptions }
      }),
    resetQuestion: () =>
      set({
        questionSentence: '',
        questionType: '',
        options: { ...initOptions },
        questionMode: 'new'
      })
  }
}))

export const useScroll = () => useFormStore((state) => state.scroll)
export const useEmptyForm = () => useFormStore((state) => state.emptyForm)
export const useTitle = () => useFormStore((state) => state.title)
export const useYear = () => useFormStore((state) => state.year)
export const usePeriod = () => useFormStore((state) => state.period)
export const useCareers = () => useFormStore((state) => state.careers)
export const useStartDate = () => useFormStore((state) => state.startDate)
export const useEndDate = () => useFormStore((state) => state.endDate)
export const useQuestions = () => useFormStore((state) => state.questions)
export const useQuestionMode = () => useFormStore((state) => state.questionMode)
export const useQuestionToEdit = () =>
  useFormStore((state) => state.questionToEdit)
export const useQuestionSentence = () =>
  useFormStore((state) => state.questionSentence)
export const useQuestionType = () => useFormStore((state) => state.questionType)
export const useOptions = () => useFormStore((state) => state.options)
export const useFormActions = () => useFormStore((state) => state.actions)
