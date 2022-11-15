import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {width} from '../../../utils';
import Color from '../../../theme/Color';
import {AddIcon} from '../../../assets/icon';

interface SquareImageProps {
  imgUri?: string;
  size?: number;
  type?: string;
}

const SquareImage: React.FC<SquareImageProps> = (props: SquareImageProps) => {
  const {imgUri, size = width * 0.15, type} = props;
  if (type === 'add') {
    return (
      <View style={[styles.root2, {width: size}]}>
        <AddIcon />
      </View>
    );
  } else {
    return (
      <Image source={{uri: imgUri}} style={[styles.root, {width: size}]} />
    );
  }
};

export default SquareImage;

const styles = StyleSheet.create({
  root: {
    height: undefined,
    aspectRatio: 1 / 1,
  },
  root2: {
    height: undefined,
    aspectRatio: 1 / 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Success[400],
  },
});
