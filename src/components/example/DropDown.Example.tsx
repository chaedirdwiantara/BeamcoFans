import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Dropdown} from '../molecule';

const DropDownExample = () => {
  const data = [
    {label: 'All', value: '1'},
    {label: 'Coming Up', value: '2'},
    {label: 'Tour', value: '3'},
    {label: 'Dialy Life', value: '4'},
    {label: 'Behind The Scene', value: '5'},
    {label: 'Highlight Post', value: '6'},
    {label: 'Backstage', value: '7'},
  ];

  const dataLanguage = [
    {label: 'Indonesia', value: '1'},
    {label: 'English', value: '2'},
    {label: 'Namekian', value: '3'},
    {label: 'Buginese', value: '4'},
    {label: 'Javanese', value: '5'},
    {label: 'Manise', value: '6'},
    {label: 'Plutonese', value: '7'},
  ];

  // ? Dropdown Select Country Example
  const countryData = [
    {
      value: '1',
      label: 'US',
      image: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      code: '+1',
    },
    {
      value: '2',
      label: 'ID',
      image: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      code: '+62',
    },
    {
      value: '3',
      label: 'JP',
      image: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      code: '+81',
    },
    {
      value: '4',
      label: 'IN',
      image: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      code: '+91',
    },
    {
      value: '5',
      label: 'UK',
      image: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      code: '+44',
    },
  ];

  const resultData = (dataResult: any) => {
    console.log(dataResult, 'dataTyped');
  };

  return (
    <View style={{width: '100%', marginBottom: 16}}>
      <Text style={{color: 'green'}}>Type 1 Dropdown menu</Text>
      <Dropdown.Menu data={data} placeHolder={'Category'} />
      <Text style={{color: 'green'}}>Type 2 Dropdown input</Text>
      <Dropdown.Input
        data={dataLanguage}
        placeHolder={'Select Language'}
        dropdownLabel={'Language'}
      />
      <Text style={{color: 'green'}}>Type 3 Dropdown Select Country</Text>
      <Dropdown.Country countryData={countryData} numberTyped={resultData} />
    </View>
  );
};

export default DropDownExample;

const styles = StyleSheet.create({});
