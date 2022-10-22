import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TabFilterExample, TopNavExample} from '../components/example';

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <Text>Home Screen</Text>
      <TopNavExample />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
