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
import {EmptyState} from '../../components/molecule/EmptyState/EmptyState';
import ListToFollowMusician from './ListToFollowMusician';
import ImageList from './ImageList';
import {useFeedHook} from '../../hooks/use-feed.hook';
import {ParamsProps} from '../../interface/base.interface';

interface PostListProps {
  dataRightDropdown: DataDropDownType[];
  dataLeftDropdown: DropDownFilterType[] | DropDownSortType[];
  data: PostListType[];
}

const PostListPublic: FC<PostListProps> = (props: PostListProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {dataRightDropdown, dataLeftDropdown, data} = props;

  const [selectedId, setSelectedId] = useState<any>([]);
  const [inputCommentModal, setInputCommentModal] = useState<boolean>(false);
  const [musicianId, setMusicianId] = useState<string>('');

  const {
    feedIsLoading,
    feedIsError,
    dataPostList,
    dataPostDetail,
    getListDataPost,
    setLikePost,
    setUnlikePost,
    getDetailPost,
  } = useFeedHook();

  useFocusEffect(
    useCallback(() => {
      getListDataPost();
    }, []),
  );

  useEffect(() => {
    if (dataPostDetail !== null) {
      navigation.navigate('PostDetail');
    }
  }, [dataPostDetail]);

  const resultDataFilter = (dataResultFilter: DataDropDownType) => {
    getListDataPost({sortBy: dataResultFilter.label.toLowerCase()});
  };
  const resultDataCategory = (dataResultCategory: DataDropDownType) => {
    dataResultCategory.label === 'All'
      ? getListDataPost()
      : getListDataPost({category: dataResultCategory.value});
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

  const commentOnPress = (id: string) => {
    setInputCommentModal(!inputCommentModal);
    setMusicianId(id);
  };

  const tokenOnPress = () => {
    console.log('token');
  };

  const shareOnPress = () => {
    console.log('share');
  };

  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu');
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
              commentOnPress={() => commentOnPress(item.id)}
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
      />
    </>
  );
};

export default PostListPublic;

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
