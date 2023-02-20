import {imageTypes, PaginationType} from './base.interface';

export type SongPropsTypeA = {
  id: number;
};

export type SongList = {
  isAddedToThisPlaylist: boolean;
  played: boolean;
  id: number;
  title: string;
  musicianId: string;
  musicianName: string;
  imageUrl: imageTypes[];
  songDuration: number;
  lyrics: string;
  transcodedSongUrl: TranscodedSongType[];
  originalSongUrl: string;
  isLiked: boolean;
};

export type TranscodedSongType = {
  id: number;
  songId: number;
  encodedDashUrl: string;
  encodedHlsUrl: string;
  quality: number;
  presetName: 'highest' | 'high' | 'med' | 'low';
  encodeStatus: 'FINISHED' | 'ON_PROCESS';
};

export type ListSongResponseType = {
  code: number;
  data: SongList[];
  message: string;
  meta: PaginationType;
  status: number;
};

export type FeaturingArtist = {
  uuid: string;
  fullname: string;
  imageProfile: string;
};

export type DataAlbum = {
  id: number;
  musicianId: string;
  title: string;
  description: string;
  imageUrl: imageTypes[];
  featuringArtist: FeaturingArtist[];
  genre: FeaturingArtist;
  subgenre: FeaturingArtist;
  likesCount: number;
  shareCount: number;
  copyrightProducer: string[];
  copyrightVisual: string[];
  copyrightFans: string[];
  productionYear: string;
  publishedDate: string;
  label: string[];
};

export type RelatedSongs = {
  id: number;
  musicianId: string;
  musicianName: string;
  albumId: number;
  title: string;
  description: string;
  songWriter: string[];
  imageUrl: imageTypes[];
  publishedDate: string;
  isPublished: true;
  isFeaturing: false;
  likesCount: number;
  shareCount: number;
  listenerCount: number;
  mood: string;
  genre: string;
  version: string;
  lyrics: string;
  copyright: string;
  originalSongUrl: string;
  transcodedSongUrl: string;
  drmFileUrl: string;
  drmKey: string;
  language: string;
  barcodeIsrc: string;
  songDuration: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  Album: DataAlbum;
};

export type TranscodedSongUrl = {
  trackId: string;
  songId: number;
  sessionId: string;
  encodedDashUrl: string;
  encodedHlsUrl: string;
  quality: number;
  bitrate: string;
  presetName: string;
  encodeStatus: string;
};

export type DataDetailSong = {
  id: number;
  musicianUUID: string;
  musicianName: string;
  title: string;
  description: string;
  songWriter: string[];
  imageUrl: imageTypes[];
  publishedDate: string;
  isPublish: boolean;
  likesCount: number;
  shareCount: number;
  listenerCount: number;
  version: string;
  lyrics: string;
  copyright: string;
  originalSongURL: string;
  originalFilename: string;
  songDuration: string;
  language: string;
  barcodeISRC: string;
  CreatedAt: string;
  isAddedToThisPlaylist: boolean;
  transcodedSongUrl: any;
  album: DataAlbum;
  featuring: any;
};

export type DetailSongResponseType = {
  code: number;
  data: DataDetailSong;
  message: string;
  status: number;
};

export type DataDetailAlbum = {
  id: number;
  musician: string;
  musicianName: string;
  title: string;
  description: string;
  imageUrl: imageTypes[];
  featuringArtist: FeaturingArtist[];
  genre: string;
  subgenre: string;
  likesCount: number;
  shareCount: number;
  mood: string;
  copyrightProducer: string[];
  copyrightVisual: string[];
  copyrightFans: string[];
  productionYear: string;
  releaseDate: string;
  publishedDate: string;
  isPublished: boolean;
  language: string;
  label: string[];
  barcodeUpc: string;
  createdAt: string;
  updatedAt: string;
  status: string;
};

export type DetailAlbumResponseType = {
  code: number;
  data: DataDetailAlbum;
  message: string;
  status: number;
};

export type LikeSongResponseType = {
  code: number;
  data: string | null;
  message: string;
  status: number;
};
