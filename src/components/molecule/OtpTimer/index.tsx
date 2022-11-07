import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {color, font} from '../../../theme';
import {normalize} from '../../../utils';
import countDownFunction from '../../../utils/countDownFunction';
import {Button, SsuToast} from '../../atom';

export const SsuOTPTimer = ({targetDate}: any) => {
  const [resend, setResend] = useState(false);
  const [timer, setTimer] = useState<any>(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [minutes, seconds] = countDownFunction(timer);
  useEffect(() => {
    minutes + seconds <= 0 ? setResend(false) : null;
  }, [minutes, seconds]);

  // ? setTimeout for modal Visibility
  const setVisibility = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    modalVisible && setTimeout(setVisibility, 2000);
  }, [modalVisible]);

  useEffect(() => {
    if (resend) {
      setTimer(new Date().getTime() + targetDate * 1000);
    }
  }, [resend]);

  const renderResend = () => {
    return (
      <View style={styles.resend}>
        <Button
          label="Resend Code"
          onPress={() => {
            setModalVisible(true);
            setResend(true);
          }}
          type="border"
          containerStyles={{
            backgroundColor: color.Pink.linear,
            width: '100%',
            height: mvs(40),
          }}
        />
      </View>
    );
  };

  const renderTimer = () => {
    return (
      <View
        style={[
          styles.renderTimer,
          {marginTop: minutes >= 0 && seconds >= 0 ? mvs(0) : mvs(26)},
        ]}>
        {minutes >= 0 && seconds >= 0 ? (
          <Text style={styles.renderTimeText}>
            You can resend recovery code after{' '}
            <Text>
              {minutes.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
              :
              {seconds.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
            </Text>
          </Text>
        ) : null}

        <Button
          label={'Resend Code'}
          disabled={true}
          type="border"
          containerStyles={{
            backgroundColor: color.Dark[50],
            width: '100%',
            height: mvs(40),
            borderWidth: 0,
          }}
        />
        <SsuToast
          modalVisible={modalVisible}
          onBackPressed={() => setModalVisible(false)}
          children={
            <View style={[styles.modalContainer]}>
              <Text style={[styles.textStyle]}>
                We've just resend a new code!
              </Text>
            </View>
          }
          modalStyle={{marginHorizontal: ms(24)}}
        />
      </View>
    );
  };

  return resend ? renderTimer() : renderResend();
};

const styles = StyleSheet.create({
  resend: {
    width: '100%',
    justifyContent: 'center',
    marginTop: mvs(28),
  },
  renderTimer: {
    width: '100%',
    justifyContent: 'center',
  },
  renderTimeText: {
    color: color.Success[400],
    marginBottom: mvs(7),
  },
  modalContainer: {
    backgroundColor: color.Success[400],
    paddingVertical: mvs(16),
    paddingHorizontal: ms(12),
    borderRadius: 4,
    height: mvs(48),
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    bottom: mvs(22),
  },
  textStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(13),
    lineHeight: mvs(15),
  },
});
