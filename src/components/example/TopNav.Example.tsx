import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TopNavigation} from '../molecules';
import {HomeIcon, SearchIcon} from '../../assets/icon';

const TopNavExample = () => {
  return (
    <ScrollView>
      <Text style={{color: 'green'}}>Type 1 Left back action with Title</Text>
      <TopNavigation.Type1
        title="Type 1"
        leftIconAction={() => console.log('Left Icon Pressed')}
        maxLengthTitle={20}
        itemStrokeColor={'white'}
      />
      <Text style={{color: 'green'}}>Type 2 Just Title</Text>
      <TopNavigation.Type2
        title="Type 2"
        maxLengthTitle={20}
        itemStrokeColor={'white'}
      />
      <Text style={{color: 'green'}}>Type 3 Title n Right icon action</Text>
      <TopNavigation.Type3
        title="Type 3"
        rightIcon={<SearchIcon stroke={'white'} />}
        rightIconAction={() => console.log('Right Icon Pressed')}
        maxLengthTitle={20}
        itemStrokeColor={'white'}
      />
      <Text style={{color: 'green'}}>
        Type 4 Left back action, title, right custom icon action
      </Text>
      <TopNavigation.Type4
        title="Type 4"
        leftIconAction={() => console.log('Left Icon Pressed')}
        rightIcon={<SearchIcon stroke={'white'} />}
        rightIconAction={() => console.log('Right Icon Pressed')}
        maxLengthTitle={20}
        itemStrokeColor={'white'}
      />
    </ScrollView>
  );
};

export default TopNavExample;

const styles = StyleSheet.create({});
