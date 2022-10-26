import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SearchIcon} from '../../assets/icon';
import {color} from '../../theme';
import {TopNavigation} from '../molecule';

const TopNavExample = () => {
  return (
    <View style={styles.container}>
      {/* <Text style={{color: 'green'}}>Type 1 Left back action with Title</Text> */}
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
      <Text style={{color: 'green'}}>
        Left Icon Profile With Name, No Title, Right Icon With Notif Icon
      </Text>
      <TopNavigation.Type5
        name="Type 5"
        profileUri={
          'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp'
        }
        leftIconAction={() => console.log('Left Icon Pressed')}
        rightIcon={<SearchIcon stroke={'white'} />}
        rightIconAction={() => console.log('Right Icon Pressed')}
        maxLengthTitle={20}
        itemStrokeColor={color.Pink[100]}
        points={'100000'}
      />
    </View>
  );
};

export default TopNavExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
