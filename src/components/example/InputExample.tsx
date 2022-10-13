import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {StackRouter} from '@react-navigation/native';
import {SsuInput} from '../atom/InputText/SsuInput';

const InputExample = () => {
  const [state, setState] = useState('');

  return (
    <View style={{width: '100%', paddingHorizontal: 16}}>
      <SsuInput.InputText
        value={state}
        onChangeText={(newText: any) => setState(newText)}
        placeholder={'Email or Username'}
        isError={true}
        errorMsg={'Incorrect email or password'}
      />
    </View>
  );
};

export default InputExample;

const styles = StyleSheet.create({});
