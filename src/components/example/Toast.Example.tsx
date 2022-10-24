// import { SnbButton, SnbText, SnbToast } from '../../library/src';
import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';
import {SsuToast, SsuToast2} from '../atom';
import ayolahBro from '../atom/Toast/SsuToast2';
import Cuplikan from '../atom/Toast/SsuToast2';

const Title = ({title}: any) => (
  <View style={{margin: 16}}>
    <Text style={{fontSize: 16, fontWeight: 'bold', alignSelf: 'center'}}>
      {title}
    </Text>
  </View>
);

const ToastExample = () => {
  return (
    <View style={{flex: 1}}>
      {/* <Title title="Toast Type 1" /> */}
      {/* <SnbButton.Dynamic
        size="small"
        title="Position Top"
        disabled={false}
        type="primary"
        onPress={() => {
          Toast.show('Top Toast', 3000, { position: 'top' });
        }}
      /> */}
      <TouchableOpacity
        onPress={() => {
          ayolahBro.show('Top Toast', 3000, {position: 'top'});
          //   console.log('activated');
        }}
        style={styles.touchableStyle}>
        <Text style={{color: 'white'}}>Position Tops</Text>
      </TouchableOpacity>

      <View style={{marginVertical: 12}} />
      {/* <SnbButton.Dynamic
        size="small"
        title="Position Center"
        disabled={false}
        type="primary"
        onPress={() => {
          Toast.show('Center Toast', 3000, {
            position: 'center',
            action: () => {}
          });
        }}
      /> */}
      <TouchableOpacity
        onPress={() => {
          ayolahBro.show('Center Toast', 3000, {
            position: 'center',
            action: () => {},
          });
        }}
        style={styles.touchableStyle}>
        <Text style={{color: 'white'}}>Position Center</Text>
      </TouchableOpacity>

      <View style={{marginVertical: 12}} />
      {/* <SnbButton.Dynamic
        size="small"
        title="Position Bottom"
        disabled={false}
        type="primary"
        onPress={() => {
          SnbToast.show(
            'Bottom Toast Bottom Toast Bottom Toast Bottom Toast Bottom Toast Bottom Toast Bottom Toast Bottom Toast Bottom Toast Bottom Toast',
            3000,
            {
              position: 'bottom',
              positionValue: 50,
              action: () => {}
            }
          );
        }}
      /> */}
      <TouchableOpacity
        onPress={() => {
          ayolahBro.show(
            'Bottom Toast Bottom Toast Bottom Toast Bottom Toast Bottom Toast Bottom Toast Bottom Toast Bottom Toast Bottom Toast Bottom Toast',
            3000,
            {
              position: 'bottom',
              positionValue: 50,
              action: () => {},
            },
          );
        }}
        style={styles.touchableStyle}>
        <Text style={{color: 'white'}}>Position Bottom</Text>
      </TouchableOpacity>

      <View style={{marginVertical: 12}} />
      {/* <SnbButton.Dynamic
        size="small"
        title="Hide Toast"
        disabled={false}
        type="primary"
        onPress={SnbToast.hide}
      />
      <SnbToast /> */}
      <TouchableOpacity onPress={ayolahBro.hide} style={styles.touchableStyle}>
        <Text style={{color: 'white'}}>Hide Toast</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ToastExample;

const styles = StyleSheet.create({
  touchableStyle: {
    width: 150,
    height: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
