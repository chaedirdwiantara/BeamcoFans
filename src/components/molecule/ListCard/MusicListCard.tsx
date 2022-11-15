import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {SquareImage} from '../../atom';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';
import {color, font} from '../../../theme';
import {LoveIcon, ThreeDotsIcon} from '../../../assets/icon';
import {Dropdown} from '../DropDown';

interface ListProps {
  imgUri: string;
  onPressLikeIcon: () => void;
  onPressThreeDots: () => void;
  musicNum: number;
  musicTitle: string;
  singerName: string;
  // likePressed: boolean;
  containerStyles?: ViewStyle;
}

const MusicListCard: React.FC<ListProps> = ({
  imgUri,
  // onPressLikeIcon,
  onPressThreeDots,
  musicNum,
  musicTitle,
  singerName,
  // likePressed,
  containerStyles,
}) => {
  // ? Dropdown Menu Example
  const dataMore = [
    {label: 'Add to Playlist', value: '1'},
    {label: 'Send Donation', value: '2'},
    {label: 'Add to Queue', value: '3'},
    {label: 'Share Music', value: '4'},
    {label: 'Show Credits', value: '25'},
  ];
  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu');
  };

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
        <Text style={styles.songTitle}>{musicTitle}</Text>
        <Text style={styles.songDesc}>{singerName}</Text>
      </View>
      {/* <TouchableOpacity onPress={onPressLikeIcon} style={[styles.likeButton]}>
        <LoveIcon
          fill={likePressed ? color.Pink[100] : 'none'}
          stroke={likePressed ? 'none' : color.Neutral[10]}
        />
      </TouchableOpacity> */}
      <TouchableOpacity onPress={onPressThreeDots} style={[styles.dotsButton]}>
        <Dropdown.More
          data={dataMore}
          selectedMenu={resultDataMore}
          containerStyle={{
            width: widthPercentage(120),
            marginLeft: widthPercentage(-110),
            marginTop: heightPercentage(-8),
          }}
        />
      </TouchableOpacity>
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
    color: color.Neutral[10],
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: ms(12),
  },
  songTitle: {
    fontFamily: font.InterSemiBold,
    fontWeight: '500',
    fontSize: normalize(15),
    lineHeight: mvs(20),
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
