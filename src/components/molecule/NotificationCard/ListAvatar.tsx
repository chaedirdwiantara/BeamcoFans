import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';
import {normalize, widthPercentage} from '../../../utils';
import {Avatar, Gap} from '../../atom';

const {width} = Dimensions.get('screen');

interface AvatarItem {
  uri?: string;
  name?: string;
}

interface ListAvatarProps {
  data?: AvatarItem[];
  size?: number;
  desc?: string;
}

export const ListAvatar: React.FC<ListAvatarProps> = (
  props: ListAvatarProps,
) => {
  const {data = [], size = width * 0.08, desc} = props;
  const moreThanThree = `+${data.length - 3}`;
  return (
    <>
      <View style={styles.root}>
        {data?.map((val, i) => {
          if (i < 3) {
            return (
              <View style={styles.root} key={i}>
                <Avatar key={i} size={size} imgUri={val.uri || ''} />
              </View>
            );
          }
        })}
        {data?.length > 3 && <Text style={styles.text}>{moreThanThree}</Text>}
      </View>
      <Gap height={8} />
      <View style={[styles.root, {flexWrap: 'wrap'}]}>
        {data?.map((val, i) => {
          if (val.name)
            if (i < 3) {
              return (
                <Text style={styles.fullname} key={i}>
                  {val.name} {data.length > 1 ? ', ' : ''}
                </Text>
              );
            }
        })}
        {data.length > 3 ? (
          <Text style={styles.fullname}>
            and {moreThanThree} {desc}
          </Text>
        ) : (
          <Text style={styles.fullname}>{desc}</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingRight: widthPercentage(3),
    alignItems: 'center',
  },
  text: {
    color: Color.Neutral[10],
    fontSize: normalize(15),
    fontFamily: Font.InterMedium,
  },
  fullname: {
    flexWrap: 'wrap',
    fontSize: 14,
    color: Color.Neutral[10],
    fontFamily: Font.InterMedium,
  },
});
