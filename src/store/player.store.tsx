import create from 'zustand';

interface PlayerState {
  show: boolean;
  setShow: (by: boolean) => void;
  duration: number;
  setDuration: (by: number) => void;
  currentProgress: number;
  setCurrentProgress: (by: number) => void;
  play: boolean;
  setPlay: (by: boolean) => void;
}

export const usePlayerStore = create<PlayerState>()(set => ({
  show: false,
  setShow: by => set(state => ({show: by})),
  duration: 0,
  setDuration: by => set(state => ({duration: by})),
  currentProgress: 0,
  setCurrentProgress: by => set(state => ({currentProgress: by})),
  play: false,
  setPlay: by => set(state => ({play: by})),
}));
