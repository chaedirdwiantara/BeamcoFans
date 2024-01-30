import {
  View,
  Text,
  Platform,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import {Shadow} from 'react-native-shadow-2';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {
  width,
  widthPercentage,
  widthResponsive,
  heightPercentage,
} from '../../utils';
import {
  CoinDIcon,
  SpotifyIcon,
  YoutubeIcon,
  BrowserIcon,
  Instagram2Icon,
  EditCircleIcon,
  AddCircle2Icon,
  BrowserDisabledIcon,
  Instagram2DisabledIcon,
  CheckCircle3Icon,
} from '../../assets/icon';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import {AvatarProfileNew, BadgeLevel, ButtonGradient} from '../../components';
import initialname from '../../utils/initialname';
import {SocialMedia} from '../../interface/profile.interface';
import {color, font} from '../../theme';
import {DataBadgeType} from '../../interface/badge.interface';

export interface ProfileHeaderProps {
  avatarUri?: string;
  fullname?: string;
  username?: string;
  bio?: string;
  totalFollowers?: number;
  totalFans?: number;
  type?: string;
  spotifyUrl: string | null;
  websiteUrl: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  refreshing?: boolean;
  dataBadge?: DataBadgeType;
  isFollowed?: boolean;
  containerStyles?: ViewStyle;
  followOnPress?: () => void;
  unfollowOnPress?: () => void;
  donateOnPress?: () => void;
  onPress?: () => void;
  onPressImage?: (uri: string) => void;
}

export const ProfileHeaderNew: React.FC<ProfileHeaderProps> = (
  props: ProfileHeaderProps,
) => {
  const {
    avatarUri = '',
    fullname = '',
    username,
    bio,
    totalFollowers,
    totalFans,
    type = '',
    spotifyUrl,
    websiteUrl,
    instagramUrl,
    youtubeUrl,
    containerStyles,
    refreshing,
    dataBadge,
    isFollowed,
    followOnPress,
    unfollowOnPress,
    donateOnPress,
    onPress,
    onPressImage,
  } = props;
  const {t} = useTranslation();
  const showLoading = Platform.OS === 'ios' && refreshing;
  const avatarPress = avatarUri === '' || avatarUri === null;

  const followOnPressed = () => {
    followOnPress?.();
  };

  const donate = () => {
    donateOnPress?.();
  };

  const avatarIcon =
    type === 'profile' ? (
      <EditCircleIcon />
    ) : isFollowed ? (
      <CheckCircle3Icon />
    ) : (
      <AddCircle2Icon />
    );

  const onPressIcon =
    type === 'profile'
      ? onPress
      : isFollowed
      ? unfollowOnPress
      : followOnPressed;

  const ListSocMed = ({item}: {item: string}) => {
    const disabled =
      item === 'spotify'
        ? spotifyUrl === '' || spotifyUrl === null
        : item === 'browser'
        ? websiteUrl === '' || websiteUrl === null
        : item === 'instagram'
        ? instagramUrl === '' || instagramUrl === null
        : item === 'youtube'
        ? youtubeUrl === '' || youtubeUrl === null
        : '';

    const newUrl =
      item === 'spotify'
        ? spotifyUrl
        : item === 'browser'
        ? websiteUrl
        : item === 'instagram'
        ? instagramUrl
        : item === 'youtube'
        ? youtubeUrl
        : '';

    const icon =
      item === 'spotify' ? (
        <SpotifyIcon stroke={disabled ? '#A0A0A0' : '#1ED760'} />
      ) : item === 'youtube' ? (
        <YoutubeIcon stroke={disabled ? '#A0A0A0' : '#FF0302'} />
      ) : item === 'browser' ? (
        disabled ? (
          <BrowserDisabledIcon />
        ) : (
          <BrowserIcon />
        )
      ) : item === 'instagram' ? (
        disabled ? (
          <Instagram2DisabledIcon />
        ) : (
          <Instagram2Icon />
        )
      ) : null;

    const goToUrl = () => {
      return Linking.openURL(newUrl || '');
    };
    return (
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0}
        style={{
          marginLeft: widthPercentage(20),
        }}
        disabled={disabled || false}
        onPress={goToUrl}>
        {icon}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.root, containerStyles]}>
      {showLoading && (
        <View style={{alignSelf: 'center'}}>
          <LoadingSpinner type={'profile'} />
        </View>
      )}
      <View
        style={[styles.containerRow, {paddingHorizontal: widthResponsive(25)}]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            avatarPress ? null : onPressImage && onPressImage(avatarUri)
          }>
          <AvatarProfileNew
            initialName={initialname(fullname)}
            imgUri={avatarUri}
            icon={avatarIcon}
            onPress={onPressIcon}
            showBorder={true}
            borderColor={'#563354'}
          />
        </TouchableOpacity>

        <View style={styles.containerName}>
          {/* // BADGE */}
          <BadgeLevel
            imageUri={dataBadge?.image[0]?.image || ''}
            backgroundColor={dataBadge?.colour || ''}
            text={dataBadge?.title || ''}
            size="small"
          />
          <Text style={styles.fullname}>{fullname}</Text>
          <Text style={styles.username}>{'@' + username}</Text>
        </View>
      </View>

      <Text style={styles.description}>{bio?.replace(/\n/g, ' ')}</Text>
      <View style={styles.containerFooter}>
        <View style={styles.containerRow}>
          <View style={{marginRight: widthPercentage(10)}}>
            <Text style={styles.totalNumber}>{totalFollowers || 0}</Text>
            <Text style={styles.title}>{t('General.Followers')}</Text>
          </View>
          <View style={{marginHorizontal: widthPercentage(25)}}>
            <Text style={styles.totalNumber}>{totalFans || 0}</Text>
            <Text style={styles.title}>{t('Musician.Tab.Fans')}</Text>
          </View>
        </View>
        <View style={styles.containerRow}>
          {SocialMedia.map((item, i) => {
            return <ListSocMed key={i} item={item} />;
          })}
        </View>
      </View>
      {type !== 'profile' && (
        <Shadow
          distance={mvs(10)}
          startColor={'#FF00C880'}
          containerStyle={{alignSelf: 'center', marginBottom: mvs(15)}}
          style={{borderRadius: 8}}
          offset={[0, 2]}>
          <ButtonGradient
            label={t('General.Beam') || ''}
            icon={<CoinDIcon style={{marginHorizontal: widthPercentage(5)}} />}
            colors={['#582498', '#C007A1']}
            onPress={donate}
            textStyles={styles.textButton}
            gradientStyles={styles.btnContainer}
            containerStyles={{alignSelf: 'center'}}
            angle={5}
          />
        </Shadow>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width,
    backgroundColor: color.Dark[800],
  },
  fullname: {
    color: color.Neutral[10],
    fontSize: mvs(17),
    fontWeight: '600',
    marginBottom: mvs(2),
    marginTop: mvs(5),
  },
  username: {
    fontSize: mvs(11),
    fontFamily: font.InterRegular,
    color: 'rgba(255,255,255,0.5)',
  },
  description: {
    width: width * 0.85,
    fontSize: mvs(12),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    marginVertical: mvs(20),
    alignSelf: 'center',
  },
  containerFooter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mvs(20),
    paddingHorizontal: widthResponsive(28),
  },
  totalNumber: {
    fontSize: mvs(14),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '600',
  },
  title: {
    fontSize: mvs(11),
    color: color.Dark[50],
    fontFamily: font.InterRegular,
    marginTop: mvs(3),
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerName: {
    width: width * 0.7,
    alignItems: 'flex-start',
    paddingLeft: widthPercentage(30),
  },
  textButton: {
    textAlign: 'center',
    fontSize: mvs(16),
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
    fontWeight: '600',
  },
  btnContainer: {
    width: widthPercentage(160),
    aspectRatio: heightPercentage(160 / 42),
    borderRadius: mvs(8),
  },
});
