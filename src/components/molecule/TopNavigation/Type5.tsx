import {Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import React from 'react';
import {elipsisText} from '../../../utils';
import {Avatar, Gap} from '../../atom';
import topNavstyles from './topNavstyles';
import {font} from '../../../theme';
import {ChipMoney} from '../../atom/ChipMoney/ChipMoney';
import {DefaultAvatar} from '../../../assets/icon';
import {useTranslation} from 'react-i18next';

/** === INTERFACE === */
type Props = {
  name: string;
  maxLengthTitle?: number;
  bgColor?: string;
  itemStrokeColor?: string;
  leftIconAction: () => void;
  onPressCoin?: () => void;
  rightIcon: React.ReactNode;
  rightIconAction?: () => void;
  profileUri: string;
  points: number;
  containerStyles?: ViewStyle;
  guest?: boolean;
  activeOpacity?: number;
  leftContainerStyles?: ViewStyle;
};

/** == COMPONENT === */
const Type5: React.FC<Props> = (props: Props) => {
  const {t} = useTranslation();
  /** => icon left */
  const iconLeft = () => {
    return (
      <>
        {props.profileUri ? (
          <TouchableOpacity
            style={topNavstyles.iconLeftContainer}
            activeOpacity={props.activeOpacity ?? 1}
            onPress={props.leftIconAction}>
            <Avatar imgUri={props.profileUri} size={34} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={props.leftIconAction}
            activeOpacity={props.activeOpacity ?? 1}>
            <DefaultAvatar.ProfileIcon />
          </TouchableOpacity>
        )}
      </>
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
          props.containerStyles,
        ]}>
        <TouchableOpacity
          style={[topNavstyles.leftContainer, props.leftContainerStyles]}
          onPress={() => (props.guest ? null : props.leftIconAction())}>
          {props.guest ? <DefaultAvatar.ProfileIcon /> : iconLeft()}
          <Gap width={8} />
          <Text
            numberOfLines={1}
            style={[
              topNavstyles.centerTitle,
              {color: props.itemStrokeColor, fontFamily: font.InterSemiBold},
            ]}>
            {props.guest
              ? 'Guest'
              : elipsisText(
                  t('Home.Topbar.Hi', {name: props.name}),
                  props.maxLengthTitle ?? 20,
                )}
          </Text>
        </TouchableOpacity>
        <View style={topNavstyles.rightContainer}>
          {/* <TouchableOpacity onPress={props.onPressCoin}>
            <ChipMoney balance={props.points} />
          </TouchableOpacity>
          <Gap width={12} /> */}
          {iconRight()}
        </View>
      </View>
    );
  };
  /** => MAIN */
  return <>{header()}</>;
};

export default Type5;
