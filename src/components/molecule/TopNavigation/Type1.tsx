import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ArrowRightIcon, HomeIcon} from '../../../assets/icon';
import {elipsisText, widthPercentage} from '../../../utils';
import topNavstyles from './topNavstyles';
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
        style={topNavstyles.iconLeftContainer}
        onPress={props.leftIconAction}>
        <ArrowRightIcon
          stroke={color.Neutral[10]}
          style={{marginLeft: widthPercentage(24)}}
        />
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
            style={[
              topNavstyles.centerTitle,
              {color: props.itemStrokeColor, fontFamily: font.InterSemiBold},
            ]}>
            {elipsisText(props.title, props.maxLengthTitle ?? 20)}
          </Text>
        </View>
        <View style={topNavstyles.rightContainer}></View>
      </View>
    );
  };
  /** => MAIN */
  return <>{header()}</>;
};

export default Type1;
