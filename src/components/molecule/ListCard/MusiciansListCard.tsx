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
  heightPercentage,
  normalize,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {color, font} from '../../../theme';
import {Dropdown} from '../DropDown';

interface ListProps {
  musicianNum?: number;
  onPressMore: (data: any) => void;
  musicianName: string;
  imgUri: string;
  point?: string | null;
  containerStyles?: ViewStyle;
  dataFilter?: [];
  type: 'rank' | 'recommendation';
  followerCount?: number;
  followOnPress?: (data: any) => void;
}

const MusiciansListCard: React.FC<ListProps> = (props: ListProps) => {
  const {
    musicianNum,
    onPressMore,
    musicianName,
    imgUri,
    point,
    containerStyles,
    dataFilter,
    type,
    followerCount,
    followOnPress,
  } = props;

  // ? Dropdown Menu Example
  const dataMore = [
    {label: 'Follow', value: '1'},
    {label: 'Send Donation', value: '2'},
    {label: 'Go To Musician', value: '3'},
  ];

  const moreMenu = () => {
    return (
      <Dropdown.More
        data={dataFilter ? dataFilter : dataMore}
        selectedMenu={onPressMore}
        containerStyle={{
          width: widthPercentage(123),
          marginLeft: widthPercentage(-113),
          marginTop: heightPercentage(-8),
        }}
      />
    );
  };

  const followMenu = () => {
    return (
      <TouchableOpacity style={styles.followButton} onPress={followOnPress}>
        <Text style={styles.followText}>Follow</Text>
      </TouchableOpacity>
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
      <Avatar imgUri={imgUri} size={widthResponsive(44)} />
      <Gap width={8} />
      <View style={styles.textContainer}>
        <Text style={styles.musicianName} numberOfLines={1}>
          {musicianName}
        </Text>
        {type === 'recommendation' && (
          <Text style={styles.followerCount} numberOfLines={1}>
            {followerCount} Listener
          </Text>
        )}
      </View>
      <View style={styles.rightContainer}>
        {point ? <Text style={styles.pointStyle}>{`${point} pts`}</Text> : null}
        {type === 'rank'
          ? moreMenu()
          : type === 'recommendation'
          ? followMenu()
          : null}
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
    marginRight: widthResponsive(10),
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
    fontSize: normalize(14),
    fontWeight: '500',
    color: color.Neutral[10],
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
  pointStyle: {
    fontFamily: font.InterSemiBold,
    fontWeight: '600',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    color: '#FF87DB',
    paddingRight: widthPercentage(7),
  },
  dotsButton: {
    justifyContent: 'center',
  },
  followButton: {
    paddingHorizontal: widthResponsive(8),
    paddingVertical: widthResponsive(6),
    backgroundColor: color.Pink[200],
    borderRadius: 4,
  },
  followText: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    color: color.Neutral[10],
  },
});
