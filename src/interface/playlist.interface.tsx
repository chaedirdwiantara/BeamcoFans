export type ListPlaylist = {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  totalSong: number;
  ordering: number;
};

export type PlaylistPropsType = {
  name: string;
  description: string;
  thumbnailUrl: string;
  isPublic: boolean;
};

export type PlaylistResponseType = {
  code: number;
  data: ListPlaylist[];
  message: string;
  status: number;
};
