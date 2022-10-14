import React, {useState} from 'react';
import {
  ImageStyle,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
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
}) => {
  const [state, setState] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input(fontSize, onChangeText),
          {
            borderWidth: state === true ? 1 : 0,
            borderColor: isError === true ? ErrorColor : color.Success[500],
          },
        ]}
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        editable={disabled ? false : true}
        placeholder={placeholder}
        placeholderTextColor={color.Neutral[70]}
        onFocus={() => setState(true)}
      />
      {isError === true && state === true ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
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
    marginTop: 10,
  },
  errorText: {
    color: ErrorColor,
    fontSize: 13,
  },
  label: (fontSize: number) => ({
    fontSize: fontSize ? fontSize : 18,
    // fontFamily: fonts.primary.regular,
  }),
  input: (fontSize: number) => ({
    fontSize: fontSize ? fontSize : 13,
    fontFamily: font.MontserratLight,
    color: color.Neutral[50],
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: color.Dark[900],
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
