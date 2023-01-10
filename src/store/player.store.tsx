import React from 'react';
import create from 'zustand';
import Video from 'react-native-video';
import {SongList} from '../interface/song.interface';

interface PlayerState {
  playerRef: React.MutableRefObject<Video | null>;
  setPlayerRef: (by: React.MutableRefObject<Video | null>) => void;
  show: boolean;
  setShow: (by: boolean) => void;
  duration: number;
  setDuration: (by: number) => void;
  currentProgress: number;
  setCurrentProgress: (by: number) => void;
  play: boolean;
  setPlay: (by: boolean) => void;
  musicData: {
    id: number;
    title: string;
    artist: string;
    albumImg: string | null;
    musicUrl: string;
  };
  setMusicData: (by: {
    id: number;
    title: string;
    artist: string;
    albumImg: string | null;
    musicUrl: string;
  }) => void;
  playlist: SongList[];
  setPlaylist: (by: SongList[]) => void;
}

export const usePlayerStore = create<PlayerState>()(set => ({
  playerRef: React.createRef(),
  setPlayerRef: by => set(state => ({playerRef: by})),
  show: false,
  setShow: by => set(state => ({show: by})),
  duration: 0,
  setDuration: by => set(state => ({duration: by})),
  currentProgress: 0,
  setCurrentProgress: by => set(state => ({currentProgress: by})),
  play: false,
  setPlay: by => set(state => ({play: by})),
  musicData: {
    id: 0,
    title: '',
    artist: '',
    albumImg: '',
    musicUrl: '',
  },
  setMusicData: by => set(state => ({musicData: by})),
  playlist: [],
  setPlaylist: by => set(state => ({playlist: by})),
}));
