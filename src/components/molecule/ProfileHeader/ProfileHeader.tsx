import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import EditIcon from '../../../assets/icon/Edit.icon';
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';
import {Avatar} from '../../atom';

const {width, height} = Dimensions.get('screen');

interface ProfileHeaderProps {
  avatarUri?: string;
  fullname?: string;
  username?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = (
  props: ProfileHeaderProps,
) => {
  const {avatarUri = '', fullname, username} = props;
  return (
    <View style={styles.root}>
      <View style={styles.containerUser}>
        <Avatar imgUri={avatarUri} size={width * 0.2} />
        <Text style={styles.fullname}>{fullname}</Text>
        <Text style={styles.username}>{username}</Text>
      </View>
      <EditIcon style={styles.editIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Color.Green[100],
    width: width,
    height: height * 0.3,
    justifyContent: 'center',
  },
  containerUser: {
    alignItems: 'center',
  },
  fullname: {
    marginTop: 20,
    fontSize: 20,
    color: Color.Neutral[10],
    fontFamily: Font.InterSemiBold,
  },
  username: {
    marginTop: 5,
    fontSize: 14,
    color: Color.Neutral[10],
    fontFamily: Font.InterMedium,
  },
  editIcon: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
});
