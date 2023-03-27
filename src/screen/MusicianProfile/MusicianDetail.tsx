import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  EmptyState,
  Gap,
  ModalDonate,
  ModalSuccessDonate,
  SsuStatusBar,
  TabFilter,
  TopNavigation,
  UserInfoCard,
} from '../../components';
import {color} from '../../theme';
import DataMusician from './DataMusician';
import {
  AlbumData,
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
import {dropDownDataCategory, dropDownDataSort} from '../../data/dropdown';
import {heightPercentage, heightResponsive, widthResponsive} from '../../utils';
import PostListProfile from '../ListCard/PostListProfile';
import MainTab from '../../components/molecule/ProfileContent/MainTab/MainTab';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;
interface MusicianDetailProps {
  profile: DataDetailMusician;
  uuid: string;
  dataAlbum: AlbumData[];
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
}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {creditCount, getCreditCount} = useCreditHook();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrolEffect, setScrollEffect] = useState(false);
  const [filter] = useState([
    {filterName: 'Musician.Tab.Main'},
    {filterName: 'Musician.Tab.Musician'},
    {filterName: 'Musician.Tab.Music'},
    {filterName: 'Musician.Tab.Fans'},
    {filterName: 'Musician.Tab.Profile'},
  ]);
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);
  const [followersCount, setFollowersCount] = useState<number>(
    profile?.followers ? profile.followers : 0,
  );
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [zoomImage, setZoomImage] = useState<string[]>([]);

  const showImage = (uri: string) => {
    setModalVisible(!isModalVisible);
    setZoomImage([uri]);
  };

  useEffect(() => {
    setFollowersCount(profile?.followers);
  }, [profile?.followers, uuid]);

  useEffect(() => {
    getCreditCount();
  }, [modalDonate]);

  const filterData = (item: string, index: number) => {
    setSelectedIndex(index);
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 10;
    setScrollEffect(scrolled);
  };

  const cardOnPress = (data: PostList) => {
    navigation.navigate('PostDetail', data);
  };

  const goToFollowers = () => {
    navigation.navigate('Followers', {uuid});
  };

  const goToPlaylist = (id: number) => {
    navigation.navigate('Playlist', {id, from: 'other'});
  };

  const followOnPress = (isFollowed: boolean) => {
    isFollowed
      ? (setUnfollowMusician({musicianID: profile.uuid}),
        setFollowersCount(followersCount - 1))
      : (setFollowMusician({musicianID: profile.uuid}),
        setFollowersCount(followersCount + 1));
  };

  const onPressDonate = () => {
    setModalDonate(false);
    setTrigger2ndModal(true);
  };

  const onPressSuccess = () => {
    setModalSuccessDonate(false);
  };

  return (
    <View style={styles.container}>
      <SsuStatusBar type={'black'} />
      <TopNavigation.Type1
        title=""
        leftIconAction={navigation.goBack}
        maxLengthTitle={20}
        itemStrokeColor={'white'}
        bgColor={scrolEffect ? color.Dark[800] : 'transparent'}
        containerStyles={styles.topNavStyle}
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
          onPressDonate={() => setModalDonate(true)}
          onPressImage={showImage}
        />
        <View style={styles.infoCard}>
          <UserInfoCard
            onPress={goToFollowers}
            profile={profile}
            followersCount={followersCount}
          />
          {exclusiveContent && <ExclusiveDailyContent {...exclusiveContent} />}
          <Gap height={10} />
          <View style={styles.containerContent}>
            <TabFilter.Type1
              filterData={filter}
              onPress={filterData}
              selectedIndex={selectedIndex}
              flatlistContainerStyle={{paddingHorizontal: widthResponsive(24)}}
              translation={true}
            />
            {filter[selectedIndex].filterName === 'Musician.Tab.Profile' ? (
              <DataMusician profile={profile} dataAlbum={dataAlbum} />
            ) : filter[selectedIndex].filterName === 'Musician.Tab.Musician' ? (
              <View
                style={{
                  paddingHorizontal: widthResponsive(24),
                  width: '100%',
                }}>
                <PostListProfile
                  uuidMusician={uuid}
                  dataRightDropdown={dropDownDataCategory}
                  dataLeftDropdown={dropDownDataSort}
                />
              </View>
            ) : filter[selectedIndex].filterName === 'Musician.Tab.Music' ? (
              dataPlaylist.length > 0 ? (
                <View style={{paddingHorizontal: widthResponsive(30)}}>
                  <ListPlaylist
                    data={dataPlaylist}
                    onPress={goToPlaylist}
                    scrollable={false}
                  />
                </View>
              ) : filter[selectedIndex].filterName === 'Musician.Tab.Main' ? (
                <View style={{paddingHorizontal: widthResponsive(20)}}>
                  <MainTab uuid={uuid} />
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
            ) : null}
          </View>
        </View>
      </ScrollView>

      <ModalDonate
        totalCoin={creditCount}
        onPressDonate={onPressDonate}
        modalVisible={modalDonate}
        onPressClose={() => setModalDonate(false)}
        onModalHide={() => setModalSuccessDonate(true)}
      />

      <ModalSuccessDonate
        modalVisible={modalSuccessDonate && trigger2ndModal}
        toggleModal={onPressSuccess}
      />

      <ImageModal
        toggleModal={() => setModalVisible(!isModalVisible)}
        modalVisible={isModalVisible}
        imageIdx={0}
        dataImage={zoomImage}
        type={'zoomProfile'}
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
    paddingBottom: heightPercentage(10),
  },
});
