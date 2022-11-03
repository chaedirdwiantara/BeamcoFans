import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {color} from '../../../theme';
import {Button} from '../../atom';
// import { SnbButton } from '../Button/Button';
// import { SnbText } from '../Typography/Typography';

interface Props {
  action: () => void;
  timer?: number;
}

const SsuOTPTimer: React.FC<Props> = props => {
  const [resend, setResend] = React.useState(false);
  const [timer, setTimer] = React.useState(0);

  React.useEffect(() => {
    if (props.timer) {
      setTimer(props.timer);
    }
  }, [props.timer]);

  React.useEffect(() => {
    let temp = 0;
    let interval: any = null;
    if (resend) {
      /* istanbul ignore next */
      interval = setInterval(() => {
        temp += 1;
        if (timer) {
          setTimer(timer - temp);
        }
      }, 1000);
    }
    if (timer <= 0) {
      clearInterval(interval);
      setResend(false);
      if (props.timer) {
        setTimer(props.timer);
      }
    }
    return () => clearInterval(interval);
  }, [resend, timer, props.timer]);

  const renderResend = () => {
    return (
      <View style={styles.resend}>
        {/* <View>
          <Text>Tidak menerima kode?</Text>
        </View> */}

        <Button
          label="Resend Code"
          onPress={() => {
            setResend(true);
            props.action();
          }}
          buttonWidth={'100%'}
          type="border"
          backgroundColor={color.Pink[300]}
        />
      </View>
    );
  };

  const renderTimer = () => {
    return (
      <View style={{...styles.resend, paddingTop: 18}}>
        <Text style={{alignItems: 'center'}}>
          Mohon tunggu dalam <Text>{timer} detik</Text> untuk kirim ulang
        </Text>
      </View>
    );
  };

  return resend ? renderTimer() : renderResend();
};

SsuOTPTimer.defaultProps = {
  timer: 90,
};

const styles = StyleSheet.create({
  resend: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: 8,
    // paddingVertical: 8,
    // backgroundColor: 'grey',
  },
});

export default SsuOTPTimer;
