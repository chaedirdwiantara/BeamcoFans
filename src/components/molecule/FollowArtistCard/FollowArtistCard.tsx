import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';

import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {normalize} from '../../../utils';
import {Avatar, Button} from '../../atom';
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
      <Button
        label={'Follow'}
        containerStyles={styles.btnContainer}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: ms(328),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    paddingLeft: ms(10),
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
    paddingHorizontal: ms(10),
    height: mvs(31),
    backgroundColor: Color.Pink[200],
  },
});
