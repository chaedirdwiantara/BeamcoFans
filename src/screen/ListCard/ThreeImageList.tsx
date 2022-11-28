import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {SquareImage} from '../../components';
import {heightPercentage, widthResponsive} from '../../utils';

interface ImageListProps {
  index: number;
  uri: string;
  width?: number;
  height?: number;
  disabled?: boolean;
  onPress?: (event: UIEvent) => void;
}

const ImageList: FC<ImageListProps> = (props: ImageListProps) => {
  const {
    index,
    uri,
    width = 143,
    height = 70,
    disabled = true,
    onPress,
  } = props;
  return index == 0 ? (
    <SquareImage
      imgUri={uri}
      size={widthResponsive(width, 375)}
      id={index}
      containerStyle={{
        marginRight: widthResponsive(3),
        marginBottom: heightPercentage(4),
      }}
      disabled={disabled}
      onPress={onPress}
    />
  ) : index == 2 ? (
    <SquareImage
      imgUri={uri}
      size={widthResponsive(width, 375)}
      height={heightPercentage(height)}
      id={index}
      containerStyle={{
        position: 'absolute',
        bottom: 0,
        right: widthResponsive(-3),
        marginRight: widthResponsive(3),
        marginBottom: heightPercentage(4),
      }}
      disabled={disabled}
      onPress={onPress}
    />
  ) : (
    <SquareImage
      imgUri={uri}
      size={widthResponsive(width, 375)}
      height={heightPercentage(height)}
      id={index}
      containerStyle={{
        marginRight: widthResponsive(3),
        marginBottom: heightPercentage(4),
      }}
      disabled={disabled}
      onPress={onPress}
    />
  );
};

export default ImageList;

const styles = StyleSheet.create({});
