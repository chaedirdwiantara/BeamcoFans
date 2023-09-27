import create from 'zustand';

interface VideoStatusProps {
  videoIdIsPlaying: string;
  videoPaused: boolean;
  setVideoIdIsPlaying: (value: string) => void;
  setVideoPaused: (value: boolean) => void;
}

export const useVideoStatus = create<VideoStatusProps>(set => ({
  videoIdIsPlaying: '',
  videoPaused: false,
  setVideoIdIsPlaying: (value: string) => set({videoIdIsPlaying: value}),
  setVideoPaused: (value: boolean) => set({videoPaused: value}),
}));
