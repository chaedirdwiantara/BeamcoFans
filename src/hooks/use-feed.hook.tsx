import {useState} from 'react';
import {
  commentDetail,
  commmentDelete,
  commmentToComment,
  commmentToPost,
  commmentUpdate,
  detailPost,
  likeComment,
  likePost,
  listPost,
  listPostExclusive,
  listPostProfile,
  listPostProfileGuestMode,
  listPostSimilar,
  listTopPost,
  listTopPostPublic,
  loadMore,
  mostPlayedSong,
  unlikeComment,
  unlikePost,
  viewsCount,
} from '../api/feed.api';
import {ParamsProps} from '../interface/base.interface';
import {
  CommentDetailData,
  CommentList,
  DataComment,
  DetailPostData,
  LoadMoreProps,
  PostList,
  PostPropsTypeA,
  PostPropsTypeB,
  QuoteToPost,
  ViewsCount,
} from '../interface/feed.interface';

export const useFeedHook = () => {
  const [feedIsLoading, setFeedIsLoading] = useState(true);
  const [dataPostList, setDataPostList] = useState<PostList[]>([]);
  const [dataTopPost, setDataTopPost] = useState<PostList[]>([]);
  const [dataPostDetail, setDataPostDetail] = useState<DetailPostData>();
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

  const getListProfilePost = async (props?: ParamsProps) => {
    setFeedIsLoading(true);
    try {
      const response = await listPostProfile(props);
      setDataPostList(response.data);
      setFeedMessage(response.message);
    } catch (error) {
      console.log(error);
      setFeedIsError(true);
    } finally {
      setFeedIsLoading(false);
    }
  };

  const getListProfilePostGuestMode = async (props?: ParamsProps) => {
    setFeedIsLoading(true);
    try {
      const response = await listPostProfileGuestMode(props);
      setDataPostList(response.data);
      setFeedMessage(response.message);
    } catch (error) {
      console.log(error);
      setFeedIsError(true);
    } finally {
      setFeedIsLoading(false);
    }
  };

  const getListTopPost = async (props?: ParamsProps) => {
    setFeedIsLoading(true);
    setFeedIsError(false);
    try {
      const response = await listTopPost(props);
      setDataTopPost(response.data);
      setFeedMessage(response.message);
    } catch (error) {
      setFeedIsError(true);
    } finally {
      setFeedIsLoading(false);
    }
  };

  const getListTopPostPublic = async (props?: ParamsProps) => {
    setFeedIsLoading(true);
    setFeedIsError(false);
    try {
      const response = await listTopPostPublic(props);
      setDataTopPost(response.data);
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
      setFeedMessage(response.message);
    } catch (error) {
      setFeedIsError(true);
    } finally {
      setFeedIsLoading(false);
    }
  };

  const getListSimilarPost = async (props?: ParamsProps) => {
    setFeedIsLoading(true);
    setFeedIsError(false);
    try {
      const response = await listPostSimilar(props);
      setDataPostList(response.data);
      setFeedMessage(response.message);
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
  const [LoadMoreLoading, setLoadMoreLoading] = useState(false);
  const [commentDetailLoading, setCommentDetailLoading] = useState(false);
  const [commentUpdateLoading, setCommentUpdateLoading] = useState(false);
  const [commentDeleteLoading, setCommentDeleteLoading] = useState(false);
  const [dataComment, setDataComment] = useState<DataComment | null>(null);
  const [dataLoadMore, setDataLoadMore] = useState<CommentList[] | null>(null);
  const [dataCommentDetail, setDataCommentDetail] =
    useState<CommentDetailData | null>(null);
  const [dataLikeComment, setDataLikeComment] = useState<string | null>(null);
  const [likeCommentLoading, setLikeCommentLoading] = useState(false);

  const setLikeComment = async (props?: PostPropsTypeA) => {
    setLikeCommentLoading(true);
    try {
      const response = await likeComment(props);
      setDataLikeComment(response.data);
    } catch (error) {
      console.log(error);
      setDataLikeComment(null);
    } finally {
      setLikeCommentLoading(false);
    }
  };

  const setUnlikeComment = async (props?: PostPropsTypeA) => {
    setLikeCommentLoading(true);
    try {
      const response = await unlikeComment(props);
      setDataLikeComment(response.data);
    } catch (error) {
      console.log(error);
      setDataLikeComment(null);
    } finally {
      setLikeCommentLoading(false);
    }
  };

  const setLoadMore = async (props?: LoadMoreProps) => {
    setLoadMoreLoading(true);
    try {
      const response = await loadMore(props);
      setDataLoadMore(response.data);
    } catch (error) {
      console.log(error);
      setDataLoadMore(null);
    } finally {
      setLoadMoreLoading(false);
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

  // GET MOST PLAY MUSIC
  const [mostPlayedLoading, setMostPlayedLoading] = useState<boolean>(false);
  const [dataMostPlayed, setDataMostPlayed] = useState<QuoteToPost>();
  const [mostPlayedError, setMostPlayedError] = useState<boolean>();

  const getMostPlayed = async (props?: PostPropsTypeA) => {
    setMostPlayedLoading(true);
    try {
      const response = await mostPlayedSong(props);
      setDataMostPlayed(response.data);
    } catch (error) {
      setMostPlayedError(true);
    } finally {
      setMostPlayedLoading(false);
    }
  };

  // GET MOST PLAY MUSIC
  const [viewCountLoading, setViewCountLoading] = useState<boolean>(false);
  const [dataViewsCount, setDataViewCount] = useState<ViewsCount>();
  const [viewCountError, setViewCountError] = useState<boolean>();

  const setViewCount = async (props?: PostPropsTypeA) => {
    setViewCountLoading(true);
    try {
      const response = await viewsCount(props);
      setDataViewCount(response.data);
    } catch (error) {
      setViewCountError(true);
    } finally {
      setViewCountLoading(false);
    }
  };

  return {
    feedIsLoading,
    likePostLoading,
    commentLoading,
    LoadMoreLoading,
    commentDetailLoading,
    dataLoadMore,
    feedIsError,
    feedMessage,
    dataPostList,
    dataLike,
    dataComment,
    dataCommentDetail,
    commentUpdateLoading,
    commentDeleteLoading,
    dataPostDetail,
    dataLikeComment,
    likeCommentLoading,
    dataTopPost,
    mostPlayedLoading,
    dataMostPlayed,
    mostPlayedError,
    viewCountLoading,
    dataViewsCount,
    viewCountError,
    setDataLoadMore,
    setDataComment,
    getListDataPost,
    getListDataExclusivePost,
    setLikePost,
    setUnlikePost,
    setCommentToPost,
    setCommentToComment,
    setLoadMore,
    setCommentDetail,
    setCommentUpdate,
    setCommentDelete,
    getDetailPost,
    setLikeComment,
    setUnlikeComment,
    getListTopPost,
    getListProfilePost,
    getMostPlayed,
    getListSimilarPost,
    setViewCount,
    getListProfilePostGuestMode,
    getListTopPostPublic,
  };
};
