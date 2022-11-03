import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {ms} from 'react-native-size-matters';
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';
import {normalize} from '../../../utils';

interface AvatarProps {
  imgUri: string;
  size?: number;
  username?: string;
}

export const AvatarUsername: React.FC<AvatarProps> = (props: AvatarProps) => {
  const {imgUri, username = 'You', size = ms(32)} = props;
  return (
    <View style={styles.root2}>
      <Image source={{uri: imgUri}} style={[styles.root, {width: size}]} />
      <Text style={styles.username}>{`Hi, ${username}`}</Text>
    </View>
  );
};

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
    color: Color.Pink.linear,
    fontSize: normalize(16),
    fontFamily: Font.InterSemiBold,
    marginLeft: ms(10),
  },
});
