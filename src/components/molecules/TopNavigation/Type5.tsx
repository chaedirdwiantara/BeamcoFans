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
import {Avatar, Gap} from '../../atom';

/** === INTERFACE === */
type Props = {
  name: string;
  maxLengthTitle?: number;
  bgColor?: string;
  itemStrokeColor?: string;
  leftIconAction: () => void;
  rightIcon: React.ReactNode;
  rightIconAction?: () => void;
  profileUri: string;
  points: string;
};

/** == COMPONENT === */
const Type5: React.FC<Props> = (props: Props) => {
  /** => icon left */
  const iconLeft = () => {
    return (
      <TouchableOpacity
        style={styles.iconLeftContainer}
        onPress={props.leftIconAction}>
        <Avatar imgUri={props.profileUri} size={34} />
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
      <View
        style={[
          styles.headerContainer,
          {
            backgroundColor: props.bgColor,
          },
        ]}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {iconLeft()}
          <Gap width={8} />
          <Text
            numberOfLines={1}
            style={[styles.centerTitle, {color: props.itemStrokeColor}]}>
            {elipsisText(`Hi, ${props.name}`, props.maxLengthTitle ?? 20)}
          </Text>
        </View>
        <View
          style={{
            // flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {/* Need to change this text into chip money component */}
          <Text
            numberOfLines={1}
            style={[styles.centerTitle, {color: props.itemStrokeColor}]}>
            {props.points}
          </Text>
          <Gap width={12} />
          {iconRight()}
        </View>
      </View>
    );
  };
  /** => MAIN */
  return <>{header()}</>;
};

export default Type5;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderBottomColor: color.Dark[300],
    paddingTop: mvs(44),
    paddingBottom: mvs(24),
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
