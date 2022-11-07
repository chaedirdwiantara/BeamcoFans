import React, {useCallback, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ViewStyle,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';

import {SelectBox} from './SelectBox';
import Color from '../../../theme/Color';
import {Button, Indicator} from '../../atom';
import Typography from '../../../theme/Typography';
import {dataPreferences, recommendedArtist} from './Favorites';
import {FollowArtistCard} from '../FollowArtistCard/FollowArtistCard';

interface PreferenceContentProps {
  containerStyle?: ViewStyle;
  onPress: () => void;
}

const {width} = Dimensions.get('window');
const data = dataPreferences;

export const PreferenceContent: React.FC<PreferenceContentProps> = ({
  containerStyle,
  onPress,
}) => {
  const currentIndex = useRef<number>(0);
  const flatListRef = useRef<FlatList<any>>(null);
  const [selected, setSelected] = useState('');

  const handleOnViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: any}) => {
      const itemsInView = viewableItems.filter(
        ({item}: {item: any}) => item.title,
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
    <View style={[styles.root, containerStyle]}>
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
            <View style={styles.contentContainer} key={index}>
              <Text style={[Typography.Heading4, styles.title]}>
                {item.title}
              </Text>
              {index === 3 ? (
                <View style={{paddingVertical: mvs(30)}}>
                  {recommendedArtist.map(val => (
                    <FollowArtistCard
                      imgUri={val.uri}
                      artistName={val.name}
                      listener={val.listener}
                      onPress={() => null}
                      containerStyle={{paddingBottom: mvs(15)}}
                    />
                  ))}
                </View>
              ) : (
                <SelectBox
                  selected={selected}
                  setSelected={setSelected}
                  favorites={item.favorites}
                  containerStyle={{paddingVertical: mvs(30)}}
                />
              )}
              <View style={styles.containerIndicator}>
                {data.map((val, i) => (
                  <Indicator
                    key={i}
                    activeIndex={index === i}
                    type={'preference'}
                  />
                ))}
              </View>
            </View>
          );
        }}
      />
      <View style={styles.footer}>
        <Button
          type="border"
          label="Skip"
          containerStyles={styles.btnContainer}
          textStyles={{color: Color.Pink.linear}}
          onPress={onPress}
        />
        <Button
          label="Next"
          disabled={selected === ''}
          containerStyles={[
            styles.btnContainer,
            selected === '' && {backgroundColor: Color.Dark[50]},
          ]}
          onPress={handleOnNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  contentContainer: {
    width,
    height: mvs(600),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Color.Neutral[10],
  },
  footer: {
    width: ms(327),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: mvs(50),
  },
  btnContainer: {
    width: ms(155),
  },
  nonActive: {
    backgroundColor: Color.Dark[400],
  },
  containerIndicator: {
    width: ms(62),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
});
