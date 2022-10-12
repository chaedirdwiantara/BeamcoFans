import React from 'react';
import {ImageStyle, KeyboardTypeOptions, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle} from 'react-native';
import { color } from '../../../theme';

interface InputProps {
  textarea: boolean
  width?: number
  height?: number
  fontSize?: number
  label: string
  value: string
  secureTextEntry?: boolean
  keyboardType?: undefined | KeyboardTypeOptions
  onChangeText: () => void
  disabled?: boolean
}

type TypeStyle = {
    container: ViewStyle
    label: any
    input: any
    inputTextArea: any
}

const SsuInput: React.FC<InputProps> = ({
  textarea,
  width,
  height,
  fontSize,
  label,
  value,
  secureTextEntry,
  keyboardType,
  onChangeText,
  disabled
}) => {
  if (textarea) {
    return (
      <View style={styles.container}>
        <Text style={styles.label(fontSize)}>{label} :</Text>
        <TextInput
          style={styles.inputTextArea(fontSize)}
          multiline={true}
          numberOfLines={3}
          value={value}
          onChangeText={onChangeText}
          editable={disabled ? false : true}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label(fontSize)}>{label} :</Text>
      <TextInput
        style={styles.input(width, height, fontSize)}
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        editable={disabled ? false : true}
      />
    </View>
  );
};

export default SsuInput;

const styles = StyleSheet.create<TypeStyle>({
  container: {
    marginTop: 10,
  },
  label: (fontSize:number) => ({
    fontSize: fontSize ? fontSize : 18,
    // fontFamily: fonts.primary.regular,
  }),
  input: (width:number, height:number, fontSize:number) => ({
    fontSize: fontSize ? fontSize : 18,
    // fontFamily: fonts.primary.regular,
    width: width,
    height: height,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: color.Secondary[300],
    paddingVertical: 5,
    paddingHorizontal: 10,
  }),
  inputTextArea: (fontSize:number) => ({
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