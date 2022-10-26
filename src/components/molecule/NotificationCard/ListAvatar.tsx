import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';
import {Avatar} from '../../atom';

const {width} = Dimensions.get('screen');

interface AvatarItem {
  uri?: string;
}

interface ListAvatarProps {
  data?: AvatarItem[];
  size?: number;
}

export const ListAvatar: React.FC<ListAvatarProps> = (
  props: ListAvatarProps,
) => {
  const {data = [], size = width * 0.08} = props;
  const moreThanThree = ` + ${data.length - 3}`;
  return (
    <View style={styles.root}>
      {data?.map((val, i) => {
        if (i < 3) {
          return (
            <View style={styles.root}>
              <Avatar key={i} size={size} imgUri={val.uri || ''} />
            </View>
          );
        }
      })}
      {data?.length > 3 && <Text style={styles.text}>{moreThanThree}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    padding: 3,
    alignItems: 'center',
  },
  text: {
    padding: 2,
    color: Color.Neutral[10],
    fontSize: 15,
    fontFamily: Font.InterMedium,
  },
});
