import React, {useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {SearchIcon} from '../../../assets/icon';
import {color} from '../../../theme';
import {SsuInput} from '../InputText/SsuInput';

const SearchBar = () => {
  const [state, setState] = useState('');

  const onEndEditing = () => {
    console.log(state);
  };

  return (
    <View style={styles.container}>
      <SsuInput.InputText
        value={state}
        onChangeText={(newText: any) => setState(newText)}
        placeholder={'Search'}
        leftIcon={<SearchIcon stroke={color.Dark[50]} />}
        onEndEditing={onEndEditing}
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
