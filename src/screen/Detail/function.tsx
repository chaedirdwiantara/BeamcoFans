import {
  CommentList,
  CommentList2,
  CommentList3,
} from '../../interface/feed.interface';

export const filterParentID = (
  data: CommentList2[] | CommentList3[],
  item: string,
) => {
  let a = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].parentID === item) {
      a.push(data[i]);
    }
  }
  return a;
};
