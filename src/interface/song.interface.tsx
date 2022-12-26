import {PaginationType} from './base.interface';

export type SongList = {
  played: boolean;
  id: number;
  title: string;
  musicianId: string;
  musicianName: string;
  imageUrl: string | null;
  songDuration: number;
  lyrics: string;
  transcodedSongUrl: string;
};

export type ListSongResponseType = {
  code: number;
  data: SongList[];
  message: string;
  meta: PaginationType;
  status: number;
};
