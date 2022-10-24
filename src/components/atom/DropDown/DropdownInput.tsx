import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {ms, mvs} from 'react-native-size-matters';
import {color, font} from '../../../theme';
import {normalize} from '../../../utils';

interface dataProps {
  label: string;
  value?: string;
}

interface InputDropdownProps {
  data: dataProps[];
  placeHolder: string;
  dropdownLabel: string;
}
const borderColor = color.Dark[50];
const itemBg = color.Dark[900];
const fontColorMain = color.Neutral[10];

const InputDropdown: React.FC<InputDropdownProps> = (
  props: InputDropdownProps,
) => {
  const {data, placeHolder, dropdownLabel} = props;

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    return <Text style={[styles.label]}>{dropdownLabel}</Text>;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown]}
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.placeholderStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={mvs(300)}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeHolder : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        fontFamily={font.MontserratRegular}
        showsVerticalScrollIndicator={false}
        autoScroll={false}
        activeColor={color.Dark[500]}
        itemContainerStyle={[styles.itemContainer]}
        itemTextStyle={styles.itemTextStyle}
        selectedTextStyle={styles.selectedTextStyle}
      />
    </View>
  );
};

export default InputDropdown;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  // Dropdown first view
  dropdown: {
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
  },
  // Dropdown modal container
  containerStyle: {
    borderWidth: 0,
    backgroundColor: itemBg,
  },
  // Item container in modal container
  itemContainer: {
    height: mvs(53),
    borderWidth: 0,
    backgroundColor: itemBg,
  },
  label: {
    color: color.Neutral[50],
    fontSize: normalize(10),
  },
  placeholderStyle: {
    fontSize: normalize(13),
    color: fontColorMain,
  },
  selectedTextStyle: {
    fontSize: normalize(13),
    color: fontColorMain,
  },
  itemTextStyle: {
    fontSize: normalize(13),
    color: fontColorMain,
  },
  iconStyle: {
    width: ms(20),
    height: ms(20),
  },
});
