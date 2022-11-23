export interface CommentLvl2Type {
  imgUri: string;
  userName: string;
  userId: string;
  postDate: string;
  userCommentedId: string;
  commentCaption: string;
  likeCount: number;
  commentCount: number;
  reply: [{}];
}
export interface CommentType {
  imgUri: string;
  userName: string;
  userId: string;
  postDate: string;
  commentCaption: string;
  likeCount: number;
  commentCount: number;
  reply?: CommentLvl2Type[];
}
export const commentData: CommentType[] = [
  {
    imgUri:
      'https://www.allkpop.com/upload/2022/08/content/041728/web_data/allkpop_1659648882_untitled-1.jpg',
    userName: 'Irene',
    userId: '@redVelvetIren',
    postDate: '1 hours',
    commentCaption:
      'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
    likeCount: 120,
    commentCount: 120,
    reply: [
      {
        imgUri:
          'https://bacapaja.com/wp-content/uploads/2020/11/Nancy-Momoland-1.jpg',
        userName: 'Nancy',
        userId: '@Nancy',
        postDate: '30 minutes',
        userCommentedId: '@redVelvetIren',
        commentCaption:
          'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
        likeCount: 120,
        commentCount: 120,
        reply: [{}],
      },
    ],
  },
  {
    imgUri:
      'https://en.kepoper.com/wp-content/uploads/2020/10/Bae-Suzy-Pinterest.jpg',
    userName: 'SuzyBae',
    userId: '@sujybae',
    postDate: '1 weeks',
    commentCaption:
      'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
    likeCount: 120,
    commentCount: 120,
    reply: [
      {
        imgUri:
          'https://bacapaja.com/wp-content/uploads/2020/11/Nancy-Momoland-1.jpg',
        userName: 'Nancy',
        userId: '@Nancy',
        postDate: '30 minutes',
        userCommentedId: '@redVelvetIren',
        commentCaption:
          'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
        likeCount: 120,
        commentCount: 120,
        reply: [{}],
      },
    ],
  },
  {
    imgUri: 'https://cdn.myanimelist.net/images/voiceactors/3/63662.jpg',
    userName: 'Lilas Ikuta',
    userId: '@Yoasobi',
    postDate: '1 months',
    commentCaption:
      'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
    likeCount: 120,
    commentCount: 120,
    reply: [
      {
        imgUri:
          'https://bacapaja.com/wp-content/uploads/2020/11/Nancy-Momoland-1.jpg',
        userName: 'Nancy',
        userId: '@Nancy',
        postDate: '30 minutes',
        userCommentedId: '@redVelvetIren',
        commentCaption:
          'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
        likeCount: 120,
        commentCount: 120,
        reply: [{}],
      },
    ],
  },
  {
    imgUri: 'https://cdn.myanimelist.net/images/voiceactors/3/66042.jpg',
    userName: 'Aimer',
    userId: '@afterrain',
    postDate: '1 years',
    commentCaption:
      'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
    likeCount: 120,
    commentCount: 120,
    reply: [
      {
        imgUri:
          'https://bacapaja.com/wp-content/uploads/2020/11/Nancy-Momoland-1.jpg',
        userName: 'Nancy',
        userId: '@Nancy',
        postDate: '30 minutes',
        userCommentedId: '@redVelvetIren',
        commentCaption:
          'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
        likeCount: 120,
        commentCount: 120,
        reply: [{}],
      },
    ],
  },
];
