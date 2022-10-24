import React, {FC} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';

const {width, height} = Dimensions.get('screen');

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
}

type Props = {
  point: number;
  title: string;
};

const Item: FC<Props> = ({point, title}) => {
  return (
    <View style={styles.itemStyle}>
      <Text style={styles.pointStyle}>{point}</Text>
      <Text style={styles.titleStyle}>{title}</Text>
    </View>
  );
};

const UserInfoCard: FC<UserInfoCardProps> = (props: UserInfoCardProps) => {
  const {type = ''} = props;
  const listItem =
    type === 'self'
      ? [
          {
            point: 4100,
            title: 'FOLLOWING',
          },
          {
            point: 1600,
            title: 'FAV SONGS',
          },
          {
            point: 2100,
            title: 'POINTS',
          },
        ]
      : [
          {
            point: 4100,
            title: 'FANS',
          },
          {
            point: 18300,
            title: 'FOLLOWERS',
          },
          {
            point: 44,
            title: 'RELEASE',
          },
          {
            point: 4,
            title: 'PLAYLIST',
          },
          {
            point: 11,
            title: 'RANK',
          },
        ];

  const newStyles = type !== 'self' && {
    backgroundColor: 'transparent',
    marginHorizontal: 5,
  };

  return (
    <View style={styles.root}>
      {listItem.map((val, i) => (
        <View key={i} style={styles.containerItem}>
          <Item point={val.point} title={val.title} />

          {listItem.length !== i + 1 && (
            <View style={[styles.separator, newStyles]} />
          )}
        </View>
      ))}
    </View>
  );
};

export default UserInfoCard;

const styles = StyleSheet.create({
  root: {
    width: width * 0.9,
    height: height * 0.1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: Color.Dark[600],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  containerItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  separator: {
    width: 1.5,
    height: 18,
    backgroundColor: '#D1D1D1',
    marginHorizontal: 12,
  },
  itemStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointStyle: {
    fontFamily: Font.MontserratSemiBold,
    fontSize: 17,
    color: '#FFF',
  },
  titleStyle: {
    fontFamily: Font.MontserratMedium,
    fontSize: 11,
    color: Color.Dark[50],
  },
});
