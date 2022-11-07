import React from 'react';
import {StyleSheet, TextInputProps, View} from 'react-native';
import {SearchIcon} from '../../../assets/icon';
import {color} from '../../../theme';
import {SsuInput} from '../InputText/SsuInput';

interface SearchProps extends TextInputProps {
  fontSize?: number;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  isError?: boolean;
  errorMsg?: string;
  password?: boolean;
  backgroundColor?: string;
  rightIcon?: boolean;
  reset?: () => void;
  onEndEditing?: () => void;
}

const SearchBar: React.FC<SearchProps> = ({
  onChangeText,
  value,
  rightIcon,
  reset,
  onEndEditing,
}) => {
  return (
    <View style={styles.container}>
      <SsuInput.InputText
        value={value}
        onChangeText={onChangeText}
        placeholder={'Search'}
        leftIcon={<SearchIcon stroke={color.Dark[50]} />}
        onEndEditing={onEndEditing}
        backgroundColor={color.Dark[600]}
        rightIcon={rightIcon}
        reset={reset}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
