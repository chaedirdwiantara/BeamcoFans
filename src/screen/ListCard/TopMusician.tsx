import React, {FC} from 'react';
import {mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import {MusicianListData} from '../../data/topMusician';
import MusicianSection from '../../components/molecule/MusicianSection/MusicianSection';

interface TopMusicianProps {
  type?: string;
  scrollable?: boolean;
}

const TopMusician: FC<TopMusicianProps> = ({type, scrollable = true}) => {
  return (
    <FlashList
      data={MusicianListData}
      showsVerticalScrollIndicator={false}
      scrollEnabled={scrollable}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => (
        <MusicianSection
          musicianId={item.id}
          musicianNum={(index + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          musicianName={item.musicianName}
          imgUri={item.imgUri}
          containerStyles={{marginTop: mvs(20)}}
          point={type === 'profile' ? item.point : null}
        />
      )}
      estimatedItemSize={MusicianListData.length}
    />
  );
};

export default TopMusician;
