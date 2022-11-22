import React from 'react';
import FastImage from 'react-native-fast-image';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import {ms} from 'react-native-size-matters';

interface AvatarProps {
  imgUri: string;
  size?: number;
  username?: string;
  showIcon?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
  const {imgUri, size = ms(32), showIcon, icon, onPress} = props;

  const iconComp = () => {
    return (
      <TouchableOpacity style={[styles.icon, {width: size}]} onPress={onPress}>
        {icon}
      </TouchableOpacity>
    );
  };

  return (
    <FastImage
      source={{uri: imgUri}}
      style={[styles.root, {width: size}]}
      testID={'ssu-avatar'}
    />
    <View>
      {showIcon && iconComp()}
      <Image
        source={{uri: imgUri}}
        style={[styles.root, {width: size}]}
        testID={'ssu-avatar'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 200,
  },
  icon: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
