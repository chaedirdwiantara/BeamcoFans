import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {ProcessingIcon} from '../../assets/icon';
import {
  CreateNewCard,
  EmptyState,
  Gap,
  ListCard,
  SsuStatusBar,
  TabFilter,
  TopNavigation,
  UserInfoCard,
} from '../../components';
import {MenuText} from '../../components/atom/MenuText/MenuText';
import {MusicianListData} from '../../data/topMusician';
import {TopSongListData} from '../../data/topSong';
import {
  elipsisText,
  heightPercentage,
  heightResponsive,
  widthResponsive,
} from '../../utils';
import TopMusician from '../ListCard/TopMusician';
import TopSong from '../ListCard/TopSong';
import {ProfileHeader} from './ProfileHeader';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {color} from '../../theme';
import ExclusiveDailyContent from './ExclusiveDailyContent';
import ProfileComponent from './ProfileComponent';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;
interface ProfileContentProps {
  playlist: any;
  profile: any;
  goToEditProfile?: () => void;
  goToPlaylist: () => void;
  onPressGoTo: (
    screenName: 'Setting' | 'Following' | 'CreateNewPlaylist',
  ) => void;
}

const Dummy = {
  about:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus',
  origin: 'Jakarta, Indonesia',
  yearsActive: '1999 - present',
  members: 'Once, Ari Lasso, Ahmad Dhani',
  website: 'www.dealopa.com',
};

export const ProfileContent: React.FC<ProfileContentProps> = ({
  profile,
  playlist,
  goToEditProfile,
  goToPlaylist,
  onPressGoTo,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrolEffect, setScrollEffect] = useState(false);
  const [filter] = useState([
    {filterName: 'PROFILE'},
    {filterName: 'POST'},
    {filterName: 'EXCLUSIVE'},
    {filterName: 'MUSIC'},
    {filterName: 'FANS'},
  ]);
  const filterData = (item: string, index: number) => {
    setSelectedIndex(index);
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 10;
    setScrollEffect(scrolled);
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
          avatarUri={profile.avatarUri}
          backgroundUri={profile.backgroundUri}
          fullname={profile.fullname}
          username={profile.username}
          bio={profile.bio}
          onPress={goToEditProfile}
          iconPress={() => onPressGoTo('Setting')}
        />
        <View style={styles.infoCard}>
          <UserInfoCard
            type=""
            containerStyles={{paddingHorizontal: widthResponsive(18)}}
            onPress={() => onPressGoTo('Following')}
          />
          <ExclusiveDailyContent />
          <Gap height={10} />
          <View style={styles.containerContent}>
            <TabFilter.Type1
              filterData={filter}
              onPress={filterData}
              selectedIndex={selectedIndex}
              flatlistContainerStyle={{paddingHorizontal: widthResponsive(24)}}
            />
            {filter[selectedIndex].filterName === 'PROFILE' ? (
              <View>
                <Gap height={24} />
                <ProfileComponent
                  title={'About'}
                  content={Dummy.about}
                  gap={16}
                />
                <Gap height={24} />
                <ProfileComponent title={'Social Media'} socmed gap={16} />
                <Gap height={24} />
                <ProfileComponent title={'Origin'} content={Dummy.origin} />
                <Gap height={24} />
                <ProfileComponent
                  title={'Years Active'}
                  content={Dummy.yearsActive}
                />
                <Gap height={24} />
                <ProfileComponent title={'Members'} content={Dummy.members} />
                <Gap height={24} />
                <ProfileComponent title={'Website'} content={Dummy.website} />
              </View>
            ) : filter[selectedIndex].filterName === 'POST' ? (
              MusicianListData.length > 0 ? (
                <View></View>
              ) : (
                <EmptyState text="This musician don't have any post" />
              )
            ) : MusicianListData.length > 0 ? (
              <View></View>
            ) : (
              <EmptyState text="This musician don't have any post" />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoCard: {
    marginTop: heightResponsive(-50),
    marginBottom: heightResponsive(24),
    alignItems: 'center',
  },
  containerContent: {},
  topNavStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    borderBottomWidth: 0,
    paddingBottom: heightPercentage(10),
  },
});
