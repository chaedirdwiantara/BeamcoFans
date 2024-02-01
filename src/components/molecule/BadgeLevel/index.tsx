import React from 'react';
import {mvs} from 'react-native-size-matters';
import {StyleSheet, View, Text, Image} from 'react-native';

import {color, font} from '../../../theme';
import {widthResponsive} from '../../../utils';

interface BadgeLevelProps {
  imageUri: string;
  text: string;
  backgroundColor: string;
  size?: 'small' | 'medium';
}

export const BadgeLevel: React.FC<BadgeLevelProps> = (
  props: BadgeLevelProps,
) => {
  const {imageUri, text, backgroundColor, size} = props;

  return (
    <View style={styles(size).root}>
      <Image source={{uri: imageUri}} style={styles(size).lvlImage} />
      <View style={[styles(size).viewStyles, {backgroundColor}]}>
        <Text style={styles(size).textStyle}>{text}</Text>
      </View>
    </View>
  );
};

const styles = (size?: 'small' | 'medium') =>
  StyleSheet.create({
    root: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: size === 'small' ? widthResponsive(5) : widthResponsive(10),
      marginTop: size === 'small' ? 0 : mvs(10),
    },
    viewStyles: {
      paddingVertical: size === 'small' ? mvs(2.5) : mvs(6),
      paddingRight: size === 'small' ? widthResponsive(8) : widthResponsive(15),
      paddingLeft: size === 'small' ? widthResponsive(18) : widthResponsive(25),
      backgroundColor: color.Pink.linear,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textStyle: {
      fontSize: size === 'small' ? mvs(9) : mvs(11),
      fontFamily: font.InterSemiBold,
      color: color.Neutral[10],
    },
    lvlImage: {
      width: size === 'small' ? mvs(20) : mvs(28),
      height: size === 'small' ? mvs(20) : mvs(30),
      position: 'absolute',
      zIndex: 1,
      left: size === 'small' ? widthResponsive(-8) : widthResponsive(-14),
    },
  });
