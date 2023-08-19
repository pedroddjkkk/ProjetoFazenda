import { create } from "zustand";

interface CounterStore {
  count: number;
  increaseCounter: (by: number) => void;
}

export const useCounter = create<CounterStore>((set) => ({
  count: 0,
  increaseCounter: (by) => set((state) => ({ count: state.count + by })),
}));
