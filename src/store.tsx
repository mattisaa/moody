import create, { SetState, GetState } from "zustand";

type Store = {
  moodScore: { mood: number; danceability: number; energy: number };
  setMoodScore: (score: {
    mood: number;
    danceability: number;
    energy: number;
  }) => void;
  setIsVisualizationFinished: (finished: boolean) => void;
  isVisualizationFinished: boolean;
};

export const useStore = create<Store>((set: SetState<Store>) => ({
  moodScore: { mood: 0, danceability: 0, energy: 0 },
  isVisualizationFinished: false,
  setMoodScore: (score): void => {
    set({ moodScore: score });
  },
  setIsVisualizationFinished: (finished): void => {
    set({ isVisualizationFinished: finished });
  }
}));
