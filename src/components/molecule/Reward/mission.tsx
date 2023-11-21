import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';
import {CheckBoxIcon} from '../../../assets/icon';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {Button, Gap} from '../../atom';

interface MissionProps {
  progress: number; // Range from 0 to 1
  total: number;
  onClaim: () => void;
  onGo: () => void;
  isClaimable: boolean;
  isCompleted: boolean;
}

const Mission: React.FC<MissionProps> = ({
  progress,
  total,
  onClaim,
  onGo,
  isClaimable,
  isCompleted,
}) => {
  const progressText = `${Math.floor(progress * total)}/${total}`;

  return (
    <View style={styles.voteTopContainer}>
      <View style={styles.progressBarContainer}>
        <Progress.Bar
          progress={progress / 100}
          width={null}
          height={widthResponsive(27)}
          borderWidth={0}
          color={color.Pink[200]}
          unfilledColor={color.DarkBlue[800]}
          borderRadius={4}
          animated={true}
          animationType={'timing'}
        />
        <View style={styles.progressBarText}>
          <View style={styles.textAreaProgress}>
            <Text style={styles.progressBarChild}>{total}</Text>
            <Gap width={4} />
            {/* {item.isVoted && <CheckCircle2Icon width={14} height={14} />} */}
          </View>
          <Text style={styles.progressBarChild}>{`${progress}%`}</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Gap width={4} />
        {/* {!isOwner && !isVoted ? ( */}
        <Button
          label={'Vote'}
          containerStyles={styles.buttonContainer}
          textStyles={styles.textButton}
          onPress={() => {}}
        />
        {/* ) : null} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  voteTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarContainer: {
    flex: 1,
    position: 'relative',
  },
  progressBarText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthResponsive(8),
  },
  progressBarChild: {
    color: color.Neutral[20],
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '400',
  },
  buttonContainer: {
    width: undefined,
    aspectRatio: undefined,
    paddingVertical: widthResponsive(6),
    paddingHorizontal: widthResponsive(15),
    backgroundColor: color.Pink[200],
  },
  textButton: {
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '700',
  },
  textAreaProgress: {flexDirection: 'row', alignItems: 'center'},
});

export default Mission;
