import React, {useState} from 'react';
import {View} from 'react-native';
import {mvs} from 'react-native-size-matters';
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
    <View style={{width: '100%', marginBottom: mvs(16)}}>
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
        containerStyles={{marginTop: mvs(20)}}
      />
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
        containerStyles={{marginTop: mvs(20)}}
      />
    </View>
  );
};

export default MusicListCardExample;
