interface PostProps {
  postTitle?: string;
  postPicture?: any;
}

export interface PostListType {
  id: string;
  musicianName: string;
  musicianId: string;
  imgUri: string;
  postDate: string;
  post: PostProps;
  likeCount: number;
  commentCount: number;
  category: string;
}
export const PostlistData: PostListType[] = [
  {
    id: '1',
    musicianName: 'Frank Lampardo',
    musicianId: '@franky',
    imgUri:
      'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
    postDate: '14-07-2022',
    post: {
      postTitle: 'hey guys its me goku',
      postPicture: [
        {
          id: 0,
          postUri:
            'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        },
        {
          id: 1,
          postUri:
            'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        },
      ],
    },
    category: 'Coming Up',
    likeCount: 120,
    commentCount: 80,
  },
  {
    id: '2',
    musicianName: 'Dwayne Johnson',
    musicianId: '@theRocky',
    imgUri:
      'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
    postDate: '14-07-2022',
    post: {
      postTitle: 'hey guys its me goku',
      postPicture: [
        {
          id: 0,
          postUri:
            'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        },
        {
          id: 1,
          postUri:
            'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        },
      ],
    },
    category: 'Tour',
    likeCount: 120,
    commentCount: 80,
  },
  {
    id: '3',
    musicianName: 'Putin',
    musicianId: '@phutinyKawaiii',
    imgUri:
      'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
    postDate: '14-07-2022',
    post: {
      postTitle: 'hey guys its me goku',
      postPicture: [
        {
          id: 0,
          postUri:
            'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        },
        {
          id: 1,
          postUri:
            'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        },
      ],
    },
    category: 'Daily Life',
    likeCount: 120,
    commentCount: 80,
  },
  {
    id: '4',
    musicianName: 'Lee Min Nyong',
    musicianId: '@arassooo',
    imgUri:
      'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
    postDate: '14-07-2022',
    post: {
      postTitle: 'hey guys its me goku',
      postPicture: [
        {
          id: 0,
          postUri:
            'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        },
        {
          id: 1,
          postUri:
            'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        },
      ],
    },
    category: 'Backstage',
    likeCount: 120,
    commentCount: 80,
  },
  {
    id: '5',
    musicianName: 'Mikasa',
    musicianId: '@ereeee',
    imgUri:
      'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
    postDate: '14-07-2022',
    post: {
      postTitle: 'ereeeeeeehhhh....',
      postPicture: [
        {
          id: 0,
          postUri:
            'https://dafunda.com/wp-content/uploads/2022/02/Inilah-Alasan-Kuat-Kenapa-Eren-Yeager-Menjadi-Jahat-di-Attack-on-Titan.jpg',
        },
        {
          id: 1,
          postUri:
            'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        },
      ],
    },
    category: 'Coming Up',
    likeCount: 120,
    commentCount: 80,
  },
];
