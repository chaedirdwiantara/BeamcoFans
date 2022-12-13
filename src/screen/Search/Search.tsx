import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {
  Gap,
  ListCard,
  SearchBar,
  TabFilter,
  TopNavigation,
} from '../../components';
import Color from '../../theme/Color';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import {color} from '../../theme';
import {widthResponsive} from '../../utils';
import {SearchListData, SearchListType} from '../../data/search';
import {mvs} from 'react-native-size-matters';
import MusicianSection from '../../components/molecule/MusicianSection/MusicianSection';
import {ModalPlayMusic} from '../../components/molecule/Modal/ModalPlayMusic';

export const SearchScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [state, setState] = useState<string>('');
  const [dataShow, setDataShow] = useState<SearchListType[]>([]);
  const [forTrigger, setForTrigger] = useState<SearchListType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);

  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu');
  };

  const [filter, setFilter] = useState([
    {filterName: 'Song'},
    {filterName: 'Musician'},
    {filterName: 'Album'},
    {filterName: 'Playlist'},
    {filterName: 'Event'},
  ]);

  const filterData = (item: any, index: any) => {
    let dataFilter = [...SearchListData];
    dataFilter = dataFilter.filter(x => x.type === item);
    setDataShow(dataFilter);
    setSelectedIndex(index);
  };

  const onSubmit = () => {
    if (state !== '') {
      const newData = SearchListData.filter(item => {
        const singerName = item.singerName
          ? item.singerName.toUpperCase()
          : ''.toUpperCase();
        const musicTitle = item.musicTitle
          ? item.musicTitle.toUpperCase()
          : ''.toUpperCase();
        const searchText = state.toUpperCase();
        return (
          singerName.indexOf(searchText) > -1 ||
          musicTitle.indexOf(searchText) > -1
        );
      });
      setDataShow(newData);
      setForTrigger(newData);
    } else {
      setDataShow([]);
      setForTrigger([]);
    }
  };

  const goToSongDetails = () => {
    navigation.navigate('MusicPlayer');
  };

  return (
    <>
      <View style={styles.root}>
        <TopNavigation.Type1
          title={`Search`}
          leftIconAction={() => navigation.goBack()}
          maxLengthTitle={40}
          itemStrokeColor={color.Neutral[10]}
        />
        <View style={styles.container}>
          <Gap height={16} />
          <SearchBar
            value={state}
            onChangeText={(newText: string) => setState(newText)}
            onSubmitEditing={onSubmit}
            rightIcon={state !== '' && true}
            reset={() => setState('')}
          />
          <Gap height={16} />
          {forTrigger.length !== 0 ? (
            <>
              <TabFilter.Type2
                filterData={filter}
                onPress={filterData}
                selectedIndex={selectedIndex}
              />
              <FlatList
                data={dataShow}
                renderItem={({item, index}) =>
                  item.type === 'Musician' ? (
                    <MusicianSection
                      musicianNum={(index + 1).toLocaleString('en-US', {
                        minimumIntegerDigits: 2,
                        useGrouping: false,
                      })}
                      musicianName={item.singerName}
                      imgUri={item.imgUri}
                      containerStyles={{marginTop: mvs(20)}}
                      musicianId={item.id}
                    />
                  ) : (
                    <ListCard.MusicList
                      imgUri={item.imgUri}
                      musicNum={(index + 1).toLocaleString('en-US', {
                        minimumIntegerDigits: 2,
                        useGrouping: false,
                      })}
                      musicTitle={item.musicTitle}
                      singerName={item.singerName}
                      onPressMore={resultDataMore}
                      containerStyles={{marginTop: mvs(20)}}
                      onPressCard={() => setModalVisible(true)}
                    />
                  )
                }
              />
            </>
          ) : null}
        </View>
        {modalVisible && (
          <ModalPlayMusic
            imgUri={
              'https://cdns-images.dzcdn.net/images/cover/7f7aae26b50cb046c872238b6a2a10c2/264x264.jpg'
            }
            musicTitle={'Thunder'}
            singerName={'Imagine Dragons, The Wekeend'}
            onPressModal={goToSongDetails}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  container: {
    paddingHorizontal: widthResponsive(24),
  },
});
