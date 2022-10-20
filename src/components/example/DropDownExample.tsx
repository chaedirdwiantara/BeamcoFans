import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Dropdown} from '../atom';

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
  return <Dropdown.Menu data={data} />;
};

export default DropDownExample;

const styles = StyleSheet.create({});
