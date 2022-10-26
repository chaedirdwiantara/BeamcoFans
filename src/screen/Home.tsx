import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {kFormatter, kFormatter2, toCurrency} from '../utils';

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <ScrollView>
        <Text style={{color: 'white'}}>
          {toCurrency(100000000, {withFraction: false})}
        </Text>
        <Text style={{color: 'white'}}>{kFormatter(100000000)}</Text>
        <Text style={{color: 'white'}}>{kFormatter2(100000000)}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: mvs(12),
  },
});
