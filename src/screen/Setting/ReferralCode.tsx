import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  ReferAFriend,
  TabFilter,
  TopNavigation,
  UseReferralContent,
} from '../../components';
import Color from '../../theme/Color';
import {ArrowLeftIcon} from '../../assets/icon';
import {RootStackParams} from '../../navigations';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {heightPercentage, width, widthPercentage} from '../../utils';

export const ReferralCodeSetting: React.FC = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {dataProfile, getProfileUser} = useProfileHook();
  const [modeUseReferral, setModeUseReferral] = useState<string>('');
  const [refCode, setRefCode] = useState<string>('');

  useEffect(() => {
    getProfileUser();
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(-0);
  const [filter] = useState([
    {filterName: t('Setting.Referral.ReferFriend.Title')},
    {filterName: t('Setting.Referral.UseRefer.Title')},
  ]);
  const filterData = (item: any, index: any) => {
    setSelectedIndex(index);
  };

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const handleWebview = (title: string, url: string) => {
    navigation.navigate('Webview', {
      title: title,
      url: url,
    });
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.Referral.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{
          marginBottom: heightPercentage(15),
          paddingHorizontal: widthPercentage(10),
        }}
      />

      {dataProfile && (
        <>
          <TabFilter.Type1
            filterData={filter}
            onPress={filterData}
            selectedIndex={selectedIndex}
            TouchableStyle={{width: width * 0.45}}
            translation={true}
          />

          {filter[selectedIndex].filterName ===
          t('Setting.Referral.ReferFriend.Title') ? (
            <ReferAFriend
              username={dataProfile.data.username}
              handleWebview={handleWebview}
            />
          ) : (
            <UseReferralContent
              refCode={refCode}
              setRefCode={setRefCode}
              modeUseReferral={modeUseReferral}
              setModeUseReferral={setModeUseReferral}
              referralFrom={dataProfile.data.referralFrom}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    paddingHorizontal: widthPercentage(12),
  },
});
