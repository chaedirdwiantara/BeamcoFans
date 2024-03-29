import {FlatList, StyleSheet, View} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import Mission from '../../components/molecule/Reward/mission';
import {missionMenu} from '../../data/reward';
import {Button, Circle, Gap, SuccessToast} from '../../components';
import {color, font} from '../../theme';
import {mvs} from 'react-native-size-matters';
import {widthResponsive} from '../../utils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useRewardHook} from '../../hooks/use-reward.hook';
import {
  DataMissionMaster,
  RewardListFunction,
} from '../../interface/reward.interface';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainTabParams, RootStackParams} from '../../navigations';
import {useTranslation} from 'react-i18next';
import {dataMissionStore} from '../../store/reward.store';
import {MissionCardSkeleton} from '../../skeleton/Rewards/MissionCard';

type Props = {
  refreshing: boolean;
  setRefreshing: (item: boolean) => void;
  rankTitle?: string;
};

const TabTwoRewards: FC<Props> = ({refreshing, setRefreshing, rankTitle}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const navigation2 = useNavigation<NativeStackNavigationProp<MainTabParams>>();
  const [activeIndex, setactiveIndex] = useState<number>(0);
  const [daily, setDaily] = useState<DataMissionMaster[]>([]);
  const [oneTime, setOneTime] = useState<DataMissionMaster[]>([]);
  const [repeatable, setRepeatable] = useState<DataMissionMaster[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [claimedPoint, setClaimedPoint] = useState<number>(0);
  const [paramClaim, setParamClaim] = useState<string>();
  const [dataStateMission, setDataStateMission] =
    useState<DataMissionMaster[]>();

  const {useGetMissionMaster, useSetClaimMission} = useRewardHook();
  const {storedDataMission, setStoredDataMission} = dataMissionStore();

  const {
    data: dataMission,
    refetch: refetchMissionMaster,
    isLoading: isLoadingMissionMaster,
    isRefetching: isRefetchingMissionMaster,
  } = useGetMissionMaster();

  const {
    data: dataClaim,
    refetch: refetchClaimMission,
    isLoading: isLoadingClaimMission,
    isRefetching: isRefetchingClaimMissionr,
  } = useSetClaimMission(paramClaim!);

  // ! 1. FETCH DATA ON FOCUS
  useFocusEffect(
    useCallback(() => {
      refetchMissionMaster();
      setactiveIndex(0);
    }, []),
  );

  // ! 2. SEPARATE RESPONSE DATA BASED ON THEIR MISSION TYPE
  useEffect(() => {
    if (dataMission?.data) {
      const dailyMissions = dataMission?.data.filter(
        data => data.taskType === 'daily',
      );
      const oneTimeMissions = dataMission?.data.filter(
        data => data.taskType === 'one-time',
      );
      const repeatableMissions = dataMission?.data.filter(
        data => data.taskType === 'based-reward',
      );

      setDaily(dailyMissions);
      setOneTime(oneTimeMissions);
      setRepeatable(repeatableMissions);
    }
  }, [dataMission]);

  useEffect(() => {
    async function setRefreshingData() {
      if (refreshing) {
        await refetchMissionMaster();
        setRefreshing(false);
      }
    }

    setRefreshingData();
  }, [refreshing]);

  useEffect(() => {
    if (dataMission?.data && storedDataMission) {
      // check if the number exists in storedDataMission
      const exInStored = (num: number) =>
        storedDataMission.some(el => el.id === num);

      // Sorting
      const sorted = [...dataMission.data].sort((a, b) => {
        if (exInStored(a.id) && !exInStored(b.id)) {
          return 1; // Move 'a' to end if it exists in exInStored
        } else if (!exInStored(a.id) && exInStored(b.id)) {
          return -1; // Keep 'a' before 'b' if only 'b' exists in exInStored
        }
        return 0; // No change in order if both or neither are in exInStored
      });
      setDataStateMission(sorted);
    }
  }, [dataMission?.data, storedDataMission]);

  useEffect(() => {
    async function fetchClaim() {
      if (paramClaim) {
        await refetchClaimMission();
        // Set a timeout of 3 second before calling setRefreshing
        setTimeout(() => {
          setRefreshing(true);
        }, 3000);
        setParamClaim(undefined);
      }
    }

    fetchClaim();
  }, [paramClaim]);

  // hide toast after 3s
  useEffect(() => {
    showToast &&
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
  }, [showToast]);

  const onPressMenu = (index: number) => {
    setactiveIndex(index);
  };

  const onClaimMission = (
    sumLoyaltyPoints: number,
    data: DataMissionMaster,
  ) => {
    setClaimedPoint(sumLoyaltyPoints); // to show on toast
    setShowToast(true); // to show toast
    setParamClaim(data.function); // to hit api
  };

  const onGoMission = (screenFn: RewardListFunction) => {
    switch (screenFn) {
      case 'complete-profile':
        navigation.navigate('ProfileProgress');
        break;
      case 'daily-sign-in':
        console.log('nothing to do here');
        break;
      case 'refer-friend':
        navigation.navigate('ReferralCode');
        break;
      case 'tip-live-tipping':
        navigation2.navigate('Home', {showToast: false});
        break;
      case 'top-up-100-credits':
        navigation.navigate('TopUpCredit');
        break;
      case 'top-up-540-credits':
        navigation.navigate('TopUpCredit');
        break;
      case 'top-up-1200-credits':
        navigation.navigate('TopUpCredit');
        break;
      case 'top-up-6500-credits':
        navigation.navigate('TopUpCredit');
        break;
      case 'like-post':
        navigation2.navigate('Feed');
        break;
      case 'vote-post':
        navigation2.navigate('Feed');
        break;
      case 'comment-post':
        navigation2.navigate('Feed');
        break;
      case 'follow-artist':
        navigation.navigate('SearchScreen');
        break;
      case 'share-song-ig':
        navigation2.navigate('Home', {showToast: false});
        break;
      case 'donation':
        navigation2.navigate('Home', {showToast: false});
        break;
      case 'share-ig':
        navigation2.navigate('Home', {showToast: false});
        break;
    }
  };

  return (
    <View style={styles().container}>
      {isLoadingMissionMaster ? (
        <MissionCardSkeleton />
      ) : (
        <>
          {dataStateMission && (
            <FlatList
              data={dataStateMission}
              showsVerticalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              scrollEnabled={false}
              renderItem={({item}) => (
                <Mission
                  data={item}
                  onClaim={onClaimMission}
                  onGo={() => onGoMission(item.function)}
                  rankTitle={rankTitle}
                />
              )}
            />
          )}
        </>
      )}

      {showToast && (
        <SuccessToast
          toastVisible={showToast}
          onBackPressed={() => setShowToast(false)}
          caption={t('Rewards.MissionTab.ClaimToast', {
            claimedPoint: claimedPoint,
          })}
        />
      )}
    </View>
  );
};

export default TabTwoRewards;

const styles = (activeIndex?: number, index?: number) =>
  StyleSheet.create({
    container: {
      // backgroundColor: 'aqua',
    },
    btnClaim: {
      aspectRatio: undefined,
      width: undefined,
      height: undefined,
      paddingVertical: widthResponsive(6),
      paddingHorizontal: widthResponsive(16),
      backgroundColor: activeIndex === index ? color.Pink[200] : '#1A2435',
      borderRadius: 30,
    },
    textButton: {
      fontFamily: font.InterRegular,
      fontSize: mvs(10),
      fontWeight: '500',
    },
    menuStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
