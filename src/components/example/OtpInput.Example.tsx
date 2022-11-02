import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SsuOTPInput} from '../molecule';

const OtpInputExample = () => {
  return (
    <SsuOTPInput
      type={'default'}
      hideIcon
      onCodeChanged={code => console.log(code)}
      onCodeFilled={(result, code) => {
        if (result) {
          console.log(code);
        }
      }}
    />
  );
};

export default OtpInputExample;

const styles = StyleSheet.create({});
