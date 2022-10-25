import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {SearchBar} from '../components';
import {
  DropDownExample,
  InputExample,
  MusicianListExample,
  MusicListCardExample,
  TabFilterExample,
  TopNavExample,
} from '../components/example';
import PostListCardExample from '../components/example/PostListCard.Example';

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <ScrollView>
        {/* <Text>Home Screen</Text> */}
        <TopNavExample />
        <DropDownExample />
        <InputExample />
        <SearchBar />
        <MusicianListExample />
        <MusicListCardExample />
        <PostListCardExample />
        <TabFilterExample />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: mvs(12),
  },
});
