import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Color from '../../theme/Color';
import {RootStackParams} from '../../App';
import {EditProfile} from '../../components';

interface ProfileProps {
  props: {};
  route: any;
}

export const EditProfileScreen: React.FC<ProfileProps> = (
  props: ProfileProps,
) => {
  const {params} = props?.route;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goBack = () => {
    navigation.goBack();
  };

  const onPressSave = (param: any) => {
    navigation.navigate('Profile', {...param});
  };

  const profile = {
    fullname: 'Kendal Jenner',
    username: '@kendaljenner',
    bio: params?.bio || "I'm here to support the musician",
    backgroundUri: params?.backgroundUri?.path || null,
    avatarUri: params?.avatarUri?.path,
  };

  return (
    <View style={styles.root}>
      <EditProfile
        profile={profile}
        onPressGoBack={goBack}
        type={'edit'}
        onPressSave={onPressSave}
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
