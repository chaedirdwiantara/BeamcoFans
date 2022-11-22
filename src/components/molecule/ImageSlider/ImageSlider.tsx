import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {mvs} from 'react-native-size-matters';

import {
  DataFavouritesType,
  dataRecommendedArtist,
} from '../../../data/preference';
import Color from '../../../theme/Color';
import {FooterContent} from './FooterContent';
import {DataOnboardType} from '../../../data/onboard';
import {heightPercentage, width} from '../../../utils';
import {FollowArtistCard, SelectBox} from '../../../components';
import Typography from '../../../theme/Typography';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

interface ImageSliderProps {
  type?: string;
  data: DataOnboardType[] | DataFavouritesType[];
  onPress?: () => void;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  type,
  data,
  onPress,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [selected, setSelected] = useState([]);
  const [activeIndexSlide, setActiveIndexSlide] = useState(0);

  const handleNextSlide = () => {
    const newIndex = activeIndexSlide + 1;
    setActiveIndexSlide(newIndex);
    scrollViewRef.current?.scrollTo({
      x: width * newIndex,
      y: 0,
      animated: true,
    });
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetX = event.nativeEvent.contentOffset.x;
    setActiveIndexSlide(Math.ceil(offsetX / width));
  };

  const onPressNext =
    activeIndexSlide === data.length - 1 ? onPress : handleNextSlide;

  const heightContent =
    type === 'Preference'
      ? {
          height: heightPercentage(650),
        }
      : {
          height: heightPercentage(480),
        };

  return (
    <View style={styles.root}>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        pagingEnabled={true}
        snapToInterval={width}
        decelerationRate="fast"
        scrollEventThrottle={200}
        snapToAlignment={'center'}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.containerScrollView, heightContent]}
        onScroll={handleScroll}>
        {data.map((item, index) => {
          if ('uri' in item) {
            return (
              <Image
                key={index}
                source={item.uri}
                style={styles.image}
                resizeMode={'cover'}
              />
            );
          } else if ('favorites' in item) {
            // TODO: render list of the favourites
            if (index === 3) {
              return (
                <View key={index} style={{paddingVertical: mvs(30)}}>
                  <Text style={[Typography.Heading4, styles.title]}>
                    {item.title}
                  </Text>
                  {dataRecommendedArtist.map((val, i) => (
                    <FollowArtistCard
                      key={i}
                      imgUri={val.uri}
                      artistName={val.name}
                      listener={val.listener}
                      onPress={() => null}
                      containerStyle={{paddingBottom: mvs(15)}}
                    />
                  ))}
                </View>
              );
            } else {
              return (
                <View key={index}>
                  <Text style={[Typography.Heading4, styles.title]}>
                    {item.title}
                  </Text>
                  <SelectBox
                    selected={selected}
                    setSelected={setSelected}
                    favorites={item.favorites}
                  />
                </View>
              );
            }
          }
        })}
      </ScrollView>
      <FooterContent
        type={type}
        activeIndexSlide={activeIndexSlide}
        data={data}
        onPressGoTo={onPress}
        onPressNext={onPressNext}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerScrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width,
    height: '100%',
  },
  title: {
    textAlign: 'center',
    color: Color.Neutral[10],
    marginBottom: heightPercentage(20),
  },
});
