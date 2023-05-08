import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {Avatar, Gap} from '../../atom';
import {
  normalize,
  toCurrency,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {color, font} from '../../../theme';
import {DefaultAvatar} from '../../../assets/icon';
import {useTranslation} from 'react-i18next';
import DropdownMore from '../V2/DropdownFilter/DropdownMore';

export interface ListProps {
  musicianNum?: number | string;
  onPressMore: (data: any) => void;
  onPressImage?: () => void;
  musicianName: string;
  imgUri: string;
  point?: string;
  containerStyles?: ViewStyle;
  dataFilter?: {label: string; value: string}[];
  followerMode?: boolean;
  followersCount?: number;
  activeMore?: boolean;
}

const MusiciansListCard: React.FC<ListProps> = (props: ListProps) => {
  const {t} = useTranslation();
  const {
    musicianNum,
    onPressMore,
    onPressImage,
    musicianName,
    imgUri,
    point,
    containerStyles,
    dataFilter,
    followersCount,
    followerMode,
    activeMore = true,
  } = props;

  // ? Dropdown Menu Example
  const dataMore = [
    {label: t('Home.Tab.TopMusician.Follow'), value: '1'},
    {label: t('Home.Tab.TopMusician.Tip'), value: '2'},
    {label: t('Home.Tab.TopMusician.Profile'), value: '3'},
  ];

  const pointV = point ? point : 0;

  const moreMenu = () => {
    return (
      <DropdownMore
        dataFilter={dataFilter ? dataFilter : dataMore}
        selectedMenu={onPressMore}
      />
    );
  };

  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={styles.rankStyle}>
        {musicianNum?.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </Text>
      <TouchableOpacity activeOpacity={1} onPress={onPressImage}>
        {imgUri ? (
          <TouchableOpacity onPress={onPressImage}>
            <Avatar imgUri={imgUri} size={widthPercentage(44)} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onPressImage}>
            <DefaultAvatar.MusicianIcon />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <Gap width={8} />
      <View style={styles.textContainer}>
        <TouchableOpacity activeOpacity={1} onPress={onPressImage}>
          <Text style={styles.musicianName} numberOfLines={1}>
            {musicianName}
          </Text>
          {followerMode && (
            <View>
              {followersCount !== 0 ? (
                <Text style={styles.followersCount} numberOfLines={1}>
                  {`${toCurrency(followersCount, {
                    withFraction: false,
                  })} ${t('General.Followers')}`}
                </Text>
              ) : (
                <Text style={styles.followersCount} numberOfLines={1}>
                  0 {t('General.Followers')}
                </Text>
              )}
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.rightContainer}>
        {point ? (
          <Text style={styles.pointStyle}>{`${pointV} pts`}</Text>
        ) : null}
        {activeMore && moreMenu()}
      </View>
    </View>
  );
};

export default MusiciansListCard;

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
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointStyle: {
    fontFamily: font.InterSemiBold,
    fontWeight: '600',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    color: '#FF87DB',
    paddingRight: widthPercentage(7),
  },
  followersCount: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    color: color.Dark[50],
  },
});
