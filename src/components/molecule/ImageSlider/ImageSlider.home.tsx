import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';
import {normalize} from '../../../utils';

const {width} = Dimensions.get('window');

const ITEM_LENGTH = width * 0.8;
const EMPTY_ITEM_LENGTH = (width - ITEM_LENGTH) / 2;

interface ImageSliderItem {
  id?: number;
  uri?: string;
  title?: string;
  subtitle?: string;
}

interface ImageSliderProps {
  data: ImageSliderItem[];
}

export const ImageSlider: FC<ImageSliderProps> = ({data}) => {
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

const styles = StyleSheet.create({
  container: {},
  flatListContent: {
    marginTop: mvs(30),
  },
  itemContent: {
    marginHorizontal: ms(15),
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  itemText: {
    fontSize: normalize(15),
    position: 'absolute',
    bottom: mvs(45),
    left: ms(10),
    color: Color.Neutral[10],
    fontFamily: Font.InterBold,
  },
  itemSubtitle: {
    fontSize: normalize(12),
    position: 'absolute',
    bottom: ms(14),
    left: ms(10),
    color: Color.Neutral[10],
    fontFamily: Font.InterRegular,
  },
  itemImage: {
    width: '100%',
    height: mvs(159),
    resizeMode: 'cover',
    borderRadius: 20,
  },
});
