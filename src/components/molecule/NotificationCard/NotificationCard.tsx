import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';
import {ListAvatar} from './ListAvatar';
import HeartIcon from '../../../assets/icon/Heart.icon';

interface NotificationCardProps {
  title?: string;
  description?: string;
}

export const NotificationCard: React.FC<NotificationCardProps> = (
  props: NotificationCardProps,
) => {
  const {title, description} = props;
  const data = [
    {
      uri: 'https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
    },
    {
      uri: 'https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
    },
    {
      uri: 'https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
    },
    {
      uri: 'https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
    },
    {
      uri: 'https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
    },
  ];

  return (
    <View style={styles.root}>
      <HeartIcon style={styles.icon} />
      <View>
        <ListAvatar data={data} />
        <Text style={styles.fullname}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: Color.Dark[500],
  },
  icon: {
    marginRight: 10,
    marginTop: 10,
  },
  fullname: {
    fontSize: 14,
    color: Color.Neutral[10],
    fontFamily: Font.MontserratMedium,
  },
  description: {
    marginTop: 5,
    fontSize: 13,
    color: Color.Neutral[10],
    fontFamily: Font.MontserratRegular,
  },
});
