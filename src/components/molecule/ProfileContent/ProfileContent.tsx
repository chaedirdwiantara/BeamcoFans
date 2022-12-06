import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

import {ListCard} from '../ListCard';
import {TabFilter} from '../TabFilter';
import Color from '../../../theme/Color';
import {ProfileHeader} from './components/Header';
import {EmptyState} from '../EmptyState/EmptyState';
import {ProcessingIcon} from '../../../assets/icon';
import {MenuText} from '../../atom/MenuText/MenuText';
import {TopSongListData} from '../../../data/topSong';
import TopSong from '../../../screen/ListCard/TopSong';
import {UserInfoCard} from '../UserInfoCard/UserInfoCard';
import {MusicianListData} from '../../../data/topMusician';
import {CreateNewCard} from '../CreateNewCard/CreateNewCard';
import TopMusician from '../../../screen/ListCard/TopMusician';
import {elipsisText, heightPercentage, widthPercentage} from '../../../utils';

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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filter] = useState([
    {filterName: 'SONG'},
    {filterName: 'TOP MUSICIAN'},
    {filterName: 'BADGE'},
  ]);
  const filterData = (item: any, index: any) => {
    setSelectedIndex(index);
  };

  return (
    <View style={{flex: 1}}>
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
            <ScrollView>
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
              <TopSong />
            </ScrollView>
          ) : (
            <CreateNewCard
              num="01"
              text="Default Playlist"
              onPress={() => onPressGoTo('CreateNewPlaylist')}
            />
          )
        ) : filter[selectedIndex].filterName === 'TOP MUSICIAN' ? (
          MusicianListData.length > 0 ? (
            <TopMusician type={'profile'} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Color.Dark[50],
  },
  infoCard: {
    position: 'absolute',
    top: heightPercentage(300),
    left: widthPercentage(20),
  },
  containerContent: {
    flex: 1,
    marginTop: heightPercentage(70),
    paddingHorizontal: widthPercentage(20),
    marginBottom: heightPercentage(10),
    width: '100%',
  },
  flashlistStyle: {
    width: '100%',
    height: '100%',
  },
});
