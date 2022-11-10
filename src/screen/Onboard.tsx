import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../App';
import {useBaseHook} from '../hooks/use-base.hook';

import Color from '../theme/Color';
import {dataOnboard} from '../data/onboard';

const {width} = Dimensions.get('screen');
type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

export const OnboardScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {setError} = useBaseHook();
  const [activeIndexSlide, setActiveIndexSlide] = useState(0);

  const handeOnpressText = () => {
    navigation.push('SignInGuest');
    // example on calling action hook context
    setError({
      title: 'ini title',
      message: 'ini message',
    });
  };

  const Indicator = ({
    activeIndex,
    totalIndex,
    activeColor,
    inActiveColor,
  }: {
    activeIndex: number;
    totalIndex: number;
    activeColor?: string;
    inActiveColor?: string;
  }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '5%',
        }}>
        {Array.from(Array(totalIndex).keys()).map(item => {
          return (
            <View
              style={{
                width: item === activeIndex ? '8.5%' : '1.6%',
                height: undefined,
                aspectRatio: item === activeIndex ? 32 / 6 : 1 / 1,
                borderRadius: 10,
                backgroundColor:
                  item === activeIndex ? activeColor : inActiveColor,
                marginRight: 4,
              }}
            />
          );
        })}
      </View>
    );
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetX = event.nativeEvent.contentOffset.x;
    if (offsetX < width) {
      setActiveIndexSlide(0);
    } else {
      setActiveIndexSlide(Math.ceil(offsetX / width));
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView
        pagingEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          height: 500,
        }}
        scrollEventThrottle={200}
        decelerationRate="fast"
        snapToInterval={width}
        snapToAlignment={'center'}
        onScroll={handleScroll}>
        {dataOnboard.map(item => {
          if ('uri' in item) {
            return (
              <Image
                source={item.uri}
                style={{
                  width: width,
                  height: '100%',
                }}
                resizeMode={'cover'}
              />
            );
          } else if ('favorites' in item) {
            // TODO: render list of the favourites
          }
        })}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          justifyContent: 'center',
          alignItems: 'center',
          width: width,
          height: 400,
        }}>
        {dataOnboard.map((item, index) => {
          if (index === activeIndexSlide) {
            return (
              <View>
                <Text style={{color: 'white'}}>{item.title}</Text>
                <Text>{item.subtitle}</Text>
              </View>
            );
          }
        })}
        <Indicator
          activeIndex={activeIndexSlide}
          totalIndex={dataOnboard.length}
          activeColor={Color.Success[400]}
          inActiveColor={Color.Success[700]}
        />
      </View>
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
});
