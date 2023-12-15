import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {
  GetStepResponseType,
  LastStepResponseType,
} from '../../../interface/profile.interface';
import {FooterContent} from './FooterContent';
import {
  MusicianList,
  FollowMusicianPropsType,
} from '../../../interface/musician.interface';
import {DataOnboardType} from '../../../data/onboard';
import {color, font, typography} from '../../../theme';
import {storage} from '../../../hooks/use-storage.hook';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {useProfileHook} from '../../../hooks/use-profile.hook';
import {UpdateProfilePropsType} from '../../../api/profile.api';
import {heightResponsive, width, widthPercentage} from '../../../utils';
import {ListCard, ReferralContent, SelectBox} from '../../../components';

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
  setLastStepWizard?: (props: LastStepResponseType) => void;
  infoStep?: GetStepResponseType;
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
  setLastStepWizard,
  infoStep,
  isLoading,
}) => {
  const {t} = useTranslation();
  const {
    isValidReferral,
    errorMsg,
    applyReferralUser,
    dataProfile,
    getProfileUser,
  } = useProfileHook();
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<number[]>([]);
  const [selectedExpectations, setSelectedExpectations] = useState<number[]>(
    [],
  );
  const [activeIndexSlide, setActiveIndexSlide] = useState<number>(0);
  const [listMusician, setListMusician] = useState(dataList);
  const isLogin = storage.getBoolean('isLogin');

  const selectedData = [selectedGenres, selectedMoods, selectedExpectations];

  // Refferal Content
  const [isScanFailed, setIsScanFailed] = useState<boolean>(false);
  const [refCode, setRefCode] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isScanSuccess, setIsScanSuccess] = useState<boolean>(false);
  const [isManualEnter, setIsManualEnter] = useState<boolean>(false);
  const [isScanned, setIsScanned] = useState(false);

  const onApplyReferral = (referralCode: string) => {
    applyReferralUser(referralCode);
  };

  const handleSkipFailed = () => {
    setIsScanFailed(false);
    setIsScanning(true);
    setIsScanned(false);
    setRefCode('');
  };

  useEffect(() => {
    if (dataProfile !== undefined && dataProfile.data.referralFrom !== null) {
      setIsScanSuccess(true);
      setIsScanning(false);
      setRefCode(dataProfile.data.referralFrom);
    } else setIsScanSuccess(false);
  }, [dataProfile]);

  useEffect(() => {
    isLogin && getProfileUser();
  }, []);

  const dataArray = [
    {
      step: t('Preference.Step.Step1'),
      title: t('Preference.Title.Title1'),
      subtitle: t('Preference.Subtitle.Subtitle1'),
      list: data.genre,
    },
    {
      step: t('Preference.Step.Step2'),
      title: t('Preference.Title.Title2'),
      subtitle: t('Preference.Subtitle.Subtitle2'),
      list: data.mood,
    },
    {
      step: t('Preference.Step.Step3'),
      title: t('Preference.Title.Title3'),
      subtitle: t('Preference.Subtitle.Subtitle3'),
      list: data.expectation,
    },
    {
      step: t('Preference.Step.Step4'),
      title: t('Preference.Title.Title4'),
      subtitle: t('Preference.Subtitle.Subtitle4'),
      list: [],
    },
    {
      step: t('Preference.Step.Step5'),
      title: t('Preference.Title.Title5'),
      subtitle: t('Preference.Subtitle.Subtitle5'),
      list: [],
    },
  ];

  useEffect(() => {
    if (dataList !== undefined) {
      setListMusician(dataList);
    }
  }, [dataList]);

  useEffect(() => {
    if (infoStep) {
      const newIndex = infoStep.lastStep;
      setActiveIndexSlide(newIndex);
      scrollViewRef.current?.scrollTo({
        x: width * newIndex,
        y: 0,
        animated: true,
      });
    }
  }, [infoStep]);

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
    if (activeIndexSlide < 3 && onUpdatePreference) {
      onUpdatePreference({
        favoriteGeneres: selectedGenres,
        moods: selectedMoods,
        expectations: selectedExpectations,
      });
    }
    const newIndex = activeIndexSlide + 1;
    setActiveIndexSlide(newIndex);
    setLastStepWizard && setLastStepWizard({lastStep: newIndex});
    scrollViewRef.current?.scrollTo({
      x: width * newIndex,
      y: 0,
      animated: true,
    });
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

  const lastOnPress = () => {
    onPress();
    if (setLastStepWizard) {
      setLastStepWizard({lastStep: dataArray.length});
    }
  };

  const onPressNext =
    type === 'Preference'
      ? activeIndexSlide === dataArray.length - 1
        ? lastOnPress
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
          height: Platform.OS === 'ios' ? '60%' : '65%',
        };

  return (
    <View style={styles.root}>
      {type === 'Preference' ? (
        <>
          {isScanFailed && !isScanSuccess ? (
            <View style={styles.backgroundFailed}>
              <View style={styles.containerFailed}>
                <Text style={[typography.Heading6, styles.titleStart]}>
                  {t('Setting.ReferralQR.ScanFailed.Title')}
                </Text>
                <Text style={[typography.Body1, styles.titleStart]}>
                  {t('Setting.ReferralQR.ScanFailed.Desc')}
                </Text>
                <TouchableOpacity onPress={handleSkipFailed}>
                  <Text style={[typography.Body2, styles.titleEnd]}>
                    {t('Setting.ReferralQR.ScanFailed.Btn')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            ''
          )}
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
                    <TouchableOpacity
                      style={styles.containerSkip}
                      onPress={onPress}>
                      <Text style={styles.textSkip}>{t('Btn.Skip')}</Text>
                    </TouchableOpacity>
                    <View style={[styles.containerStep, {paddingTop: 0}]}>
                      <Text style={styles.textStep}>{item.step}</Text>
                      <Text style={[typography.Heading4, styles.title]}>
                        {item.title}
                      </Text>
                      <Text style={styles.textSubtitle}>{item.subtitle}</Text>
                    </View>
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
              } else if (index === 4 && dataProfile) {
                return (
                  <View key={index} style={{paddingVertical: mvs(30)}}>
                    <TouchableOpacity
                      style={styles.containerSkip}
                      onPress={onPress}>
                      <Text style={styles.textSkip}>{t('Btn.Skip')}</Text>
                    </TouchableOpacity>
                    <View style={[styles.containerStep, {paddingTop: 0}]}>
                      <Text style={styles.textStep}>{item.step}</Text>
                      <Text style={[typography.Heading4, styles.title]}>
                        {isScanSuccess
                          ? t('Setting.ReferralQR.OnBoard.SuccessTitle')
                          : item.title}
                      </Text>
                      <Text style={styles.textSubtitle}>
                        {isScanSuccess
                          ? t('Setting.ReferralQR.OnBoard.SuccessDesc')
                          : item.subtitle}
                      </Text>
                    </View>

                    <View style={{height: '95%'}}>
                      <ReferralContent
                        onSkip={onPress}
                        onPress={onApplyReferral}
                        isError={errorMsg !== ''}
                        errorMsg={errorMsg}
                        isValidRef={isValidReferral}
                        isScanFailed={isScanFailed}
                        setIsScanFailed={setIsScanFailed}
                        refCode={refCode}
                        setRefCode={setRefCode}
                        isScanning={isScanning}
                        setIsScanning={setIsScanning}
                        isScanSuccess={isScanSuccess}
                        setIsScanSuccess={setIsScanSuccess}
                        isScanned={isScanned}
                        setIsScanned={setIsScanned}
                        isManualEnter={isManualEnter}
                        setIsManualEnter={setIsManualEnter}
                        referralFrom={dataProfile.data.referralFrom}
                      />
                    </View>
                  </View>
                );
              } else {
                return (
                  <View key={index}>
                    <TouchableOpacity
                      style={styles.containerSkip}
                      onPress={onPress}>
                      <Text style={styles.textSkip}>{t('Btn.Skip')}</Text>
                    </TouchableOpacity>
                    <View style={styles.containerStep}>
                      <Text style={styles.textStep}>{item.step}</Text>
                      <Text style={[typography.Heading4, styles.title]}>
                        {item.title}
                      </Text>
                      <Text style={styles.textSubtitle}>{item.subtitle}</Text>
                      <SelectBox
                        selected={selected}
                        setSelected={setSelected}
                        data={item.list}
                      />
                    </View>
                  </View>
                );
              }
            })}
          </ScrollView>
        </>
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
      />

      <ModalLoading visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerScrollView: {
    height: '100%',
  },
  image: {
    width,
    height: Platform.OS === 'ios' ? '95%' : '85%',
  },
  title: {
    textAlign: 'center',
    color: color.Neutral[10],
    marginTop: mvs(5),
    marginBottom: mvs(15),
    maxWidth: width * 0.8,
  },
  titleStart: {
    color: color.Neutral[10],
    marginVertical: mvs(10),
  },
  titleEnd: {
    textAlign: 'right',
    color: color.Neutral[10],
    marginVertical: mvs(10),
  },
  containerStep: {
    paddingTop: mvs(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSkip: {
    position: 'absolute',
    right: widthPercentage(30),
    zIndex: 1,
  },
  textSkip: {
    fontSize: mvs(14),
    fontFamily: font.InterRegular,
    fontWeight: '500',
    lineHeight: mvs(17),
    color: color.Success[400],
  },
  textStep: {
    fontSize: mvs(12),
    fontFamily: font.InterRegular,
    fontWeight: '500',
    lineHeight: mvs(14.5),
    color: color.Neutral[10],
    textAlign: 'center',
  },
  textSubtitle: {
    fontSize: mvs(12),
    fontFamily: font.InterRegular,
    fontWeight: '500',
    lineHeight: mvs(14.5),
    color: '#788AA9',
    textAlign: 'center',
    maxWidth: width * 0.8,
    marginBottom: mvs(30),
  },
  backgroundFailed: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 10,
    borderRadius: 4,
    padding: 16,
    gap: 16,
    alignItems: 'center',
  },
  containerFailed: {
    width: '90%',
    marginTop: 220,
    backgroundColor: color.Dark[800],
    padding: 24,
  },
});
