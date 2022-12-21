import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {CommentInputModal, Dropdown, Gap, ListCard} from '../../components';
import {
  DataDropDownType,
  DropDownFilterType,
  DropDownSortType,
} from '../../data/dropdown';
import {PostListType} from '../../data/postlist';
import {color, font} from '../../theme';
import {
  elipsisText,
  heightPercentage,
  normalize,
  widthPercentage,
  widthResponsive,
} from '../../utils';
import {LogBox} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import ImageList from './ImageList';
import {EmptyState} from '../../components/molecule/EmptyState/EmptyState';
import ListToFollowMusician from './ListToFollowMusician';
import {PostList} from '../../interface/feed.interface';
import {useFeedHook} from '../../hooks/use-feed.hook';
import {dateFormat} from '../../utils/date-format';

interface PostListProps {
  dataRightDropdown: DataDropDownType[];
  dataLeftDropdown: DropDownFilterType[] | DropDownSortType[];
  data: PostListType[];
}

const PostListHome: FC<PostListProps> = (props: PostListProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {dataRightDropdown, dataLeftDropdown, data} = props;
  // ignore warning
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const {
    feedIsLoading,
    feedIsError,
    feedMessage,
    dataPostList,
    dataPostDetail,
    getListDataPost,
    setLikePost,
    setUnlikePost,
    getDetailPost,
    setCommentToPost,
  } = useFeedHook();

  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [dataCategory, setDataCategory] = useState<PostList[]>(dataPostList);
  const [status, setStatus] = useState<'not_follow' | 'following'>('following');
  const [inputCommentModal, setInputCommentModal] = useState<boolean>(false);
  const [musicianId, setMusicianId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<PostList>();
  const [commentType, setCommentType] = useState<string>('');

  useFocusEffect(
    useCallback(() => {
      getListDataPost();
    }, []),
  );

  useEffect(() => {
    if (dataPostDetail !== null && selectedItem !== undefined) {
      navigation.navigate('PostDetail', selectedItem);
    }
  }, [dataPostDetail]);

  const resultDataFilter = (dataResultFilter: any) => {
    const dates = new Date();
    dates.setDate(dates.getDate() - Number(dataResultFilter.value));
    let dataFilter = [...dataPostList];
    dataFilter = dataFilter.filter(x => new Date(x.createdAt) > dates);
    setDataCategory(dataFilter);
  };
  const resultDataCategory = (dataResultCategory: DataDropDownType) => {
    dataResultCategory.label === 'All'
      ? getListDataPost()
      : getListDataPost({category: dataResultCategory.value});
  };

  const cardOnPress = (data: PostList) => {
    getDetailPost({id: data.id});
    setSelectedItem(data);
  };

  const likeOnPress = (id: string) => {
    if (selectedId.includes(id)) {
      return (
        setUnlikePost({id}),
        setSelectedId(selectedId.filter((x: string) => x !== id))
      );
    } else {
      return setLikePost({id}), setSelectedId([...selectedId, id]);
    }
  };

  const commentOnPress = (id: string, username: string) => {
    setInputCommentModal(!inputCommentModal);
    setMusicianId(id);
    setUserName(username);
  };

  const handleReplyOnPress = () => {
    commentType.length > 0
      ? setCommentToPost({id: musicianId, content: {content: commentType}})
      : null;
    setInputCommentModal(false);
    setCommentType('');
  };

  const tokenOnPress = () => {
    console.log('token');
  };

  const shareOnPress = () => {
    console.log('share');
  };

  return (
    <>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: heightPercentage(24),
        }}>
        <View
          style={{
            width: widthPercentage(70),
          }}>
          <Dropdown.Menu
            data={dataLeftDropdown}
            placeHolder={'Filter by'}
            selectedMenu={resultDataFilter}
            containerStyle={{
              width: widthPercentage(138),
            }}
          />
        </View>
        <View
          style={{
            width: widthPercentage(85),
          }}>
          <Dropdown.Menu
            data={dataRightDropdown}
            placeHolder={'Category'}
            selectedMenu={resultDataCategory}
            containerStyle={{
              width: widthResponsive(138),
              marginLeft: widthPercentage(-57),
            }}
          />
        </View>
      </View>
      {dataPostList !== null && dataPostList.length !== 0 ? (
        <FlatList
          data={dataCategory}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            paddingBottom:
              Platform.OS === 'ios'
                ? heightPercentage(25)
                : heightPercentage(40),
          }}
          renderItem={({item, index}: any) => (
            <ListCard.PostList
              musicianName={item.musician.fullname}
              musicianId={`@${item.musician.username}`}
              imgUri={item.musician.imageProfileUrl}
              postDate={dateFormat(item.createdAt)}
              category={item.category}
              onPress={() => cardOnPress(item)}
              likeOnPress={() => likeOnPress(item.id)}
              commentOnPress={() =>
                commentOnPress(item.id, item.musician.username)
              }
              tokenOnPress={tokenOnPress}
              shareOnPress={shareOnPress}
              likePressed={selectedId.includes(item.id) ? true : false}
              containerStyles={{marginTop: mvs(16)}}
              likeCount={item.likesCount}
              commentCount={item.commentsCount}
              children={
                <View style={{width: '100%'}}>
                  <Text style={styles.childrenPostTitle}>
                    {elipsisText(item.caption, 600)}
                  </Text>
                  <Gap height={4} />
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <SafeAreaView style={{flex: 1}}>
                      <ImageList
                        imgData={item.image}
                        width={143}
                        height={69.5}
                        heightType2={142}
                        widthType2={289}
                        onPress={() => {}}
                      />
                    </SafeAreaView>
                  </View>
                </View>
              }
            />
          )}
        />
      ) : dataPostList?.length === 0 &&
        feedMessage === 'you not follow anyone' ? (
        <ListToFollowMusician />
      ) : dataPostList?.length === 0 &&
        feedMessage === 'musician not have post' ? (
        <EmptyState
          text={`Your following musician don't have any post, try to follow more musician`}
          containerStyle={{
            justifyContent: 'flex-start',
            paddingTop: heightPercentage(24),
          }}
        />
      ) : null}
      <CommentInputModal
        toggleModal={() => setInputCommentModal(!inputCommentModal)}
        modalVisible={inputCommentModal}
        name={musicianId}
        commentValue={commentType}
        onCommentChange={setCommentType}
        handleOnPress={handleReplyOnPress}
      />
    </>
  );
};

export default PostListHome;

const styles = StyleSheet.create({
  childrenPostTitle: {
    flexShrink: 1,
    maxWidth: widthResponsive(288),
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(13),
    lineHeight: mvs(20),
    color: color.Neutral[10],
  },
});
