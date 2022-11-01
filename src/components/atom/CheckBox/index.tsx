import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ms, mvs} from 'react-native-size-matters';
import {color} from '../../../theme';
import {CheckBoxProps} from '../../../interface/checkbox.interface';

const CheckBox: React.FC<CheckBoxProps> = ({handleOnPress, active}) => {
  return (
    <TouchableOpacity
      style={[
        styles.checkbox,
        {backgroundColor: active ? color.Success[500] : undefined},
      ]}
      onPress={handleOnPress}></TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  checkbox: {
    width: ms(20),
    height: mvs(20),
    borderWidth: 1,
    borderColor: color.Dark[500],
    borderRadius: 6,
  },
});
