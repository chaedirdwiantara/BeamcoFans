import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ProfileHeader} from '../components';
import Color from '../theme/Color';

export const SearchScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <ProfileHeader
        fullname="Kendal Jenner"
        username="@kendaljenner"
        avatarUri={
          'https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg'
        }
      />
      {/* <MenuText.LeftIcon
        text="Add To Playlist"
        onPress={() => null}
        icon={<MusicPlaylistIcon />}
      />
      <MenuText.RightIcon text="Change Password" onPress={() => null} />
      <MenuText.LeftIconWithSubtitle
        text="No Room for Speed"
        subtitle="Be the first jam contributor on 100 artist"
        onPress={() => null}
        icon={<ProcessingIcon />}
      /> */}
      {/* <NotificationCard
        title="Naruto, Sakura, Sasuke and 997 others"
        description="Liked your reply"
      />
      <FollowingCard
        name="Frank Ocean"
        description="312,123,231 Listener"
        imgUri="https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Dark[800],
  },
});
