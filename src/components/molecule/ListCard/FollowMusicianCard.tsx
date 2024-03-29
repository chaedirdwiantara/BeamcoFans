import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {Avatar, Gap} from '../../atom';
import {color, font} from '../../../theme';
import {DefaultAvatar} from '../../../assets/icon';
import {normalize, widthPercentage, widthResponsive} from '../../../utils';
import {imageTypes} from '../../../interface/base.interface';
import {useTranslation} from 'react-i18next';
import {storage} from '../../../hooks/use-storage.hook';
import {BottomSheetGuest} from '../GuestComponent/BottomSheetGuest';

interface ListProps {
  musicianNum?: number | string;
  musicianName: string;
  imgUri: imageTypes[];
  followerCount?: number;
  followOnPress: () => void;
  stateButton: boolean;
  containerStyles?: ViewStyle;
  toDetailOnPress: () => void;
  recommended?: boolean;
}

const FollowMusicianCard: React.FC<ListProps> = (props: ListProps) => {
  const {t} = useTranslation();
  const isLogin = storage.getBoolean('isLogin');

  const {
    musicianNum,
    musicianName,
    imgUri,
    followerCount,
    followOnPress,
    stateButton,
    containerStyles,
    toDetailOnPress,
    recommended = false,
  } = props;

  const follow = stateButton
    ? t('Preference.Following')
    : t('Preference.Follow');
  const [textFollow, setTextFollow] = useState(follow);
  const [countFollower, setCountFollower] = useState(followerCount ?? 0);
  const [modalGuestVisible, setModalGuestVisible] = useState<boolean>(false);

  const onPressFollow = () => {
    if (isLogin) {
      const followers = stateButton ? countFollower - 1 : countFollower + 1;
      setTextFollow(
        (stateButton ? t('Preference.Follow') : t('Preference.Following')) ||
          '',
      );
      setCountFollower(followers);
      followOnPress();
    } else {
      setModalGuestVisible(true);
    }
  };

  const followMenu = () => {
    return (
      <TouchableOpacity
        style={[
          styles.followButton,
          {
            backgroundColor:
              textFollow === t('Preference.Following')
                ? color.Dark[300]
                : color.Success[400],
          },
        ]}
        onPress={onPressFollow}>
        <Text style={styles.followText}>
          {textFollow === t('Preference.Following')
            ? textFollow
            : `+ ${textFollow}`}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <TouchableOpacity
        onPress={toDetailOnPress}
        activeOpacity={0.5}
        style={[styles.container, containerStyles]}>
        {musicianNum && (
          <Text style={styles.rankStyle}>
            {musicianNum?.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
          </Text>
        )}
        {imgUri === null || imgUri.length === 0 ? (
          <DefaultAvatar.MusicianIcon />
        ) : (
          <Avatar imgUri={imgUri[0].image} size={widthPercentage(44)} />
        )}
        <Gap width={8} />
        <View style={styles.textContainer}>
          <Text style={styles.musicianName} numberOfLines={1}>
            {musicianName}
          </Text>
          {!recommended && (
            <Text style={styles.followerCount} numberOfLines={1}>
              {countFollower + ' ' + t('General.Followers')}
            </Text>
          )}
        </View>
        <View style={styles.rightContainer}>{followMenu()}</View>
      </TouchableOpacity>
      <BottomSheetGuest
        modalVisible={modalGuestVisible}
        onPressClose={() => setModalGuestVisible(false)}
      />
    </>
  );
};

export default FollowMusicianCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: undefined,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankStyle: {
    fontFamily: font.InterMedium,
    fontSize: normalize(10),
    fontWeight: '600',
    marginRight: widthResponsive(15),
    marginTop: ms(2),
    color: color.Dark[100],
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  musicianName: {
    fontFamily: font.InterRegular,
    fontSize: mvs(14),
    fontWeight: '500',
    color: color.Neutral[10],
    paddingRight: widthResponsive(10),
  },
  followerCount: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    color: color.Dark[50],
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followButton: {
    paddingVertical: widthResponsive(7),
    width: widthResponsive(80),
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
  },
  followText: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    color: color.Neutral[10],
  },
});
