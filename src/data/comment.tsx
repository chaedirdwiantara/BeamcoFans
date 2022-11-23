export interface replyType {}
export interface CommentType {
  imgUri: string;
  userName: string;
  musicianId: string;
  postDate: string;
  commentCaption: string;
  likeCount: number;
  commentCount: number;
  reply?: replyType[];
}
export const commentData: CommentType[] = [
  {
    imgUri:
      'https://www.allkpop.com/upload/2022/08/content/041728/web_data/allkpop_1659648882_untitled-1.jpg',
    userName: 'Irene',
    musicianId: '@redVelvetIren',
    postDate: '1 hours',
    commentCaption:
      'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
    likeCount: 120,
    commentCount: 120,
  },
  {
    imgUri:
      'https://en.kepoper.com/wp-content/uploads/2020/10/Bae-Suzy-Pinterest.jpg',
    userName: 'SuzyBae',
    musicianId: '@sujybae',
    postDate: '1 weeks',
    commentCaption:
      'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
    likeCount: 120,
    commentCount: 120,
  },
  {
    imgUri: 'https://cdn.myanimelist.net/images/voiceactors/3/63662.jpg',
    userName: 'Lilas Ikuta',
    musicianId: '@Yoasobi',
    postDate: '1 months',
    commentCaption:
      'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
    likeCount: 120,
    commentCount: 120,
  },
  {
    imgUri: 'https://cdn.myanimelist.net/images/voiceactors/3/66042.jpg',
    userName: 'Aimer',
    musicianId: '@afterrain',
    postDate: '1 years',
    commentCaption:
      'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
    likeCount: 120,
    commentCount: 120,
  },
];
