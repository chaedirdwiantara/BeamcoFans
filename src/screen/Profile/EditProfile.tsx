import React, {useState} from 'react';
import {InteractionManager, StyleSheet, View} from 'react-native';
import {Image} from 'react-native-image-crop-picker';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import Color from '../../theme/Color';
import {EditProfile} from '../../components';
import {uploadImage} from '../../api/uploadImage.api';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {MainTabParams, RootStackParams} from '../../navigations';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';

type EditProfileProps = NativeStackScreenProps<RootStackParams, 'EditProfile'>;

export const EditProfileScreen: React.FC<EditProfileProps> = ({
  navigation,
  route,
}: EditProfileProps) => {
  const navigation2 = useNavigation<NativeStackNavigationProp<MainTabParams>>();
  const dataProfile = route.params;
  const {isLoading, updateProfileUser} = useProfileHook();

  const banners =
    dataProfile !== undefined && dataProfile.banners?.length > 0
      ? dataProfile.banners[2].image
      : null;

  const avatar =
    dataProfile !== undefined && dataProfile.images?.length > 0
      ? dataProfile.images[2].image
      : null;

  const [avatarUri, setAvatarUri] = useState<string>(avatar || '');
  const [backgroundUri, setBackgroundUri] = useState<string>(banners || '');
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const goBack = () => {
    navigation.goBack();
  };

  const onPressSave = (param: {bio: string}) => {
    updateProfileUser(
      {
        about: param.bio,
        imageProfileUrl: avatarUri,
        banner: backgroundUri,
      },
      true,
    );
    setTimeout(() => {
      navigation2.navigate('Profile', {showToast: true});
    }, 500);
  };

  const setResetImage = (type: string) => {
    type === 'avatarUri' ? setAvatarUri('') : setBackgroundUri('');
  };

  const setUploadImage = async (image: Image, type: string) => {
    InteractionManager.runAfterInteractions(() => setImageLoading(true));
    try {
      const response = await uploadImage(image);
      type === 'avatarUri'
        ? setAvatarUri(response.data)
        : setBackgroundUri(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setImageLoading(false);
    }
  };

  const profile = {
    fullname: dataProfile?.fullname,
    username: '@' + dataProfile?.username,
    bio: dataProfile?.about || "I'm here to support the musician",
    avatarUri: avatarUri,
    backgroundUri: backgroundUri,
  };

  return (
    <View style={styles.root}>
      <EditProfile
        profile={profile}
        type={'edit'}
        onPressGoBack={goBack}
        onPressSave={onPressSave}
        setUploadImage={(image: Image, type: string) =>
          setUploadImage(image, type)
        }
        setResetImage={(type: string) => {
          setResetImage(type);
        }}
        imageLoading={imageLoading}
      />
      <ModalLoading visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
