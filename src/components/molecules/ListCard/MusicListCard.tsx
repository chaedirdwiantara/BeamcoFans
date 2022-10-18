import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {LoveIcon, ThreeDotsIcon} from '../../../assets/icon';

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
      <View style={styles.imageContainer}>
        <Image source={{uri: imgUri}} style={{flex: 1}} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.songTitle}>{musicTitle}</Text>
        <Text style={styles.songDesc}>{musicDesc}</Text>
      </View>
      <TouchableOpacity onPress={onPressLikeIcon} style={[styles.likeButton]}>
        <LoveIcon
          fill={likePressed ? 'pink' : 'none'}
          stroke={likePressed ? 'none' : 'black'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressThreeDots} style={[styles.dotsButton]}>
        <ThreeDotsIcon fill="black" />
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
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 12,
    marginRight: 10,
  },
  imageContainer: {
    height: 40,
    width: 40,
    marginRight: 12,
    backgroundColor: 'black',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  songTitle: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
  },
  songDesc: {
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 12,
  },
  likeButton: {
    justifyContent: 'center',
    marginRight: 5,
  },
  dotsButton: {
    justifyContent: 'center',
  },
});
