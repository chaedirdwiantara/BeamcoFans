import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState} from 'react';
import {TabFilter} from '../atom';

const TabFilterExample = () => {
  const [data, setData] = useState([
    {
      productName: 'SONG',
    },
    {
      productName: 'TOP MUSICIAN',
    },
    {
      productName: 'POINTS',
    },
    {
      productName: 'BADGE',
    },
  ]);

  const [dataShow, setDataShow] = useState(data);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [filter, setFilter] = useState([
    {filterName: 'SONG'},
    {filterName: 'TOP MUSICIAN'},
    {filterName: 'POINTS'},
    {filterName: 'BADGE'},
  ]);

  const filterData = (item: any, index: any) => {
    let dataFilter = [...data];
    dataFilter = dataFilter.filter(x => x.productName == item);
    setDataShow(dataFilter);
    setSelectedIndex(index);
  };

  return (
    <View style={{width: '100%', marginBottom: 16}}>
      <Text style={{color: 'green'}}>Tab Filter Type 1</Text>
      <TabFilter.Type1
        filterData={filter}
        onPress={filterData}
        selectedIndex={selectedIndex}
      />
      <FlatList
        data={dataShow}
        renderItem={({item}) => (
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 10,
              backgroundColor: '#FFF',
              elevation: 2,
              paddingVertical: 10,
              paddingLeft: 10,
            }}>
            <Text>{item.productName}</Text>
          </View>
        )}
      />

      <Text style={{color: 'green'}}>Tab Filter Type 2</Text>
      <TabFilter.Type2
        filterData={filter}
        onPress={filterData}
        selectedIndex={selectedIndex}
      />
      <FlatList
        data={dataShow}
        renderItem={({item}) => (
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 10,
              backgroundColor: '#FFF',
              elevation: 2,
              paddingVertical: 10,
              paddingLeft: 10,
            }}>
            <Text>{item.productName}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TabFilterExample;

const styles = StyleSheet.create({});
