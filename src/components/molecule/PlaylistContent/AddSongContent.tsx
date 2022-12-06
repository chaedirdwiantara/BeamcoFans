import React, {useState, useEffect} from 'react';
import {FlashList} from '@shopify/flash-list';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';

import {
  elipsisText,
  height,
  heightPercentage,
  widthPercentage,
} from '../../../utils';
import {ListCard} from '../ListCard';
import Color from '../../../theme/Color';
import {color, typography} from '../../../theme';
import {Gap, SearchBar, SsuToast} from '../../atom';
import {TopNavigation} from '../TopNavigation';
import {TopSongListData} from '../../../data/topSong';
import {ArrowLeftIcon, TickCircleIcon} from '../../../assets/icon';

interface AddSongProps {
  onPressGoBack: () => void;
}

export const AddSongContent: React.FC<AddSongProps> = ({onPressGoBack}) => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setModalVisible(false);
    }, 3000);
  }, [modalVisible]);

  const onPressAdd = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.root}>
      <TopNavigation.Type1
        title="Add Songs"
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />
      <SearchBar
        value={search}
        onChangeText={(text: string) => setSearch(text)}
        containerStyle={{
          paddingHorizontal: widthPercentage(20),
          paddingVertical: heightPercentage(20),
        }}
      />
      <View
        style={{
          height: height,
          paddingHorizontal: widthPercentage(20),
        }}>
        <FlashList
          data={TopSongListData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}: any) => (
            <ListCard.MusicList
              type={'add'}
              onPressAdd={onPressAdd}
              imgUri={item.imgUri}
              musicNum={item.musicNum}
              musicTitle={elipsisText(item.musicTitle, 22)}
              singerName={item.singerName}
              containerStyles={{marginTop: heightPercentage(20)}}
            />
          )}
          estimatedItemSize={TopSongListData.length}
        />
      </View>

      <SsuToast
        modalVisible={modalVisible}
        onBackPressed={() => setModalVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <TickCircleIcon
              width={widthPercentage(21)}
              height={heightPercentage(20)}
              stroke={color.Neutral[10]}
            />
            <Gap width={widthPercentage(7)} />
            <Text style={[typography.Button2, styles.textStyle]}>
              Song have been added to playlist!
            </Text>
          </View>
        }
        modalStyle={{marginHorizontal: widthPercentage(24)}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  textVersion: {
    color: Color.Neutral[10],
    paddingLeft: widthPercentage(15),
    paddingTop: heightPercentage(15),
  },
  textSignOut: {
    color: Color.Neutral[10],
    paddingLeft: widthPercentage(15),
  },
  containerSignout: {
    flexDirection: 'row',
    paddingLeft: widthPercentage(15),
    position: 'absolute',
    bottom: heightPercentage(20),
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: color.Success[400],
    paddingHorizontal: widthPercentage(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: color.Neutral[10],
  },
});
