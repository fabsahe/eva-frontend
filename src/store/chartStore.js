import { create } from 'zustand'

const useChartStore = create((set) => ({
  download: false,
  imageData: [],
  actions: {
    startDownload: () => set({ download: true }),
    finishDownload: () => set({ download: false, imageData: [] }),
    addImage: (newImage) =>
      set((state) => ({ imageData: [...state.imageData, newImage] })),
    removeAllImages: () => set({ imageData: [] })
  }
}))

export const useDownload = () => useChartStore((state) => state.download)
export const useImageData = () => useChartStore((state) => state.imageData)
export const useChartActions = () => useChartStore((state) => state.actions)
