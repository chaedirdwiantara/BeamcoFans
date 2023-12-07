import {
  NativeModules,
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
import {widthResponsive} from '../../utils';
import {Button, Gap, ModalCustom, TabFilter} from '../../components';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useFocusEffect} from '@react-navigation/native';
import TabOneReward from './tabOne';
import TabTwoRewards from './tabTwo';
import InfoCard from '../../components/molecule/Reward/infoCard';
import PointProgress from '../../components/molecule/Reward/pointProgress';
import BackgroundHeader from '../../components/molecule/Reward/backgroundHeader';
import {useBadgeHook} from '../../hooks/use-badge.hook';
import {
  BadgeBronzeMIcon,
  BadgeDiamondMIcon,
  BadgeGoldMIcon,
  BadgePlatinumMIcon,
  BadgeSilverMIcon,
} from '../../assets/icon';
import {mvs} from 'react-native-size-matters';
import {dataMissionStore} from '../../store/reward.store';
import {useTranslation} from 'react-i18next';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import RedeemSuccessIcon from '../../assets/icon/RedeemSuccess.icon';
import {RewardsSkeleton} from '../../skeleton/Rewards';

const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

const Rewards = () => {
  const {t} = useTranslation();
  const {
    isLoading: isLoadingProfile,
    dataProfile,
    dataCountProfile,
    getProfileUser,
    getTotalCountProfile,
  } = useProfileHook();
  // BADGE
  const {useCheckBadge} = useBadgeHook();
  const {storedBadgeTitle, setStoredBadgeTitle} = dataMissionStore();

  const [selectedIndex, setSelectedIndex] = useState(-0);
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
  };

  const tabFilterOnPress = (params: string, index: number) => {
    setSelectedIndex(index);
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
              <View style={styles.slide}>
                <BackgroundHeader
                  rankTitle={dataBadge.data.title}
                  points={dataProfile?.data.availablePoint!}
                />
              </View>

              <Gap height={14} />
              <View style={{paddingHorizontal: widthResponsive(20)}}>
                <PointProgress
                  startPoint={dataBadge.data.startPoint} //point life time profile
                  endPoint={dataBadge.data.endPoint}
                  currentLvl={dataBadge.data.title}
                  lifeTimePoint={dataProfile?.data.point?.pointLifetime!}
                />
              </View>

              <Gap height={24} />
              <View style={{paddingHorizontal: widthResponsive(20)}}>
                <InfoCard
                  startPoint={dataProfile?.data.point?.pointLifetime!}
                  endPoint={dataBadge.data.endPoint}
                  currentLvl={dataBadge.data.title}
                />
              </View>
            </>
          )
        )}
        <Gap height={16} />

        <View style={styles.filterContainer}>
          <TabFilter.Type1
            filterData={filter}
            onPress={tabFilterOnPress}
            selectedIndex={selectedIndex}
            translation={true}
            flatlistContainerStyle={{
              justifyContent: 'space-between',
            }}
            TouchableStyle={{width: widthPercentageToDP(45)}}
          />

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
});
