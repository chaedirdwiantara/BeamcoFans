import {usePlayerStore} from '../store/player.store';

export const usePlayerHook = () => {
  const playerStore = usePlayerStore();

  const showPlayer = () => {
    playerStore.setShow(true);
    setPlaySong();
  };

  const hidePlayer = () => {
    playerStore.setShow(false);
  };

  const setDurationPlayer = (duration: number) => {
    playerStore.setDuration(duration);
  };

  const setProgressPlayer = (progress: number) => {
    playerStore.setCurrentProgress(progress);
  };

  const setPlaySong = () => {
    playerStore.setPlay(true);
  };

  const setPauseSong = () => {
    playerStore.setPlay(false);
  };

  return {
    visible: playerStore.show,
    duration: playerStore.duration,
    currentProgress: playerStore.currentProgress,
    isPlay: playerStore.play,
    showPlayer,
    hidePlayer,
    setDurationPlayer,
    setProgressPlayer,
    setPlaySong,
    setPauseSong,
  };
};
