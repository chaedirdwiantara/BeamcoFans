import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {LoveIcon, ThreeDotsIcon} from '../../../assets/icon';
import {normalize} from '../../../utils';
import {ms, mvs} from 'react-native-size-matters';
import {color} from '../../../theme';
import {SquareImage} from '../../atom';

interface ListProps {
  imgUri: string;
  onPressLikeIcon: () => void;
  onPressThreeDots: () => void;
  musicNum: string;
  musicTitle: string;
  musicDesc: string;
  likePressed: boolean;
}

const MusicListCard: React.FC<ListProps> = ({
  imgUri,
  onPressLikeIcon,
  onPressThreeDots,
  musicNum,
  musicTitle,
  musicDesc,
  likePressed,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.rankStyle}>{musicNum}</Text>
      <SquareImage imgUri={imgUri} size={44} />
      <View style={styles.textContainer}>
        <Text style={styles.songTitle}>{musicTitle}</Text>
        <Text style={styles.songDesc}>{musicDesc}</Text>
      </View>
      <TouchableOpacity onPress={onPressLikeIcon} style={[styles.likeButton]}>
        <LoveIcon
          fill={likePressed ? color.Pink[100] : 'none'}
          stroke={likePressed ? 'none' : color.Neutral[10]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressThreeDots} style={[styles.dotsButton]}>
        <ThreeDotsIcon fill={color.Neutral[20]} />
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
    marginLeft: ms(12),
  },
  songTitle: {
    fontSize: normalize(15),
    fontWeight: '500',
    lineHeight: mvs(20),
    color: color.Neutral[10],
  },
  songDesc: {
    fontSize: normalize(10),
    fontWeight: '500',
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
