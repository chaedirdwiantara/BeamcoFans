import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Gap} from '../../atom';
import {color, font, typography} from '../../../theme';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';

interface ListAvatarProps {
  avatarUri: string;
  title: string;
  text: string;
}

export const ListAvatar: React.FC<ListAvatarProps> = ({
  title,
  text,
  avatarUri = 'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
}) => {
  return (
    <View>
      {title && (
        <Text
          style={[
            typography.Subtitle1,
            {color: color.Success[500], paddingBottom: heightPercentage(10)},
          ]}>
          {title}
        </Text>
      )}
      <View style={styles.containerAvatar}>
        <Avatar size={widthPercentage(44)} imgUri={avatarUri} />
        <Gap width={widthPercentage(10)} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: heightPercentage(12),
  },
  text: {
    fontFamily: font.InterMedium,
    fontSize: normalize(15),
    lineHeight: heightPercentage(20),
    color: color.Neutral[10],
  },
});
