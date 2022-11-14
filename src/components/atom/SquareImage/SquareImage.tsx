import React from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

interface SquareImageProps {
  imgUri: string;
  size?: number;
  id?: number;
}

const SquareImage: React.FC<SquareImageProps> = (props: SquareImageProps) => {
  const {imgUri, size = width * 0.15, id} = props;
  return (
    <Image
      source={{uri: imgUri}}
      style={[styles.root, {width: size}]}
      testID={`Image ${id}`}
    />
  );
};

export default SquareImage;

const styles = StyleSheet.create({
  root: {
    height: undefined,
    aspectRatio: 1 / 1,
  },
});
