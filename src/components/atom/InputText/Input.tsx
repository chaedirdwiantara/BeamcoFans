import React, {useState} from 'react';
import {
  ImageStyle,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import HomeIcon from '../../../assets/icon/Home.icon';
import SearchIcon from '../../../assets/icon/Search.icon';
import {color, font} from '../../../theme';

interface InputProps {
  fontSize?: number;
  value: string;
  secureTextEntry?: boolean;
  keyboardType?: undefined | KeyboardTypeOptions;
  onChangeText: (text: string) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  isError?: boolean;
  errorMsg?: string;
  placeholder?: string;
  password?: boolean;
}

interface TextAreaProps {
  fontSize?: number;
  value: string;
  onChangeText: (text: string) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  isError?: boolean;
  errorMsg?: string;
  placeholder?: string;
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
  secureTextEntry,
  keyboardType,
  onChangeText,
  disabled,
  placeholder,
  isError,
  errorMsg,
  icon,
  password,
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
        {icon}
        <TextInput
          style={[styles.input(fontSize, onChangeText)]}
          value={value}
          secureTextEntry={secure}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          editable={disabled ? false : true}
          placeholder={placeholder}
          placeholderTextColor={FontColor}
          onFocus={() => setState(true)}
        />
        {password ? (
          <TouchableOpacity
            onPress={() => {
              setSecure(!secure);
            }}>
            {secure ? (
              <HomeIcon stroke={FontColor} />
            ) : (
              <SearchIcon stroke={FontColor} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>

      {isError === true && state === true ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <HomeIcon stroke={ErrorColor} />
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      ) : null}
    </View>
  );
};

const TextArea: React.FC<TextAreaProps> = ({
  fontSize,
  value,
  onChangeText,
  disabled,
  placeholder,
  isError,
  errorMsg,
  icon,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputTextArea(fontSize)}
        multiline={true}
        numberOfLines={3}
        value={value}
        onChangeText={onChangeText}
        editable={disabled ? false : true}
        placeholder={placeholder}
      />
    </View>
  );
};

export default {InputText, TextArea};

const styles = StyleSheet.create<TypeStyle>({
  container: {
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: color.Dark[900],
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
    // fontFamily: fonts.primary.regular,
  }),
  input: (fontSize: number) => ({
    flex: 1,
    fontSize: fontSize ? fontSize : 13,
    fontFamily: font.MontserratLight,
    color: FontColor,
    paddingLeft: 10,
  }),
  inputTextArea: (fontSize: number) => ({
    fontSize: fontSize ? fontSize : 18,
    // fontFamily: fonts.primary.regular,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: color.Secondary[300],
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  }),
});
