import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {MusicListCard} from '../molecules';

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
    <MusicListCard
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
  );
};

export default MusicListCardExample;

const styles = StyleSheet.create({});
