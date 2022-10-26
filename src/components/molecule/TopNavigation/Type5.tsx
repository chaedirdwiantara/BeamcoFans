import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {elipsisText} from '../../../utils';
import {Avatar, Gap} from '../../atom';
import topNavstyles from './styles';

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
        style={topNavstyles.iconLeftContainer}
        onPress={props.leftIconAction}>
        <Avatar imgUri={props.profileUri} size={34} />
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
        <View style={topNavstyles.leftContainer}>
          {iconLeft()}
          <Gap width={8} />
          <Text
            numberOfLines={1}
            style={[topNavstyles.centerTitle, {color: props.itemStrokeColor}]}>
            {elipsisText(`Hi, ${props.name}`, props.maxLengthTitle ?? 20)}
          </Text>
        </View>
        <View style={topNavstyles.rightContainer}>
          {/* Need to change this text into chip money component */}
          <Text
            numberOfLines={1}
            style={[topNavstyles.centerTitle, {color: props.itemStrokeColor}]}>
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
