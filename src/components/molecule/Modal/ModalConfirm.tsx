import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';

const {width} = Dimensions.get('screen');

interface ModalConfirmProps {
  title?: string;
  subtitle?: string;
  goBack?: () => void;
}

export const ModalConfirm: React.FC<ModalConfirmProps> = (
  props: ModalConfirmProps,
) => {
  const {title, subtitle, goBack} = props?.route?.params;
  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={goBack}>
            <Text style={styles.option}>{'No'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goBack}>
            <Text style={styles.option}>{'Yes'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  card: {
    backgroundColor: Color.Dark[900],
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: width * 0.8,
  },
  title: {
    fontSize: 17,
    color: Color.Neutral[10],
    fontFamily: Font.MontserratSemiBold,
  },
  subtitle: {
    fontSize: 14,
    color: Color.Neutral[10],
    fontFamily: Font.MontserratRegular,
    marginTop: 5,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  option: {
    fontSize: 14,
    paddingHorizontal: 12,
    color: Color.Neutral[10],
    fontFamily: Font.MontserratRegular,
  },
});
