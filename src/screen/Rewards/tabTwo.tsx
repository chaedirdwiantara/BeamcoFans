import {FlatList, StyleSheet, View} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import Mission from '../../components/molecule/Reward/mission';
import {missionMenu} from '../../data/reward';
import {Button, Gap, SuccessToast} from '../../components';
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

type Props = {
  refreshing: boolean;
  setRefreshing: (item: boolean) => void;
};

const TabTwoRewards: FC<Props> = ({refreshing, setRefreshing}) => {
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

  const {useGetMissionMaster, useSetClaimMission} = useRewardHook();

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
    async function fetchClaim() {
      if (paramClaim) {
        await refetchClaimMission();
        setParamClaim(undefined);
      }
    }

    fetchClaim();
  }, [paramClaim]);

  const onPressMenu = (index: number) => {
    setactiveIndex(index);
  };

  const setDataState = (rewardCount: number, data: DataMissionMaster) => {
    const stateChoosen =
      data.taskType === 'daily'
        ? daily
        : data.taskType === 'one-time'
        ? oneTime
        : repeatable;

    // Remove the selected data from the stateChoosen list
    const newDataMission = stateChoosen.filter(
      mission => mission.id !== data.id,
    );

    // Add the selected data to the new state list
    const dataFilter: DataMissionMaster[] = [
      ...newDataMission,
      {
        ...data,
        rewards: data.rewards + rewardCount,
      },
    ];

    // Update the state
    data.taskType === 'daily'
      ? setDaily(dataFilter)
      : data.taskType === 'one-time'
      ? setOneTime(dataFilter)
      : setRepeatable(dataFilter);
  };

  const onClaimMission = (rewardCount: number, data: DataMissionMaster) => {
    setClaimedPoint(rewardCount);
    setDataState(rewardCount, data);
    setShowToast(true);
    setParamClaim(data.function);
  };

  const onGoMission = (screenFn: RewardListFunction) => {
    switch (screenFn) {
      case 'complete-profile':
        navigation.navigate('Setting');
        break;
      case 'daily-sign-in':
        console.log('nothing to do here');
        break;
      case 'refer-friend':
        navigation2.navigate('Home', {showToast: false});
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
        navigation.navigate('MusicPlayer');
        break;
      case 'donation':
        navigation2.navigate('Home', {showToast: false});
        break;
      case 'share-ig':
        navigation.navigate('MusicPlayer');
        break;
    }
  };

  return (
    <View style={styles().container}>
      <View style={styles().menuStyle}>
        {missionMenu.map((data, index) => {
          return (
            <Button
              label={data.label}
              containerStyles={styles(activeIndex, index).btnClaim}
              textStyles={styles().textButton}
              onPress={() => onPressMenu(index)}
            />
          );
        })}
      </View>

      <Gap height={16} />

      {dataMission?.data && (
        <FlatList
          data={
            activeIndex === 0
              ? daily
              : activeIndex === 1
              ? oneTime
              : activeIndex === 2
              ? repeatable
              : daily
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
          renderItem={({item}) => (
            <Mission
              data={item}
              onClaim={onClaimMission}
              onGo={() => onGoMission(item.function)}
            />
          )}
        />
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
