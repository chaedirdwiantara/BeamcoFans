import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  BottomSheetGuest,
  EmptyState,
  Gap,
  ModalConfirm,
  ModalConfirm2,
  ModalDonate,
  ModalSuccessDonate,
  PopUp,
  SsuStatusBar,
  SuccessToast,
  TabFilter,
  TopNavigation,
} from '../../components';
import {color, font} from '../../theme';
import DataMusician from './DataMusician';
import {
  AlbumData,
  AppearsOnDataType,
  DataDetailMusician,
  FollowMusicianPropsType,
} from '../../interface/musician.interface';
import ImageModal from '../Detail/ImageModal';
import {RootStackParams} from '../../navigations';
import {useCreditHook} from '../../hooks/use-credit.hook';
import ExclusiveDailyContent from './ExclusiveDailyContent';
import {Playlist} from '../../interface/playlist.interface';
import {DataExclusiveResponse} from '../../interface/setting.interface';
import {
  heightPercentage,
  heightResponsive,
  widthPercentage,
  widthResponsive,
} from '../../utils';
import PostListProfile from '../ListCard/PostListProfile';
import MainTab from '../../components/molecule/ProfileContent/MainTab/MainTab';
import {storage} from '../../hooks/use-storage.hook';
import {FansScreen} from './ListFans';
import {usePlayerStore} from '../../store/player.store';
import MerchList from '../ListCard/MerchList';
import ConcertList from '../ListCard/ConcertList';
import ListAlbum from './ListAlbum';
import {useBlockHook} from '../../hooks/use-block.hook';
import BlockProfileUI from '../../components/molecule/BlockOnProfile';
import {
  DataDropDownType,
  dataProfileDropdown,
  dataProfileDropdownBlocked,
} from '../../data/dropdown';
import EventMusician from '../../components/molecule/EventMusician';
import {useBadgeHook} from '../../hooks/use-badge.hook';
import {ProfileHeaderNew} from './ProfileHeaderNew';
import initialname from '../../utils/initialname';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;
interface MusicianDetailProps {
  profile: DataDetailMusician;
  uuid: string;
  dataAlbum: AlbumData[];
  dataAppearsOn: AppearsOnDataType[];
  dataPlaylist: Playlist[];
  setFollowMusician: (props?: FollowMusicianPropsType) => void;
  setUnfollowMusician: (props?: FollowMusicianPropsType) => void;
  exclusiveContent?: DataExclusiveResponse;
  refresh: boolean;
  setRefresh: () => void;
  setRefreshing?: () => void;
  isLoading?: boolean;
}

export const MusicianDetail: React.FC<MusicianDetailProps> = ({
  profile,
  uuid,
  dataAlbum,
  dataPlaylist,
  setFollowMusician,
  setUnfollowMusician,
  exclusiveContent,
  dataAppearsOn,
  refresh,
  setRefresh,
  setRefreshing,
  isLoading,
}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const isLogin = storage.getBoolean('isLogin');
  const {checkSubs, alreadySubsEC} = useCreditHook();
  const {
    blockLoading,
    blockError,
    blockResponse,
    unblockResponse,
    setBlockResponse,
    setUnblockResponse,
    setBlockUser,
    setUnblockUser,
  } = useBlockHook();

  // BADGE
  const {useCheckBadge} = useBadgeHook();
  // artist type = 2
  const {data: dataBadge} = useCheckBadge({
    userType: 2,
    point: profile.point?.pointLifetime,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrolEffect, setScrollEffect] = useState(false);
  const [filter] = useState([
    //TODO: HIDE IT FOR NOW {filterName: 'Musician.Tab.Main'},
    {filterName: 'Musician.Tab.Musician'},
    {filterName: 'Musician.Tab.Fans'},
    // {filterName: 'Musician.Tab.Music'},
    {filterName: 'Musician.Tab.Event'},
    {filterName: 'Musician.Tab.Profile'},
    {filterName: 'Musician.Tab.Merchandise'},
    {filterName: 'Musician.Tab.Ticket'},
  ]);
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);
  const [followersCount, setFollowersCount] = useState<number>(
    profile?.followers ? profile.followers : 0,
  );
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [zoomImage, setZoomImage] = useState<string>('');
  const [modalGuestVisible, setModalGuestVisible] = useState<boolean>(false);
  const [showStatePopUp, setShowStatePopUp] = useState<boolean>();
  const [modalUnblock, setModalUnblock] = useState<boolean>(false);
  const [modalBlock, setModalBlock] = useState<boolean>(false);
  const [toastUnblock, setToastUnblock] = useState<boolean>(false);
  const [toastBlock, setToastBlock] = useState<boolean>(false);
  const [endReached, setEndReached] = useState<boolean>(false);
  const [allowPagination, setAllowPagination] = useState<boolean>(true);
  const [toastText, setToastText] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [showModalUnfollow, setShowModalUnfollow] = useState<boolean>(false);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  useEffect(() => {
    setIsFollowed(profile.isFollowed);
  }, []);

  const showPopUp: boolean | undefined = storage.getBoolean('showPopUp');

  const {setWithoutBottomTab, show} = usePlayerStore();

  useFocusEffect(
    useCallback(() => {
      if (show) {
        setWithoutBottomTab(true);
      }
    }, [show]),
  );

  useEffect(() => {
    if (showStatePopUp === false) {
      const currentValue = storage.getBoolean('showPopUp');
      if (currentValue !== false) {
        storage.set('showPopUp', false);
      }
    }
  }, [showStatePopUp]);

  useMemo(() => {
    setShowStatePopUp(currentState => {
      if (currentState !== showPopUp) {
        return showPopUp;
      }
      return currentState;
    });
  }, [showPopUp]);

  const showImage = (uri: string) => {
    setModalVisible(!isModalVisible);
    setZoomImage(uri);
  };

  useEffect(() => {
    setFollowersCount(profile?.followers);
  }, [profile?.followers, uuid]);

  useEffect(() => {
    if (exclusiveContent) checkSubs(profile.uuid);
  }, [exclusiveContent]);

  const filterData = (item: string, index: number) => {
    setSelectedIndex(index);
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 10;
    setScrollEffect(scrolled);

    const height = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;

    if (offsetY + height >= contentHeight && allowPagination) {
      setAllowPagination(false);
      setEndReached(true);
    }
  };

  useEffect(() => {
    setAllowPagination(true);
  }, [selectedIndex]);

  const goToFollowers = () => {
    navigation.push('Followers', {uuid});
  };

  const goToPlaylist = (id: number) => {
    navigation.push('Playlist', {id, from: 'other'});
  };

  const onPressGoBack = () => {
    show && setWithoutBottomTab(false);
    navigation.goBack();
  };

  const handleBackAction = () => {
    show && setWithoutBottomTab(false);
    navigation.goBack();
  };

  const followOnPress = (isFollowed: boolean) => {
    if (isLogin) {
      setToastVisible(true);
      if (isFollowed) {
        setUnfollowMusician({musicianID: profile.uuid});
        setFollowersCount(followersCount - 1);
        setIsFollowed(false);
        setToastText(`Successfully Unfollowing ${profile?.fullname}`);
      } else {
        setFollowMusician({musicianID: profile.uuid});
        setFollowersCount(followersCount + 1);
        setIsFollowed(true);
        setToastText(`Successfully Following ${profile?.fullname}`);
      }
    } else setModalGuestVisible(true);
  };

  const onPressDonate = () => {
    setModalDonate(false);
    setTrigger2ndModal(true);
  };

  useEffect(() => {
    modalSuccessDonate &&
      setTimeout(() => {
        setModalSuccessDonate(false);
      }, 3000);
  }, [modalSuccessDonate, trigger2ndModal]);

  useEffect(() => {
    (toastBlock || toastUnblock) &&
      setTimeout(() => {
        setToastBlock(false);
        setToastUnblock(false);
      }, 3000);
  }, [toastBlock, toastUnblock]);

  const onPressSuccess = () => {
    setModalSuccessDonate(false);
  };

  const closeOnPress = () => {
    setShowStatePopUp(false);
  };

  const onPressShareQR = () => {
    navigation.navigate('MyQRCode', {uuid, type: 'otherMusician'});
  };

  //! BLOCK/UNBLOCK AREA
  useEffect(() => {
    if (blockResponse === 'Success') {
      setRefreshing!();
      setToastBlock(true);
      setBlockResponse(undefined);
    }
  }, [blockResponse]);

  useEffect(() => {
    if (unblockResponse === 'Success') {
      setRefreshing!();
      setToastUnblock(true);
      setUnblockResponse(undefined);
    }
  }, [unblockResponse]);

  const handleUnblock = () => {
    setModalUnblock(true);
  };

  const unblockModalOnPress = () => {
    setUnblockUser({uuid: profile.uuid});
    setModalUnblock(false);
  };

  const handleToastUnblock = () => {
    setToastUnblock(false);
  };

  const handleToastBlock = () => {
    setToastBlock(false);
  };

  const blockModalOnPress = () => {
    setBlockUser({uuid: profile.uuid});
    setModalBlock(false);
  };
  //! END OF BLOCK/UNBLOCK AREA

  const resultDataDropdown = (selectedMenu: DataDropDownType) => {
    const value = t(selectedMenu.value);

    switch (value) {
      case '1':
        onPressShareQR();
        break;
      case '2':
        console.log('SHARE CHOOSEN');
        break;
      case '3':
        setModalBlock(true);
        break;
      case '4':
        setModalUnblock(true);
        break;
      default:
        break;
    }
  };

  const showContentMusic =
    dataPlaylist?.length > 0 ||
    dataAlbum.length > 0 ||
    dataAppearsOn.length > 0;

  const avatarUri =
    profile.imageProfileUrls.length !== 0
      ? profile.imageProfileUrls[1].image
      : '';

  return (
    <View style={styles.container}>
      <SsuStatusBar type={'black'} />
      <TopNavigation.Type1
        type="user detail"
        title={scrolEffect ? profile.fullname : ''}
        leftIconAction={handleBackAction}
        maxLengthTitle={25}
        itemStrokeColor={'white'}
        bgColor={scrolEffect ? color.Dark[800] : 'transparent'}
        containerStyles={styles.topNavStyle}
        dropdownData={
          profile.isBlock ? dataProfileDropdownBlocked : dataProfileDropdown
        }
        resultDataDropdown={resultDataDropdown}
        beingBlocked={profile.blockIs}
        containerTextStyle={{
          justifyContent: 'flex-start',
          marginLeft: widthPercentage(20),
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={setRefresh}
            tintColor={'transparent'}
          />
        }
        onScroll={handleScroll}>
        <ProfileHeaderNew
          avatarUri={avatarUri}
          fullname={profile.fullname}
          username={profile.username}
          bio={profile.bio}
          dataBadge={dataBadge?.data}
          isFollowed={isFollowed}
          onPressImage={showImage}
          donateOnPress={() =>
            isLogin ? setModalDonate(true) : setModalGuestVisible(true)
          }
          followOnPress={() => followOnPress(false)}
          unfollowOnPress={() => setShowModalUnfollow(true)}
          refreshing={refresh}
          totalFollowers={followersCount}
          totalFans={profile.fans}
          spotifyUrl={profile.spotifyUrl}
          websiteUrl={profile.websiteUrl}
          instagramUrl={profile.instagramUrl}
          youtubeUrl={profile.youtubeUrl}
          blocked={profile.isBlock || profile.blockIs}
        />
        <View style={styles.infoCard}>
          {profile.isBlock ? (
            <BlockProfileUI
              title={`@${profile.fullname} ${t(
                'Block.BlockUI.isBlockedProfTitle',
              )}`}
              caption={`${t('Block.BlockUI.isBlockedProfCaption')} @${
                profile.fullname
              }`}
              buttonOnPress={handleUnblock}
              containerStyle={styles.blockProfile}
            />
          ) : profile.blockIs ? (
            <BlockProfileUI
              title={`${t('Block.BlockUI.blockIsProfTitle')}`}
              caption={`${t('Block.BlockUI.blockIsProfCaption')} @${
                profile.fullname
              }`}
              containerStyle={styles.blockProfile}
            />
          ) : (
            <>
              {exclusiveContent && (
                <ExclusiveDailyContent
                  {...exclusiveContent}
                  subs={alreadySubsEC}
                  musician={profile}
                />
              )}
              <Gap height={mvs(20)} />
              <View style={styles.containerContent}>
                <TabFilter.Type5
                  filterData={filter}
                  onPress={filterData}
                  selectedIndex={selectedIndex}
                  flatlistContainerStyle={styles.tabStyle}
                  translation={true}
                />

                {showStatePopUp !== false && (
                  <View
                    style={{
                      width: '100%',
                      paddingHorizontal: widthResponsive(20),
                    }}>
                    <Gap height={12} />
                    <PopUp
                      title={t('Musician.ShowAppreciate')}
                      subTitle={t('Musician.SendTip')}
                      closeOnPress={closeOnPress}
                    />
                  </View>
                )}

                {filter[selectedIndex].filterName === 'Musician.Tab.Profile' ? (
                  <DataMusician profile={profile} dataAlbum={dataAlbum} />
                ) : filter[selectedIndex].filterName ===
                  'Musician.Tab.Musician' ? (
                  <View
                    style={{
                      paddingHorizontal: widthResponsive(24),
                      width: '100%',
                    }}>
                    <PostListProfile
                      uuidMusician={uuid}
                      endReached={endReached}
                      setEndReached={setEndReached}
                      setAllowPagination={setAllowPagination}
                      {...exclusiveContent}
                    />
                  </View>
                ) : filter[selectedIndex].filterName ===
                  'Musician.Tab.Music' ? (
                  isLoading ? null : showContentMusic ? (
                    <View style={{paddingHorizontal: widthResponsive(20)}}>
                      {/* <ListPlaylist
                        data={dataPlaylist}
                        onPress={goToPlaylist}
                        scrollable={false}
                      /> */}
                      <Gap height={mvs(20)} />
                      {/* List Album Horizontal */}
                      {dataAlbum && dataAlbum?.length > 0 && (
                        <ListAlbum
                          data={dataAlbum}
                          title={t('Musician.Label.Album')}
                          containerStyles={{marginBottom: mvs(30)}}
                        />
                      )}
                      {/* List Appears On */}
                      {dataAppearsOn && dataAppearsOn?.length > 0 && (
                        <ListAlbum
                          data={dataAppearsOn}
                          title={t('Musician.Label.AppearsOn')}
                          containerStyles={{marginBottom: mvs(30)}}
                        />
                      )}
                    </View>
                  ) : (
                    <EmptyState
                      text={t('Profile.Label.NoPlaylist') || ''}
                      containerStyle={{
                        alignSelf: 'center',
                        marginTop: heightPercentage(30),
                      }}
                    />
                  )
                ) : filter[selectedIndex].filterName === 'Musician.Tab.Fans' ? (
                  <View style={{paddingHorizontal: widthResponsive(20)}}>
                    <FansScreen uuid={uuid} />
                  </View>
                ) : filter[selectedIndex].filterName === 'Musician.Tab.Main' ? (
                  <View style={{paddingHorizontal: widthResponsive(20)}}>
                    <MainTab
                      uuid={uuid}
                      coverImage={exclusiveContent?.coverImage ?? ''}
                      title={exclusiveContent?.title ?? ''}
                      description={exclusiveContent?.description ?? ''}
                    />
                  </View>
                ) : filter[selectedIndex].filterName ===
                  'Musician.Tab.Merchandise' ? (
                  <View
                    style={{
                      paddingHorizontal: widthResponsive(20),
                    }}>
                    <MerchList musicianId={uuid} />
                  </View>
                ) : filter[selectedIndex].filterName ===
                  'Musician.Tab.Ticket' ? (
                  <View
                    style={{
                      paddingHorizontal: widthResponsive(20),
                    }}>
                    <ConcertList musicianId={uuid} />
                  </View>
                ) : filter[selectedIndex].filterName ===
                  'Musician.Tab.Event' ? (
                  <View
                    style={{
                      paddingHorizontal: widthResponsive(20),
                    }}>
                    <EventMusician musicianId={uuid} />
                  </View>
                ) : null}
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <ModalDonate
        userId={profile.uuid}
        onPressDonate={onPressDonate}
        modalVisible={modalDonate}
        onPressClose={() => setModalDonate(false)}
        onModalHide={() =>
          setTimeout(() => {
            setModalSuccessDonate(true);
          }, 1000)
        }
      />

      <ModalSuccessDonate
        modalVisible={modalSuccessDonate && trigger2ndModal}
        toggleModal={onPressSuccess}
      />

      <ImageModal
        toggleModal={() => setModalVisible(!isModalVisible)}
        modalVisible={isModalVisible}
        imageIdx={0}
        imageUri={zoomImage}
        type={'zoomProfile'}
      />

      <BottomSheetGuest
        modalVisible={modalGuestVisible}
        onPressClose={() => setModalGuestVisible(false)}
      />

      {/* Confirm when unfollow artist */}
      <ModalConfirm2
        modalVisible={showModalUnfollow}
        imgUri={avatarUri || ''}
        showAvatar={avatarUri === '' || avatarUri === undefined}
        initialAvatar={initialname(profile.fullname)}
        title={`Unfollow ${profile.fullname}`}
        subtitle={`Are you sure you want to unfollow ${profile.fullname}?`}
        onPressClose={() => setShowModalUnfollow(false)}
        onPressYes={() => {
          followOnPress(true);
          setShowModalUnfollow(false);
        }}
      />

      {/* //? Block user modal */}
      {modalBlock && (
        <ModalConfirm
          modalVisible={modalBlock}
          title={`${t('Block.Modal.Title')} @${profile.fullname} ?`}
          subtitle={`${t('Block.Modal.Subtitle')} @${profile.fullname}`}
          yesText={`${t('Block.Modal.RightButton')}`}
          noText={`${t('Block.Modal.LeftButton')}`}
          onPressClose={() => setModalBlock(false)}
          onPressOk={blockModalOnPress}
          rightButtonStyle={styles.rightButtonStyle}
        />
      )}
      {/* //? When block succeed */}
      <SuccessToast
        toastVisible={toastBlock}
        onBackPressed={handleToastBlock}
        caption={`${t('General.BlockSucceed')} @${profile.fullname}`}
      />

      {/* //? Unblock user modal */}
      {modalUnblock && (
        <ModalConfirm
          modalVisible={modalUnblock}
          title={`${t('Block.BlockUI.unBlockTitle')} @${profile.fullname} ?`}
          subtitle={`${t('Block.BlockUI.unBlockCaptionA')} @${
            profile.fullname
          } ${t('Block.BlockUI.unBlockCaptionB')} @${profile.fullname}`}
          yesText={`${t('Block.BlockUI.unblockButtonYes')}`}
          noText={`${t('Block.Modal.LeftButton')}`}
          onPressClose={() => setModalUnblock(false)}
          onPressOk={unblockModalOnPress}
          rightButtonStyle={styles.rightButtonStyle}
        />
      )}
      {/* //? When unblock succeed */}
      <SuccessToast
        toastVisible={toastUnblock}
        onBackPressed={handleToastUnblock}
        caption={`@${profile.fullname} ${t('Block.BlockUI.unblockSuccess')}`}
      />

      {/* toast follow / unfollow */}
      <SuccessToast
        toastVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        caption={toastText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoCard: {
    width: '100%',
    marginBottom: heightResponsive(30),
    alignItems: 'center',
  },
  containerContent: {
    width: '100%',
  },
  topNavStyle: {
    borderBottomWidth: 0,
    paddingBottom: heightPercentage(15),
  },
  containerLeftIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontFamily: font.InterSemiBold,
    fontSize: mvs(16),
    lineHeight: heightPercentage(20),
    color: color.Neutral[10],
    paddingLeft: widthPercentage(10),
  },
  rightButtonStyle: {
    backgroundColor: color.Error.block,
    borderRadius: 4,
    paddingHorizontal: widthResponsive(16),
    paddingVertical: widthResponsive(6),
  },
  blockProfile: {
    paddingHorizontal: widthResponsive(16),
  },
  tabStyle: {
    paddingHorizontal: widthResponsive(24),
    marginVertical: mvs(10),
    width: 'auto',
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: color.Success[400],
    paddingHorizontal: widthPercentage(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: color.Neutral[10],
  },
});
