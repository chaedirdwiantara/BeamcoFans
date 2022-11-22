import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {heightPercentage, normalize, widthPercentage} from '../../../utils';
import {SsuInput} from '../../atom';
import {ModalEdit} from './ModalEdit';
import Color from '../../../theme/Color';
import {TopNavigation} from '../TopNavigation';
import Typography from '../../../theme/Typography';
import {ProfileHeaderProps, ProfileHeader} from './Header';
import {ArrowLeftIcon, SaveIcon} from '../../../assets/icon';

interface EditProfileProps {
  profile: ProfileHeaderProps[];
  type: string;
  onPressGoBack: () => void;
  onPressSave: (params: object) => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({
  type,
  profile,
  onPressGoBack,
  onPressSave,
}) => {
  const [bio, setBio] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [uriType, setUriType] = useState('');
  const [uri, setUri] = useState({
    avatarUri: {uri: ''},
    backgroundUri: {uri: ''},
  });

  const onPressIcon = (newType: string) => {
    setModalVisible(true);
    setUriType(newType);
  };

  const sendUri = (val: {assets: string[]}) => {
    setUri({...uri, [uriType]: val?.assets[0]});
  };

  const avatarUri = uri?.avatarUri?.uri || profile.avatarUri || null;
  const backgroundUri =
    uri?.backgroundUri?.uri || profile.backgroundUri || null;

  return (
    <View style={styles.root}>
      <TopNavigation.Type4
        title="Edit Profile"
        rightIcon={<SaveIcon />}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        rightIconAction={() => onPressSave({...uri, bio})}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />
      <ProfileHeader
        type={type}
        avatarUri={avatarUri}
        backgroundUri={backgroundUri}
        fullname={profile.fullname}
        username={profile.username}
        containerStyles={{height: heightPercentage(206)}}
        iconPress={onPressIcon}
      />
      <View style={styles.textAreaContainer}>
        <Text style={[Typography.Overline, styles.label]}>Bio</Text>
        <SsuInput.TextArea
          value={bio}
          onChangeText={(newText: string) => setBio(newText)}
          placeholder={'Type here...'}
          containerStyles={styles.textArea}
          maxLength={110}
        />
        <Text style={styles.length}>{`${bio.length}/110`}</Text>
      </View>

      <ModalEdit
        modalVisible={isModalVisible}
        sendUri={sendUri}
        onPressClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  label: {
    fontSize: normalize(12),
    color: Color.Dark[50],
    marginBottom: heightPercentage(5),
    marginTop: heightPercentage(20),
  },
  textAreaContainer: {
    width: '90%',
    alignSelf: 'center',
    flex: 1,
  },
  textArea: {
    paddingHorizontal: 0,
  },
  length: {
    fontSize: normalize(12),
    color: Color.Neutral[10],
    marginTop: heightPercentage(5),
  },
});
