import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ViewStyle,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import FastImage from 'react-native-fast-image';

const {width} = Dimensions.get('screen');

interface SquareImageProps extends TouchableOpacityProps {
  imgUri: string;
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
    <TouchableOpacity style={containerStyle} disabled={true} {...props}>
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
    </TouchableOpacity>
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
