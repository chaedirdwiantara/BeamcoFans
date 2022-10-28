import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SsuInput} from '../InputText/SsuInput';
import {color} from '../../../theme';
import {ms, mvs} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import SearchBar from '../SearchBar';
import {FlashList} from '@shopify/flash-list';

const DropdownSelectCountry = () => {
  const localData = [
    {
      value: '1',
      label: 'US',
      image: {
        uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      },
      code: '+1',
    },
    {
      value: '2',
      label: 'ID',
      image: {
        uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      },
      code: '+62',
    },
    {
      value: '3',
      label: 'JP',
      image: {
        uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      },
      code: '+81',
    },
    {
      value: '4',
      label: 'IN',
      image: {
        uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      },
      code: '+91',
    },
    {
      value: '5',
      label: 'UK',
      image: {
        uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      },
      code: '+44',
    },
  ];
  const [state, setState] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState<any>([]);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState<any>([]);

  useEffect(() => {
    setData(localData);
    setFullData(localData);
  }, []);

  // ? handle onChangeText
  const onChangeText = (text: string) => {
    setSearchValue(text);
    console.log('onChangeText', text);
    // setShowIcon(true);
  };

  console.log(data, 'data');
  console.log(query, 'query');

  const contains = ({label}: any, query: any) => {
    if (label.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  };

  const handleSearch = (text: any) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = fullData.filter((user: any) => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };

  return (
    <View>
      <SsuInput.InputText
        value={state}
        onChangeText={(newText: any) => setState(newText)}
        placeholder={'Email or Username'}
        isError={false}
        errorMsg={'Incorrect email or password'}
        leftIcon={
          <TouchableOpacity
            style={{
              backgroundColor: color.Dark[300],
              width: 55,
              height: '100%',
              marginLeft: ms(-10),
              paddingTop: mvs(12),
              borderRadius: 5,
            }}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={{color: 'white', alignSelf: 'center'}}>Hai</Text>
          </TouchableOpacity>
        }
      />
      <Modal
        isVisible={modalVisible}
        scrollOffsetMax={400 - 300}
        propagateSwipe={true}>
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderRadius: 5,
            borderColor: 'black',
            height: mvs(200),
          }}>
          <View>
            <SearchBar
              value={query}
              onChangeText={queryText => handleSearch(queryText)}
            />
          </View>
          <FlashList
            data={data}
            renderItem={({item}: any) => <Text>{item.label}</Text>}
            estimatedItemSize={200}
          />
        </View>
      </Modal>
    </View>
  );
};

export default DropdownSelectCountry;

const styles = StyleSheet.create({});
