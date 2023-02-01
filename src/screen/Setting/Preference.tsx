import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {ArrowLeftIcon} from '../../assets/icon';
import {Button, Dropdown, Gap, TopNavigation} from '../../components';
import {dataGenres} from '../../data/Settings/genre';
import {dataMoods} from '../../data/Settings/mood';
import {heightPercentage, widthPercentage} from '../../utils';
import {mvs} from 'react-native-size-matters';

export const PreferenceSettingScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title="Preference"
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{marginBottom: heightPercentage(15)}}
      />
      <Dropdown.Multi
        data={dataGenres}
        placeHolder={'Select Genre'}
        dropdownLabel={'Genre'}
        textTyped={(_newText: string) => null}
        containerStyles={{marginTop: heightPercentage(15)}}
        initialValue={[]}
      />
      <Gap height={10} />
      <Dropdown.Multi
        data={dataMoods}
        placeHolder={'Select Mood'}
        dropdownLabel={'Mood'}
        textTyped={(_newText: string) => null}
        containerStyles={{marginTop: heightPercentage(15)}}
        initialValue={[]}
      />
      <Gap height={40} />
      <Button
        label="Save"
        textStyles={{fontSize: mvs(14)}}
        containerStyles={{width: '100%'}}
        onPress={() => null}
      />
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
