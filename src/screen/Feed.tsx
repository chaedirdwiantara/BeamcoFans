import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {color} from '../theme';
import {storage} from '../hooks/use-storage.hook';
import PostListPublic from './ListCard/PostListPublic';
import {heightPercentage, widthResponsive} from '../utils';
import PostListExclusive from './ListCard/PostListExclusive';
import {GuestContent, TabFilter, TopNavigation} from '../components';
import {dropDownDataCategory, dropDownDataSort} from '../data/dropdown';
import {useIsFocused} from '@react-navigation/native';
import {usePlayerHook} from '../hooks/use-player.hook';
import {useTranslation} from 'react-i18next';

export const FeedScreen: React.FC = () => {
  const {t} = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(-0);
  const [filter] = useState([
    {filterName: 'Feed.Public'},
    {filterName: 'Feed.Exclusive'},
  ]);
  const isLogin = storage.getString('profile');
  const isFocused = useIsFocused();
  const {isPlaying, showPlayer, hidePlayer} = usePlayerHook();

  useEffect(() => {
    if (isFocused && isPlaying) {
      showPlayer();
    } else if (!isFocused) {
      hidePlayer();
    }
  }, [isFocused]);

  const filterData = (item: any, index: any) => {
    setSelectedIndex(index);
  };
  return (
    <View style={styles.root}>
      {isLogin ? (
        <View>
          <TopNavigation.Type2
            title={t('Feed.Title')}
            maxLengthTitle={20}
            itemStrokeColor={'white'}
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
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  feedContainer: {
    marginTop: widthResponsive(3),
    paddingHorizontal: widthResponsive(24),
    width: '100%',
    height: '100%',
  },
});
