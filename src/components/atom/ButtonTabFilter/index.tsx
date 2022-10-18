import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color} from '../../../theme';

interface filterData {
  filterName: string;
}

interface TabFilterProps {
  filterData: Array<filterData>;
  onPress: () => void;
  selectedIndex: number;
}

const SelectedColor = color.Success[600];

const ButtonTabFilter: React.FC<TabFilterProps> = ({
  filterData,
  onPress,
  selectedIndex,
}) => {
  return (
    <>
      <FlatList
        horizontal
        data={filterData}
        showsHorizontalScrollIndicator={false}
        style={{marginBottom: 20, marginHorizontal: 10}}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={[
              styles.tabStyle,
              {borderBottomWidth: selectedIndex == index ? 1 : 0},
            ]}
            onPress={() => onPress(item.filterName, index)}>
            <Text
              style={{
                fontWeight: selectedIndex == index ? 'bold' : undefined,
                color: selectedIndex == index ? SelectedColor : undefined,
              }}>
              {item.filterName}
            </Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default ButtonTabFilter;

const styles = StyleSheet.create({
  tabStyle: {
    marginTop: 10,
    marginBottom: 4,
    height: 40,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: SelectedColor,
  },
});
