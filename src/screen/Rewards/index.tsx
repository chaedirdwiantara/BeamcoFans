import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {color, font} from '../../theme';
import {bgColorTab, toCurrency, widthResponsive} from '../../utils';
import {Button, Gap, ModalCustom} from '../../components';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import TabOneReward from './tabOne';
import TabTwoRewards from './tabTwo';
import PointProgress from '../../components/molecule/Reward/pointProgress';
import {useBadgeHook} from '../../hooks/use-badge.hook';
import {
  BadgeBronzeMIcon,
  BadgeDiamondMIcon,
  BadgeGoldMIcon,
  BadgePlatinumMIcon,
  BadgeSilverMIcon,
  CupIcon,
} from '../../assets/icon';
import {mvs} from 'react-native-size-matters';
import {
  dataMissionStore,
  slideIndexStore,
  tabRewardStore,
} from '../../store/reward.store';
import {useTranslation} from 'react-i18next';
import {RewardsSkeleton} from '../../skeleton/Rewards';
import HeaderSwiper from '../../components/molecule/Reward/headerSwiper';
import BenefitCard from '../../components/molecule/Reward/benefitCard';
import {rewardMenu} from '../../data/reward';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {storage} from '../../hooks/use-storage.hook';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

const Rewards = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {
    dataProfile,
    isLoading: isLoadingProfile,
    getProfileUser,
  } = useProfileHook();
  // BADGE
  const {useCheckBadge} = useBadgeHook();
  const {storedBadgeTitle, setStoredBadgeTitle} = dataMissionStore();
  const {storedSlideIndex} = slideIndexStore();
  const {metaReward, setMetaReward, allowUpdateMeta, setAllowUpdateMeta} =
    tabRewardStore();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filter] = useState([
    {filterName: 'Rewards.Reward'},
    {filterName: 'Rewards.Mission'},
  ]);
  const [scrollEffect, setScrollEffect] = useState(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [modalNewRank, setModalNewRank] = useState<boolean>(false);

  // fans type = 1
  const {
    data: dataBadge,
    refetch: refetchBadge,
    isLoading: isLoadingBadge,
    isRefetching: refetchingBadge,
  } = useCheckBadge({
    userType: 1,
    point: dataProfile?.data.point?.pointLifetime!,
  });

  useFocusEffect(
    useCallback(() => {
      const tabActive = storage.getNumber('tabActiveRewards') || 0;
      setSelectedIndex(tabActive);
      storage.delete('tabActiveRewards');
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      getProfileUser();
    }, []),
  );

  useEffect(() => {
    if (dataProfile) {
      refetchBadge();
    }
  }, [dataProfile]);

  useEffect(() => {
    if (
      storedBadgeTitle &&
      dataBadge &&
      dataBadge?.data.title !== storedBadgeTitle
    ) {
      setStoredBadgeTitle(dataBadge?.data.title);
      setModalNewRank(true);
    } else if (
      !storedBadgeTitle &&
      dataBadge &&
      dataBadge?.data.title !== 'Bronze'
    ) {
      setStoredBadgeTitle(dataBadge?.data.title);
    }
  }, [dataBadge]);

  useEffect(() => {
    async function setRefreshDataMain() {
      if (refreshing) {
        await getProfileUser();
        await refetchBadge();
        setRefreshing(false);
      }
    }

    setRefreshDataMain();
  }, [refreshing]);

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 10;
    setScrollEffect(scrolled);

    const height = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    if (offsetY + height >= contentHeight && allowUpdateMeta) {
      setAllowUpdateMeta(false);
      setMetaReward({
        ...metaReward,
        page: metaReward.page + 1,
      });
    }
  };

  const tabFilterOnPress = (index: number) => {
    setSelectedIndex(index);
    setMetaReward({
      page: 1,
      perPage: 10,
    });
  };

  const goToMyVoucher = () => {
    navigation.navigate('MyVoucher');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
            tintColor={'transparent'}
          />
        }>
        {isLoadingBadge || isLoadingProfile ? (
          <RewardsSkeleton />
        ) : (
          dataBadge?.data &&
          dataProfile?.data && (
            <>
              <HeaderSwiper
                currentLvl={dataBadge.data.title}
                onPressIcon={goToMyVoucher}
              />
              <Gap height={15} />
              <View
                style={{
                  paddingHorizontal: widthResponsive(20),
                }}>
                <PointProgress
                  startPoint={dataBadge.data.startPoint} //point life time profile
                  endPoint={dataBadge.data.endPoint}
                  currentLvl={dataBadge.data.title}
                  lifeTimePoint={dataProfile?.data.point?.pointLifetime!}
                />
              </View>
              <Gap height={19} />
              <View style={{paddingHorizontal: widthResponsive(20)}}>
                {storedSlideIndex !== undefined && (
                  <BenefitCard
                    id={storedSlideIndex ? storedSlideIndex + 1 : 1}
                    currentLvl={dataBadge.data.title}
                  />
                )}
              </View>
            </>
          )
        )}
        <Gap height={16} />

        <View style={styles.filterContainer}>
          <View style={styles.menuStyle}>
            <View style={{flexDirection: 'row'}}>
              {rewardMenu.map((data, index) => {
                return (
                  <View key={index}>
                    <Button
                      label={data.label}
                      containerStyles={{
                        ...styles.containerTab,
                        backgroundColor: bgColorTab(selectedIndex, index),
                      }}
                      textStyles={styles.textTab}
                      onPress={() => tabFilterOnPress(index)}
                    />
                  </View>
                );
              })}
            </View>

            <View style={styles.containerPoint}>
              <CupIcon />
              <Gap width={widthResponsive(20)} />
              <Text style={[styles.textTab, {fontWeight: '600'}]}>
                {toCurrency(dataProfile?.data.availablePoint!, {
                  withFraction: false,
                })}
              </Text>
            </View>
          </View>

          <View style={styles.containerContent}>
            {filter[selectedIndex].filterName === 'Rewards.Reward' ? (
              <View>
                <TabOneReward
                  refreshing={refreshing}
                  setRefreshing={setRefreshing}
                />
              </View>
            ) : (
              <View>
                <TabTwoRewards
                  refreshing={refreshing}
                  setRefreshing={setRefreshing}
                  rankTitle={dataBadge?.data.title}
                />
              </View>
            )}
          </View>
        </View>

        <ModalCustom
          modalVisible={modalNewRank}
          onPressClose={() => setModalNewRank(false)}
          children={
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                {t('Rewards.ModalRankUp.Title')}
              </Text>
              <Gap height={16} />
              {storedBadgeTitle === 'Bronze' ? (
                <BadgeBronzeMIcon />
              ) : storedBadgeTitle === 'Silver' ? (
                <BadgeSilverMIcon />
              ) : storedBadgeTitle === 'Gold' ? (
                <BadgeGoldMIcon />
              ) : storedBadgeTitle === 'Platinum' ? (
                <BadgePlatinumMIcon />
              ) : storedBadgeTitle === 'Diamond' ? (
                <BadgeDiamondMIcon />
              ) : null}
              <Gap height={16} />
              <Text style={styles.modalTitle}>{storedBadgeTitle}</Text>
              <Gap height={8} />
              <Text style={styles.modalCaption}>
                {t('Rewards.ModalRankUp.Subtitle')}
              </Text>
              <Gap height={20} />
              <Button
                label={'Dismiss'}
                containerStyles={styles.btnClaim}
                textStyles={styles.textButton}
                onPress={() => setModalNewRank(false)}
                type="border"
              />
            </View>
          }
        />
      </ScrollView>
    </View>
  );
};

export default Rewards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
    zIndex: 2,
  },
  containerContent: {
    flex: 1,
    marginTop: widthResponsive(16),
    width: '100%',
  },
  filterContainer: {
    paddingHorizontal: widthResponsive(24),
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  slide: {
    position: 'relative',
    width: '100%',
  },
  btnClaim: {
    aspectRatio: undefined,
    width: undefined,
    height: undefined,
    paddingHorizontal: 3,
    borderWidth: 0,
  },
  textButton: {
    fontFamily: font.InterMedium,
    fontSize: mvs(14),
    fontWeight: '500',
    color: '#BDE3FF',
  },
  modalTitle: {
    color: color.Neutral[10],
    textAlign: 'center',
    fontFamily: font.InterMedium,
    fontWeight: '600',
    fontSize: mvs(14),
  },
  modalCaption: {
    color: color.Secondary[10],
    textAlign: 'center',
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(10),
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: color.Dark[800],
    paddingTop: widthResponsive(32),
    paddingHorizontal: widthResponsive(16),
    paddingBottom: widthResponsive(16),
    width: widthResponsive(244),
    borderRadius: 16,
  },
  loadingSpinner: {
    alignItems: 'center',
    paddingVertical: mvs(20),
  },
  menuStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTab: {
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  containerTab: {
    aspectRatio: undefined,
    width: undefined,
    height: undefined,
    paddingVertical: widthResponsive(6),
    paddingHorizontal: widthResponsive(16),
    borderRadius: 30,
    marginRight: widthResponsive(10),
  },
  containerPoint: {
    flexDirection: 'row',
    backgroundColor: '#1B3868',
    borderWidth: mvs(1),
    borderColor: '#375795',
    borderRadius: mvs(30),
    paddingVertical: widthResponsive(6),
    paddingHorizontal: widthResponsive(10),
    alignItems: 'center',
  },
});
