import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInputProps,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {SsuInput} from '../../atom/InputText/SsuInput';
import {color, font} from '../../../theme';
import {ms, mvs} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import SearchBar from '../../atom/SearchBar';
import {FlashList} from '@shopify/flash-list';
import {normalize} from '../../../utils';
import Gap from '../../atom/Gap/Gap';
import regexNumber from '../../../utils/regexNumber';
import {ChevronDownIcon} from '../../../assets/icon';

interface CountryData {
  value: string;
  label: string;
  image: string;
  code: string;
}
interface SelectCountryProps extends TextInputProps {
  countryData: CountryData[];
  numberTyped: (data: any) => void;
}

const DropdownSelectCountry: FC<SelectCountryProps> = (
  props: SelectCountryProps,
) => {
  const {countryData, numberTyped} = props;
  const [state, setState] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<any>([]);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState<any>([]);
  const [value, setValue] = useState<any>('');
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    setData(countryData);
    setFullData(countryData);
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
    setShowIcon(true);
  };

  const onReset = () => {
    setQuery('');
    setShowIcon(false);
    setData(countryData);
  };

  const countryOnPress = (item: any) => {
    setValue(item);
    setModalVisible(false);
  };

  const onEndEditing = () => {
    console.log('pressed end editing');
  };

  return (
    <View style={{height: mvs(40), width: '100%'}}>
      <SsuInput.InputText
        value={state}
        onChangeText={(newText: any) =>
          setState(newText.replace(regexNumber, ''))
        }
        placeholder={'Phone Number'}
        keyboardType={'number-pad'}
        fontSize={normalize(12)}
        onEndEditing={() => numberTyped(value?.code + state)}
        leftIcon={
          <View style={styles.leftIconContainer}>
            <TouchableOpacity
              style={styles.selectCountryContainer}
              onPress={() => {
                setModalVisible(true);
              }}>
              <Text style={styles.leftLabel}>{value?.label}</Text>
              <ChevronDownIcon />
            </TouchableOpacity>
            <Text style={styles.selectedCountryCode}>{value?.code}</Text>
          </View>
        }
        {...props}
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
              rightIcon={showIcon}
              reset={onReset}
              onEndEditing={onEndEditing}
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
                      source={{uri: item.image}}
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
    flexDirection: 'row',
    backgroundColor: color.Dark[700],
    width: ms(55),
    height: '100%',
    marginLeft: ms(-10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  leftLabel: {
    color: color.Neutral[10],
    alignSelf: 'center',
    fontFamily: font.InterLight,
    fontSize: normalize(12),
    fontWeight: '400',
    lineHeight: mvs(14.5),
  },
  selectedCountryCode: {
    color: color.Dark[300],
    fontFamily: font.InterLight,
    fontSize: normalize(12),
    lineHeight: mvs(14.5),
    marginLeft: ms(4),
    marginRight: ms(-6),
    marginTop: mvs(-1),
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
