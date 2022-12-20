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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import ImageList from './ImageList';
import {EmptyState} from '../../components/molecule/EmptyState/EmptyState';
import {FriedEggIcon} from '../../assets/icon';
import ListToFollowMusician from './ListToFollowMusician';
import {useFeedHook} from '../../hooks/use-feed.hook';

interface PostListProps {
  dataRightDropdown: DataDropDownType[];
  dataLeftDropdown: DropDownFilterType[] | DropDownSortType[];
  data: PostListType[];
}

const PostListExclusive: FC<PostListProps> = (props: PostListProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {dataRightDropdown, dataLeftDropdown, data} = props;

  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [dataDropdown, setDataDropdown] = useState<PostListType[]>(data);
  const [inputCommentModal, setInputCommentModal] = useState<boolean>(false);
  const [musicianId, setMusicianId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  const {
    feedIsLoading,
    feedIsError,
    dataPostList,
    dataPostDetail,
    getListDataExclusivePost,
    setLikePost,
    setUnlikePost,
    getDetailPost,
  } = useFeedHook();

  useFocusEffect(
    useCallback(() => {
      getListDataExclusivePost();
    }, []),
  );

  useEffect(() => {
    if (dataPostDetail !== null) {
      navigation.navigate('PostDetail');
    }
  }, [dataPostDetail]);

  const resultDataFilter = (dataResultFilter: DataDropDownType) => {
    getListDataExclusivePost({sortBy: dataResultFilter.label.toLowerCase()});
  };
  const resultDataCategory = (dataResultCategory: DataDropDownType) => {
    dataResultCategory.label === 'All'
      ? getListDataExclusivePost()
      : getListDataExclusivePost({category: dataResultCategory.value});
  };

  const cardOnPress = (id: string) => {
    getDetailPost({id});
  };

  const likeOnPress = (id: string) => {
    if (selectedId.includes(id)) {
      return (
        setLikePost({id}),
        setSelectedId(selectedId.filter((x: string) => x !== id))
      );
    } else {
      setUnlikePost({id}), setSelectedId([...selectedId, id]);
    }
  };

  const commentOnPress = (id: string, username: string) => {
    setInputCommentModal(!inputCommentModal);
    setMusicianId(id);
    setUserName(username);
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
            width: widthPercentage(80),
          }}>
          <Dropdown.Menu
            data={dataRightDropdown}
            placeHolder={'Category'}
            selectedMenu={resultDataCategory}
            containerStyle={{
              width: widthPercentage(138),
              marginLeft: widthPercentage(-57),
            }}
          />
        </View>
      </View>
      {dataPostList !== null && dataPostList.length !== 0 ? (
        <FlatList
          data={dataPostList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            paddingBottom:
              Platform.OS === 'ios'
                ? heightPercentage(130)
                : heightPercentage(180),
          }}
          renderItem={({item}) => (
            <ListCard.PostList
              musicianName={item.musician.fullname}
              musicianId={`@${item.musician.username}`}
              imgUri={item.musician.avatarUri}
              postDate={item.musician.created_at}
              category={item.category}
              onPress={() => cardOnPress(item.id)}
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
                    {/* <SafeAreaView style={{flex: 1}}>
                    <ImageList
                      imgData={item.post.postPicture}
                      width={143}
                      height={69.5}
                      heightType2={142}
                      widthType2={289}
                      onPress={() => {}}
                    />
                  </SafeAreaView> */}
                  </View>
                </View>
              }
            />
          )}
        />
      ) : dataPostList === null ? (
        <ListToFollowMusician />
      ) : dataPostList !== null && dataPostList.length === 0 ? (
        <EmptyState
          text={`You don't have any exclusive content, try to subscribe your favorite musician`}
          containerStyle={{
            justifyContent: 'flex-start',
            paddingTop: heightPercentage(24),
          }}
          icon={<FriedEggIcon />}
        />
      ) : null}
      <CommentInputModal
        toggleModal={() => setInputCommentModal(!inputCommentModal)}
        modalVisible={inputCommentModal}
        name={userName}
        idForProps={musicianId}
      />
    </>
  );
};

export default PostListExclusive;

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
