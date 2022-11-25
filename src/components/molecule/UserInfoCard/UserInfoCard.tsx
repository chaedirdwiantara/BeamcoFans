import React, {FC} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {
  infoProfileArtist,
  InfoProfileType,
  infoProfileUser,
} from '../../../data/profile';
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';
import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';

interface UserInfoCardProps {
  type?: string;
  following?: number;
  favSong?: number;
  point?: number;
  fans?: number;
  follower?: number;
  release?: number;
  playlist?: number;
  rank?: number;
  containerStyles?: ViewStyle;
  onPress?: (screenName: string) => void;
}

type Props = {
  point: number;
  title: string;
  onPress?: (screenName: string) => void;
};

const Item: FC<Props> = ({point, title, onPress}) => {
  return (
    <TouchableOpacity style={styles.itemStyle} onPress={onPress}>
      <Text style={styles.pointStyle}>{point}</Text>
      <Text style={styles.titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const UserInfoCard: FC<UserInfoCardProps> = (props: UserInfoCardProps) => {
  const {type = '', containerStyles, onPress} = props;
  const listItem: InfoProfileType[] =
    type === 'self' ? infoProfileUser : infoProfileArtist;

  const newStyles = type !== 'self' && {
    backgroundColor: 'transparent',
    marginHorizontal: widthPercentage(5),
  };

  return (
    <View style={[styles.root, containerStyles]}>
      {listItem.map((val, i) => (
        <View key={i} style={styles.containerItem}>
          <Item point={val.point} title={val.title} onPress={onPress} />

          {listItem.length !== i + 1 && (
            <View style={[styles.separator, newStyles]} />
          )}
        </View>
      ))}
    </View>
  );
};

export {UserInfoCard};

const styles = StyleSheet.create({
  root: {
    width: width * 0.9,
    height: undefined,
    aspectRatio: widthPercentage(327 / 74),
    backgroundColor: Color.Dark[600],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 12,
  },
  containerItem: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  separator: {
    width: mvs(1),
    height: heightPercentage(18),
    backgroundColor: '#D1D1D1',
    marginHorizontal: widthPercentage(15),
  },
  itemStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointStyle: {
    fontFamily: Font.InterSemiBold,
    fontSize: normalize(16),
    color: Color.Neutral[10],
  },
  titleStyle: {
    fontFamily: Font.InterMedium,
    fontSize: normalize(11),
    color: Color.Dark[50],
  },
});
