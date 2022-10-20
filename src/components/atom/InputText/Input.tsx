import React, {useState} from 'react';
import {
  ImageStyle,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ErrorIcon, EyeCloseIcon, EyeOpenIcon} from '../../../assets/icon';
import {color, font} from '../../../theme';
import Gap from '../Gap/Gap';
import {SsuText} from '../Text/SsuText';

interface InputProps extends TextInputProps {
  fontSize?: number;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  isError?: boolean;
  errorMsg?: string;
  password?: boolean;
}

interface TextAreaProps extends TextInputProps {
  fontSize?: number;
}

type TypeStyle = {
  container: ViewStyle;
  errorText: TextStyle;
  label: any;
  input: any;
  inputTextArea: any;
};

const ErrorColor = color.Error[900];
const FontColor = color.Dark[50];

const InputText: React.FC<InputProps> = ({
  fontSize,
  value,
  keyboardType,
  onChangeText,
  disabled,
  placeholder,
  isError,
  errorMsg,
  leftIcon,
  password,
  onEndEditing,
}) => {
  const [state, setState] = useState<boolean>(false);
  const [secure, setSecure] = useState<boolean>(true);

  return (
    <View>
      <View
        style={[
          styles.container,
          {
            borderWidth: state === true ? 1 : 0,
            borderColor: isError === true ? ErrorColor : color.Success[500],
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
          placeholder={placeholder}
          placeholderTextColor={FontColor}
          onFocus={() => setState(true)}
          onEndEditing={onEndEditing}
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
      </View>

      {isError === true && state === true ? (
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 4,
            paddingHorizontal: 10,
          }}>
          <ErrorIcon fill={ErrorColor} />
          <Gap width={4} />
          <SsuText.Body.Small color={ErrorColor}>{errorMsg}</SsuText.Body.Small>
        </View>
      ) : null}
    </View>
  );
};

const TextArea: React.FC<TextAreaProps> = ({
  fontSize,
  value,
  onChangeText,
  editable,
  placeholder,
}) => {
  const [state, setState] = useState<boolean>(false);
  return (
    <View
      style={[
        styles.container,
        {
          borderWidth: state === true ? 1 : 0,
          borderColor: color.Success[500],
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
    paddingHorizontal: 10,
    // backgroundColor: color.Dark[900],
    alignItems: 'center',
    flexDirection: 'row',
  },
  errorText: {
    color: ErrorColor,
    fontSize: 13,
    marginLeft: 10,
  },
  label: (fontSize: number) => ({
    fontSize: fontSize ? fontSize : 18,
    fontFamily: font.MontserratLight,
  }),
  input: (fontSize: number) => ({
    flex: 1,
    fontSize: fontSize ? fontSize : 13,
    fontFamily: font.MontserratLight,
    color: FontColor,
    paddingLeft: 10,
  }),
  inputTextArea: (fontSize: number) => ({
    flex: 1,
    fontSize: fontSize ? fontSize : 13,
    fontFamily: font.MontserratLight,
    paddingVertical: 5,
    paddingHorizontal: 5,
    textAlignVertical: 'top',
    color: FontColor,
  }),
});
