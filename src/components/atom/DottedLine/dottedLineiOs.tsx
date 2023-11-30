import React from 'react';
import {View, StyleSheet} from 'react-native';

const DottedLine = ({length = '100%', color = '#000', dotSize = 2}) => {
  const numberOfDots = Math.ceil(
    Number(length.replace('%', '')) / (dotSize * 2),
  );

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < numberOfDots; i++) {
      dots.push(
        <View key={i} style={[styles.dot, {backgroundColor: color}]} />,
      );
    }
    return dots;
  };

  return <View style={styles.line}>{renderDots()}</View>;
};

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
  },
  dot: {
    width: 1,
    height: 1,
    marginRight: 2,
  },
});

export default DottedLine;
