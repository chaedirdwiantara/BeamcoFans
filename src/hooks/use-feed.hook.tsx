import {useState} from 'react';
import {listPost} from '../api/feed.api';
import {PostList} from '../interface/feed.interface';

export const useFeedHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataPostList, setDataPostList] = useState<PostList[]>([]);
  const [isError, setIsError] = useState(false);

  const getListDataPost = async () => {
    console.log('list post');

    setIsLoading(true);
    setIsError(false);
    try {
      const response = await listPost();
      console.log(response);
      setDataPostList(response.data);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    dataPostList,
    getListDataPost,
  };
};
