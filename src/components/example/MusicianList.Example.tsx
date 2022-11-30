import React from 'react';
import {View} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {ListCard} from '../molecule';

const MusicianListExample = () => {
  const onPressThreeDots = () => {
    console.log('dowtey');
  };

  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu');
  };

  return (
    <View style={{width: '100%', marginBottom: mvs(16)}}>
      <ListCard.MusicianList
        musicianNum={01}
        musicianName={'Sikok Bagi Tigo'}
        imgUri={
          'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp'
        }
        onPressThreeDots={onPressThreeDots}
        point={'1000'}
        containerStyles={{marginTop: mvs(20)}}
      />
      <ListCard.MusicianList
        musicianNum={02}
        musicianName={'Sikok Bagi Tigo'}
        imgUri={
          'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp'
        }
        onPressThreeDots={onPressThreeDots}
        point={'1000'}
        containerStyles={{marginTop: mvs(20)}}
      />
    </View>
  );
};

export default MusicianListExample;
