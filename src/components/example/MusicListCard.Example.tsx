import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ListCard} from '../molecule';

const MusicListCardExample = () => {
  const [likePressed, setLikePressed] = useState(false);

  const onPressLikeIcon = () => {
    console.log('likey');
    setLikePressed(!likePressed);
  };

  const onPressThreeDots = () => {
    console.log('dowtey');
  };
  return (
    <View style={{width: '100%', marginBottom: 16}}>
      <Text style={{color: 'green'}}>ListCard Music List</Text>
      <ListCard.MusicList
        imgUri={
          'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp'
        }
        musicNum={'1'}
        musicTitle={'Channel'}
        musicDesc={'Frank Ocean'}
        onPressLikeIcon={onPressLikeIcon}
        onPressThreeDots={onPressThreeDots}
        likePressed={likePressed}
      />
    </View>
  );
};

export default MusicListCardExample;

const styles = StyleSheet.create({});
