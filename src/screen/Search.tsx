import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Color from '../theme/Color';

export const SearchScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <Text>Search Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Dark[800],
  },
});
