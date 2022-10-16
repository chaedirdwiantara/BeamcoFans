import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {StackRouter} from '@react-navigation/native';
import {SsuInput} from '../atom/InputText/SsuInput';
import {color} from '../../theme';
import {KeyIcon, UserIcon} from '../../assets/icon';

const InputExample = () => {
  const [state, setState] = useState('');
  const [areaState, setAreaState] = useState('');

  return (
    <View style={{width: '100%', paddingHorizontal: 16}}>
      <SsuInput.InputText
        value={state}
        onChangeText={(newText: any) => setState(newText)}
        placeholder={'Email or Username'}
        isError={false}
        errorMsg={'Incorrect email or password'}
        leftIcon={<KeyIcon stroke={color.Dark[50]} />}
        password
      />
      <SsuInput.TextArea
        value={areaState}
        onChangeText={(newText: any) => setAreaState(newText)}
        placeholder={'Type here...'}
      />
    </View>
  );
};

export default InputExample;

const styles = StyleSheet.create({});
