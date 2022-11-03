import React, {FC, useRef, useCallback} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
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
  const flatListRef = useRef<FlatList<any>>(null);

  const handleOnViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: any}) => {
      const itemsInView = viewableItems.filter(
        ({item}: {item: ImageSliderItem}) => item.uri && item.title,
      );

      if (itemsInView.length === 0) {
        return;
      }

      currentIndex.current = itemsInView[0].index;
    },
    [],
  );

  const handleOnNext = () => {
    if (currentIndex.current === data.length - 1) {
      return onPress;
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
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        renderItem={({item, index}) => {
          return (
            <View style={{width, height}} key={index}>
              <Image source={item.uri} style={styles.itemImage} />
              <DescriptionBoarding
                title={item.title}
                subtitle={item.subtitle}
              />
              <View style={styles.containerIndicator}>
                {data.map((val, i) => (
                  <Indicator key={i} activeIndex={index === i} />
                ))}
              </View>
            </View>
          );
        }}
      />
      <View style={styles.footer}>
        <Button label="Next" onPress={handleOnNext} />
        <Button
          type="border"
          label="Skip"
          borderColor="transparent"
          textStyles={{color: Color.Pink.linear}}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemImage: {
    width: ms(375),
    height: mvs(360),
    resizeMode: 'cover',
  },
  footer: {
    marginBottom: mvs(20),
    alignSelf: 'center',
  },
  containerIndicator: {
    width: ms(52),
    marginTop: mvs(20),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
});
