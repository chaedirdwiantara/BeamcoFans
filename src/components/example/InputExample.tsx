import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {StackRouter} from '@react-navigation/native';
import {SsuInput} from '../atom/InputText/SsuInput';
import HomeIcon from '../../assets/icon/Home.icon';
import {color} from '../../theme';

const InputExample = () => {
  const [state, setState] = useState('');

  return (
    <View style={{width: '100%', paddingHorizontal: 16}}>
      <SsuInput.InputText
        value={state}
        onChangeText={(newText: any) => setState(newText)}
        placeholder={'Email or Username'}
        isError={false}
        errorMsg={'Incorrect email or password'}
        icon={<HomeIcon stroke={color.Dark[50]} />}
        password
      />
    </View>
  );
};

export default InputExample;

const styles = StyleSheet.create({});
