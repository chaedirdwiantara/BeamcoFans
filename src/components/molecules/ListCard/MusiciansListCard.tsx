import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Avatar} from '../../atom';
import {ThreeDotsIcon} from '../../../assets/icon';
import {color, font} from '../../../theme';
import {normalize} from '../../../utils';
import {ms, mvs} from 'react-native-size-matters';

interface ListProps {
  musicNum: string;
  onPressThreeDots: () => void;
  musicTitle: string;
  imgUri: string;
  point?: string;
}

const MusiciansListCard: React.FC<ListProps> = (props: ListProps) => {
  const {musicNum, onPressThreeDots, musicTitle, imgUri, point} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.rankStyle}>{musicNum}</Text>
      <Avatar imgUri={imgUri} size={44} />
      <View style={styles.textContainer}>
        <Text style={styles.songTitle}>{musicTitle}</Text>
      </View>
      <View style={styles.rightContainer}>
        {point ? <Text style={styles.pointStyle}>{`${point} pts`}</Text> : null}
        <TouchableOpacity
          onPress={onPressThreeDots}
          style={[styles.dotsButton]}>
          <ThreeDotsIcon fill={color.Neutral[10]} />
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
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointStyle: {
    fontFamily: font.MontserratSemiBold,
    fontWeight: '600',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    color: '#FF87DB',
  },
  dotsButton: {
    justifyContent: 'center',
  },
});
