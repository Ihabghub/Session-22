import { create } from 'zustand';

const useProgressStore = create((set) => ({
  progress: 0,
  isDone: false,
  hasStarted: false,
  increaseProgress: () => set((state) => ({ progress: state.progress + 1  })),
  setDone: () => set({ isDone: true, hasStarted: false }),
  resetProgress: () => set({ progress: 0, isDone: false }),
  startProgress: () => set({ hasStarted: true }),
}));

export default useProgressStore;