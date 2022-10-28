import React, {useState} from 'react';
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
}

const SearchBar: React.FC<SearchProps> = ({onChangeText, value}) => {
  const [state, setState] = useState('');
  const [showIcon, setShowIcon] = useState(false);

  const onEndEditing = () => {
    console.log(state);
  };

  // const onChangeText = (text: string) => {
  //   setState(text);
  //   setShowIcon(true);
  // };
  const onReset = () => {
    setState('');
    setShowIcon(false);
    console.log('works');
  };

  return (
    <View style={styles.container}>
      <SsuInput.InputText
        value={value}
        onChangeText={onChangeText}
        placeholder={'Search'}
        leftIcon={<SearchIcon stroke={color.Dark[50]} />}
        onEndEditing={onEndEditing}
        backgroundColor={color.Dark[600]}
        rightIcon={showIcon}
        reset={onReset}
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
