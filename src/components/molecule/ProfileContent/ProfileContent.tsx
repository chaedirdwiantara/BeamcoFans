import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import {TabFilter} from '../TabFilter';
import Color from '../../../theme/Color';
import {ProcessingIcon} from '../../../assets/icon';
import {MenuText} from '../../atom/MenuText/MenuText';
import TopSong from '../../../screen/ListCard/TopSong';
import {UserInfoCard} from '../UserInfoCard/UserInfoCard';
import {ProfileHeaderProps, ProfileHeader} from './Header';
import {CreateNewCard} from '../CreateNewCard/CreateNewCard';
import TopMusician from '../../../screen/ListCard/TopMusician';
import {heightPercentage, widthPercentage} from '../../../utils';

interface ProfileContentProps {
  profile: ProfileHeaderProps[];
  goToEditProfile?: () => void;
  goToSetting?: () => void;
}

export const ProfileContent: React.FC<ProfileContentProps> = ({
  profile,
  goToEditProfile,
  goToSetting,
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
        iconPress={goToSetting}
      />
      <UserInfoCard type="self" containerStyles={styles.infoCard} />
      <View style={styles.containerContent}>
        <TabFilter.Type1
          filterData={filter}
          onPress={filterData}
          selectedIndex={selectedIndex}
        />
        {filter[selectedIndex].filterName === 'SONG' ? (
          <ScrollView>
            <CreateNewCard num="01" text="Create New Playlist" />
            <TopSong />
          </ScrollView>
        ) : filter[selectedIndex].filterName === 'TOP MUSICIAN' ? (
          <TopMusician />
        ) : (
          <MenuText.LeftIconWithSubtitle
            text="No Room for Speed"
            subtitle="Be the first jam contributor on 100 artist"
            onPress={() => null}
            icon={<ProcessingIcon />}
          />
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
