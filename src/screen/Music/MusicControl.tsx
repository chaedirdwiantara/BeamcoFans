import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  NextIcon,
  PauseIcon2,
  PlayIcon2,
  PreviousIcon,
  RepeatIcon,
  ShuffleIcon,
} from '../../assets/icon';
import {heightResponsive, widthResponsive} from '../../utils';
import {color} from '../../theme';

const MusicControl = () => {
  const [playeMusic, setPlayMusic] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<boolean>(false);

  const suffleOnpress = () => {
    setShuffle(!shuffle);
  };

  const repeatOnPress = () => {
    setRepeat(!repeat);
  };

  return (
    <View style={styles.bottomIconWrapper}>
      <TouchableOpacity
        onPress={suffleOnpress}
        style={[styles.touchableStyle, {alignItems: 'flex-start'}]}>
        <ShuffleIcon fill={shuffle ? color.Success[400] : undefined} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}} style={styles.touchableStyle}>
        <PreviousIcon />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setPlayMusic(!playeMusic)}
        style={[styles.touchableStyle, {width: widthResponsive(50)}]}>
        {playeMusic ? <PauseIcon2 /> : <PlayIcon2 />}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}} style={styles.touchableStyle}>
        <NextIcon />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={repeatOnPress}
        style={[styles.touchableStyle, {alignItems: 'flex-end'}]}>
        <RepeatIcon fill={repeat ? color.Success[400] : undefined} />
      </TouchableOpacity>
    </View>
  );
};

export default MusicControl;

const styles = StyleSheet.create({
  bottomIconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  touchableStyle: {
    alignItems: 'center',
    paddingVertical: heightResponsive(8),
  },
});