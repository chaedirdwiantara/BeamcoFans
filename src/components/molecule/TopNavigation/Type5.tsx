import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {elipsisText} from '../../../utils';
import {Avatar, Gap} from '../../atom';
import topNavstyles from './topNavstyles';
import {font} from '../../../theme';
import {ChipMoney} from '../../atom/ChipMoney/ChipMoney';

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
  points: number;
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
            borderBottomWidth: 0,
          },
        ]}>
        <View style={topNavstyles.leftContainer}>
          {iconLeft()}
          <Gap width={8} />
          <Text
            numberOfLines={1}
            style={[
              topNavstyles.centerTitle,
              {color: props.itemStrokeColor, fontFamily: font.InterSemiBold},
            ]}>
            {elipsisText(`Hi, ${props.name}`, props.maxLengthTitle ?? 20)}
          </Text>
        </View>
        <View style={topNavstyles.rightContainer}>
          <ChipMoney balance={props.points} />
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