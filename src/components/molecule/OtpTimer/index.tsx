import React from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {mvs} from 'react-native-size-matters';
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
        <Button
          label="Resend Code"
          onPress={() => {
            setResend(true);
            props.action();
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
      <View style={styles.renderTimer}>
        <Text style={styles.renderTimeText}>
          You can resend recovery code after <Text>{timer}</Text>
        </Text>
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
    justifyContent: 'center',
    marginTop: mvs(28),
  },
  renderTimer: {
    width: '100%',
    justifyContent: 'center',
    marginTop: mvs(4),
  },
  renderTimeText: {
    color: color.Success[400],
    marginBottom: mvs(13),
  },
});

export default SsuOTPTimer;
