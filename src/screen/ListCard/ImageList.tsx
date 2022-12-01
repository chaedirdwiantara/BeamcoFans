import {FlatList, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {Gap, SquareImage} from '../../components';
import {heightPercentage, widthPercentage, widthResponsive} from '../../utils';
import {object} from 'yup';

interface ImageListProps {
  disabled?: boolean;
  onPress: (uri: string) => void;
  width: number;
  height: number;
  heightType2?: number;
  widthType2?: number;
  imgData: any;
}

const ImageList: FC<ImageListProps> = (props: ImageListProps) => {
  const {
    disabled = true,
    onPress,
    imgData,
    width = 162,
    height = 79,
    heightType2 = 161,
    widthType2 = 327,
  } = props;

  return (
    <View style={styles.container}>
      {imgData.length === 1 && (
        <>
          <SquareImage
            imgUri={imgData && imgData[0].postUri}
            size={widthResponsive(widthType2)}
            height={heightPercentage(heightType2)}
            containerStyle={{
              marginRight: widthResponsive(3),
            }}
            disabled={disabled}
            onPress={() => onPress(imgData[0].postUri)}
          />
        </>
      )}
      {imgData.length === 2 && (
        <>
          <SquareImage
            imgUri={imgData && imgData[0].postUri}
            size={widthResponsive(width, 375)}
            height={heightPercentage(heightType2)}
            containerStyle={{
              marginRight: widthResponsive(3),
            }}
            disabled={disabled}
            onPress={() => onPress(imgData[0].postUri)}
          />
          <SquareImage
            imgUri={imgData && imgData[1].postUri}
            size={widthResponsive(width, 375)}
            height={heightPercentage(heightType2)}
            containerStyle={{
              marginRight: widthResponsive(3),
            }}
            disabled={disabled}
            onPress={() => onPress(imgData[1].postUri)}
          />
        </>
      )}
      {imgData.length === 3 && (
        <>
          <SquareImage
            imgUri={imgData && imgData[0].postUri}
            size={widthResponsive(width, 375)}
            height={heightPercentage(heightType2)}
            containerStyle={{
              marginRight: widthResponsive(3),
            }}
            disabled={disabled}
            onPress={() => onPress(imgData[0].postUri)}
          />
          <View>
            <SquareImage
              imgUri={imgData && imgData[1].postUri}
              size={widthResponsive(width, 375)}
              height={heightPercentage(height)}
              disabled={disabled}
              onPress={() => onPress(imgData[1].postUri)}
            />
            <Gap height={3} />
            <SquareImage
              imgUri={imgData && imgData[2].postUri}
              size={widthResponsive(width, 375)}
              height={heightPercentage(height)}
              disabled={disabled}
              onPress={() => onPress(imgData[2].postUri)}
            />
          </View>
        </>
      )}
      {imgData.length === 4 && (
        <FlatList
          scrollEnabled={false}
          columnWrapperStyle={{justifyContent: 'flex-start'}}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          data={imgData}
          renderItem={({item}) => (
            <SquareImage
              imgUri={item.postUri}
              size={widthResponsive(width)}
              height={heightPercentage(height)}
              id={item.id}
              containerStyle={{
                marginRight: widthResponsive(3),
                marginBottom: widthResponsive(3),
              }}
            />
          )}
        />
      )}
    </View>
  );
};

export default ImageList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
  },
});
