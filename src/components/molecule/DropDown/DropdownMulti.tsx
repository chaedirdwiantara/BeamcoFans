import React, {useState} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';
import {ms, mvs} from 'react-native-size-matters';
import {color, font} from '../../../theme';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';
import {CheckBox} from '../../atom';

interface dataProps {
  label: string;
  value?: string;
}

interface InputDropdownProps {
  data: dataProps[];
  placeHolder: string;
  dropdownLabel: string;
  textTyped: (data: any) => void;
  containerStyles?: ViewStyle;
  initialValue?: string[] | null;
}

const borderColor = color.Dark[500];
const itemBg = color.Dark[900];
const fontColorMain = color.Neutral[10];

const MultiDropdown: React.FC<InputDropdownProps> = (
  props: InputDropdownProps,
) => {
  const {
    initialValue,
    data,
    placeHolder,
    dropdownLabel,
    textTyped,
    containerStyles,
  } = props;

  const [value, setValue] = useState(initialValue || []);

  const isSelected = (item: any) => {
    return value.find(val => item.value === val) ? true : false;
  };

  const renderLabel = () => {
    return <Text style={[styles.label]}>{dropdownLabel}</Text>;
  };

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        <CheckBox handleOnPress={() => null} active={isSelected(item)} />
      </View>
    );
  };

  const renderSelectedItem = () => {
    return null;
  };

  const mappingValue = () => {
    return value.toString();
  };

  return (
    <View style={[styles.container, containerStyles]}>
      {renderLabel()}
      <MultiSelect
        style={[styles.dropdown]}
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.placeholderStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={mvs(300)}
        labelField="label"
        valueField="value"
        placeholder={value.length > 0 ? mappingValue() : placeHolder}
        value={value}
        onChange={item => {
          setValue(item);
          textTyped(item);
        }}
        fontFamily={font.InterRegular}
        showsVerticalScrollIndicator={false}
        activeColor={color.Dark[500]}
        itemContainerStyle={[styles.itemContainer]}
        itemTextStyle={styles.itemTextStyle}
        selectedTextStyle={styles.selectedTextStyle}
        renderSelectedItem={renderSelectedItem}
        renderItem={renderItem}
      />
    </View>
  );
};

export default MultiDropdown;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: ms(3),
  },
  // Dropdown first view
  dropdown: {
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    paddingVertical: heightPercentage(12),
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
    color: color.Neutral[10],
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
  item: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: widthPercentage(15),
    paddingVertical: heightPercentage(18),
  },
});
