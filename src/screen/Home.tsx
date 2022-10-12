import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { SsuText } from '../components/atom/Text/SsuText';

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <Text>Home Screen</Text>
      <SsuText.Headline.Large>Update your password</SsuText.Headline.Large>
      <SsuText.Headline.Default>Select your expectation as a fans</SsuText.Headline.Default>
      <SsuText.Headline.Small>SSU Warehouse Project</SsuText.Headline.Small>
      <SsuText.Headline.Tiny>Top Musician</SsuText.Headline.Tiny>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'black'
  },
});
