import React from 'react';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';

const {width} = Dimensions.get('screen');

interface AvatarProps {
  imgUri: string;
  size?: number;
  username?: string;
}

const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
  const {imgUri, size = width * 0.15} = props;
  return <Image source={{uri: imgUri}} style={[styles.root, {width: size}]} />;
};

const AvatarUsername: React.FC<AvatarProps> = (props: AvatarProps) => {
  const {imgUri, username = 'You', size = width * 0.1} = props;
  return (
    <View style={styles.root2}>
      <Image source={{uri: imgUri}} style={[styles.root, {width: size}]} />
      <Text style={styles.username}>{`Hi, ${username}`}</Text>
    </View>
  );
};

export {Avatar, AvatarUsername};

const styles = StyleSheet.create({
  root: {
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 200,
  },
  root2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: Color.Pink,
    fontSize: 16,
    fontFamily: Font.MontserratSemiBold,
    marginLeft: 10,
  },
});
