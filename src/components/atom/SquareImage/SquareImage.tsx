import React from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

interface SquareImageProps {
  imgUri: string;
  size?: number;
}

const SquareImage: React.FC<SquareImageProps> = (props: SquareImageProps) => {
  const {imgUri, size = width * 0.15} = props;
  return <Image source={{uri: imgUri}} style={[styles.root, {width: size}]} />;
};

export default SquareImage;

const styles = StyleSheet.create({
  root: {
    height: undefined,
    aspectRatio: 1 / 1,
  },
});
