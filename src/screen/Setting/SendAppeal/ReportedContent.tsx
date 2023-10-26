import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {width} from '../../../utils';
import {color, font} from '../../../theme';
import {ArrowLeftIcon} from '../../../assets/icon';
import {RootStackParams} from '../../../navigations';
import {useNavigation} from '@react-navigation/native';
import {useSettingHook} from '../../../hooks/use-setting.hook';
import {CommentAppeal, TopNavigation} from '../../../components';
import {CommentReportedType} from '../../../interface/setting.interface';

export const ReportedContentScreen: React.FC = () => {
  const {t} = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {listViolation, getListViolations} = useSettingHook();
  const [selectedContent, setSelectedContent] = useState<number>(-1);

  useEffect(() => {
    getListViolations();
  }, []);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToSendAppeal = (val: CommentReportedType) => {
    setSelectedContent(val.reportedViolationId);
    navigation.navigate('SendAppeal', {selectedViolation: val});
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.Report.Modal.SendAppeal')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{
          marginBottom: mvs(10),
          paddingHorizontal: ms(15),
        }}
      />

      <View style={styles.containerContent}>
        <Text style={styles.title}>
          {t('Setting.SendAppeal.ReportedContent.Title')}
        </Text>
        <Text style={styles.subtitle}>
          {t('Setting.SendAppeal.ReportedContent.Subtitle')}
        </Text>
        {listViolation?.commentReported.map((val, i) => (
          <CommentAppeal
            key={i}
            isSelected={val.reportedViolationId === selectedContent}
            fullname={val.commentOwner.fullname}
            username={val.commentOwner.username}
            repliedTo={val.repliedTo}
            postDate={val.timeAgo}
            caption={val.caption}
            likesCount={val.likesCount}
            commentsCount={val.commentsCount}
            onPressSelected={() => goToSendAppeal(val)}
            containerStyles={{marginBottom: mvs(15)}}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  containerContent: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: mvs(10),
  },
  title: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: mvs(15),
    lineHeight: mvs(20),
  },
  subtitle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: mvs(14),
    lineHeight: mvs(20),
    marginTop: mvs(20),
    marginBottom: mvs(15),
  },
});
