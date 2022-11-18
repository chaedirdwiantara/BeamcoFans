import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ms} from 'react-native-size-matters';

interface AvatarProps {
  imgUri: string;
  size?: number;
  username?: string;
}

export const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
  const {imgUri, size = ms(32)} = props;
  return (
    <FastImage
      source={{uri: imgUri}}
      style={[styles.root, {width: size}]}
      testID={'ssu-avatar'}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 200,
  },
});
