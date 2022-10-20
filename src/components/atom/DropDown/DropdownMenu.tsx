import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {HomeIcon} from '../../../assets/icon';
import {color, font} from '../../../theme';

interface dataProps {
  label: string;
  value?: string;
}

interface DropdownMenuProps {
  data: dataProps[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = (
  props: DropdownMenuProps,
) => {
  const {data} = props;
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: color.Success[500]}]}
        containerStyle={{borderWidth: 0}}
        placeholderStyle={styles.fontAll}
        selectedTextStyle={styles.fontAll}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Category' : '...'}
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
    // backgroundColor: 'white',
    padding: 4,
  },
  dropdown: {
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  fontAll: {
    fontSize: 10,
    fontWeight: '500',
    color: color.Neutral[50],
  },
  itemContainer: {
    height: 47,
    backgroundColor: color.Dark[900],
    borderColor: color.Dark[900],
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: 'pink',
  },
});
