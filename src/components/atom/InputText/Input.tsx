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
  widthPercentage,
} from '../../../utils/dimensionFormat';
import Gap from '../Gap/Gap';
import InputLabel from './InputLabel';

interface InputProps extends TextInputProps {
  fontSize?: number;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  isError?: boolean;
  errorMsg?: string;
  password?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  fontColor?: string;
  rightIcon?: boolean;
  reset?: () => void;
  containerStyles?: ViewStyle;
  inputStyles?: ViewStyle;
}

interface TextAreaProps extends TextInputProps {
  fontSize?: number;
  backgroundColor?: string;
  containerStyles?: ViewStyle;
  inputStyles?: ViewStyle;
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
    fontSize = normalize(12),
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
    borderColor,
    fontColor,
    rightIcon,
    reset,
    onSubmitEditing,
    onEndEditing,
    containerStyles,
    inputStyles,
  } = props;
  const [state, setState] = useState<boolean>(false);
  const [secure, setSecure] = useState<boolean>(true);

  const newBorderWidth = isError || borderColor ? 1 : 0;
  const newBorderColor = isError
    ? ErrorColor
    : borderColor && state
    ? borderColor
    : '';

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
            borderWidth: newBorderWidth,
            borderColor: newBorderColor,
          },
          containerStyles,
        ]}>
        {leftIcon}
        <TextInput
          style={[styles.input(fontSize, fontColor), inputStyles]}
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

const TextArea: React.FC<TextAreaProps> = props => {
  const {
    fontSize,
    value,
    onChangeText,
    editable,
    placeholder,
    backgroundColor,
    containerStyles,
    inputStyles,
    maxLength,
  } = props;
  const [state, setState] = useState<boolean>(false);
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomWidth: state === true ? 1 : 0,
          borderBottomColor: color.Pink[200],
          backgroundColor: backgroundColor ? backgroundColor : color.Dark[900],
        },
        containerStyles,
      ]}>
      <TextInput
        style={[styles.inputTextArea(fontSize), inputStyles]}
        multiline={true}
        numberOfLines={3}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        placeholder={placeholder}
        placeholderTextColor={FontColor}
        onFocus={() => setState(true)}
        maxLength={maxLength}
        {...props}
      />
    </View>
  );
};

export default {InputText, TextArea, InputLabel};

const styles = StyleSheet.create<TypeStyle>({
  container: {
    borderRadius: 5,
    paddingHorizontal: widthPercentage(12),
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
  input: (fontSize: number, fontColor: string) => ({
    flex: 1,
    fontSize: fontSize ? fontSize : normalize(13),
    fontFamily: font.InterLight,
    fontWeight: '400',
    color: fontColor ? fontColor : FontColor,
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
    color: color.Neutral[10],
  }),
});
