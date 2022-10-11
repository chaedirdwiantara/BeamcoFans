import React from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

interface AvatarProps {
  imgUri: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
  const {imgUri, size = width * 0.15} = props;
  return <Image source={{uri: imgUri}} style={[styles.root, {width: size}]} />;
};

const styles = StyleSheet.create({
  root: {
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 200,
  },
});
