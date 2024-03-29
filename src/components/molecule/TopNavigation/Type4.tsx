import React from 'react';
import {Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {font} from '../../../theme';
import topNavstyles from './topNavstyles';
import {HomeIcon} from '../../../assets/icon';

/** === INTERFACE === */
type Props = {
  title?: string;
  maxLengthTitle?: number;
  bgColor?: string;
  itemStrokeColor?: string;
  leftIconAction: () => void;
  leftIcon?: React.ReactNode;
  rightIcon: React.ReactNode;
  disabledRightIcon?: boolean;
  rightIconAction?: () => void;
  containerStyles?: ViewStyle;
};

/** == COMPONENT === */
const Type4: React.FC<Props> = (props: Props) => {
  /** => icon left */
  const iconLeft = () => {
    return (
      <TouchableOpacity
        style={topNavstyles.iconLeftContainer}
        onPress={props.leftIconAction}>
        {props.leftIcon ? props.leftIcon : <HomeIcon stroke={'white'} />}
      </TouchableOpacity>
    );
  };
  /** => icon right */
  const iconRight = (title?: string) => {
    if (title === '') {
      return (
        <View style={topNavstyles.iconRightContainer}>{props.rightIcon}</View>
      );
    }
    return (
      <TouchableOpacity
        style={topNavstyles.iconRightContainer}
        onPress={props.rightIconAction}
        disabled={props.disabledRightIcon}>
        {props.rightIcon}
      </TouchableOpacity>
    );
  };
  /** => header */
  const header = () => {
    return (
      <View
        style={[
          topNavstyles.headerContainer,
          {
            backgroundColor: props.bgColor,
          },
          props.containerStyles,
        ]}>
        <View style={topNavstyles.leftContainer}>{iconLeft()}</View>
        {props?.title && (
          <View style={topNavstyles.centerContainer}>
            <Text
              numberOfLines={1}
              style={[
                topNavstyles.centerTitle,
                {color: props.itemStrokeColor, fontFamily: font.InterSemiBold},
              ]}>
              {props.title}
            </Text>
          </View>
        )}

        <View style={topNavstyles.rightContainer}>
          {iconRight(props.title)}
        </View>
      </View>
    );
  };
  /** => MAIN */
  return <View>{header()}</View>;
};

export default Type4;
