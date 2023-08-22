import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  BottomSheetGuest,
  EmptyState,
  Gap,
  ModalDonate,
  ModalSuccessDonate,
  PopUp,
  SsuStatusBar,
  TabFilter,
  TopNavigation,
  UserInfoCard,
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
import {ProfileHeader} from './ProfileHeader';
import {RootStackParams} from '../../navigations';
import ListPlaylist from '../ListCard/ListPlaylist';
import {PostList} from '../../interface/feed.interface';
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
import {ArrowLeftIcon} from '../../assets/icon';
import {mvs} from 'react-native-size-matters';
import {usePlayerStore} from '../../store/player.store';
import MerchList from '../ListCard/MerchList';
import ConcertList from '../ListCard/ConcertList';
import ListAlbum from './ListAlbum';
import EventMusician from '../../components/molecule/EventMusician';

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
}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const isLogin = storage.getBoolean('isLogin');
  const {checkSubs, alreadySubsEC} = useCreditHook();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrolEffect, setScrollEffect] = useState(false);
  const [filter] = useState([
    {filterName: 'Musician.Tab.Main'},
    {filterName: 'Musician.Tab.Musician'},
    {filterName: 'Musician.Tab.Music'},
    {filterName: 'Musician.Tab.Fans'},
    {filterName: 'Musician.Tab.Event'},
    {filterName: 'Musician.Tab.Profile'},
    // {filterName: 'Musician.Tab.Merchandise'},
    // {filterName: 'Musician.Tab.Ticket'},
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
  };

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
      isFollowed
        ? (setUnfollowMusician({musicianID: profile.uuid}),
          setFollowersCount(followersCount - 1))
        : (setFollowMusician({musicianID: profile.uuid}),
          setFollowersCount(followersCount + 1));
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

  const onPressSuccess = () => {
    setModalSuccessDonate(false);
  };

  const closeOnPress = () => {
    setShowStatePopUp(false);
  };

  const onPressShareQR = () => {
    navigation.navigate('MyQRCode', {uuid});
  };

  const leftIconHeader = () => {
    return (
      <View style={styles.containerLeftIcon}>
        <TouchableOpacity onPress={onPressGoBack}>
          <ArrowLeftIcon
            stroke={color.Neutral[10]}
            style={{marginLeft: widthPercentage(24)}}
          />
        </TouchableOpacity>
        <Gap width={widthPercentage(20)} />
        <Text style={styles.name}>{profile.fullname}</Text>
      </View>
    );
  };

  const showContentMusic =
    dataPlaylist?.length > 0 ||
    dataAlbum.length > 0 ||
    dataAppearsOn.length > 0;

  return (
    <View style={styles.container}>
      <SsuStatusBar type={'black'} />
      <TopNavigation.Type1
        type="musician detail"
        title=""
        leftIcon={scrolEffect && leftIconHeader()}
        leftIconAction={handleBackAction}
        maxLengthTitle={20}
        itemStrokeColor={'white'}
        bgColor={scrolEffect ? color.Dark[800] : 'transparent'}
        containerStyles={styles.topNavStyle}
        onPressShareQR={onPressShareQR}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}>
        <ProfileHeader
          avatarUri={
            profile.imageProfileUrls.length !== 0
              ? profile.imageProfileUrls[1].image
              : ''
          }
          backgroundUri={
            profile.banners !== null && profile.banners.length !== 0
              ? profile.banners[1].image
              : ''
          }
          fullname={profile?.fullname}
          username={profile?.username}
          bio={profile?.bio}
          isFollowed={profile?.isFollowed}
          followOnPress={followOnPress}
          onPressDonate={() =>
            isLogin ? setModalDonate(true) : setModalGuestVisible(true)
          }
          onPressImage={showImage}
        />
        <View style={styles.infoCard}>
          <UserInfoCard
            onPress={goToFollowers}
            profile={profile}
            followersCount={followersCount}
            disabled={true}
          />
          {exclusiveContent && (
            <ExclusiveDailyContent
              {...exclusiveContent}
              subs={alreadySubsEC}
              musician={profile}
            />
          )}
          <Gap height={10} />
          <View style={styles.containerContent}>
            <TabFilter.Type1
              filterData={filter}
              onPress={filterData}
              selectedIndex={selectedIndex}
              flatlistContainerStyle={{
                paddingHorizontal: widthResponsive(24),
                width: 'auto',
              }}
              translation={true}
            />

            {showStatePopUp !== false && (
              <View
                style={{width: '100%', paddingHorizontal: widthResponsive(20)}}>
                <Gap height={12} />
                <PopUp
                  title={'Show your appreciation'}
                  subTitle={
                    'Send tips to support your favorite musician to see them growth'
                  }
                  closeOnPress={closeOnPress}
                />
              </View>
            )}

            {filter[selectedIndex].filterName === 'Musician.Tab.Profile' ? (
              <DataMusician profile={profile} dataAlbum={dataAlbum} />
            ) : filter[selectedIndex].filterName === 'Musician.Tab.Musician' ? (
              <View
                style={{
                  paddingHorizontal: widthResponsive(24),
                  width: '100%',
                }}>
                <PostListProfile uuidMusician={uuid} {...exclusiveContent} />
              </View>
            ) : filter[selectedIndex].filterName === 'Musician.Tab.Music' ? (
              showContentMusic ? (
                <View style={{paddingHorizontal: widthResponsive(20)}}>
                  <ListPlaylist
                    data={dataPlaylist}
                    onPress={goToPlaylist}
                    scrollable={false}
                  />
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
            ) : filter[selectedIndex].filterName === 'Musician.Tab.Ticket' ? (
              <View
                style={{
                  paddingHorizontal: widthResponsive(20),
                }}>
                <ConcertList musicianId={uuid} />
              </View>
            ) : filter[selectedIndex].filterName === 'Musician.Tab.Event' ? (
              <View
                style={{
                  paddingHorizontal: widthResponsive(20),
                }}>
                <EventMusician />
              </View>
            ) : null}
          </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoCard: {
    width: '100%',
    marginTop: heightResponsive(-20),
    marginBottom: heightResponsive(24),
    alignItems: 'center',
  },
  containerContent: {
    width: '100%',
  },
  topNavStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
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
});
