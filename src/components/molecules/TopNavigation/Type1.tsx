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
  leftIconChild?: React.ReactNode;
  backAction: () => void;
};

/** == COMPONENT === */
const Type1: React.FC<Props> = (props: Props) => {
  /** => icon left */
  const iconLeft = () => {
    return (
      <TouchableOpacity
        style={styles.iconLeftContainer}
        onPress={props.backAction}>
        <View style={{paddingLeft: 16}}>{props.leftIconChild}</View>
      </TouchableOpacity>
    );
  };
  /** => header */
  const header = () => {
    return (
      <View style={{overflow: 'hidden', paddingBottom: 4}}>
        <View
          style={[
            styles.headerContainer,
            {
              backgroundColor: props.bgColor,
            },
          ]}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              {iconLeft()}
            </View>
            <View style={styles.titleContainer}>
              <Text
                numberOfLines={1}
                style={[styles.centerTitle, {color: props.itemStrokeColor}]}>
                {elipsisText(props.title, props.maxLengthTitle ?? 20)}
              </Text>
            </View>
            <View style={{flex: 1}} />
          </View>
        </View>
      </View>
    );
  };
  /** => MAIN */
  return <>{header()}</>;
};

export default Type1;

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    width: wp('100%'),
    borderBottomWidth: 1,
    borderBottomColor: color.Dark[300],
    paddingTop: mvs(44),
    paddingBottom: mvs(24),
  },
  titleContainer: {
    flex: 3,
  },
  centerTitle: {
    fontfamily: font.MontserratRegular,
    textAlign: 'center',
    fontSize: normalize(16),
    fontWeight: '600',
    lineHeight: 20,
  },

  iconContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  iconLeftContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  iconRightMultiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconRightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
