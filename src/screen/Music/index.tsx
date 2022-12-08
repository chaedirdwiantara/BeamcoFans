import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color} from '../../theme';

export const MusicPlayer = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>MusicPlayer</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
});
