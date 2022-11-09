import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native';
import {SsuOTPTimer} from '../molecule';

const OTPTimerExample = () => {
  const timeToMs = 300;
  return <SsuOTPTimer targetDate={timeToMs} />;
};

export default OTPTimerExample;
