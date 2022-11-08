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
import {normalize} from '../../../utils';
import {color, font} from '../../../theme';
import {ThreeDotsIcon} from '../../../assets/icon';

interface ListProps {
  musicNum: string;
  onPressThreeDots: () => void;
  musicTitle: string;
  imgUri: string;
  point?: string;
  containerStyles?: ViewStyle;
}

const MusiciansListCard: React.FC<ListProps> = (props: ListProps) => {
  const {
    musicNum,
    onPressThreeDots,
    musicTitle,
    imgUri,
    point,
    containerStyles,
  } = props;
  return (
    <View style={[styles.container, containerStyles]}>
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
