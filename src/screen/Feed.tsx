import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const FeedScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <Text>Feed Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
