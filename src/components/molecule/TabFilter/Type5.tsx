import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ViewStyle,
  Animated,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {color, font} from '../../../theme';
import {heightResponsive, widthResponsive} from '../../../utils';
import {useScrollStore} from '../../../store/translateY.store';

interface filterData {
  filterName: string;
}

interface TabFilterProps {
  filterData: Array<filterData>;
  onPress: (params: string, index: number) => void;
  selectedIndex: number;
  containerStyle?: ViewStyle;
  flatlistContainerStyle?: ViewStyle;
  TouchableStyle?: ViewStyle;
  translation?: boolean;
  animation?: boolean;
}

const SelectedColor = color.Neutral[10];
const UnSelectedColor = color.Dark[50];

const Type5: React.FC<TabFilterProps> = ({
  filterData,
  onPress,
  selectedIndex,
  containerStyle,
  flatlistContainerStyle,
  TouchableStyle,
  translation,
  animation,
}) => {
  const {t} = useTranslation();
  const {compBTranslateY} = useScrollStore();
  return (
    <Animated.View
      style={[
        styles.tab,
        {
          transform:
            animation && compBTranslateY
              ? [{translateY: compBTranslateY}]
              : undefined,
        },
        containerStyle,
      ]}>
      <FlatList
        horizontal
        data={filterData}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.containerFlatlist,
          flatlistContainerStyle,
        ]}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={[
              styles.tabStyle,
              {
                backgroundColor:
                  selectedIndex == index ? color.Purple[100] : 'transparent',
              },
              TouchableStyle,
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
              {translation ? t(item.filterName) : item.filterName}
            </Text>
          </TouchableOpacity>
        )}
      />
    </Animated.View>
  );
};

export default Type5;

const styles = StyleSheet.create({
  tab: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerFlatlist: {
    width: '100%',
    justifyContent: 'space-evenly',
  },
  tabStyle: {
    height: heightResponsive(35),
    paddingVertical: heightResponsive(8),
    paddingHorizontal: widthResponsive(17),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: heightResponsive(20),
  },
  TextStyle: {
    fontWeight: '700',
    fontSize: mvs(12),
  },
});
