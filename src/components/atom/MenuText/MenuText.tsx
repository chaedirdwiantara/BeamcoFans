import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {ArrowRightIcon} from '../../../assets/icon';

const {width} = Dimensions.get('screen');

interface Props {
  text?: string;
  subtitle?: string;
  icon?: any;
  onPress?: () => void;
}

const LeftIcon: React.FC<Props> = (props: Props) => {
  const {icon, text, onPress} = props;
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      {icon}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const RightIcon: React.FC<Props> = (props: Props) => {
  const {icon = <ArrowRightIcon />, text, onPress} = props;

  return (
    <TouchableOpacity style={styles.root2} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
      {icon}
    </TouchableOpacity>
  );
};

const LeftIconWithSubtitle: React.FC<Props> = (props: Props) => {
  const {icon, text, subtitle, onPress} = props;
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      {icon}
      <View>
        <Text style={styles.text2}>{text}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const MenuText = {LeftIcon, RightIcon, LeftIconWithSubtitle};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  root2: {
    width: width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Color.Dark[500],
    paddingBottom: 20,
  },
  text: {
    fontSize: 14,
    paddingLeft: 10,
    color: Color.Neutral[10],
    fontFamily: Font.InterMedium,
  },
  text2: {
    fontSize: 17,
    paddingLeft: 10,
    color: Color.Neutral[10],
    fontFamily: Font.InterSemiBold,
  },
  subtitle: {
    fontSize: 12,
    paddingLeft: 10,
    color: Color.Dark[50],
    fontFamily: Font.InterMedium,
  },
});
