import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Dropdown, Gap} from '../atom';

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
  return (
    <>
      <Dropdown.Menu data={data} placeHolder={'Category'} />
      <Gap height={200} />
      <Dropdown.Input
        data={dataLanguage}
        placeHolder={'Select Language'}
        dropdownLabel={'Language'}
      />
    </>
  );
};

export default DropDownExample;

const styles = StyleSheet.create({});
