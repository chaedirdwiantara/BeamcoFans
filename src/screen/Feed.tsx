import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {DropDownExample} from '../components/example';

export const FeedScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <DropDownExample />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
});
