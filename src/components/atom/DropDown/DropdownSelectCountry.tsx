import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SsuInput} from '../InputText/SsuInput';
import {color, font} from '../../../theme';
import {ms, mvs} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import SearchBar from '../SearchBar';
import {FlashList} from '@shopify/flash-list';
import {normalize} from '../../../utils';
import Gap from '../Gap/Gap';
import regexNumber from '../../../utils/regexNumber';

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
  const [data, setData] = useState<any>([]);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState<any>([]);
  const [value, setValue] = useState<any>('');
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    setData(localData);
    setFullData(localData);
  }, []);

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

  const countryOnPress = (item: any) => {
    setValue(item);
    setModalVisible(false);
  };

  return (
    <View>
      <SsuInput.InputText
        value={state}
        onChangeText={(newText: any) =>
          setState(newText.replace(regexNumber, ''))
        }
        placeholder={'Phone Number'}
        keyboardType={'number-pad'}
        fontSize={normalize(12)}
        leftIcon={
          <View style={styles.leftIconContainer}>
            <TouchableOpacity
              style={styles.selectCountryContainer}
              onPress={() => {
                setModalVisible(true);
              }}>
              {/* add Icon */}
              <Text style={styles.leftLabel}>{value?.label}</Text>
            </TouchableOpacity>
            <Text style={styles.selectedCountryCode}>{value?.code}</Text>
          </View>
        }
      />
      <Modal
        isVisible={modalVisible}
        scrollOffsetMax={400 - 300}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        propagateSwipe={true}>
        <View style={styles.modalContainer}>
          <View>
            <SearchBar
              value={query}
              onChangeText={queryText => handleSearch(queryText)}
            />
          </View>
          <FlashList
            data={data}
            showsVerticalScrollIndicator={false}
            // keyExtractor={}
            renderItem={({item}: any) => (
              <View>
                <TouchableOpacity
                  style={styles.countryList}
                  onPress={() => countryOnPress(item)}>
                  <View style={styles.countryListContainer}>
                    <Image
                      source={{uri: item.image.uri}}
                      style={styles.imageStyle}
                    />
                    <Gap width={4} />
                    <Text style={styles.listFont}>{item.label}</Text>
                  </View>
                  <Text style={styles.listFont}>{item.code}</Text>
                </TouchableOpacity>
              </View>
            )}
            estimatedItemSize={31}
          />
        </View>
      </Modal>
    </View>
  );
};

export default DropdownSelectCountry;

const styles = StyleSheet.create({
  leftIconContainer: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectCountryContainer: {
    backgroundColor: color.Dark[700],
    width: ms(55),
    height: '100%',
    marginLeft: ms(-10),
    paddingTop: mvs(12),
    borderRadius: 5,
  },
  leftLabel: {
    color: color.Neutral[10],
    alignSelf: 'center',
    fontFamily: font.InterLight,
    fontSize: normalize(12),
  },
  selectedCountryCode: {
    color: color.Dark[300],
    fontFamily: font.InterLight,
    fontSize: normalize(12),
    lineHeight: mvs(14.5),
    marginLeft: ms(4),
    marginRight: ms(-6),
  },
  modalContainer: {
    backgroundColor: color.Dark[700],
    paddingVertical: mvs(8),
    paddingHorizontal: ms(8),
    borderRadius: 5,
    height: mvs(200),
  },
  countryList: {
    marginTop: mvs(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countryListContainer: {flexDirection: 'row', alignItems: 'center'},
  imageStyle: {height: mvs(15), width: ms(20)},
  listFont: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(10),
    lineHeight: mvs(15),
    marginLeft: ms(4),
  },
});
