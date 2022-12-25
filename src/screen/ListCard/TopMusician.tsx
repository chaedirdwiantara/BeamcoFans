import React, {FC} from 'react';
import {mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import {MusicianListData} from '../../data/topMusician';
import {
  FollowMusicianPropsType,
  MusicianList,
} from '../../interface/musician.interface';
import MusicianSection from '../../components/molecule/MusicianSection/MusicianSection';

interface TopMusicianProps {
  type?: string;
  scrollable?: boolean;
  dataMusician?: MusicianList[];
  setFollowMusician: (props?: FollowMusicianPropsType) => void;
  setUnfollowMusician: (props?: FollowMusicianPropsType) => void;
}

const TopMusician: FC<TopMusicianProps> = ({
  type,
  scrollable = true,
  dataMusician,
  setFollowMusician,
  setUnfollowMusician,
}) => {
  const followOnPress = (index: string, isFollowed: boolean) => {
    isFollowed
      ? setUnfollowMusician({musicianID: index})
      : setFollowMusician({musicianID: index});
  };

  return (
    <FlashList
      data={dataMusician.length > 0 ? dataMusician : MusicianListData}
      showsVerticalScrollIndicator={false}
      scrollEnabled={scrollable}
      keyExtractor={item => item.uuid}
      renderItem={({item, index}) => (
        <MusicianSection
          musicianId={item.uuid}
          musicianNum={(index + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          musicianName={item.fullname}
          imgUri={item.imageProfileUrl || ''}
          containerStyles={{marginTop: mvs(20)}}
          point={type === 'profile' ? item.point || 0 : null}
          isFollowed={item.isFollowed}
          followOnPress={() => followOnPress(item.uuid, item.isFollowed)}
        />
      )}
      estimatedItemSize={MusicianListData.length}
    />
  );
};

export default TopMusician;
