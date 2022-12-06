import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {ArrowLeftIcon, LogOutIcon} from '../../../assets/icon';
import {menuSetting} from '../../../data/Settings/setting';

import Color from '../../../theme/Color';
import Typography from '../../../theme/Typography';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {MenuText} from '../../atom/MenuText/MenuText';
import {TopNavigation} from '../TopNavigation';

interface SettingProps {
  onPressGoBack: () => void;
  onPressGoTo: (screenName: string) => void;
}

export const SettingContent: React.FC<SettingProps> = ({
  onPressGoBack,
  onPressGoTo,
}) => {
  const listMenu = menuSetting;
  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title="Settings"
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{paddingHorizontal: widthPercentage(12)}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {listMenu.map((val, i) => (
          <MenuText.RightIcon
            key={i}
            text={val}
            containerStyles={{marginTop: heightPercentage(12)}}
            onPress={() => onPressGoTo(val.replace(/\s/g, ''))}
          />
        ))}
        <View style={styles.containerText}>
          <Text style={[Typography.Button2, styles.textVersion]}>
            {'Version 1.0.0'}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.containerText}>
        <View style={styles.containerSignout}>
          <LogOutIcon />
          <Text style={[Typography.Button2, styles.textSignOut]}>
            {'Sign Out'}
          </Text>
        </View>
      </View>
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
    paddingTop: heightPercentage(15),
    alignSelf: 'center',
  },
  textSignOut: {
    color: Color.Neutral[10],
    paddingLeft: widthPercentage(15),
  },
  containerSignout: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: heightPercentage(25),
  },
  containerText: {
    width: width * 0.9,
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
