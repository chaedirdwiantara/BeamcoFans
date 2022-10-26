import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {HomeIcon} from '../../../assets/icon';
import {elipsisText} from '../../../utils';
import topNavstyles from './styles';

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
        style={topNavstyles.iconLeftContainer}
        onPress={props.leftIconAction}>
        <HomeIcon stroke={'white'} />
      </TouchableOpacity>
    );
  };
  /** => icon right */
  const iconRight = () => {
    return (
      <TouchableOpacity
        style={topNavstyles.iconRightContainer}
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
          topNavstyles.headerContainer,
          {
            backgroundColor: props.bgColor,
          },
        ]}>
        <View style={topNavstyles.leftContainer}>{iconLeft()}</View>
        <View style={topNavstyles.centerContainer}>
          <Text
            numberOfLines={1}
            style={[topNavstyles.centerTitle, {color: props.itemStrokeColor}]}>
            {elipsisText(props.title, props.maxLengthTitle ?? 20)}
          </Text>
        </View>
        <View style={topNavstyles.rightContainer}>{iconRight()}</View>
      </View>
    );
  };
  /** => MAIN */
  return <View>{header()}</View>;
};

export default Type4;
