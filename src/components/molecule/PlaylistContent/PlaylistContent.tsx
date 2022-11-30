import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';

import {Dropdown} from '../DropDown';
import Color from '../../../theme/Color';
import {PhotoPlaylist} from './PhotoPlaylist';
import {TopNavigation} from '../TopNavigation';
import {
  ArrowLeftIcon,
  MusicSquareAddIcon,
  PauseIcon,
} from '../../../assets/icon';
import TopSong from '../../../screen/ListCard/TopSong';
import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';
import {color, font, typography} from '../../../theme';
import {Avatar, Gap} from '../../atom';
import {ModalConfirm} from '../Modal/ModalConfirm';

interface Playlist {
  playlistUri: string;
  playlistName: string;
  playlistDesc: string;
}

interface Props {
  playlist: Playlist;
  onPressGoBack: () => void;
  goBackProfile: (type: string) => void;
  goToEditPlaylist: () => void;
}

export const PlaylistContent: React.FC<Props> = ({
  playlist,
  onPressGoBack,
  goBackProfile,
  goToEditPlaylist,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const dataMore = [
    {label: 'Add to Queue', value: 'AddToQueue'},
    {label: 'Edit Playlist', value: 'EditPlaylist'},
    {label: 'Share Playlist', value: 'SharePlaylist'},
    {label: 'Delete Playlist', value: 'DeletePlaylist'},
  ];

  const resultDataMore = (dataResult: any) => {
    if (dataResult?.value === 'DeletePlaylist') {
      setModalVisible(true);
    } else if (dataResult?.value === 'EditPlaylist') {
      goToEditPlaylist();
    }
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
        leftIconAction={() => goBackProfile('')}
        rightIconAction={() => null}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />

      <ScrollView>
        <View
          style={{
            paddingHorizontal: widthPercentage(10),
          }}>
          <View style={{alignSelf: 'center'}}>
            <PhotoPlaylist uri={playlist?.playlistUri?.path} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: widthPercentage(12),
              marginTop: heightPercentage(10),
            }}>
            <View>
              <Text
                style={{
                  fontSize: normalize(20),
                  color: color.Neutral[10],
                  fontFamily: font.InterSemiBold,
                  lineHeight: heightPercentage(28),
                }}>
                {playlist?.playlistName}
              </Text>
              <Text
                style={{
                  fontSize: normalize(10),
                  color: color.Dark[50],
                  fontFamily: font.InterMedium,
                }}>{`Created on December 7, 2022 · 1000 songs`}</Text>
            </View>
            <PauseIcon />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: widthPercentage(12),
              marginVertical: heightPercentage(6),
            }}>
            <Text
              style={{
                fontSize: normalize(12),
                color: color.Neutral[10],
                fontFamily: font.InterMedium,
              }}>
              by
            </Text>
            <Gap width={widthPercentage(5)} />
            <Avatar
              size={widthPercentage(16)}
              imgUri="https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp"
            />
            <Gap width={widthPercentage(5)} />
            <Text
              style={{
                fontSize: normalize(12),
                color: color.Neutral[10],
                fontFamily: font.InterMedium,
              }}>
              Weeblab
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: widthPercentage(12),
              marginTop: heightPercentage(12),
            }}>
            <MusicSquareAddIcon />
            <Gap width={widthPercentage(10)} />
            <Text
              style={{
                fontSize: normalize(12),
                color: color.Dark[50],
                fontFamily: font.InterMedium,
              }}>
              Add Song
            </Text>
          </View>
        </View>

        <View
          style={{
            width,
            height: 1,
            backgroundColor: color.Dark[500],
            marginTop: heightPercentage(15),
          }}
        />

        <View
          style={{
            flex: 1,
            paddingHorizontal: widthPercentage(20),
            paddingTop: heightPercentage(15),
          }}>
          {playlist?.playlistDesc && (
            <View
              style={{
                marginBottom: heightPercentage(15),
              }}>
              <Text
                style={[
                  typography.Subtitle1,
                  {
                    color: color.Success[500],
                  },
                ]}>
                Description
              </Text>
              <Text
                style={{
                  fontSize: normalize(12),
                  color: color.Neutral[10],
                  fontFamily: font.InterRegular,
                  lineHeight: heightPercentage(16),
                  paddingTop: heightPercentage(8),
                }}>
                {playlist?.playlistDesc}
              </Text>
            </View>
          )}

          <Text
            style={[
              typography.Subtitle1,
              {
                color: color.Success[500],
              },
            ]}>
            Song List
          </Text>
          <View style={{}}>
            <TopSong />
          </View>
        </View>
      </ScrollView>

      <ModalConfirm
        modalVisible={isModalVisible}
        title="Delete"
        subtitle="Are you sure you want to delete this playlist?"
        onPressClose={() => setModalVisible(false)}
        onPressOk={() => goBackProfile('delete')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
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
