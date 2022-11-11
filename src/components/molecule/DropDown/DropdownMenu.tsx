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

interface DropdownMenuProps {
  data: dataProps[];
  placeHolder: string;
  selectedMenu: (data: any) => void;
}

const itemBg = color.Dark[900];

const DropdownMenu: React.FC<DropdownMenuProps> = (
  props: DropdownMenuProps,
) => {
  const {data, placeHolder, selectedMenu} = props;
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: color.Success[500]}]}
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.fontAll}
        itemTextStyle={styles.fontAll}
        itemContainerStyle={[styles.itemContainer]}
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
          selectedMenu(item);
          setIsFocus(false);
        }}
        fontFamily={font.InterRegular}
        showsVerticalScrollIndicator={false}
        autoScroll={false}
        activeColor={color.Dark[500]}
      />
    </View>
  );
};

export default DropdownMenu;

const styles = StyleSheet.create({
  container: {
    // width: ms(100),
  },
  // Dropdown first view
  dropdown: {
    // paddingHorizontal: 8,
  },
  // Dropdown modal container
  containerStyle: {
    borderWidth: 0,
    backgroundColor: itemBg,
  },
  // Item container in modal container
  itemContainer: {
    height: mvs(47),
    backgroundColor: itemBg,
    borderColor: itemBg,
  },
  placeholderStyle: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    color: color.Dark[50],
  },
  fontAll: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    color: color.Neutral[10],
  },
  iconStyle: {
    width: ms(20),
    height: ms(20),
    tintColor: color.Pink[200],
  },
});