import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  NativeModules,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {color} from '../theme';
import {storage} from '../hooks/use-storage.hook';
import PostListPublic from './ListCard/PostListPublic';
import {heightResponsive, widthResponsive} from '../utils';
import PostListExclusive from './ListCard/PostListExclusive';
import {GuestContent, TabFilter, TopNavigation} from '../components';
import {dropDownDataCategory, dropDownDataSort} from '../data/dropdown';
import {useTranslation} from 'react-i18next';

const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;

export const FeedScreen: React.FC = () => {
  const {t} = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(-0);
  const [filter] = useState([
    {filterName: 'Feed.Public'},
    {filterName: 'Feed.Exclusive'},
  ]);
  const isLogin = storage.getBoolean('isLogin');

  const filterData = (item: any, index: any) => {
    setSelectedIndex(index);
  };
  return (
    <SafeAreaView style={styles.root}>
      {isLogin ? (
        <View>
          <TopNavigation.Type2Animated
            title={t('Feed.Title')}
            maxLengthTitle={20}
            itemStrokeColor={'white'}
            containerStyle={{
              position: 'absolute',
              paddingTop:
                Platform.OS === 'ios' ? 0 : heightResponsive(barHeight + 15),
              zIndex: 4,
              backgroundColor: color.Dark[800],
            }}
          />
          <View style={styles.feedContainer}>
            <TabFilter.Type1
              filterData={filter}
              onPress={filterData}
              selectedIndex={selectedIndex}
              flatlistContainerStyle={{
                justifyContent: 'space-between',
              }}
              TouchableStyle={{width: widthPercentageToDP(45)}}
              translation={true}
              containerStyle={{
                backgroundColor: color.Dark[800],
                zIndex: 3,
                position: 'absolute',
                top:
                  Platform.OS === 'ios'
                    ? heightResponsive(40)
                    : heightResponsive(barHeight + 60),
                left: widthResponsive(24),
              }}
              animation
            />
            {filter[selectedIndex].filterName === 'Feed.Public' ? (
              <PostListPublic
                dataRightDropdown={dropDownDataCategory}
                dataLeftDropdown={dropDownDataSort}
              />
            ) : (
              <PostListExclusive
                dataRightDropdown={dropDownDataCategory}
                dataLeftDropdown={dropDownDataSort}
              />
            )}
          </View>
        </View>
      ) : (
        <GuestContent />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    zIndex: 2,
  },
  feedContainer: {
    paddingHorizontal: widthResponsive(24),
    width: '100%',
    height: '100%',
  },
});
