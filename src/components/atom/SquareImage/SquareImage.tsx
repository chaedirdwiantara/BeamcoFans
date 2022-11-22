import React from 'react';
import {StyleSheet, Dimensions, ViewStyle, View} from 'react-native';
import FastImage from 'react-native-fast-image';

const {width} = Dimensions.get('screen');

interface SquareImageProps {
  imgUri?: string;
  size?: number;
  height?: number;
  id?: number;
  containerStyle?: ViewStyle;
}

const SquareImage: React.FC<SquareImageProps> = (props: SquareImageProps) => {
  const {
    imgUri,
    size = width * 0.15,
    height = undefined,
    id,
    containerStyle,
  } = props;
  return (
    <View style={containerStyle}>
      <FastImage
        source={{uri: imgUri}}
        style={[
          styles.root,
          {
            width: size,
            height: height,
            aspectRatio: !height ? 1 / 1 : undefined,
          },
        ]}
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
  root2: {
    height: undefined,
    aspectRatio: 1 / 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Success[400],
  },
});
