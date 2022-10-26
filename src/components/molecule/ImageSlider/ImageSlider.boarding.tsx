import React, {FC, useRef, useEffect} from 'react';
import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import Color from '../../../theme/Color';
import {Indicator} from '../../atom';
import {Button} from '../../atom/Button/Button';
import DescriptionBoarding from '../../atom/DescriptionBoarding/DescriptionBoarding';

const {width, height} = Dimensions.get('window');

export interface ImageSliderItem {
  id?: number;
  uri?: any;
  title?: string;
  subtitle?: string;
}

interface ImageSliderProps {
  data: ImageSliderItem[];
  onPress: () => void;
}

export const ImageSlider: FC<ImageSliderProps> = ({data, onPress}) => {
  const currentIndex = useRef<number>(0);

  useEffect(() => {
    currentIndex.current = 1;
  }, [data]);

  const flatListRef = useRef<FlatList<any>>(null);

  const handleOnNext = () => {
    if (currentIndex.current === data.length) {
      return;
    }

    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex.current + 1,
      });
    }
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View style={{width, height}}>
              <Image source={item.uri} style={styles.itemImage} />
              <DescriptionBoarding
                title={item.title}
                subtitle={item.subtitle}
              />
              <View style={styles.containerIndicator}>
                {data.map((val, i) => (
                  <Indicator activeIndex={index === i} />
                ))}
              </View>
            </View>
          );
        }}
      />
      <View style={styles.footer}>
        <Button label="Next" fontSize={14} onPress={handleOnNext} />
        <Button
          type="border"
          label="Skip"
          fontSize={14}
          borderColor="transparent"
          labelColor={Color.Pink1}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemImage: {
    width: width,
    height: height * 0.55,
    resizeMode: 'cover',
  },
  footer: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  containerIndicator: {
    width: width * 0.2,
    marginTop: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
});
