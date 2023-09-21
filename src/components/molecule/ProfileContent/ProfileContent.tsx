import React, {useEffect, useState} from 'react';
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
import {mvs} from 'react-native-size-matters';

import {color, font} from '../../../theme';
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
import {
  ArrowLeftIcon,
  CheckCircle2Icon,
  SettingIcon,
} from '../../../assets/icon';
import {
  width,
  widthPercentage,
  heightPercentage,
  widthResponsive,
} from '../../../utils';
import BlockProfileUI from '../BlockOnProfile';
import {ModalConfirm} from '../Modal/ModalConfirm';
import SuccessToast from '../Toast/SuccessToast';
import {useBlockHook} from '../../../hooks/use-block.hook';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import {usePlayerStore} from '../../../store/player.store';
import {
  DataDropDownType,
  dataProfileDropdown,
  dataProfileDropdownBlocked,
} from '../../../data/dropdown';
import {TopNavigation} from '../TopNavigation';
import {profileStorage} from '../../../hooks/use-storage.hook';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

interface ProfileContentProps {
  profile: any;
  goToEditProfile: () => void;
  goToPlaylist: (id: number, name: string) => void;
  dataPlaylist?: Playlist[];
  showCreateCard: boolean;
  toastVisible: boolean;
  setToastVisible: (param: boolean) => void;
  toastText: string;
  totalCountlikedSong?: number;
  playerVisible?: boolean;
  refreshing: boolean;
  setRefreshing: () => void;
  otherUserProfile?: boolean;
  onPressGoBack?: () => void;
  goToFollowing: () => void;
  goToSetting: () => void;
  goToCreatePlaylist: () => void;
  qrType: 'fans' | 'otherMusician' | 'myProfile';
}

export const ProfileContent: React.FC<ProfileContentProps> = ({
  profile,
  goToEditProfile,
  goToPlaylist,
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
  onPressGoBack,
  goToSetting,
  goToFollowing,
  goToCreatePlaylist,
  qrType,
}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    blockLoading,
    blockError,
    blockResponse,
    unblockResponse,
    setBlockUser,
    setUnblockUser,
    setBlockResponse,
    setUnblockResponse,
  } = useBlockHook();
  const {setWithoutBottomTab, show} = usePlayerStore();

  const myUuid = profileStorage()?.uuid;

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollEffect, setScrollEffect] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [zoomImage, setZoomImage] = useState<string>('');
  const [modalUnblock, setModalUnblock] = useState<boolean>(false);
  const [modalBlock, setModalBlock] = useState<boolean>(false);
  const [toastUnblock, settoastUnblock] = useState<boolean>(false);
  const [toastBlock, setToastBlock] = useState<boolean>(false);

  const showImage = (uri: string) => {
    setModalVisible(!isModalVisible);
    setZoomImage(uri);
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

  const handleBackAction = () => {
    show && setWithoutBottomTab(false);
    navigation.goBack();
  };

  const onPressShareQR = () => {
    navigation.navigate('MyQRCode', {uuid: profile.uuid, type: qrType});
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
      settoastUnblock(true);
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
    settoastUnblock(false);
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

  const leftIconHeader = () => {
    if (showCreateCard) {
      return (
        <View style={styles.containerStickyHeader}>
          <Text style={[styles.name, styles.topIos]}>{profile.fullname}</Text>
          <TouchableOpacity onPress={goToSetting}>
            <SettingIcon style={styles.topIos} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.containerLeftIcon}>
          <View style={styles.containerArrowName}>
            <TouchableOpacity onPress={onPressGoBack}>
              <ArrowLeftIcon
                stroke={Color.Neutral[10]}
                style={{marginLeft: widthPercentage(24)}}
              />
            </TouchableOpacity>
            <Gap width={widthPercentage(20)} />
            <Text style={styles.name}>{profile.fullname}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.root}>
      {myUuid !== profile.uuid && (
        <TopNavigation.Type1
          type="user detail"
          title=""
          leftIcon
          leftIconAction={handleBackAction}
          maxLengthTitle={20}
          itemStrokeColor={'white'}
          bgColor={scrollEffect ? color.Dark[800] : 'transparent'}
          containerStyles={styles.topNavStyle}
          dropdownData={
            profile.isBlock ? dataProfileDropdownBlocked : dataProfileDropdown
          }
          resultDataDropdown={resultDataDropdown}
          beingBlocked={profile.blockIs}
        />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={setRefreshing}
            tintColor={'transparent'}
          />
        }
        onScroll={handleScroll}>
        <ProfileHeader
          type={myUuid !== profile.uuid ? 'user detail' : 'profile'}
          avatarUri={profile.avatarUri}
          backgroundUri={profile.backgroundUri}
          fullname={profile.fullname}
          username={profile.username}
          bio={profile.bio}
          onPress={goToEditProfile}
          iconPress={goToSetting}
          scrollEffect={scrollEffect}
          noEdit={!showCreateCard}
          backIcon={showCreateCard}
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
          onPress={goToFollowing}
          selfProfile={profile.data}
          totalCountlikedSong={totalCountlikedSong}
          totalPoint={profile.totalPoint}
          followersCount={0}
        />
        <View style={styles.containerContent}>
          {profile.isBlock ? (
            <BlockProfileUI
              title={`@${profile.fullname} ${t(
                'Block.BlockUI.isBlockedProfTitle',
              )}`}
              caption={`${t('Block.BlockUI.isBlockedProfCaption')} @${
                profile.fullname
              }`}
              buttonOnPress={handleUnblock}
            />
          ) : profile.blockIs ? (
            <BlockProfileUI
              title={`${t('Block.BlockUI.blockIsProfTitle')}`}
              caption={`${t('Block.BlockUI.blockIsProfCaption')} @${
                profile.fullname
              }`}
            />
          ) : (
            <>
              <TabFilter.Type1
                filterData={filter}
                onPress={filterData}
                selectedIndex={selectedIndex}
                translation={true}
              />
              {filter[selectedIndex].filterName === 'Profile.Tab.Playlist' ? (
                <View>
                  {showCreateCard && (
                    <CreateNewCard
                      num="00"
                      text={t('Profile.Button.CreatePlaylist')}
                      onPress={goToCreatePlaylist}
                    />
                  )}
                  {dataPlaylist !== undefined && dataPlaylist?.length > 0 ? (
                    <ListPlaylist
                      data={dataPlaylist === null ? [] : dataPlaylist}
                      onPress={goToPlaylist}
                      scrollable={false}
                      playerVisible={playerVisible}
                    />
                  ) : (
                    !showCreateCard && (
                      <EmptyState
                        text={t('Profile.Label.NoPlaylist') || ''}
                        containerStyle={{marginVertical: heightPercentage(30)}}
                      />
                    )
                  )}
                </View>
              ) : filter[selectedIndex].filterName ===
                'Profile.Tab.TopMusician' ? (
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
                  containerStyle={{marginVertical: heightPercentage(30)}}
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
                  containerStyle={{marginVertical: heightPercentage(30)}}
                />
              )}
            </>
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
        imageUri={zoomImage}
        type={'zoomProfile'}
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
  topNavStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    borderBottomWidth: 0,
    paddingBottom: heightPercentage(15),
  },
  containerLeftIcon: {
    width: width,
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.Dark[800],
    height: heightPercentage(85),
  },
  containerArrowName: {
    paddingTop: heightPercentage(30),
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontFamily: font.InterSemiBold,
    fontSize: mvs(16),
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
  rightButtonStyle: {
    backgroundColor: color.Error.block,
    borderRadius: 4,
    paddingHorizontal: widthResponsive(16),
    paddingVertical: widthResponsive(6),
  },
});
