import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {color, font} from '../../../theme';

interface dataProps {
  label: string;
  value?: string;
}

interface DropdownMenuProps {
  data: dataProps[];
  placeHolder: string;
}

const itemBg = color.Dark[900];

const DropdownMenu: React.FC<DropdownMenuProps> = (
  props: DropdownMenuProps,
) => {
  const {data, placeHolder} = props;
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: color.Success[500]}]}
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.fontAll}
        selectedTextStyle={styles.fontAll}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
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
        itemTextStyle={styles.fontAll}
      />
    </View>
  );
};

export default DropdownMenu;

const styles = StyleSheet.create({
  container: {
    width: 110,
    padding: 4,
  },
  // Dropdown first view
  dropdown: {
    paddingHorizontal: 8,
  },
  // Dropdown modal container
  containerStyle: {
    borderWidth: 0,
    backgroundColor: itemBg,
  },
  // Item container in modal container
  itemContainer: {
    height: 47,
    backgroundColor: itemBg,
    borderColor: itemBg,
  },
  fontAll: {
    fontSize: 10,
    fontWeight: '500',
    color: color.Neutral[50],
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: 'pink',
  },
});
