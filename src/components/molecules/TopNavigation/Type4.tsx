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
  rightIcon: React.ReactNode;
  rightIconAction?: () => void;
};

/** == COMPONENT === */
const Type4: React.FC<Props> = (props: Props) => {
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
      <View style={{overflow: 'hidden', paddingBottom: 4}}>
        <View
          style={[
            styles.headerContainer,
            {
              backgroundColor: props.bgColor,
            },
          ]}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              {iconLeft()}
            </View>
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
        </View>
      </View>
    );
  };
  /** => MAIN */
  return <>{header()}</>;
};

export default Type4;

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
  iconLeftContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  iconRightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
