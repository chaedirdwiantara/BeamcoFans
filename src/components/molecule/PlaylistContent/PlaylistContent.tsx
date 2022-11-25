import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Dropdown} from '../DropDown';
import Color from '../../../theme/Color';
import {PhotoPlaylist} from './PhotoPlaylist';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import TopSong from '../../../screen/ListCard/TopSong';
import {heightPercentage, width, widthPercentage} from '../../../utils';

interface Props {
  playlist: object;
  onPressGoBack: () => void;
}

export const PlaylistContent: React.FC<Props> = ({playlist, onPressGoBack}) => {
  const dataMore = [
    {label: 'Add to Playlist', value: 'AddToPlaylist'},
    {label: 'Add to Queue', value: 'AddtoQueue'},
    {label: 'Share Music', value: 'ShareMusic'},
    {label: 'Show Credits', value: 'ShowCredits'},
  ];

  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu');
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type4
        title="Playlist"
        rightIcon={
          <Dropdown.More
            data={dataMore}
            selectedMenu={resultDataMore}
            containerStyle={{
              width: widthPercentage(123),
              marginLeft: widthPercentage(-113),
              marginTop: heightPercentage(-8),
            }}
          />
        }
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        rightIconAction={() => null}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />

      <View style={{alignSelf: 'center'}}>
        <PhotoPlaylist uri={playlist?.uri?.path} />
      </View>

      <TopSong />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    paddingHorizontal: widthPercentage(12),
    // alignItems: 'center',
  },
  containerInput: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: heightPercentage(15),
  },
  textInput: {
    paddingHorizontal: 0,
    marginTop: heightPercentage(10),
  },
  textArea: {
    paddingHorizontal: 0,
    marginVertical: heightPercentage(10),
  },
  footer: {
    width: widthPercentage(327),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: heightPercentage(40),
  },
  btnContainer: {
    width: widthPercentage(150),
    aspectRatio: heightPercentage(150 / 36),
  },
});
