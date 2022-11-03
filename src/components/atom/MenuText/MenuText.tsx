import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';

import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {normalize} from '../../../utils';
import Typography from '../../../theme/Typography';
import {ArrowRightIcon} from '../../../assets/icon';

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
      <Text style={[Typography.Button2, styles.text]}>{text}</Text>
    </TouchableOpacity>
  );
};

const RightIcon: React.FC<Props> = (props: Props) => {
  const {icon = <ArrowRightIcon />, text, onPress} = props;

  return (
    <TouchableOpacity style={styles.root2} onPress={onPress}>
      <Text style={[Typography.Body2, styles.text]}>{text}</Text>
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
    width: ms(327),
    height: mvs(28),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: mvs(1),
    borderBottomColor: Color.Dark[500],
    paddingBottom: mvs(8),
  },
  text: {
    paddingLeft: ms(10),
    color: Color.Neutral[10],
  },
  text2: {
    fontSize: normalize(17),
    paddingLeft: ms(10),
    marginBottom: mvs(2),
    color: Color.Neutral[10],
    fontFamily: Font.InterSemiBold,
    lineHeight: mvs(24),
  },
  subtitle: {
    fontSize: normalize(12),
    paddingLeft: ms(10),
    color: Color.Dark[50],
    fontFamily: Font.InterMedium,
    lineHeight: mvs(12),
  },
});
