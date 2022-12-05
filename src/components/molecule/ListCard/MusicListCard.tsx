import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {Gap, SquareImage} from '../../atom';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';
import {color, font} from '../../../theme';
import {Dropdown} from '../DropDown';

interface ListProps {
  imgUri: string;
  onPressMore: (data: any) => void;
  musicNum: number;
  musicTitle: string;
  singerName: string;
  containerStyles?: ViewStyle;
  dataFilter?: [];
}

const MusicListCard: React.FC<ListProps> = ({
  imgUri,
  onPressMore,
  musicNum,
  musicTitle,
  singerName,
  containerStyles,
  dataFilter,
}) => {
  // ? Dropdown Menu Example
  const dataMore = [
    {label: 'Add to Playlist', value: '1'},
    {label: 'Send Donation', value: '2'},
    {label: 'Add to Queue', value: '3'},
    {label: 'Share Music', value: '4'},
    {label: 'Show Credits', value: '25'},
  ];

  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={styles.rankStyle}>
        {musicNum.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </Text>
      <SquareImage imgUri={imgUri} size={44} />
      <View style={styles.textContainer}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {musicTitle}
        </Text>
        <Gap height={2} />
        <Text style={styles.songDesc} numberOfLines={1}>
          {singerName}
        </Text>
      </View>
      <Dropdown.More
        data={dataFilter ? dataFilter : dataMore}
        selectedMenu={onPressMore}
        containerStyle={{
          width: widthPercentage(120),
          marginLeft: widthPercentage(-110),
          marginTop: heightPercentage(-8),
        }}
      />
    </View>
  );
};

export default MusicListCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: undefined,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankStyle: {
    fontFamily: font.InterMedium,
    fontWeight: '600',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    marginRight: ms(10),
    color: color.Dark[100],
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: ms(12),
  },
  songTitle: {
    fontFamily: font.InterRegular,
    fontSize: normalize(14),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  songDesc: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    color: color.Dark[100],
  },
  likeButton: {
    justifyContent: 'center',
    marginRight: ms(5),
  },
  dotsButton: {
    justifyContent: 'center',
  },
});
