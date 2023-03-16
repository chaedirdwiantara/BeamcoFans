import React, {FC, useEffect, useState} from 'react';
import {ms, mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import {
  FollowMusicianPropsType,
  MusicianList,
} from '../../interface/musician.interface';
import {heightResponsive, widthResponsive} from '../../utils';
import {ParamsProps} from '../../interface/base.interface';
import {ListDataSearchMusician} from '../../interface/search.interface';
import MusicianSection from '../../components/molecule/MusicianSection/MusicianSection';
import {FlatList, SafeAreaView, ScrollView, View} from 'react-native';

interface TopMusicianProps {
  type?: string;
  scrollable?: boolean;
  dataMusician?: MusicianList[] | ListDataSearchMusician[];
  setFollowMusician: (
    props?: FollowMusicianPropsType,
    params?: ParamsProps,
  ) => void;
  setUnfollowMusician: (
    props?: FollowMusicianPropsType,
    params?: ParamsProps,
  ) => void;
  emptyState?: React.ComponentType;
}

const TopMusician: FC<TopMusicianProps> = ({
  type,
  scrollable = true,
  dataMusician,
  setFollowMusician,
  setUnfollowMusician,
  emptyState,
}) => {
  const [listMusician, setListMusician] = useState(dataMusician);

  const followOnPress = (index: string, isFollowed?: boolean) => {
    if (listMusician !== undefined) {
      const newList = listMusician.map(val => ({
        ...val,
        isFollowed: val.uuid === index ? !val.isFollowed : val.isFollowed,
      }));

      setListMusician(newList);
    }

    isFollowed
      ? setUnfollowMusician({musicianID: index}, {filterBy: 'top'})
      : setFollowMusician({musicianID: index}, {filterBy: 'top'});
  };

  useEffect(() => {
    if (dataMusician !== undefined) {
      setListMusician(dataMusician);
    }
  }, [dataMusician]);

  return (
    listMusician && (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingRight: listMusician?.length > 4 ? widthResponsive(24) : 0,
          paddingLeft: widthResponsive(24),
          width: listMusician?.length > 4 ? 'auto' : '100%',
        }}>
        <View
          style={{
            marginRight: ms(20),
            flex: 1,
            width: listMusician?.length > 4 ? widthResponsive(255) : '100%',
          }}>
          {listMusician?.map((item, index) => {
            if (index <= 4) {
              return (
                <MusicianSection
                  key={item.uuid}
                  userId={item.uuid}
                  musicianNum={(index + 1).toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}
                  musicianName={item.fullname}
                  imgUri={item.imageProfileUrls[1]?.image || ''}
                  containerStyles={{
                    marginTop: mvs(20),
                  }}
                  point={type === 'profile' ? item.point || 0 : null}
                  isFollowed={item.isFollowed}
                  followOnPress={() =>
                    followOnPress(item.uuid, item.isFollowed)
                  }
                />
              );
            }
          })}
        </View>
        {listMusician?.length > 4 && (
          <View style={{width: widthResponsive(255)}}>
            {listMusician?.map((item, index) => {
              if (index > 4) {
                return (
                  <MusicianSection
                    key={item.uuid}
                    userId={item.uuid}
                    musicianNum={(index + 1).toLocaleString('en-US', {
                      minimumIntegerDigits: 2,
                      useGrouping: false,
                    })}
                    musicianName={item.fullname}
                    imgUri={item.imageProfileUrls[1]?.image || ''}
                    containerStyles={{
                      marginTop: mvs(20),
                    }}
                    point={type === 'profile' ? item.point || 0 : null}
                    isFollowed={item.isFollowed}
                    followOnPress={() =>
                      followOnPress(item.uuid, item.isFollowed)
                    }
                  />
                );
              }
            })}
          </View>
        )}
      </ScrollView>
    )
  );
};

export default TopMusician;
