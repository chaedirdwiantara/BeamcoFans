import React from 'react';
import {Image, StyleSheet, Dimensions, ViewStyle, View} from 'react-native';

const {width} = Dimensions.get('screen');

interface SquareImageProps {
  imgUri: string;
  size?: number;
  id?: number;
  containerStyle?: ViewStyle;
}

const SquareImage: React.FC<SquareImageProps> = (props: SquareImageProps) => {
  const {imgUri, size = width * 0.15, id, containerStyle} = props;
  return (
    <View style={containerStyle}>
      <Image
        source={{uri: imgUri}}
        style={[styles.root, {width: size}]}
        testID={`Image ${id}`}
      />
    </View>
  );
};

export default SquareImage;

const styles = StyleSheet.create({
  root: {
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 4,
  },
});
