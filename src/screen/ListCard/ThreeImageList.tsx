import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {SquareImage} from '../../components';
import {heightPercentage, widthResponsive} from '../../utils';

interface ImageListProps {
  index: number;
  uri: string;
}

const ImageList: FC<ImageListProps> = (props: ImageListProps) => {
  const {index, uri} = props;
  return index == 0 ? (
    <SquareImage
      imgUri={uri}
      size={widthResponsive(143, 375)}
      id={index}
      containerStyle={{
        marginRight: widthResponsive(3),
        marginBottom: heightPercentage(4),
      }}
    />
  ) : index == 2 ? (
    <SquareImage
      imgUri={uri}
      size={widthResponsive(143, 375)}
      height={heightPercentage(70)}
      id={index}
      containerStyle={{
        position: 'absolute',
        bottom: 0,
        left: widthResponsive(146),
        marginRight: widthResponsive(3),
        marginBottom: heightPercentage(4),
      }}
    />
  ) : (
    <SquareImage
      imgUri={uri}
      size={widthResponsive(143, 375)}
      height={heightPercentage(70)}
      id={index}
      containerStyle={{
        marginRight: widthResponsive(3),
        marginBottom: heightPercentage(4),
      }}
    />
  );
};

export default ImageList;

const styles = StyleSheet.create({});
