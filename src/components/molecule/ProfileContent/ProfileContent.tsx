import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  RefreshControl,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';

import {
  width,
  normalize,
  widthPercentage,
  heightPercentage,
} from '../../../utils';
import {font} from '../../../theme';
import {TabFilter} from '../TabFilter';
import Color from '../../../theme/Color';
import {Gap, SsuToast} from '../../atom';
import {ProfileHeader} from './components/Header';
import {EmptyState} from '../EmptyState/EmptyState';
import {UserInfoCard} from '../UserInfoCard/UserInfoCard';
import ImageModal from '../../../screen/Detail/ImageModal';
import {CreateNewCard} from '../CreateNewCard/CreateNewCard';
import {Playlist} from '../../../interface/playlist.interface';
import ListPlaylist from '../../../screen/ListCard/ListPlaylist';
import {CheckCircle2Icon, SettingIcon} from '../../../assets/icon';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

interface ProfileContentProps {
  profile: any;
  goToEditProfile: () => void;
  goToPlaylist: (id: number, name: string) => void;
  dataPlaylist?: Playlist[];
  onPressGoTo: (
    screenName: 'Setting' | 'Following' | 'CreateNewPlaylist',
  ) => void;
  showCreateCard: boolean;
  toastVisible: boolean;
  setToastVisible: (param: boolean) => void;
  toastText: string;
  totalCountlikedSong?: number;
  playerVisible?: boolean;
  refreshing: boolean;
  setRefreshing: () => void;
  otherUserProfile?: boolean;
}

export const ProfileContent: React.FC<ProfileContentProps> = ({
  profile,
  goToEditProfile,
  goToPlaylist,
  onPressGoTo,
  dataPlaylist,
  showCreateCard,
  toastVisible,
  setToastVisible,
  totalCountlikedSong,
  toastText,
  playerVisible,
  refreshing,
  setRefreshing,
  otherUserProfile,
}) => {
  const {t} = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollEffect, setScrollEffect] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [zoomImage, setZoomImage] = useState<string[]>([]);

  const showImage = (uri: string) => {
    setModalVisible(!isModalVisible);
    setZoomImage([uri]);
  };

  const [filter] = useState([
    {filterName: 'Profile.Tab.Playlist'},
    {filterName: 'Profile.Tab.TopMusician'},
    {filterName: 'Profile.Tab.Badge'},
  ]);
  const filterData = (item: any, index: any) => {
    setSelectedIndex(index);
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 10;
    setScrollEffect(scrolled);
  };

  const textMusician = otherUserProfile
    ? t('Profile.Label.NoMusicianOther')
    : t('Profile.Label.NoMusician');

  const textBadge = otherUserProfile
    ? t('Profile.Label.NoBadgeOther')
    : t('Profile.Label.NoBadge');

  const topPosition =
    Platform.OS === 'ios' && refreshing
      ? heightPercentage(360)
      : heightPercentage(310);

  return (
    <View style={styles.root}>
      {scrollEffect && (
        <View style={styles.containerStickyHeader}>
          <Text style={[styles.name, styles.topIos]}>{profile.fullname}</Text>
          <TouchableOpacity onPress={() => onPressGoTo('Setting')}>
            <SettingIcon style={styles.topIos} />
          </TouchableOpacity>
        </View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={setRefreshing} />
        }
        onScroll={handleScroll}>
        <ProfileHeader
          avatarUri={profile.avatarUri}
          backgroundUri={profile.backgroundUri}
          fullname={profile.fullname}
          username={profile.username}
          bio={profile.bio}
          onPress={goToEditProfile}
          iconPress={() => onPressGoTo('Setting')}
          scrollEffect={scrollEffect}
          noEdit={!showCreateCard}
          backIcon={!showCreateCard}
          onPressImage={showImage}
          refreshing={refreshing}
        />
        <UserInfoCard
          type="self"
          containerStyles={{
            position: 'absolute',
            left: widthPercentage(20),
            top: topPosition,
          }}
          totalFollowing={profile.totalFollowing}
          onPress={() => onPressGoTo('Following')}
          selfProfile={profile.data}
          totalCountlikedSong={totalCountlikedSong}
          followersCount={0}
        />
        <View style={styles.containerContent}>
          <TabFilter.Type1
            filterData={filter}
            onPress={filterData}
            selectedIndex={selectedIndex}
            translation={true}
          />
          {filter[selectedIndex].filterName === 'Profile.Tab.Playlist' ? (
            dataPlaylist !== undefined && dataPlaylist?.length > 0 ? (
              <View>
                {showCreateCard && (
                  <CreateNewCard
                    num="00"
                    text={t('Profile.Button.CreatePlaylist')}
                    onPress={() => onPressGoTo('CreateNewPlaylist')}
                  />
                )}
                <ListPlaylist
                  data={dataPlaylist === null ? [] : dataPlaylist}
                  onPress={goToPlaylist}
                  scrollable={false}
                  playerVisible={playerVisible}
                />
              </View>
            ) : (
              <EmptyState
                text={t('Profile.Label.NoPlaylist') || ''}
                containerStyle={{marginTop: heightPercentage(30)}}
              />
            )
          ) : filter[selectedIndex].filterName === 'Profile.Tab.TopMusician' ? (
            // Dihold karena point belum fix

            // MusicianListData.length > 0 ? (
            //   <TopMusician
            //     scrollable={false}
            //     type={'profile'}
            //     dataMusician={[]}
            //   />
            // ) :
            <EmptyState
              text={textMusician || ''}
              containerStyle={{marginTop: heightPercentage(30)}}
            />
          ) : (
            // Dihold karena badge belum fix

            // MusicianListData.length > 0 ? (
            //   <MenuText.LeftIconWithSubtitle
            //     text="No Room for Speed"
            //     subtitle="Be the first jam contributor on 100 artist"
            //     onPress={() => null}
            //     icon={<ProcessingIcon />}
            //   />
            // ) :
            <EmptyState
              text={textBadge || ''}
              containerStyle={{marginTop: heightPercentage(30)}}
            />
          )}
        </View>
      </ScrollView>

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <CheckCircle2Icon />
            <Gap width={4} />
            <Text style={[styles.textStyle]} numberOfLines={2}>
              {toastText}
            </Text>
          </View>
        }
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
  root: {
    flex: 1,
  },
  containerContent: {
    flex: 1,
    marginTop: heightPercentage(70),
    paddingHorizontal: widthPercentage(20),
    marginBottom: heightPercentage(20),
    width: '100%',
  },
  flashlistStyle: {
    width: '100%',
    height: '100%',
  },
  containerStickyHeader: {
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentage(20),
    backgroundColor: Color.Dark[800],
    height: heightPercentage(85),
  },
  name: {
    fontFamily: font.InterSemiBold,
    fontSize: normalize(16),
    lineHeight: heightPercentage(20),
    color: Color.Neutral[10],
  },
  topIos: {
    top: heightPercentage(15),
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: Color.Success[400],
    paddingHorizontal: widthPercentage(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: Color.Neutral[10],
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: heightPercentage(20),
  },
});
