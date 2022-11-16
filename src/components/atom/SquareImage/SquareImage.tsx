import React from 'react';
import {Image, StyleSheet, View, ViewStyle} from 'react-native';
import {width} from '../../../utils';
import Color from '../../../theme/Color';
import {AddIcon} from '../../../assets/icon';

interface SquareImageProps {
  imgUri?: string;
  size?: number;
  type?: string;
  id?: number;
  containerStyle?: ViewStyle;
}

const SquareImage: React.FC<SquareImageProps> = (props: SquareImageProps) => {
  const {imgUri, size = width * 0.15, type, id, containerStyle} = props;
  if (type === 'add') {
    return (
      <View style={[styles.root2, {width: size}]}>
        <AddIcon />
      </View>
    );
  } else {
    return (
      <View style={containerStyle}>
        <Image
          source={{uri: imgUri}}
          style={[styles.root, {width: size}]}
          testID={`Image ${id}`}
        />
      </View>
    );
  }
};

export default SquareImage;

const styles = StyleSheet.create({
  root: {
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 4,
  },
  root2: {
    height: undefined,
    aspectRatio: 1 / 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Success[400],
  },
});
