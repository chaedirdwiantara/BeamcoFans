import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';

const {width} = Dimensions.get('window');

const SPACING = 5;
const ITEM_LENGTH = width * 0.8; // Item is a square. Therefore, its height and width are of the same length.
const EMPTY_ITEM_LENGTH = (width - ITEM_LENGTH) / 2;
const BORDER_RADIUS = 20;
const CURRENT_ITEM_TRANSLATE_Y = 48;

interface ImageSliderItem {
  id?: number;
  uri?: string;
  title?: string;
  subtitle?: string;
}

interface ImageSliderProps {
  data: ImageSliderItem[];
}

const ImageSlider: FC<ImageSliderProps> = ({data}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [dataWithPlaceholders, setDataWithPlaceholders] = useState<
    ImageSliderItem[]
  >([]);
  const currentIndex = useRef<number>(0);
  const flatListRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    setDataWithPlaceholders([{id: -1}, ...data, {id: data.length}]);
    currentIndex.current = 1;
  }, [data]);

  // `data` perameter is not used. Therefore, it is annotated with the `any` type to merely satisfy the linter.
  const getItemLayout = (_data: any, index: number) => ({
    length: ITEM_LENGTH,
    offset: ITEM_LENGTH * (index - 1),
    index,
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={dataWithPlaceholders}
        renderItem={({item, index}) => {
          if (!item.uri || !item.title) {
            return <View style={{width: EMPTY_ITEM_LENGTH}} />;
          }

          const inputRange = [
            (index - 2) * ITEM_LENGTH,
            (index - 1) * ITEM_LENGTH,
            index * ITEM_LENGTH,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [ITEM_LENGTH, 0, -ITEM_LENGTH],
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.95, 1.1, 0.95],
          });

          return (
            <View style={{width: ITEM_LENGTH}}>
              <Animated.View
                style={[
                  {
                    transform: [{scale}],
                  },
                  styles.itemContent,
                ]}>
                <Image source={{uri: item.uri}} style={styles.itemImage} />
                <Animated.Text
                  style={[styles.itemText, {transform: [{translateX}]}]}>
                  {item.title}
                </Animated.Text>
                <Animated.Text
                  style={[styles.itemSubtitle, {transform: [{translateX}]}]}>
                  {item.subtitle}
                </Animated.Text>
              </Animated.View>
            </View>
          );
        }}
        getItemLayout={getItemLayout}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        bounces={false}
        decelerationRate={0}
        renderToHardwareTextureAndroid
        contentContainerStyle={styles.flatListContent}
        snapToInterval={ITEM_LENGTH}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
      />
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  container: {},
  arrowBtn: {},
  arrowBtnText: {
    fontSize: 42,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  flatListContent: {
    height: CURRENT_ITEM_TRANSLATE_Y * 2 + ITEM_LENGTH,
    alignItems: 'center',
    marginBottom: CURRENT_ITEM_TRANSLATE_Y,
  },
  item: {},
  itemContent: {
    marginHorizontal: SPACING * 3,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS + SPACING * 2,
  },
  itemText: {
    fontSize: 22,
    position: 'absolute',
    bottom: SPACING * 11,
    left: SPACING * 2,
    color: 'white',
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 16,
    position: 'absolute',
    bottom: SPACING * 2,
    left: SPACING * 2,
    color: 'white',
  },
  itemImage: {
    width: '100%',
    height: ITEM_LENGTH,
    borderRadius: BORDER_RADIUS,
    resizeMode: 'cover',
  },
});
