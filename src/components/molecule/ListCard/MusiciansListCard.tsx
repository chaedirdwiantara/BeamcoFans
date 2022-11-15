import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {Avatar} from '../../atom';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';
import {color, font} from '../../../theme';
import {ThreeDotsIcon} from '../../../assets/icon';
import {Dropdown} from '../DropDown';

interface ListProps {
  musicNum: number;
  onPressThreeDots: () => void;
  musicianName: string;
  imgUri: string;
  point?: string;
  containerStyles?: ViewStyle;
}

const MusiciansListCard: React.FC<ListProps> = (props: ListProps) => {
  const {
    musicNum,
    onPressThreeDots,
    musicianName,
    imgUri,
    point,
    containerStyles,
  } = props;

  // ? Dropdown Menu Example
  const dataMore = [
    {label: 'Follow', value: '1'},
    {label: 'Send Donation', value: '2'},
    {label: 'Go To Musician', value: '3'},
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
      <Avatar imgUri={imgUri} size={44} />
      <View style={styles.textContainer}>
        <Text style={styles.songTitle}>{musicianName}</Text>
      </View>
      <View style={styles.rightContainer}>
        {point ? <Text style={styles.pointStyle}>{`${point} pts`}</Text> : null}
        <TouchableOpacity
          onPress={onPressThreeDots}
          style={[styles.dotsButton]}>
          {/* <ThreeDotsIcon fill={color.Neutral[10]} /> */}
          <Dropdown.More
            data={dataMore}
            selectedMenu={resultDataMore}
            containerStyle={{
              width: widthPercentage(123),
              marginLeft: widthPercentage(-113),
              marginTop: heightPercentage(-8),
            }}
          />
        </TouchableOpacity>
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
    fontSize: normalize(10),
    fontWeight: '600',
    lineHeight: mvs(12),
    marginRight: ms(10),
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  songTitle: {
    fontSize: normalize(15),
    fontWeight: '500',
    lineHeight: mvs(20),
    marginLeft: ms(12),
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
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
  },
  dotsButton: {
    justifyContent: 'center',
  },
});
