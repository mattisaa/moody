import create, { SetState, GetState } from "zustand";

type Store = {
  moodScore: number;
  setMoodScore: (score: number) => void;
  setIsVisualizationFinished: (finished: boolean) => void;
  isVisualizationFinished: boolean;
};

export const useStore = create<Store>(
  (set: SetState<Store>, get: GetState<Store>) => ({
    moodScore: 0,
    isVisualizationFinished: false,
    setMoodScore: (score): void => {
      set({ moodScore: score });
    },
    setIsVisualizationFinished: (finished): void => {
      set({ isVisualizationFinished: finished });
    }
  })
);
