import {useState} from 'react';
import {commmentToPost, likePost, listPost, unlikePost} from '../api/feed.api';
import {
  CommentToPostPropsType,
  DataComment,
  LikePostPropsType,
  PostList,
} from '../interface/feed.interface';

export const useFeedHook = () => {
  const [feedIsLoading, setFeedIsLoading] = useState(false);
  const [dataPostList, setDataPostList] = useState<PostList[] | null>(null);
  const [feedIsError, setFeedIsError] = useState(false);

  const getListDataPost = async () => {
    setFeedIsLoading(true);
    setFeedIsError(false);
    try {
      const response = await listPost();
      setDataPostList(response.data);
    } catch (error) {
      setFeedIsError(true);
    } finally {
      setFeedIsLoading(false);
    }
  };

  // Like Unlike Area
  const [likePostLoading, setLikePostLoading] = useState(false);
  const [dataLike, setDataLike] = useState<string | null>(null);
  const setLikePost = async (props?: LikePostPropsType) => {
    setLikePostLoading(true);
    try {
      const response = await likePost(props);
      setDataLike(response.data);
    } catch (error) {
      console.log(error);
      setDataLike(null);
    } finally {
      setLikePostLoading(false);
    }
  };

  const setUnlikePost = async (props?: LikePostPropsType) => {
    setLikePostLoading(true);
    try {
      const response = await unlikePost(props);
      setDataLike(response.data);
    } catch (error) {
      console.log(error);
      setDataLike(null);
    } finally {
      setLikePostLoading(false);
    }
  };

  // Comment Area
  const [commentLoading, setCommentLoading] = useState(false);
  const [dataComment, setDataComment] = useState<DataComment | null>(null);

  const setCommentToPost = async (props?: CommentToPostPropsType) => {
    setCommentLoading(true);
    try {
      const response = await commmentToPost(props);
      setDataComment(response.data);
    } catch (error) {
      console.log(error);
      setDataComment(null);
    } finally {
      setCommentLoading(false);
    }
  };

  return {
    feedIsLoading,
    likePostLoading,
    commentLoading,
    feedIsError,
    dataPostList,
    dataLike,
    dataComment,
    getListDataPost,
    setLikePost,
    setUnlikePost,
    setCommentToPost,
  };
};
