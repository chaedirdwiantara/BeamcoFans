import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Avatar} from '../../atom';
import {ThreeDotsIcon} from '../../../assets/icon';

interface ListProps {
  musicNum: string;
  onPressThreeDots: () => void;
  musicTitle: string;
  imgUri: string;
}

const MusiciansListCard: React.FC<ListProps> = (props: ListProps) => {
  const {musicNum, onPressThreeDots, musicTitle, imgUri} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.rankStyle}>{musicNum}</Text>
      <Avatar imgUri={imgUri} size={44} />
      <View style={styles.textContainer}>
        <Text style={styles.songTitle}>{musicTitle}</Text>
      </View>
      <TouchableOpacity onPress={onPressThreeDots} style={[styles.dotsButton]}>
        <ThreeDotsIcon fill="black" />
      </TouchableOpacity>
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
  },
  rankStyle: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 12,
    marginRight: 10,
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
    marginLeft: 12,
  },
  dotsButton: {
    justifyContent: 'center',
  },
});
