import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {ArrowLeftIcon} from '../../../assets/icon';

import {SsuInput} from '../../atom';
import Color from '../../../theme/Color';
import {TopNavigation} from '../TopNavigation';
import {heightPercentage, widthPercentage} from '../../../utils';

interface AccountProps {
  onPressGoBack: () => void;
}

export const AccountContent: React.FC<AccountProps> = ({onPressGoBack}) => {
  const [state, setState] = useState({
    username: '',
    fullname: '',
    gender: '',
    location: '',
  });
  const [error] = useState({
    username: false,
    fullname: false,
    gender: false,
    location: false,
  });

  const onChangeText = (key: string, value: string) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title="Account"
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />

      <SsuInput.InputText
        value={state.username}
        isError={error.username}
        placeholder={'Referral Code'}
        errorMsg={'Referral code invalid'}
        fontColor={Color.Neutral[10]}
        borderColor={Color.Pink.linear}
        onChangeText={(newText: any) => onChangeText('username', newText)}
      />

      <SsuInput.InputText
        value={state.fullname}
        isError={error.fullname}
        placeholder={'Referral Code'}
        errorMsg={'Referral code invalid'}
        fontColor={Color.Neutral[10]}
        borderColor={Color.Pink.linear}
        onChangeText={(newText: any) => onChangeText('fullname', newText)}
      />

      <SsuInput.InputText
        value={state.gender}
        isError={error.gender}
        placeholder={'Referral Code'}
        errorMsg={'Referral code invalid'}
        fontColor={Color.Neutral[10]}
        borderColor={Color.Pink.linear}
        onChangeText={(newText: any) => onChangeText('gender', newText)}
      />

      <SsuInput.InputText
        value={state.location}
        isError={error.location}
        placeholder={'Referral Code'}
        errorMsg={'Referral code invalid'}
        fontColor={Color.Neutral[10]}
        borderColor={Color.Pink.linear}
        onChangeText={(newText: any) => onChangeText('location', newText)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  textVersion: {
    color: Color.Neutral[10],
    paddingLeft: widthPercentage(15),
    paddingTop: heightPercentage(15),
  },
  textSignOut: {
    color: Color.Neutral[10],
    paddingLeft: widthPercentage(15),
  },
  containerSignout: {
    flexDirection: 'row',
    paddingLeft: widthPercentage(15),
    position: 'absolute',
    bottom: heightPercentage(20),
  },
});
