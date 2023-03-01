import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Image,
} from 'react-native';
import {mvs} from 'react-native-size-matters';

import {
  heightPercentage,
  heightResponsive,
  width,
  widthPercentage,
} from '../../../utils';
import Color from '../../../theme/Color';
import {FooterContent} from './FooterContent';
import {
  FollowMusicianPropsType,
  MusicianList,
} from '../../../interface/musician.interface';
import Typography from '../../../theme/Typography';
import {ListCard, SelectBox} from '../../../components';
import {UpdateProfilePropsType} from '../../../api/profile.api';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {DataOnboardType} from '../../../data/onboard';
import {useTranslation} from 'react-i18next';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

interface ImageSliderProps {
  type?: string;
  data: any;
  onPress: () => void;
  onUpdatePreference?: (props?: UpdateProfilePropsType) => void;
  setFollowMusician: (props?: FollowMusicianPropsType) => void;
  setUnfollowMusician: (props?: FollowMusicianPropsType) => void;
  dataList?: MusicianList[];
  isLoading: boolean;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  type,
  data,
  onPress,
  onUpdatePreference,
  setFollowMusician,
  setUnfollowMusician,
  dataList,
  isLoading,
}) => {
  const {t} = useTranslation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<number[]>([]);
  const [selectedExpectations, setSelectedExpectations] = useState<number[]>(
    [],
  );
  const [activeIndexSlide, setActiveIndexSlide] = useState<number>(0);
  const [listMusician, setListMusician] = useState(dataList);
  const [loadingSave, setLoadingSave] = useState(false);

  const selectedData = [selectedGenres, selectedMoods, selectedExpectations];

  const dataArray = [
    {
      title: t('Preference.Genre'),
      list: data.genre,
    },
    {
      title: t('Preference.Mood'),
      list: data.mood,
    },
    {
      title: t('Preference.Support'),
      list: data.expectation,
    },
    {
      title: t('Preference.Musician'),
      list: [],
    },
  ];

  useEffect(() => {
    if (dataList !== undefined) {
      setListMusician(dataList);
    }
  }, [dataList]);

  const followOnPress = (index: string, isFollowed: boolean) => {
    if (listMusician !== undefined) {
      const newList = listMusician.map(val => ({
        ...val,
        isFollowed: val.uuid === index ? !val.isFollowed : val.isFollowed,
      }));

      setListMusician(newList);
    }

    isFollowed
      ? setUnfollowMusician({musicianID: index})
      : setFollowMusician({musicianID: index});
  };

  const handleNextSlide = async () => {
    if (activeIndexSlide === 2 && onUpdatePreference) {
      setLoadingSave(true);
      onUpdatePreference({
        favoriteGeneres: selectedGenres,
        moods: selectedMoods,
        expectations: selectedExpectations,
      });
    }
    if (activeIndexSlide === 2) {
      setTimeout(() => {
        setLoadingSave(false);
        const newIndex = activeIndexSlide + 1;
        setActiveIndexSlide(newIndex);
        scrollViewRef.current?.scrollTo({
          x: width * newIndex,
          y: 0,
          animated: true,
        });
      }, 2000);
    } else {
      const newIndex = activeIndexSlide + 1;
      setActiveIndexSlide(newIndex);
      scrollViewRef.current?.scrollTo({
        x: width * newIndex,
        y: 0,
        animated: true,
      });
    }
  };

  const onPressBack = () => {
    const newIndex = activeIndexSlide - 1;
    setActiveIndexSlide(newIndex);
    scrollViewRef.current?.scrollTo({
      x: width * newIndex,
      y: 0,
      animated: true,
    });
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.ceil(offsetX / width);
    const totalPage = type === 'Preference' ? 4 : 3;
    page < totalPage
      ? setActiveIndexSlide(Math.ceil(offsetX / width))
      : onPress;
  };

  const onPressNext =
    type === 'Preference'
      ? activeIndexSlide === dataArray.length - 1
        ? onPress
        : handleNextSlide
      : activeIndexSlide === data.length - 1
      ? onPress
      : handleNextSlide;

  const heightContent =
    type === 'Preference'
      ? {
          height: '80%',
        }
      : {
          height: '60%',
        };

  return (
    <View style={styles.root}>
      {type === 'Preference' ? (
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
          scrollEnabled={false}>
          {dataArray.map((item, index) => {
            // TODO: render list of the favourites
            const selected =
              index === 0
                ? selectedGenres
                : index === 1
                ? selectedMoods
                : selectedExpectations;

            const setSelected =
              index === 0
                ? setSelectedGenres
                : index === 1
                ? setSelectedMoods
                : setSelectedExpectations;

            if (index === 3) {
              return (
                <View key={index} style={{paddingVertical: mvs(30)}}>
                  <Text style={[Typography.Heading4, styles.title]}>
                    {item.title}
                  </Text>
                  <View style={{height: '65%'}}>
                    <ScrollView>
                      {listMusician &&
                        listMusician?.map((musician, i) => (
                          <View
                            key={i}
                            style={{
                              width,
                              paddingHorizontal: widthPercentage(15),
                              paddingBottom:
                                i === listMusician.length - 1
                                  ? heightResponsive(20)
                                  : 0,
                            }}>
                            <ListCard.FollowMusician
                              musicianName={musician.fullname}
                              imgUri={musician.imageProfileUrls}
                              containerStyles={{marginTop: mvs(20)}}
                              followerCount={musician.followers}
                              followOnPress={() =>
                                followOnPress(
                                  musician.uuid,
                                  musician.isFollowed,
                                )
                              }
                              stateButton={musician.isFollowed}
                              toDetailOnPress={() => null}
                            />
                          </View>
                        ))}
                    </ScrollView>
                  </View>
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
                    data={item.list}
                  />
                </View>
              );
            }
          })}
        </ScrollView>
      ) : (
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
          {data.map((item: DataOnboardType, index: number) => {
            return (
              <Image
                key={index}
                source={item.uri}
                style={styles.image}
                resizeMode={'cover'}
              />
            );
          })}
        </ScrollView>
      )}

      <FooterContent
        type={type}
        activeIndexSlide={activeIndexSlide}
        data={type === 'Preference' ? dataArray : data}
        onPressBack={onPressBack}
        onPressGoTo={onPress}
        onPressNext={onPressNext}
        selectedData={selectedData}
      />
      <ModalLoading visible={isLoading || loadingSave} />
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
    height: '100%',
    // marginBottom: heightPercentage(20)
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
