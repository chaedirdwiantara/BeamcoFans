export interface TopSongProps {
  id: string;
  musicNum: number;
  musicTitle: string;
  singerName: string;
  imgUri: string;
  played: boolean;
}
export const TopSongListData: TopSongProps[] = [
  {
    id: '1',
    musicNum: 1,
    musicTitle: 'Thunder',
    singerName: 'Imagine Dragons',
    imgUri: 'https://i.ytimg.com/vi/GtEvysh1654/maxresdefault.jpg',
    played: false,
  },
  {
    id: '2',
    musicNum: 2,
    musicTitle: 'Sunflower',
    singerName: 'Rex Orange County',
    imgUri: 'https://i.ytimg.com/vi/awga8fAYOtE/maxresdefault.jpg',
    played: false,
  },
  {
    id: '3',
    musicNum: 3,
    musicTitle: 'I Still Love You',
    singerName: 'The Overtunes',
    imgUri: 'https://i.ytimg.com/vi/Tw-u1EvLLL0/maxresdefault.jpg',
    played: false,
  },
  {
    id: '4',
    musicNum: 4,
    musicTitle: 'I Like Me Better',
    singerName: 'Lauv',
    imgUri: 'https://i.scdn.co/image/ab67616d0000b273fab48816b625e2a77a732400',
    played: false,
  },
  {
    id: '5',
    musicNum: 5,
    musicTitle: '7 Rings',
    singerName: 'Ariana Grande',
    imgUri:
      'https://m.media-amazon.com/images/M/MV5BYTQ2MTdmOTQtNzY0NS00MDQ1LWEwOWItNDczNzUxMDdlOTYzXkEyXkFqcGdeQXVyMTI1Mzg0ODA5._V1_.jpg',
    played: false,
  },
  {
    id: '6',
    musicNum: 6,
    musicTitle: 'Drunk',
    singerName: 'Keshi',
    imgUri: 'https://i.ytimg.com/vi/CyadFi-x3Dk/maxresdefault.jpg',
    played: false,
  },
  {
    id: '7',
    musicNum: 7,
    musicTitle: 'Let Me Love You',
    singerName: 'Justin Bieber',
    imgUri:
      'https://lastfm.freetls.fastly.net/i/u/ar0/c800779a399447228ab7cc929bb8895a.jpg',
    played: false,
  },
];
