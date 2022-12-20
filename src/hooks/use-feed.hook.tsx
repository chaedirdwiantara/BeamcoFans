import {useState} from 'react';
import {
  commentDetail,
  commentList,
  commmentDelete,
  commmentToComment,
  commmentToPost,
  commmentUpdate,
  detailPost,
  likePost,
  listPost,
  listPostExclusive,
  unlikePost,
} from '../api/feed.api';
import {ParamsProps} from '../interface/base.interface';
import {
  CommentDetailData,
  CommentList,
  DataComment,
  DetailPostData,
  PostList,
  PostPropsTypeA,
  PostPropsTypeB,
} from '../interface/feed.interface';

export const useFeedHook = () => {
  const [feedIsLoading, setFeedIsLoading] = useState(false);
  const [dataPostList, setDataPostList] = useState<PostList[] | null>(null);
  const [dataPostDetail, setDataPostDetail] = useState<DetailPostData | null>(
    null,
  );
  const [feedIsError, setFeedIsError] = useState<boolean>(false);
  const [feedMessage, setFeedMessage] = useState<string>('');

  const getListDataPost = async (props?: ParamsProps) => {
    setFeedIsLoading(true);
    setFeedIsError(false);
    try {
      const response = await listPost(props);
      setDataPostList(response.data);
      setFeedMessage(response.message);
    } catch (error) {
      setFeedIsError(true);
    } finally {
      setFeedIsLoading(false);
    }
  };

  const getListDataExclusivePost = async (props?: ParamsProps) => {
    setFeedIsLoading(true);
    setFeedIsError(false);
    try {
      const response = await listPostExclusive(props);
      setDataPostList(response.data);
    } catch (error) {
      setFeedIsError(true);
    } finally {
      setFeedIsLoading(false);
    }
  };

  const getDetailPost = async (props?: PostPropsTypeA) => {
    setFeedIsLoading(true);
    setFeedIsError(false);
    try {
      const response = await detailPost(props);
      setDataPostDetail(response.data);
    } catch (error) {
      setFeedIsError(true);
    } finally {
      setFeedIsLoading(false);
    }
  };

  // Like Unlike Area
  const [likePostLoading, setLikePostLoading] = useState(false);
  const [dataLike, setDataLike] = useState<string | null>(null);
  const setLikePost = async (props?: PostPropsTypeA) => {
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

  const setUnlikePost = async (props?: PostPropsTypeA) => {
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
  const [commentListLoading, setCommentListLoading] = useState(false);
  const [commentDetailLoading, setCommentDetailLoading] = useState(false);
  const [commentUpdateLoading, setCommentUpdateLoading] = useState(false);
  const [commentDeleteLoading, setCommentDeleteLoading] = useState(false);
  const [dataComment, setDataComment] = useState<DataComment | null>(null);
  const [dataCommentList, setDataCommentList] = useState<CommentList[] | null>(
    null,
  );
  const [dataCommentDetail, setDataCommentDetail] =
    useState<CommentDetailData | null>(null);

  const setCommentList = async () => {
    setCommentListLoading(true);
    try {
      const response = await commentList();
      setDataCommentList(response.data);
    } catch (error) {
      console.log(error);
      setDataCommentList(null);
    } finally {
      setCommentListLoading(false);
    }
  };

  const setCommentDetail = async (props?: PostPropsTypeA) => {
    setCommentDetailLoading(true);
    try {
      const response = await commentDetail(props);
      setDataCommentDetail(response.data);
    } catch (error) {
      console.log(error);
      setDataCommentDetail(null);
    } finally {
      setCommentDetailLoading(false);
    }
  };

  const setCommentToPost = async (props?: PostPropsTypeB) => {
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

  const setCommentToComment = async (props?: PostPropsTypeB) => {
    setCommentLoading(true);
    try {
      const response = await commmentToComment(props);
      setDataComment(response.data);
    } catch (error) {
      console.log(error);
      setDataComment(null);
    } finally {
      setCommentLoading(false);
    }
  };

  const setCommentUpdate = async (props?: PostPropsTypeB) => {
    setCommentUpdateLoading(true);
    try {
      const response = await commmentUpdate(props);
      setDataComment(response.data);
    } catch (error) {
      console.log(error);
      setDataComment(null);
    } finally {
      setCommentUpdateLoading(false);
    }
  };

  const setCommentDelete = async (props?: PostPropsTypeA) => {
    setCommentDeleteLoading(true);
    try {
      const response = await commmentDelete(props);
      setDataComment(response.data);
    } catch (error) {
      console.log(error);
      setDataComment(null);
    } finally {
      setCommentDeleteLoading(false);
    }
  };

  return {
    feedIsLoading,
    likePostLoading,
    commentLoading,
    commentListLoading,
    commentDetailLoading,
    feedIsError,
    feedMessage,
    dataPostList,
    dataLike,
    dataComment,
    dataCommentList,
    dataCommentDetail,
    commentUpdateLoading,
    commentDeleteLoading,
    dataPostDetail,
    getListDataPost,
    getListDataExclusivePost,
    setLikePost,
    setUnlikePost,
    setCommentToPost,
    setCommentToComment,
    setCommentList,
    setCommentDetail,
    setCommentUpdate,
    setCommentDelete,
    getDetailPost,
  };
};
