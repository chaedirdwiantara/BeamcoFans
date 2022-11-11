import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {color, font} from '../../../theme';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';

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

const Type1: React.FC<TabFilterProps> = ({
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
        contentContainerStyle={styles.containerFlatlist}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={[
              styles.tabStyle,
              {borderBottomWidth: selectedIndex == index ? 2 : 0},
            ]}
            onPress={() => onPress(item.filterName, index)}>
            <Text
              style={[
                styles.TextStyle,
                selectedIndex === index
                  ? {
                      fontFamily: font.InterBold,
                      fontWeight: '700',
                      color: SelectedColor,
                    }
                  : {
                      fontFamily: font.InterMedium,
                      fontWeight: '500',
                      color: UnSelectedColor,
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

export default Type1;

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerFlatlist: {
    flex: 1,
    justifyContent: 'center',
  },
  tabStyle: {
    height: heightPercentage(40),
    paddingVertical: heightPercentage(8),
    paddingHorizontal: widthPercentage(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: SelectedColor,
  },
  TextStyle: {
    fontWeight: '700',
    fontSize: normalize(13),
    lineHeight: heightPercentage(20),
  },
});
