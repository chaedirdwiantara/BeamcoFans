import React, {FC} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
// import fonts from '../../utils/fonts';
// import colors from '../../utils/colors';
import globalStyles from './GlobalStyle';
// import SnbSvgIcon from '../SvgIcon/SvgIcon';
// import {SnbText} from '../../components/Typography/Typography';
import {color, font} from '../../../theme';
import {HomeIcon, SearchIcon} from '../../../assets/icon';
import {ms, mvs} from 'react-native-size-matters';
import {normalize} from '../../../utils';

interface OTPInputProps {
  pinCount?: number;
  containerStyle?: object;
  boxStyle?: object;
  inputStyle?: object;
  testID?: string;
  clearInputs?: boolean;
  onCodeChanged?: (code: string) => void;
  autoFocusOnLoad?: boolean;
  otpSuccess?: boolean;
  hideIcon?: boolean;
  onCodeFilled?: (result: boolean, code: string) => void;
  code?: string;
  valMessage?: string;
  showMessage?: boolean;
  type: 'default' | 'error' | 'success';
}

const fields: TextInput[] | null[] = [];

const SsuOTPInput: FC<OTPInputProps> = (props = defaultProps) => {
  const {
    containerStyle,
    inputStyle,
    pinCount,
    testID,
    onCodeChanged,
    clearInputs,
    boxStyle,
    autoFocusOnLoad,
    otpSuccess,
    onCodeFilled,
    hideIcon,
    code,
    valMessage,
    showMessage,
    type,
  } = props;
  const textInputCount = new Array(pinCount).fill(0);
  const [digits, setDigits] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (onCodeChanged) {
      onCodeChanged(digits.join(''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits]);

  React.useEffect(() => {
    if (pinCount && code && code.length >= pinCount) {
      setDigitsFromCode(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  React.useEffect(() => {
    bringUpKeyBoardIfNeeded();
    setDigitsFromCode(code);
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      blurAllFields,
    );
    return keyboardDidHideListener.remove;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setDigitsFromCode(code: any) {
    const regexp = new RegExp(`^\\d{${pinCount}}$`);
    if (regexp.test(code)) {
      setDigits(code.split(''));
      blurAllFields();
      onCodeFilled && onCodeFilled(true, code);
    }
  }

  function bringUpKeyBoardIfNeeded() {
    const focusIndex = digits.length ? digits.length - 1 : 0;
    if (pinCount && focusIndex < pinCount && autoFocusOnLoad) {
      focusField(focusIndex);
    }
  }

  function focusField(index: number) {
    if (index < fields.length) {
      const input = fields[index] as TextInput;
      input.focus();
    }
  }

  function handleChangeText(index: number, text: string) {
    let newdigits: string[] = digits.slice();
    const oldTextLength = newdigits[index] ? newdigits[index].length : 0;
    const newTextLength = text.length;
    /* istanbul ignore if */
    if (newTextLength - oldTextLength === pinCount) {
      text = text.replace(/[^0-9]/g, '');
      newdigits = text.split('').slice(oldTextLength, newTextLength);
      setDigits(newdigits);
    } else {
      /* istanbul ignore if */
      if (text.length === 0) {
        /* istanbul ignore if */
        if (newdigits.length > 0) {
          newdigits = newdigits.slice(0, newdigits.length - 1);
        }
      } else {
        text = text.replace(/[^0-9]/g, '');
        /* istanbul ignore else */
        text?.split('')?.forEach(value => {
          /* istanbul ignore if */
          if (pinCount && index < pinCount) {
            newdigits[index] = value;
            index += 1;
          }
        });
        index -= 1;
      }
      setDigits(newdigits);
    }

    let result = newdigits.join('');
    if (pinCount && result.length >= pinCount) {
      onCodeFilled && onCodeFilled(true, result);
      focusField(pinCount - 1);
      blurAllFields();
    } else {
      if (pinCount && text.length > 0 && index < pinCount - 1) {
        onCodeFilled && onCodeFilled(false, result);
        focusField(index + 1);
      }
    }
  }

  function blurAllFields() {
    fields.forEach((field: TextInput | null) => (field as TextInput)?.blur());
  }

  /* istanbul ignore next */
  function handleKeyPressTextInput(index: number, key: string) {
    if (key === 'Backspace') {
      if (!digits[index] && index > 0) {
        handleChangeText(index - 1, '');
        focusField(index - 1);
      }
    }
  }

  function handleValidationWhenClear() {
    if (!clearInputs) {
      let filledPinCount = digits.filter(
        /* istanbul ignore next */
        digit => {
          return digit !== null && digit !== undefined;
        },
      ).length;
      if (pinCount) {
        focusField(Math.min(filledPinCount, pinCount - 1));
      }
    } else {
      focusField(0);
      setDigits([]);
    }
  }

  /* istanbul ignore next */
  function renderCicleIcon() {
    const size = 32;
    return (
      <View
        style={{
          position: 'absolute',
          top: -(size / 2),
          right: 0,
          left: 0,
          alignItems: 'center',
        }}>
        <SearchIcon
          // name={otpSuccess ? 'success_circle' : 'error_circle'}
          width={size}
        />
      </View>
    );
  }

  const renderMessage = () => {
    return (
      <View style={styles.messageContainer}>
        <View style={styles.messageIcon}>
          <HomeIcon
            // name={otpSuccess ? 'success_circle' : 'error_circle'}
            width={12}
          />
        </View>
        <Text
          style={{color: otpSuccess ? color.Success[500] : color.Error[500]}}>
          {valMessage
            ? valMessage
            : otpSuccess
            ? 'Kode verifikasi diterima'
            : 'Kode verifikasi tidak sesuai'}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{...containerStyle}}
      accessible
      accessibilityLabel={testID}
      testID={testID}>
      {!hideIcon && renderCicleIcon()}
      <TouchableWithoutFeedback
        accessible
        accessibilityLabel={`${testID}.touchableWithoutFeedback`}
        // style={{height: 200}}
        onPress={handleValidationWhenClear}>
        <View style={boxStyle}>
          {textInputCount.map((_, index) => {
            return (
              <View pointerEvents="none" key={index + 'view'}>
                <TextInput
                  accessible
                  testID={`${testID}.otpInput${index}`}
                  accessibilityLabel={`${testID}.otpInput${index}`}
                  key={index}
                  selectionColor={color.Success[500]}
                  style={[
                    inputStyle,
                    {
                      borderColor:
                        type === 'error'
                          ? color.Error[500]
                          : type === 'success'
                          ? color.Success[500]
                          : undefined,
                      color: color.Neutral[10],
                    },
                  ]}
                  value={digits[index] || ''}
                  onChangeText={text => handleChangeText(index, text)}
                  ref={ref => {
                    fields[index] = ref;
                  }}
                  keyboardType="number-pad"
                  onKeyPress={
                    /* istanbul ignore next */
                    ({nativeEvent: {key}}) => {
                      handleKeyPressTextInput(index, key);
                    }
                  }
                />
              </View>
            );
          })}
        </View>
      </TouchableWithoutFeedback>
      {showMessage && renderMessage()}
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    width: '100%',
    // borderColor: color.Dark[50],
    // margin: 12,
    // borderRadius: 24,
    // backgroundColor: color.Dark[300],
  },
  defaultBoxStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginVertical: 48,
  },
  defaultInput: {
    // borderWidth: 1,
    // borderColor: color.Dark[50],
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    // paddingVertical: mvs(12),
    fontFamily: font.InterMedium,
    fontSize: normalize(12),
    width: ms(40),
    height: mvs(40),
    backgroundColor: color.Dark[600],
  },
  messageContainer: {
    marginLeft: ms(16),
    marginTop: mvs(-20),
    marginBottom: mvs(16),
    flexDirection: 'row',
  },
  messageIcon: {
    alignSelf: 'center',
    marginRight: ms(4),
  },
});

const defaultProps: OTPInputProps = {
  pinCount: 6,
  containerStyle: styles.defaultContainer,
  inputStyle: styles.defaultInput,
  clearInputs: false,
  boxStyle: styles.defaultBoxStyle,
  autoFocusOnLoad: false,
  otpSuccess: false,
  hideIcon: false,
  type: 'default',
};

SsuOTPInput.defaultProps = defaultProps;

export default SsuOTPInput;
