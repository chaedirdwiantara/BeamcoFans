import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {AddIcon, MinusIcon} from '../../assets/icon';
import {normalize} from '../../utils';
import Font from '../../theme/Font';
import Color from '../../theme/Color';

const QuantityInput = ({
  value,
  onPress,
}: {
  value: number;
  onPress: (type: string) => void;
}) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity
        disabled={value <= 0}
        onPress={() => onPress('decrement')}>
        <MinusIcon fill={value > 0 ? Color.Neutral[10] : Color.Dark[50]} />
      </TouchableOpacity>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
      </View>
      <TouchableOpacity onPress={() => onPress('increment')}>
        <AddIcon />
      </TouchableOpacity>
    </View>
  );
};

export default QuantityInput;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueContainer: {
    width: 68,
    margin: 'auto',
  },
  value: {
    fontSize: normalize(15),
    fontFamily: Font.InterMedium,
    color: 'white',
    alignSelf: 'center',
  },
});
