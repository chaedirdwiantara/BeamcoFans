import React, {FC, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  NativeModules,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {
  DropDownFilter,
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
import {color, font, typography} from '../../theme';
import {
  elipsisText,
  heightPercentage,
  heightResponsive,
  widthResponsive,
} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {EmptyState} from '../../components/molecule/EmptyState/EmptyState';
import {useFeedHook} from '../../hooks/use-feed.hook';
import {PostList} from '../../interface/feed.interface';
import {dateFormat} from '../../utils/date-format';
import {TickCircleIcon} from '../../assets/icon';
import categoryNormalize from '../../utils/categoryNormalize';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {useTranslation} from 'react-i18next';
import {useCreditHook} from '../../hooks/use-credit.hook';
import ChildrenCard from './ChildrenCard';
import {profileStorage} from '../../hooks/use-storage.hook';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import {
  handleEndScrollOnFeed,
  likePressedInFeed,
  likePressedOnFeed,
  likesCountInFeed,
  playSongOnFeed,
  useCategoryFilter,
  useGetCreditCount,
  useGetDataOnMount,
  useRefreshingEffect,
  useSetDataToMainData,
  useSortByFilter,
  useStopRefreshing,
} from './ListUtils/ListFunction';
import Clipboard from '@react-native-clipboard/clipboard';
import {useShareHook} from '../../hooks/use-share.hook';
import {imageShare} from '../../utils/share';

const {height} = Dimensions.get('screen');

interface PostListProps {
  dataRightDropdown: DataDropDownType[];
  dataLeftDropdown: DropDownFilterType[] | DropDownSortType[];
  uuidMusician?: string;
  hideDropdown?: boolean;
}

const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;

const PostListMyArtist: FC<PostListProps> = (props: PostListProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    dataRightDropdown,
    dataLeftDropdown,
    uuidMusician = '',
    hideDropdown,
  } = props;

  const [recorder, setRecorder] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string[]>();
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(15);
  const [dataMain, setDataMain] = useState<PostList[]>([]);
  const [filterActive, setFilterActive] = useState<boolean>(true);
  const [filterByValue, setFilterByValue] = useState<string>();
  const [categoryValue, setCategoryValue] = useState<string>();
  const [uuid, setUuid] = useState<string>();
  const [selectedFilterMenu, setSelectedFilterMenu] =
    useState<DataDropDownType>();
  const [selectedCategoryMenu, setSelectedCategoryMenu] =
    useState<DataDropDownType>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedMusicianId, setSelectedMusicianId] = useState<string>('');

  //* MUSIC HOOKS
  const [pauseModeOn, setPauseModeOn] = useState<boolean>(false);
  const [idNowPlaying, setIdNowPlaing] = useState<string>();
  const [selectedIdPost, setSelectedIdPost] = useState<string>();
  const [selectedMenuPost, setSelectedMenuPost] = useState<DataDropDownType>();
  const [selectedUserUuid, setSelectedUserUuid] = useState<string>();

  const {
    feedIsLoading,
    feedIsError,
    feedMessage,
    dataPostList,
    getListDataPost,
    setLikePost,
    setUnlikePost,
    setCommentToPost,
    sendLogShare,
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

  const {
    shareLink,
    getShareLink,
    successGetLink,
    setSelectedSharePost,
    selectedSharePost,
  } = useShareHook();

  const {creditCount, getCreditCount} = useCreditHook();
  const MyUuid = profileStorage()?.uuid;

  const {t} = useTranslation();

  //* get data on mount this page
  useGetCreditCount(modalDonate, getCreditCount);

  useGetDataOnMount(uuidMusician, perPage, getListDataPost, setUuid, setPage);

  //* call when refreshing
  useRefreshingEffect(
    refreshing,
    getListDataPost,
    getCreditCount,
    perPage,
    filterByValue,
    categoryValue,
  );

  useStopRefreshing(feedIsLoading, setRefreshing);

  //* set response data list post to main data

  useSetDataToMainData(dataPostList, filterActive, dataMain, setDataMain);

  //* hit sort by endpoint
  useSortByFilter(
    selectedFilterMenu?.label,
    t,
    getListDataPost,
    perPage,
    page,
    categoryValue,
    setFilterActive,
    setFilterByValue,
    uuid,
  );

  //* hit category endpoint
  useCategoryFilter(
    selectedCategoryMenu?.label,
    getListDataPost,
    perPage,
    page,
    filterByValue,
    selectedCategoryMenu?.value,
    setFilterActive,
    setCategoryValue,
    uuid,
  );

  //* Handle when end of Scroll
  const handleEndScroll = () => {
    handleEndScrollOnFeed(
      dataMain,
      getListDataPost,
      perPage,
      page,
      setPage,
      setFilterActive,
      categoryValue,
      filterByValue,
      false,
      uuid,
    );
  };

  const cardOnPress = (data: PostList) => {
    navigation.navigate('PostDetail', data);
  };

  const likeOnPress = (id: string, isLiked: boolean) => {
    likePressedOnFeed(
      id,
      isLiked,
      selectedId,
      setSelectedId,
      setUnlikePost,
      setLikePost,
      setRecorder,
      recorder,
    );
  };

  const shareOnPress = (content: PostList) => {
    setSelectedMusicianId(content.id);
    setSelectedSharePost(content);
    setModalShare(true);
  };

  //Credit onPress
  const tokenOnPress = (musicianId: string) => {
    setSelectedMusicianId(musicianId);
    setModalDonate(true);
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

  const onModalShareHide = () => {
    setToastVisible(true);
    setIsCopied(false);
  };

  const onPressCopy = () => {
    setIsCopied(true);
    if (Clipboard && Clipboard.setString) {
      Clipboard.setString(shareLink);
      sendLogShare({id: selectedMusicianId});
    }
  };

  // ! MUSIC AREA
  const onPressPlaySong = (val: PostList) => {
    playSongOnFeed(
      val,
      addPlaylistFeed,
      setPauseModeOn,
      setIdNowPlaing,
      setPlaySong,
      hidePlayer,
    );
  };

  const handlePausePlay = () => {
    if (isPlaying) {
      setPauseSong();
    } else {
      setPlaySong();
    }
  };
  // ! END OF MUSIC AREA

  // ! REPORT POST AREA
  useEffect(() => {
    if (selectedIdPost && selectedMenuPost && selectedUserUuid && dataMain) {
      const selectedValue = t(selectedMenuPost.value);

      switch (selectedValue) {
        case '11':
          navigation.navigate('MusicianProfile', {
            id: selectedUserUuid,
          });
          break;
        case '22':
          console.log('REPORT', selectedIdPost);
          break;
        default:
          break;
      }
      setSelectedMenuPost(undefined);
    }
  }, [selectedIdPost, selectedMenuPost, selectedUserUuid]);
  // ! END OF REPORT POST AREA

  // SHARE LINK
  useEffect(() => {
    if (selectedSharePost) {
      getShareLink({
        scheme: `/feed/${selectedSharePost.id}`,
        image: imageShare(selectedSharePost),
        title: t('ShareLink.Feed.Title', {
          musician: selectedSharePost.musician.fullname,
        }),
        description: selectedSharePost.caption
          ? elipsisText(selectedSharePost.caption, 50)
          : t('ShareLink.Feed.Subtitle'),
      });
    }
  }, [selectedSharePost]);

  return (
    <>
      {!hideDropdown && (
        <View style={styles.container}>
          <DropDownFilter
            labelCaption={
              selectedFilterMenu
                ? t(selectedFilterMenu.label)
                : t('Feed.Sort.Title')
            }
            dataFilter={dataLeftDropdown}
            selectedMenu={setSelectedFilterMenu}
            leftPosition={widthResponsive(-60)}
          />
          <DropDownFilter
            labelCaption={
              selectedCategoryMenu
                ? t(selectedCategoryMenu.label)
                : t('Home.Tab.TopPost.Category.Title')
            }
            dataFilter={dataRightDropdown}
            selectedMenu={setSelectedCategoryMenu}
            leftPosition={widthResponsive(-144)}
          />
        </View>
      )}
      {dataMain !== null && dataMain.length !== 0 ? (
        <View style={{flex: 1, marginHorizontal: widthResponsive(-24)}}>
          {refreshing && (
            <View style={styles.loadingContainer}>
              <LoadingSpinner />
            </View>
          )}
          <FlatList
            data={dataMain}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom:
                uuidMusician !== ''
                  ? undefined
                  : height >= 800
                  ? heightResponsive(220)
                  : heightResponsive(160),
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => setRefreshing(true)}
              />
            }
            onEndReached={handleEndScroll}
            onEndReachedThreshold={1}
            renderItem={({item, index}) => (
              <>
                <ListCard.PostList
                  toDetailOnPress={() =>
                    handleToDetailMusician(item.musician.uuid)
                  }
                  musicianName={item.musician.fullname}
                  musicianId={`@${item.musician.username}`}
                  imgUri={
                    item.musician.imageProfileUrls?.length !== 0
                      ? item.musician.imageProfileUrls[0]?.image
                      : ''
                  }
                  postDate={
                    item?.timeAgo ? item.timeAgo : dateFormat(item.createdAt)
                  }
                  postDate2={item.createdAt}
                  category={categoryNormalize(item.category)}
                  onPress={() => cardOnPress(item)}
                  likeOnPress={() => likeOnPress(item.id, item.isLiked)}
                  likePressed={likePressedInFeed(selectedId, item, recorder)}
                  likeCount={likesCountInFeed(selectedId, item, recorder)}
                  tokenOnPress={() => tokenOnPress(item.musician.uuid)}
                  shareOnPress={() => shareOnPress(item)}
                  containerStyles={{marginTop: mvs(16)}}
                  commentCount={item.commentsCount}
                  myPost={item.musician.uuid === MyUuid}
                  musicianUuid={item.musician.uuid}
                  idPost={item.id}
                  selectedMenu={setSelectedMenuPost}
                  selectedIdPost={setSelectedIdPost}
                  selectedUserUuid={setSelectedUserUuid}
                  isPremium={item.isPremiumPost}
                  viewCount={item.viewsCount}
                  shareCount={item.shareCount}
                  showDropdown
                  children={
                    <ChildrenCard
                      data={item}
                      onPress={onPressPlaySong}
                      isPlay={isPlaying}
                      playOrPause={handlePausePlay}
                      pauseModeOn={pauseModeOn}
                      currentProgress={playerProgress.position}
                      duration={playerProgress.duration}
                      seekPlayer={seekPlayer}
                      isIdNowPlaying={item.id === idNowPlaying}
                    />
                  }
                />
              </>
            )}
          />
        </View>
      ) : !feedIsLoading && dataMain?.length === 0 ? (
        <EmptyState
          text={t('Home.DiveIn.MyArtist.EmptyState')}
          containerStyle={styles.containerEmpty}
          textStyle={styles.emptyText}
          hideIcon={true}
        />
      ) : null}
      <ModalShare
        url={shareLink}
        modalVisible={modalShare}
        onPressClose={() => setModalShare(false)}
        titleModal={t('General.Share.Feed')}
        hideMusic
        onPressCopy={onPressCopy}
        onModalHide={
          isCopied
            ? onModalShareHide
            : () => console.log(modalShare, 'modal is hide')
        }
        disabled={!successGetLink}
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
              {t('General.LinkCopied')}
            </Text>
          </View>
        }
        modalStyle={{marginHorizontal: widthResponsive(24)}}
      />
      <ModalDonate
        userId={selectedMusicianId}
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

export default PostListMyArtist;

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
  categoryContainerStyle: {
    width: undefined,
    aspectRatio: undefined,
    alignSelf: 'flex-end',
    marginRight: widthResponsive(-3),
  },
  categoryTextStyle: {
    fontSize: mvs(10),
    fontWeight: '500',
    color: color.Dark[50],
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: heightPercentage(20),
  },
  containerEmpty: {
    alignSelf: 'center',
  },
  emptyText: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    textAlign: 'center',
    color: color.Neutral[10],
    lineHeight: mvs(16),
  },
});
