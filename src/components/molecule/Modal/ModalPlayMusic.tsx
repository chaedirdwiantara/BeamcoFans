import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {
  elipsisText,
  heightPercentage,
  width,
  widthPercentage,
} from '../../../utils';
import {ListCard} from '../ListCard';
import {PauseIcon, PlayIcon} from '../../../assets/icon';
import {color} from '../../../theme';

interface ModalPlayMusicProps {
  imgUri: string;
  musicTitle: string;
  singerName: string;
  onPressModal: () => void;
}

export const ModalPlayMusic: React.FC<ModalPlayMusicProps> = ({
  imgUri,
  musicTitle,
  singerName,
  onPressModal,
}) => {
  const [played, setPlayed] = useState(true);

  const RightIcon = () => {
    return (
      <>
        {played ? (
          <TouchableOpacity onPress={() => setPlayed(false)}>
            <PauseIcon />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setPlayed(true)}>
            <PlayIcon />
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <>
      <View style={styles.root}>
        <ListCard.MusicList
          rightIcon={true}
          rightIconComponent={<RightIcon />}
          onPressIcon={() => null}
          imgUri={imgUri}
          musicTitle={elipsisText(musicTitle, 22)}
          singerName={singerName}
          onPressCard={onPressModal}
        />
      </View>
      <View style={styles.containerLine}>
        <View style={[styles.greenLine, {width: '30%'}]} />
        <View style={[styles.grayLine, {width: '70%'}]} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    width,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    backgroundColor: '#3D1034',
    paddingHorizontal: widthPercentage(15),
    paddingVertical: heightPercentage(10),
  },
  containerLine: {
    width: '100%',
    height: heightPercentage(2),
    flexDirection: 'row',
  },
  greenLine: {
    height: heightPercentage(2),
    backgroundColor: color.Success[400],
  },
  grayLine: {
    height: heightPercentage(2),
    backgroundColor: color.Dark[400],
  },
});
