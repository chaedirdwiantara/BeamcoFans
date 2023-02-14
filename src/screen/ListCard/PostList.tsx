import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  InteractionManager,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {
  BottomSheetGuest,
  CommentInputModal,
  Dropdown,
  Gap,
  ListCard,
  ModalDonate,
  ModalShare,
  ModalSuccessDonate,
  SsuToast,
} from '../../components';
import {
  DataDropDownType,
  DropDownFilterType,
  DropDownSortType,
} from '../../data/dropdown';
import {PostListType} from '../../data/postlist';
import {color, font, typography} from '../../theme';
import {
  elipsisText,
  heightPercentage,
  heightResponsive,
  normalize,
  widthPercentage,
  widthResponsive,
} from '../../utils';
import {LogBox} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import ImageList from './ImageList';
import {profileStorage, storage} from '../../hooks/use-storage.hook';
import {EmptyState} from '../../components/molecule/EmptyState/EmptyState';
import {PostList} from '../../interface/feed.interface';
import {useFeedHook} from '../../hooks/use-feed.hook';
import {dateFormat} from '../../utils/date-format';
import categoryNormalize from '../../utils/categoryNormalize';
import {TickCircleIcon} from '../../assets/icon';
import {usePlayerHook} from '../../hooks/use-player.hook';
import MusicListPreview from '../../components/molecule/MusicPreview/MusicListPreview';
import {dummySongImg} from '../../data/image';

interface PostListProps {
  dataRightDropdown: DataDropDownType[];
  dataLeftDropdown: DropDownFilterType[] | DropDownSortType[];
  data: PostListType[];
}

const PostListHome: FC<PostListProps> = (props: PostListProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const isLogin = storage.getString('profile');
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
    dataTopPost,
    getListDataPost,
    setLikePost,
    setUnlikePost,
    setCommentToPost,
    getListTopPost,
  } = useFeedHook();

  const {
    seekPlayer,
    setPlaySong,
    setPauseSong,
    hidePlayer,
    isPlaying,
    playerProgress,
    addPlaylistFeed,
  } = usePlayerHook();

  const [dataCategory, setDataCategory] = useState<PostList[]>(dataTopPost);
  const [inputCommentModal, setInputCommentModal] = useState<boolean>(false);
  const [musicianId, setMusicianId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [modalGuestVisible, setModalGuestVisible] = useState<boolean>(false);
  const [commentType, setCommentType] = useState<string>('');
  const [recorder, setRecorder] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string[]>();
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(15);
  const [dataMain, setDataMain] = useState<PostList[]>([]);

  // * UPDATE HOOKS
  const [selectedIdPost, setSelectedIdPost] = useState<string>();
  const [selectedMenu, setSelectedMenu] = useState<DataDropDownType>();

  //* MUSIC HOOKS
  const [pauseModeOn, setPauseModeOn] = useState<boolean>(false);
  const [idNowPlaying, setIdNowPlaing] = useState<string>();

  useFocusEffect(
    useCallback(() => {
      getListTopPost({page: page, perPage: perPage});
    }, []),
  );

  //* set response data list post to main data
  useEffect(() => {
    dataTopPost.length !== 0 && setDataMain([...dataMain, ...dataTopPost]);
  }, [dataTopPost]);

  const resultDataFilter = (dataResultFilter: any) => {
    const dates = new Date();
    dates.setDate(dates.getDate() - Number(dataResultFilter.value));
    let dataFilter = [...dataTopPost];
    dataFilter = dataFilter.filter(x => new Date(x.createdAt) > dates);
    setDataCategory(dataFilter);
  };

  const resultDataCategory = (dataResultCategory: DataDropDownType) => {
    dataResultCategory.label === 'All'
      ? getListTopPost({page: page, perPage: perPage})
      : getListTopPost({
          page: page,
          perPage: perPage,
          category: dataResultCategory.value,
        });
  };

  //* Handle when end of Scroll
  const handleEndScroll = () => {
    getListTopPost({page: page + 1, perPage: perPage});
    setPage(page + 1);
  };

  const cardOnPress = (data: PostList) => {
    isLogin
      ? navigation.navigate('PostDetail', data)
      : setModalGuestVisible(true);
  };

  const likeOnPress = (id: string, isLiked: boolean) => {
    if (isLiked === true && selectedId === undefined) {
      setUnlikePost({id});
      setSelectedId([]);
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (!isLiked && selectedId === undefined) {
      setLikePost({id});
      setSelectedId([id]);
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (
      isLiked === true &&
      !selectedId?.includes(id) &&
      !recorder.includes(id)
    ) {
      setUnlikePost({id});
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (
      isLiked === false &&
      !selectedId?.includes(id) &&
      !recorder.includes(id)
    ) {
      setLikePost({id});
      setSelectedId(selectedId ? [...selectedId, id] : [id]);
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (
      isLiked === true &&
      !selectedId?.includes(id) &&
      recorder.includes(id)
    ) {
      setLikePost({id});
      setSelectedId(selectedId ? [...selectedId, id] : [id]);
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (
      isLiked === false &&
      !selectedId?.includes(id) &&
      recorder.includes(id)
    ) {
      setLikePost({id});
      setSelectedId(selectedId ? [...selectedId, id] : [id]);
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (isLiked === true && selectedId?.includes(id) && recorder.includes(id)) {
      setUnlikePost({id});
      setSelectedId(selectedId.filter((x: string) => x !== id));
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (
      isLiked === false &&
      selectedId?.includes(id) &&
      recorder.includes(id)
    ) {
      setUnlikePost({id});
      setSelectedId(selectedId.filter((x: string) => x !== id));
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
  };

  const commentOnPress = (id: string, username: string) => {
    if (isLogin) {
      setInputCommentModal(!inputCommentModal);
      setMusicianId(id);
      setUserName(username);
    } else {
      setModalGuestVisible(true);
    }
  };

  const handleReplyOnPress = () => {
    if (isLogin) {
      commentType.length > 0
        ? setCommentToPost({id: musicianId, content: {content: commentType}})
        : null;
      setInputCommentModal(false);
      setCommentType('');
    } else {
      setModalGuestVisible(true);
    }
  };

  const shareOnPress = () => {
    if (isLogin) {
      setModalShare(true);
    } else {
      setModalGuestVisible(true);
    }
  };

  const tokenOnPress = () => {
    if (isLogin) {
      setModalDonate(true);
    } else {
      setModalGuestVisible(true);
    }
  };

  const onPressDonate = () => {
    setModalDonate(false);
    setTrigger2ndModal(true);
  };

  const onPressSuccess = () => {
    setModalSuccessDonate(false);
  };

  const onPressCloseModalDonate = () => {
    setModalDonate(false);
    setModalSuccessDonate(false);
    setTrigger2ndModal(false);
  };

  const handleToDetailMusician = (id: string) => {
    navigation.navigate('MusicianProfile', {id});
  };

  // ! UPDATE COMMENT AREA
  useEffect(() => {
    if (selectedIdPost !== undefined && selectedMenu !== undefined) {
      console.log('selectedIdPost', selectedIdPost);
      console.log('selectedMenu', selectedMenu);
    }
  }, [selectedIdPost, selectedMenu]);
  // ! END OF UPDATE COMMENT AREA

  // ! MUSIC AREA
  const onPressPlaySong = (val: PostList) => {
    let data = [val];
    addPlaylistFeed({
      dataSong: data,
      playSongId: Number(val.quoteToPost.targetId),
      isPlay: true,
    });
    setPlaySong();
    setPauseModeOn(true);
    setIdNowPlaing(val.id);
    hidePlayer();
  };

  const handlePausePlay = () => {
    if (isPlaying) {
      setPauseSong();
    } else {
      setPlaySong();
    }
  };
  // ! END OF MUSIC AREA

  return (
    <>
      <View style={styles.container}>
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
      {dataMain !== null && dataMain.length !== 0 ? (
        <View
          style={{
            flex: 1,
            marginHorizontal: widthResponsive(-24),
          }}>
          <FlatList
            data={dataMain}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              paddingBottom:
                Platform.OS === 'ios'
                  ? heightPercentage(25)
                  : heightPercentage(40),
            }}
            onTouchEnd={handleEndScroll}
            renderItem={({item, index}) => (
              <>
                <ListCard.PostList
                  toDetailOnPress={() =>
                    handleToDetailMusician(item.musician.uuid)
                  }
                  musicianName={item.musician.fullname}
                  musicianId={`@${item.musician.username}`}
                  imgUri={item.musician.imageProfileUrls[1]?.image}
                  postDate={dateFormat(item.updatedAt)}
                  category={categoryNormalize(item.category)}
                  onPress={() => cardOnPress(item)}
                  likeOnPress={() => likeOnPress(item.id, item.isLiked)}
                  likePressed={
                    selectedId === undefined
                      ? item.isLiked
                      : selectedId.includes(item.id) &&
                        recorder.includes(item.id)
                      ? true
                      : !selectedId.includes(item.id) &&
                        recorder.includes(item.id)
                      ? false
                      : !selectedId.includes(item.id) &&
                        !recorder.includes(item.id)
                      ? item.isLiked
                      : item.isLiked
                  }
                  likeCount={
                    selectedId === undefined
                      ? item.likesCount
                      : selectedId.includes(item.id) &&
                        recorder.includes(item.id) &&
                        item.isLiked === true
                      ? item.likesCount
                      : selectedId.includes(item.id) &&
                        recorder.includes(item.id) &&
                        item.isLiked === false
                      ? item.likesCount + 1
                      : !selectedId.includes(item.id) &&
                        recorder.includes(item.id) &&
                        item.isLiked === true
                      ? item.likesCount - 1
                      : !selectedId.includes(item.id) &&
                        recorder.includes(item.id) &&
                        item.isLiked === false
                      ? item.likesCount
                      : item.likesCount
                  }
                  commentOnPress={() =>
                    commentOnPress(item.id, item.musician.username)
                  }
                  tokenOnPress={tokenOnPress}
                  shareOnPress={shareOnPress}
                  commentCount={item.commentsCount}
                  myPost={item.musician.uuid === profileStorage()?.uuid}
                  selectedMenu={setSelectedMenu}
                  idPost={item.id}
                  selectedIdPost={setSelectedIdPost}
                  children={
                    <View style={{width: '100%'}}>
                      <Text style={styles.childrenPostTitle}>
                        {elipsisText(item.caption, 600)}
                      </Text>
                      {item.images !== null ? (
                        <>
                          <Gap height={4} />
                          <View
                            style={{
                              flexDirection: 'row',
                            }}>
                            <View style={{height: '100%', width: '100%'}}>
                              <ImageList
                                imgData={item.images}
                                width={143}
                                height={69.5}
                                heightType2={142}
                                widthType2={289}
                                onPress={() => {}}
                              />
                              {item.images.length === 0 &&
                              item.quoteToPost.encodeHlsUrl ? (
                                <MusicListPreview
                                  hideClose
                                  targetId={item.quoteToPost.targetId}
                                  targetType={item.quoteToPost.targetType}
                                  title={item.quoteToPost.title}
                                  musician={item.quoteToPost.musician}
                                  coverImage={
                                    item.quoteToPost.coverImage[1]?.image !==
                                    undefined
                                      ? item.quoteToPost.coverImage[1].image
                                      : ''
                                  }
                                  encodeDashUrl={item.quoteToPost.encodeDashUrl}
                                  encodeHlsUrl={item.quoteToPost.encodeHlsUrl}
                                  startAt={item.quoteToPost.startAt}
                                  endAt={item.quoteToPost.endAt}
                                  postList={item}
                                  onPress={onPressPlaySong}
                                  isPlay={isPlaying}
                                  playOrPause={handlePausePlay}
                                  pauseModeOn={pauseModeOn}
                                  currentProgress={playerProgress.position}
                                  duration={playerProgress.duration}
                                  seekPlayer={seekPlayer}
                                  isIdNowPlaying={item.id === idNowPlaying}
                                />
                              ) : null}
                            </View>
                          </View>
                        </>
                      ) : null}
                    </View>
                  }
                />
                <Gap height={16} />
              </>
            )}
          />
        </View>
      ) : dataMain?.length === 0 ? (
        <EmptyState
          text={feedMessage}
          containerStyle={{
            justifyContent: 'flex-start',
            paddingTop: heightPercentage(24),
          }}
        />
      ) : null}
      <CommentInputModal
        toggleModal={() => setInputCommentModal(!inputCommentModal)}
        modalVisible={inputCommentModal}
        name={userName}
        commentValue={commentType}
        onCommentChange={setCommentType}
        handleOnPress={handleReplyOnPress}
      />
      <BottomSheetGuest
        modalVisible={modalGuestVisible}
        onPressClose={() => setModalGuestVisible(false)}
      />
      <ModalShare
        url={
          'https://open.ssu.io/track/19AiJfAtRiccvSU1EWcttT?si=36b9a686dad44ae0'
        }
        modalVisible={modalShare}
        onPressClose={() => setModalShare(false)}
        titleModal={'Share Feed'}
        hideMusic
        onPressCopy={() =>
          InteractionManager.runAfterInteractions(() => setToastVisible(true))
        }
      />
      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <TickCircleIcon
              width={widthResponsive(21)}
              height={heightPercentage(20)}
              stroke={color.Neutral[10]}
            />
            <Gap width={widthResponsive(7)} />
            <Text style={[typography.Button2, styles.textStyle]}>
              Link have been copied to clipboard!
            </Text>
          </View>
        }
        modalStyle={{marginHorizontal: widthResponsive(24)}}
      />
      <ModalDonate
        totalCoin={'1000'}
        onPressDonate={onPressDonate}
        modalVisible={modalDonate}
        onPressClose={onPressCloseModalDonate}
        onModalHide={() => setModalSuccessDonate(true)}
      />
      <ModalSuccessDonate
        modalVisible={modalSuccessDonate && trigger2ndModal ? true : false}
        toggleModal={onPressSuccess}
      />
    </>
  );
};

export default PostListHome;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: heightResponsive(10),
    marginBottom: heightResponsive(8),
  },
  childrenPostTitle: {
    flexShrink: 1,
    maxWidth: widthResponsive(288),
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(13),
    color: color.Neutral[10],
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: color.Success[400],
    paddingHorizontal: widthResponsive(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  textStyle: {
    color: color.Neutral[10],
  },
});
