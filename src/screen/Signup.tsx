import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const SignupScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <Text>Signup screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
