import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {TabFilter} from '../TabFilter';
import Color from '../../../theme/Color';
import {ProcessingIcon} from '../../../assets/icon';
import {MenuText} from '../../atom/MenuText/MenuText';
import {UserInfoCard} from '../UserInfoCard/UserInfoCard';
import {ProfileHeaderProps, ProfileHeader} from './Header';
import {CreateNewCard} from '../CreateNewCard/CreateNewCard';
import {heightPercentage, widthPercentage} from '../../../utils';
import {MusicianListExample, MusicListCardExample} from '../../example';

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
    <View>
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
      <View
        style={{
          marginTop: heightPercentage(70),
          paddingHorizontal: widthPercentage(20),
        }}>
        <TabFilter.Type1
          filterData={filter}
          onPress={filterData}
          selectedIndex={selectedIndex}
        />
        {filter[selectedIndex].filterName === 'SONG' ? (
          <View>
            <CreateNewCard num="1" text="Create New Playlist" />
            <MusicListCardExample />
          </View>
        ) : filter[selectedIndex].filterName === 'TOP MUSICIAN' ? (
          <MusicianListExample />
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
});
