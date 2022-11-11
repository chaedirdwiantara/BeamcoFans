import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';

import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';
import {Avatar, ButtonGradient} from '../../atom';
import Typography from '../../../theme/Typography';

interface Props {
  artistName?: string;
  imgUri: string;
  listener?: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}

export const FollowArtistCard: React.FC<Props> = (props: Props) => {
  const {imgUri, artistName, listener, onPress, containerStyle} = props;
  return (
    <View style={[styles.root, containerStyle]}>
      <View style={styles.containerContent}>
        <Avatar imgUri={imgUri} />
        <View>
          <Text style={[Typography.Button2, styles.text]}>{artistName}</Text>
          <Text style={styles.subtitle}>{listener + ' listener'}</Text>
        </View>
      </View>
      <ButtonGradient
        label={'Follow'}
        gradientStyles={styles.btnContainer}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthPercentage(15),
  },
  containerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingLeft: widthPercentage(10),
    marginBottom: mvs(2),
    color: Color.Neutral[10],
    fontSize: normalize(15),
  },
  subtitle: {
    fontSize: normalize(11),
    paddingLeft: ms(10),
    color: Color.Dark[50],
    fontFamily: Font.InterRegular,
    lineHeight: mvs(12),
  },
  btnContainer: {
    width: undefined,
    aspectRatio: undefined,
    height: heightPercentage(35),
    paddingHorizontal: widthPercentage(10),
    marginVertical: heightPercentage(2),
    marginHorizontal: widthPercentage(2),
  },
});
