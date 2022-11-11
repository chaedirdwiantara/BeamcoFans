import React, {useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {
  CloseIcon,
  ErrorIcon,
  EyeCloseIcon,
  EyeOpenIcon,
} from '../../../assets/icon';
import {color, font} from '../../../theme';
import {normalize} from '../../../utils';
import {
  heightPercentage,
  widhtPercentage,
} from '../../../utils/dimensionFormat';
import Gap from '../Gap/Gap';
import {SsuText} from '../Text/SsuText';

interface InputProps extends TextInputProps {
  fontSize?: number;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  isError?: boolean;
  errorMsg?: string;
  password?: boolean;
  backgroundColor?: string;
  rightIcon?: boolean;
  reset?: () => void;
}

interface TextAreaProps extends TextInputProps {
  fontSize?: number;
  backgroundColor?: string;
}

type TypeStyle = {
  container: ViewStyle;
  errorText: TextStyle;
  label: any;
  input: any;
  inputTextArea: any;
};

const ErrorColor = color.Error[400];
const FontColor = color.Dark[300];

const InputText: React.FC<InputProps> = props => {
  const {
    fontSize,
    value,
    keyboardType,
    onChangeText,
    disabled,
    // placeholder,
    isError,
    errorMsg,
    leftIcon,
    password,
    backgroundColor,
    rightIcon,
    reset,
    onSubmitEditing,
    onEndEditing,
  } = props;
  const [state, setState] = useState<boolean>(false);
  const [secure, setSecure] = useState<boolean>(true);

  const rightIconComp = () => {
    return (
      <TouchableOpacity onPress={reset} style={{padding: ms(4)}}>
        <CloseIcon stroke={FontColor} fill={backgroundColor} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor
              ? backgroundColor
              : color.Dark[900],
          },
        ]}>
        {leftIcon}
        <TextInput
          style={[styles.input(fontSize)]}
          value={value}
          secureTextEntry={password ? secure : false}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          editable={disabled ? false : true}
          // placeholder={placeholder}
          placeholderTextColor={FontColor}
          onFocus={() => setState(true)}
          onEndEditing={onEndEditing}
          onSubmitEditing={onSubmitEditing}
          {...props}
        />
        {password ? (
          <TouchableOpacity
            onPress={() => {
              setSecure(!secure);
            }}>
            {secure ? (
              <EyeCloseIcon stroke={FontColor} />
            ) : (
              <EyeOpenIcon stroke={FontColor} />
            )}
          </TouchableOpacity>
        ) : null}
        <View>{rightIcon ? rightIconComp() : null}</View>
      </View>

      {isError === true ? (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingTop: mvs(4),
            alignItems: 'flex-end',
          }}>
          <ErrorIcon fill={ErrorColor} style={{marginBottom: mvs(-1)}} />
          <Gap width={4} />
          <Text
            style={{
              fontFamily: font.InterRegular,
              fontWeight: '400',
              fontSize: normalize(10),
              lineHeight: mvs(12),
              color: ErrorColor,
              maxWidth: '90%',
            }}>
            {errorMsg}
          </Text>
        </View>
      ) : null}
    </>
  );
};

const TextArea: React.FC<TextAreaProps> = ({
  fontSize,
  value,
  onChangeText,
  editable,
  placeholder,
  backgroundColor,
}) => {
  const [state, setState] = useState<boolean>(false);
  return (
    <View
      style={[
        styles.container,
        {
          borderWidth: state === true ? 1 : 0,
          borderColor: color.Success[500],
          backgroundColor: backgroundColor ? backgroundColor : color.Dark[900],
        },
      ]}>
      <TextInput
        style={styles.inputTextArea(fontSize)}
        multiline={true}
        numberOfLines={3}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        placeholder={placeholder}
        placeholderTextColor={FontColor}
        onFocus={() => setState(true)}
      />
    </View>
  );
};

export default {InputText, TextArea};

const styles = StyleSheet.create<TypeStyle>({
  container: {
    borderRadius: 5,
    paddingHorizontal: widhtPercentage(12),
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  errorText: {
    color: ErrorColor,
    fontSize: normalize(13),
    marginLeft: ms(10),
  },
  label: (fontSize: number) => ({
    fontSize: fontSize ? fontSize : normalize(18),
    fontFamily: font.InterLight,
  }),
  input: (fontSize: number) => ({
    flex: 1,
    fontSize: fontSize ? fontSize : normalize(13),
    fontFamily: font.InterLight,
    fontWeight: '400',
    color: FontColor,
    lineHeight: mvs(14.5),
    paddingLeft: ms(10),
    marginVertical: Platform.OS === 'ios' ? heightPercentage(12.5) : 0,
  }),
  inputTextArea: (fontSize: number) => ({
    flex: 1,
    fontSize: fontSize ? fontSize : normalize(13),
    fontFamily: font.InterLight,
    paddingVertical: mvs(5),
    paddingHorizontal: ms(5),
    textAlignVertical: 'top',
    color: FontColor,
  }),
});
