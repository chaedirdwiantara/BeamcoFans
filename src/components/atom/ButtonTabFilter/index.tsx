import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {color} from '../../../theme';
import {normalize} from '../../../utils';
import {ms, mvs} from 'react-native-size-matters';

interface filterData {
  filterName: string;
}

interface TabFilterProps {
  filterData: Array<filterData>;
  onPress: (params: string, index: number) => void;
  selectedIndex: number;
}

const SelectedColor = color.Pink[100];
const UnSelectedColor = color.Neutral[10];

const ButtonTabFilter: React.FC<TabFilterProps> = ({
  filterData,
  onPress,
  selectedIndex,
}) => {
  return (
    <View style={styles.tab}>
      <FlatList
        horizontal
        data={filterData}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={[
              styles.tabStyle,
              {borderBottomWidth: selectedIndex == index ? 1 : 0},
            ]}
            onPress={() => onPress(item.filterName, index)}>
            <Text
              style={[
                styles.TextStyle,
                {
                  fontWeight: selectedIndex == index ? 'bold' : '500',
                  color:
                    selectedIndex == index ? SelectedColor : UnSelectedColor,
                },
              ]}>
              {item.filterName}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ButtonTabFilter;

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabStyle: {
    height: mvs(40),
    paddingHorizontal: ms(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: SelectedColor,
  },
  TextStyle: {
    fontSize: normalize(13),
  },
});
