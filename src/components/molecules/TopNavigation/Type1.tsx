import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {HomeIcon} from '../../../assets/icon';
import {elipsisText, normalize} from '../../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms, mvs} from 'react-native-size-matters';
import {color, font} from '../../../theme';

/** === INTERFACE === */
type Props = {
  title: string;
  maxLengthTitle?: number;
  bgColor?: string;
  itemStrokeColor?: string;
  leftIconAction: () => void;
};

/** == COMPONENT === */
const Type1: React.FC<Props> = (props: Props) => {
  /** => icon left */
  const iconLeft = () => {
    return (
      <TouchableOpacity
        style={styles.iconLeftContainer}
        onPress={props.leftIconAction}>
        <HomeIcon stroke={'white'} />
      </TouchableOpacity>
    );
  };

  /** => header */
  const header = () => {
    return (
      <View
        style={[
          styles.headerContainer,
          {
            backgroundColor: props.bgColor,
          },
        ]}>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
          }}>
          {iconLeft()}
        </View>
        <View style={{flex: 1}}>
          <Text
            numberOfLines={1}
            style={[styles.centerTitle, {color: props.itemStrokeColor}]}>
            {elipsisText(props.title, props.maxLengthTitle ?? 20)}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
          }}></View>
      </View>
    );
  };
  /** => MAIN */
  return <>{header()}</>;
};

export default Type1;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: mvs(1),
    borderBottomColor: color.Dark[300],
    paddingTop: mvs(44),
    paddingBottom: mvs(24),
  },
  centerTitle: {
    fontfamily: font.MontserratRegular,
    textAlign: 'center',
    fontSize: normalize(16),
    fontWeight: '600',
    lineHeight: mvs(20),
  },
  iconLeftContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
