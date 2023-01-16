import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Image} from 'react-native-image-crop-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {EditProfile} from '../../components';
import {RootStackParams} from '../../navigations';
import {uploadImage} from '../../api/uploadImage.api';
import {useProfileHook} from '../../hooks/use-profile.hook';

type EditProfileProps = NativeStackScreenProps<RootStackParams, 'EditProfile'>;

export const EditProfileScreen: React.FC<EditProfileProps> = ({
  navigation,
  route,
}: EditProfileProps) => {
  const dataProfile = route.params;
  const {updateProfileUser} = useProfileHook();

  const [avatarUri, setAvatarUri] = useState('');
  const [backgroundUri, setBackgroundUri] = useState('');

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
    navigation.goBack();
  };

  const setResetImage = (type: string) => {
    type === 'avatarUri' ? setAvatarUri('') : setBackgroundUri('');
  };

  const setUploadImage = async (image: Image, type: string) => {
    try {
      const response = await uploadImage(image);
      type === 'avatarUri'
        ? setAvatarUri(response.data)
        : setBackgroundUri(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const profile = {
    fullname: dataProfile?.fullname,
    username: '@' + dataProfile?.username,
    bio: dataProfile?.about || "I'm here to support the musician",
    avatarUri: avatarUri || dataProfile?.imageProfileUrl,
    backgroundUri: backgroundUri || dataProfile?.banner,
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
