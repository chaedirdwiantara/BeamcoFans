import {
  Text,
  View,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {mvs} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import {color, typography} from '../../../theme';
import {widthPercentage, widthResponsive} from '../../../utils';

interface AvatarProps {
  imgUri: string | undefined;
  initialName?: string;
  size?: number;
  username?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  iconInCenter?: boolean;
  backgroundColor?: string;
  showBorder?: boolean;
  borderColor?: string;
  disabledIcon?: boolean;
  containerStyles?: ViewStyle;
}

export const AvatarProfileNew: React.FC<AvatarProps> = (props: AvatarProps) => {
  const {
    initialName,
    imgUri,
    size = widthPercentage(80),
    icon,
    iconInCenter,
    backgroundColor,
    showBorder,
    borderColor,
    disabledIcon,
    onPress,
    containerStyles,
  } = props;

  const initial = imgUri === '' || imgUri === null || imgUri === undefined;
  const stylesIcon = iconInCenter
    ? {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }
    : {
        top: widthResponsive(-3),
        left: widthResponsive(50),
      };

  const PressableIcon = () => {
    return (
      <TouchableOpacity
        style={[styles.icon, {width: size}, stylesIcon]}
        activeOpacity={1}
        disabled={disabledIcon}
        onPress={onPress}>
        {icon}
      </TouchableOpacity>
    );
  };

  const InitialComp = () => {
    return (
      <View
        style={[
          styles.root,
          {
            width: size,
            backgroundColor: backgroundColor
              ? backgroundColor
              : color.Success[400],
            borderWidth: showBorder ? mvs(4) : 0,
            borderColor,
          },
        ]}>
        <Text style={[typography.Heading4, styles.name]}>{initialName}</Text>
      </View>
    );
  };

  return (
    <View style={containerStyles}>
      <PressableIcon />
      {initial ? (
        <InitialComp />
      ) : (
        <FastImage
          source={{uri: imgUri}}
          style={[
            styles.root,
            {
              width: size,
              borderColor: borderColor ? borderColor : '#563354',
              borderWidth: showBorder ? mvs(4) : 0,
              borderRadius: 10000,
            },
          ]}
          testID={'ssu-avatar'}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: color.Neutral[10],
  },
  icon: {
    zIndex: 1,
    position: 'absolute',
  },
});
