import {
  NativeModules,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {color} from '../../theme';
import {widthResponsive} from '../../utils';
import {Gap, TabFilter} from '../../components';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {useTranslation} from 'react-i18next';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useFocusEffect} from '@react-navigation/native';
import TabOneReward from './tabOne';
import TabTwoRewards from './tabTwo';
import InfoCard from '../../components/molecule/Reward/infoCard';
import PointProgress from '../../components/molecule/Reward/pointProgress';
import BackgroundHeader from '../../components/molecule/Reward/backgroundHeader';
import {useBadgeHook} from '../../hooks/use-badge.hook';

const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

const Rewards = () => {
  const {t} = useTranslation();
  const {dataProfile, dataCountProfile, getProfileUser, getTotalCountProfile} =
    useProfileHook();
  // BADGE
  const {useCheckBadge} = useBadgeHook();
  // artist type = 2
  const {data: dataBadge, refetch: refetchBadge} = useCheckBadge({
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

  const [selectedIndex, setSelectedIndex] = useState(-0);
  const [filter] = useState([
    {filterName: 'Rewards.Reward'},
    {filterName: 'Rewards.Mission'},
  ]);
  const [scrollEffect, setScrollEffect] = useState(false);

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
        onScroll={handleScroll}>
        {dataBadge && (
          <>
            <View style={styles.slide}>
              <BackgroundHeader
                rankTitle={dataBadge.data.title}
                points={dataProfile?.data.point?.pointLifetime!}
              />
            </View>

            <Gap height={14} />
            <View style={{paddingHorizontal: widthResponsive(20)}}>
              <PointProgress
                progress={dataBadge.data.startPoint}
                total={dataBadge.data.endPoint}
                currentLvl={dataBadge.data.title}
              />
            </View>

            <Gap height={24} />
            <View style={{paddingHorizontal: widthResponsive(20)}}>
              <InfoCard
                startPoint={dataBadge.data.startPoint}
                endPoint={dataBadge.data.endPoint}
                currentLvl={dataBadge.data.title}
              />
            </View>
          </>
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
                <TabOneReward />
              </View>
            ) : (
              <View>
                <TabTwoRewards />
              </View>
            )}
          </View>
        </View>
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
});
