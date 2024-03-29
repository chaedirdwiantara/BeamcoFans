import React from 'react';
import {TopNavigation} from '../../components';
import {ArrowLeftIcon, AudioMusic} from '../../assets/icon';
import {color} from '../../theme';
import {widthResponsive} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {usePlayerHook} from '../../hooks/use-player.hook';

const TopNav = ({
  songId,
  musicianId,
  leftIconAction,
}: {
  songId: number;
  musicianId: string;
  leftIconAction?: () => void;
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {showMiniPlayerOnly} = usePlayerHook();
  return (
    <TopNavigation.Type4
      title="Now Playing"
      leftIcon={
        <ArrowLeftIcon
          stroke={color.Neutral[10]}
          style={{marginLeft: widthResponsive(-6)}}
        />
      }
      leftIconAction={navigation.goBack}
      rightIcon={<AudioMusic />}
      rightIconAction={() => {
        showMiniPlayerOnly();
        navigation.navigate('SongDetails', {songId, musicianId});
      }}
      itemStrokeColor={'white'}
      containerStyles={{
        borderBottomWidth: 0,
        paddingBottom: 0,
      }}
    />
  );
};

export default TopNav;
