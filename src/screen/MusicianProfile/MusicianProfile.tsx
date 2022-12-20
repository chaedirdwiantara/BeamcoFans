import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {ProcessingIcon} from '../../assets/icon';
import {
  CreateNewCard,
  EmptyState,
  ListCard,
  SsuStatusBar,
  TabFilter,
  TopNavigation,
  UserInfoCard,
} from '../../components';
import {MenuText} from '../../components/atom/MenuText/MenuText';
import {MusicianListData} from '../../data/topMusician';
import {TopSongListData} from '../../data/topSong';
import {elipsisText, heightPercentage, widthResponsive} from '../../utils';
import TopMusician from '../ListCard/TopMusician';
import TopSong from '../ListCard/TopSong';
import {ProfileHeader} from './ProfileHeader';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {color} from '../../theme';

interface NewPlaylistProps {
  playlist: any;
  goToPlaylist: () => void;
}

interface ProfileContentProps {
  playlist: any;
  profile: any;
  goToEditProfile?: () => void;
  goToPlaylist: () => void;
  onPressGoTo: (
    screenName: 'Setting' | 'Following' | 'CreateNewPlaylist',
  ) => void;
}

const NewCreatedPlaylist: React.FC<NewPlaylistProps> = ({
  playlist,
  goToPlaylist,
}) => {
  return (
    <TouchableOpacity onPress={goToPlaylist}>
      <ListCard.MusicList
        imgUri={playlist?.playlistUri?.path}
        musicNum={1}
        musicTitle={elipsisText(playlist?.playlistName, 22)}
        singerName={'by Weaboo'}
        containerStyles={{marginTop: heightPercentage(20)}}
        onPressCard={() => console.log('pressed card')}
      />
    </TouchableOpacity>
  );
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
    {filterName: 'SONG'},
    {filterName: 'TOP MUSICIAN'},
    {filterName: 'BADGE'},
  ]);
  const filterData = (item: string, index: number) => {
    setSelectedIndex(index);
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
        onScrollBeginDrag={() => setScrollEffect(true)}
        onMomentumScrollBegin={() => setScrollEffect(false)}>
        <ProfileHeader
          avatarUri={profile.avatarUri}
          backgroundUri={profile.backgroundUri}
          fullname={profile.fullname}
          username={profile.username}
          bio={profile.bio}
          onPress={goToEditProfile}
          iconPress={() => onPressGoTo('Setting')}
        />
        <UserInfoCard
          type="self"
          containerStyles={styles.infoCard}
          onPress={() => onPressGoTo('Following')}
        />
        <View style={styles.containerContent}>
          <TabFilter.Type1
            filterData={filter}
            onPress={filterData}
            selectedIndex={selectedIndex}
          />
          {filter[selectedIndex].filterName === 'SONG' ? (
            TopSongListData.length > 0 ? (
              <View style={{flex: 1}}>
                <CreateNewCard
                  num="01"
                  text="Create New Playlist"
                  onPress={() => onPressGoTo('CreateNewPlaylist')}
                />
                {playlist?.playlistName !== undefined && (
                  <NewCreatedPlaylist
                    playlist={playlist}
                    goToPlaylist={goToPlaylist}
                  />
                )}
                <TopSong scrollable={false} />
              </View>
            ) : (
              <CreateNewCard
                num="01"
                text="Default Playlist"
                onPress={() => onPressGoTo('CreateNewPlaylist')}
              />
            )
          ) : filter[selectedIndex].filterName === 'TOP MUSICIAN' ? (
            MusicianListData.length > 0 ? (
              <TopMusician type={'profile'} dataMusician={[]} />
            ) : (
              <EmptyState text="This user don't have contribution to any musician" />
            )
          ) : MusicianListData.length > 0 ? (
            <MenuText.LeftIconWithSubtitle
              text="No Room for Speed"
              subtitle="Be the first jam contributor on 100 artist"
              onPress={() => null}
              icon={<ProcessingIcon />}
            />
          ) : (
            <EmptyState text="This user don't have any badge" />
          )}
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
    position: 'absolute',
    top: heightPercentage(300),
    left: widthResponsive(20),
  },
  containerContent: {
    flex: 1,
    marginTop: heightPercentage(70),
    paddingHorizontal: widthResponsive(20),
    marginBottom: heightPercentage(10),
    width: '100%',
  },
  flashlistStyle: {
    width: '100%',
    height: '100%',
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
