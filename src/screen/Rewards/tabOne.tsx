import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Mission from '../../components/molecule/Reward/mission';

const TabOneReward = () => {
  return (
    <View style={styles.container}>
      <Mission
        progress={1}
        total={10}
        onClaim={() => {}}
        onGo={() => {}}
        isClaimable={false}
        isCompleted={false}
      />
    </View>
  );
};

export default TabOneReward;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'brown',
  },
});
