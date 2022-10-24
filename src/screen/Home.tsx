import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {
  TabFilterExample,
  ToastExample,
  TopNavExample,
} from '../components/example';

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <ScrollView>
        {/* <Text>Home Screen</Text> */}
        <TopNavExample />
        {/* <ToastExample /> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: mvs(12),
  },
});
