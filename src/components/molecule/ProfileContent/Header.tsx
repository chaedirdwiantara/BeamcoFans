import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {mvs} from 'react-native-size-matters';
import {Avatar, ButtonGradient} from '../../atom';
import Typography from '../../../theme/Typography';
import {CameraIcon, GalleryEditIcon, SettingIcon} from '../../../assets/icon';

export interface ProfileHeaderProps {
  avatarUri?: string;
  backgroundUri?: string;
  fullname?: string;
  username?: string;
  bio?: string;
  type?: string;
  onPress?: (params: string) => void;
  iconPress?: (params: string) => void;
  containerStyles?: ViewStyle;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = (
  props: ProfileHeaderProps,
) => {
  const {
    avatarUri = '',
    backgroundUri = '',
    fullname,
    username,
    bio,
    type = '',
    onPress,
    iconPress,
    containerStyles,
  } = props;

  const iconRight = () => {
    return (
      <TouchableOpacity
        onPress={() => iconPress('backgroundUri')}
        style={styles.settingIcon}>
        {type === '' ? <SettingIcon /> : <GalleryEditIcon />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.root, containerStyles]}>
      <ImageBackground
        source={{uri: backgroundUri}}
        resizeMode="cover"
        style={styles.image}>
        <Avatar
          imgUri={avatarUri}
          size={widthPercentage(64)}
          showIcon={type === 'edit'}
          icon={<CameraIcon />}
          onPress={() => iconPress('avatarUri')}
        />
        <Text style={[Typography.Heading5, styles.fullname]}>{fullname}</Text>
        <Text style={styles.username}>{username}</Text>

        {type === '' && (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.description}>{bio}</Text>
            <ButtonGradient
              label={'Edit Profile'}
              gradientStyles={styles.btnContainer}
              onPress={onPress}
            />
          </View>
        )}

        {iconRight()}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width,
    height: heightPercentage(340),
    backgroundColor: Color.Dark[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullname: {
    marginTop: heightPercentage(20),
    color: Color.Neutral[10],
  },
  username: {
    fontSize: normalize(12),
    lineHeight: mvs(20),
    color: Color.Neutral[10],
    fontFamily: Font.InterRegular,
  },
  description: {
    fontSize: normalize(12),
    color: Color.Neutral[10],
    fontFamily: Font.InterRegular,
    maxWidth: width * 0.9,
    marginTop: heightPercentage(15),
  },
  btnContainer: {
    height: undefined,
    width: widthPercentage(100),
    aspectRatio: heightPercentage(100 / 32),
    marginVertical: heightPercentage(10),
  },
  editIcon: {
    position: 'absolute',
    top: heightPercentage(20),
    right: widthPercentage(20),
  },
  settingIcon: {
    position: 'absolute',
    top: heightPercentage(20),
    right: widthPercentage(20),
    marginTop: Platform.OS === 'ios' ? heightPercentage(25) : 0,
  },
});
