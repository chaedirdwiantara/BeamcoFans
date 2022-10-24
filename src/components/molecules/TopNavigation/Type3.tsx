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
  rightIcon: React.ReactNode;
  rightIconAction?: () => void;
};

/** == COMPONENT === */
const Type3: React.FC<Props> = (props: Props) => {
  /** => icon right */
  const iconRight = () => {
    return (
      <TouchableOpacity
        style={styles.iconRightContainer}
        onPress={props.rightIconAction}>
        {props.rightIcon}
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
          }}></View>
        <View style={styles.titleContainer}>
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
          }}>
          {iconRight()}
        </View>
      </View>
    );
  };
  /** => MAIN */
  return <>{header()}</>;
};

export default Type3;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: color.Dark[300],
    paddingTop: mvs(44),
    paddingBottom: mvs(24),
  },
  titleContainer: {
    flex: 1,
  },
  centerTitle: {
    fontfamily: font.MontserratRegular,
    textAlign: 'center',
    fontSize: normalize(16),
    fontWeight: '600',
    lineHeight: 20,
  },
  iconRightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
