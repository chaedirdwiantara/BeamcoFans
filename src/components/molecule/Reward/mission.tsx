import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
import {
  BadgeBronzeMissionIcon,
  BadgeDiamondMissionIcon,
  BadgeGoldMissionIcon,
  BadgePlatinumMissionIcon,
  BadgeSilverMissionIcon,
  CheckCircle2Icon,
  CupIcon,
} from '../../../assets/icon';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {Button, Gap} from '../../atom';
import {useRewardHook} from '../../../hooks/use-reward.hook';
import {
  DataListMissioProgress,
  DataMissionMaster,
  DataMissionStoreProps,
} from '../../../interface/reward.interface';
import {useTranslation} from 'react-i18next';
import {dataMissionStore} from '../../../store/reward.store';
import {useFocusEffect} from '@react-navigation/native';

interface MissionProps {
  data: DataMissionMaster;
  onClaim: (rewardCount: number, data: DataMissionMaster) => void;
  onGo: () => void;
  rankTitle?: string;
}

const Mission: React.FC<MissionProps> = ({data, onClaim, onGo, rankTitle}) => {
  const {t} = useTranslation();
  const {useGetMissionProgress} = useRewardHook();
  const {storedDataMission, setStoredDataMission} = dataMissionStore();
  const [dataProgress, setDataProgress] = useState<DataListMissioProgress>();
  const [readyToRefetch, setreadyToRefetch] = useState<boolean>(false);

  const {data: dataMissionPrg, refetch: refetchMissionPrg} =
    useGetMissionProgress({
      task_type: data.taskType,
      function: data.function,
      campaignId: data.campaignId,
    });

  useFocusEffect(
    useCallback(() => {
      refetchMissionPrg();
    }, []),
  );

  useEffect(() => {
    if (dataMissionPrg?.data) {
      setDataProgress(dataMissionPrg.data);
    }
  }, [dataMissionPrg]);

  useEffect(() => {
    if (readyToRefetch) {
      setTimeout(() => {
        refetchMissionPrg();
      }, 3000);
      setreadyToRefetch(false);
    }
  }, [readyToRefetch]);

  // TODO: set data to store UNCOMMENT LATER
  // useEffect(() => {
  //   if (data && dataMissionPrg) {
  //     const newMission: DataMissionStoreProps = {
  //       id: data.id,
  //       typeOnIndex:
  //         data.taskType === 'daily' ? 0 : data.taskType === 'one-time' ? 1 : 2,
  //       isClaimable: dataMissionPrg.data.isClaimable,
  //     };
  //     const filterData = storedDataMission.filter(
  //       data => data.id !== newMission.id,
  //     );
  //     const updatedDataMission = [...filterData, newMission];
  //     setStoredDataMission(updatedDataMission);
  //   }
  // }, [data, dataMissionPrg]);

  const amount = dataProgress?.rowCount || 0;
  const progressBar = dataProgress
    ? amount / data.amountToClaim
    : 0 / data.amountToClaim;
  const completeProfile = dataProgress?.function.includes('profile');
  const progressTextCompleteProfile = `${dataProgress ? amount : 0}%/${
    data.amountToClaim
  }%`;
  const progressRepeatable = amount === 0 ? 0 / 1 : 1;
  const progressText = `${amount} Done`;
  const progressCompleted = dataProgress?.isClaimed;

  // ? set data complete & data progressed into global state
  useEffect(() => {
    if (data && dataMissionPrg) {
      if (dataMissionPrg.data.isClaimed || progressCompleted) {
        const newMission: DataMissionStoreProps = {
          id: data.id,
          isClaimable: dataMissionPrg.data.isClaimable,
        };
        const filterData = storedDataMission.filter(
          data => data.id !== newMission.id,
        );
        const updatedDataMission = [...filterData, newMission];
        setStoredDataMission(updatedDataMission);
      }
    }
  }, [data, dataMissionPrg]);

  const handleOnClaim = (
    dataProgress: DataListMissioProgress,
    data: DataMissionMaster,
  ) => {
    if (data.taskType !== 'based-reward') {
      setDataProgress({...dataProgress, isClaimable: false, isClaimed: true});
    } else {
      setDataProgress({...dataProgress, isClaimable: false, isClaimed: false});
    }
    setreadyToRefetch(true);
    onClaim(dataProgress?.sumLoyaltyPoints!, data);
  };

  return (
    <TouchableOpacity
      onPress={onGo}
      style={[styles.voteTopContainer, {opacity: progressCompleted ? 0.6 : 1}]}
      disabled={progressCompleted}>
      <View style={{alignItems: 'center'}}>
        {rankTitle === 'Bronze' ? (
          <BadgeBronzeMissionIcon />
        ) : rankTitle === 'Silver' ? (
          <BadgeSilverMissionIcon />
        ) : rankTitle === 'Gold' ? (
          <BadgeGoldMissionIcon />
        ) : rankTitle === 'Platinum' ? (
          <BadgePlatinumMissionIcon />
        ) : rankTitle === 'Diamond' ? (
          <BadgeDiamondMissionIcon />
        ) : null}
        <Text style={styles.rewardCountTxt}>
          {data.taskType === 'based-reward' &&
          dataProgress &&
          dataProgress?.sumLoyaltyPoints > 0
            ? dataProgress.sumLoyaltyPoints
            : data.rewards}
        </Text>
      </View>
      <Gap width={widthResponsive(12)} />
      <View style={styles.progressBarContainer}>
        <Text style={styles.titleTxt}>{data.taskName}</Text>
        <Gap height={mvs(5)} />
        <View style={styles.prgContainer}>
          <Progress.Bar
            progress={
              data.taskType === 'based-reward'
                ? progressRepeatable
                : progressBar
            }
            width={null}
            height={widthResponsive(11)}
            borderWidth={0}
            color={color.Pink[200]}
            unfilledColor={color.Dark[300]}
            borderRadius={4}
            animated={false}
            style={{width: '100%'}}
          />
          {!progressCompleted ? (
            <View style={styles.progressContainer}>
              <Text style={styles.progressTxt}>
                {completeProfile ? progressTextCompleteProfile : progressText}
              </Text>
            </View>
          ) : (
            <View style={styles.progressContainer}>
              <CheckCircle2Icon width={10} height={10} />
              <Gap width={4} />
              <Text style={styles.progressTxt}>
                {t('Rewards.MissionTab.BtnCompleted')}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  voteTopContainer: {
    flexDirection: 'row',
    backgroundColor: color.Dark[700],
    padding: widthResponsive(16),
    borderRadius: 4,
    marginBottom: widthResponsive(12),
  },
  progressBarContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  prgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressTxt: {
    color: color.Neutral[20],
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '600',
    lineHeight: widthResponsive(12),
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnClaim: {
    aspectRatio: undefined,
    width: widthResponsive(50),
    height: widthResponsive(40),
    backgroundColor: color.Pink[200],
  },
  btnGo: {
    width: widthResponsive(50),
    height: widthResponsive(40),
    aspectRatio: undefined,
    backgroundColor: color.Dark[800],
  },
  textButton: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '500',
  },
  textGoButton: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '500',
    color: color.Pink[200],
  },
  textAreaProgress: {flexDirection: 'row', alignItems: 'center'},
  rewardCountContainer: {flexDirection: 'row', alignItems: 'center'},
  captionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleTxt: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '600',
  },
  rewardCountTxt: {
    color: color.Warning[750],
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '500',
  },
});

export default Mission;
