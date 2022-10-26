import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {elipsisText} from '../../../utils';
import topNavstyles from './styles';

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
        <View style={topNavstyles.leftContainer}></View>
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
  return <>{header()}</>;
};

export default Type3;
