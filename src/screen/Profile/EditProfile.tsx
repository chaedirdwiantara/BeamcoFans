import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {EditProfile} from '../../components';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {useUploadImageHook} from '../../hooks/use-uploadImage.hook';

interface ProfileProps {
  props: {};
  route: any;
}

export const EditProfileScreen: React.FC<ProfileProps> = (
  props: ProfileProps,
) => {
  const {params} = props?.route;

  const {updateProfileUser} = useProfileHook();
  const {dataImage, setUploadImage} = useUploadImageHook();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goBack = () => {
    navigation.goBack();
  };

  const onPressSave = (param: any) => {
    updateProfileUser({
      imageProfileUrl: param.avatarUri?.path,
      banner: param.backgroundUri?.path,
      about: param.bio,
    })
      .then(() => {
        goBack();
      })
      .catch(() => {
        goBack();
      });
  };

  const profile = {
    fullname: 'Kendal Jenner',
    username: '@kendaljenner',
    bio:
      params?.bio || params?.data?.about || "I'm here to support the musician",
    backgroundUri: params?.backgroundUri?.path || params?.data?.banner || null,
    avatarUri: params?.avatarUri?.path || params?.data?.imageProfileUrl,
  };

  return (
    <View style={styles.root}>
      <EditProfile
        profile={profile}
        onPressGoBack={goBack}
        type={'edit'}
        onPressSave={onPressSave}
        dataImage={dataImage}
        setUploadImage={(image: string) => setUploadImage(image)}
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
