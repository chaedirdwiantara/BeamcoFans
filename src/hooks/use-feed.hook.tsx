import {useState} from 'react';
import {listPost} from '../api/feed.api';
import {PostList} from '../interface/feed.interface';

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

  return {
    feedIsLoading,
    feedIsError,
    dataPostList,
    getListDataPost,
  };
};
