import create, { SetState, GetState } from "zustand";

type Store = {
  moodScore: number;
  setMoodScore: (score: number) => void;
};

export const useStore = create<Store>(
  (set: SetState<Store>, get: GetState<Store>) => ({
    moodScore: 0,
    setMoodScore: (score): void => {
      set({ moodScore: score });
    }
  })
);
