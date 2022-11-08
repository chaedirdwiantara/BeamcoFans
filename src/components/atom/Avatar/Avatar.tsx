import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {ms} from 'react-native-size-matters';

interface AvatarProps {
  imgUri: string;
  size?: number;
  username?: string;
}

export const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
  const {imgUri, size = ms(32)} = props;
  return (
    <Image
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
