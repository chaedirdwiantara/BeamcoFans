import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Color from '../../theme/Color';
import {RootStackParams} from '../../App';
import {ProfileContent} from '../../components';

export const ProfileScreen: React.FC = props => {
  const {params} = props?.route;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToSetting = () => {
    navigation.navigate('Setting');
  };

  const goToEditProfile = () => {
    navigation.navigate('EditProfile', {...params});
  };

  const profile = {
    fullname: 'Kendal Jenner',
    username: '@kendaljenner',
    bio: params?.bio || "I'm here to support the musician",
    backgroundUri: params?.backgroundUri?.uri || null,
    avatarUri:
      params?.avatarUri?.uri ||
      'https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
  };

  return (
    <View style={styles.root}>
      <ProfileContent
        profile={profile}
        goToSetting={goToSetting}
        goToEditProfile={goToEditProfile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
