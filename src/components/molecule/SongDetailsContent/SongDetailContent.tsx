import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';

import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';
import {Dropdown} from '../DropDown';
import Color from '../../../theme/Color';
import {ListAvatar} from './ListAvatar';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon, TickCircleIcon} from '../../../assets/icon';
import {Gap, SsuToast} from '../../atom';
import {color, font, typography} from '../../../theme';
import {PhotoPlaylist} from '../PlaylistContent/PhotoPlaylist';
import {dropDownHeaderSongDetails} from '../../../data/dropdown';
import {ListenersAndDonate} from '../ListenersAndDonate/ListenersAndDonate';
import {ListAlbum} from './ListAlbum';
import {ModalDonate} from '../Modal/ModalDonate';
import {ModalShare} from '../Modal/ModalShare';

interface Props {
  onPressGoBack: () => void;
  goToAlbum: () => void;
  goToShowCredit: () => void;
}

export const SongDetailsContent: React.FC<Props> = ({
  onPressGoBack,
  goToAlbum,
  goToShowCredit,
}) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState({
    modalDonate: false,
    modalShare: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  }, [toastVisible]);

  const openModal = (name: string) => {
    setModalVisible({
      ...isModalVisible,
      [name]: true,
    });
  };

  const closeModal = () => {
    setModalVisible({
      modalDonate: false,
      modalShare: false,
    });
  };

  const resultDataMore = (dataResult: any) => {
    if (dataResult.value === '3') {
      openModal('modalShare');
    } else if (dataResult.value === '4') {
      goToShowCredit();
    }
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type4
        title="Song Details"
        rightIcon={
          <Dropdown.More
            data={dropDownHeaderSongDetails}
            selectedMenu={resultDataMore}
            containerStyle={styles.containerMore}
          />
        }
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        rightIconAction={() => null}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />

      <ScrollView>
        <View style={{paddingHorizontal: widthPercentage(10)}}>
          <View style={{alignSelf: 'center'}}>
            <PhotoPlaylist uri="https://cdns-images.dzcdn.net/images/cover/7f7aae26b50cb046c872238b6a2a10c2/264x264.jpg" />
          </View>
          <View style={styles.containerTitle}>
            <View>
              <Text style={styles.titleSong}>{'Thunder'}</Text>
              <Text style={styles.artist}>
                {`Imagine Dragons, The Weekend`}
              </Text>
              <Text style={styles.albumName}>{`Smoke + Mirror · 2017`}</Text>
            </View>
          </View>
          <ListenersAndDonate
            totalListener={66900}
            onPress={() => openModal('modalDonate')}
          />
        </View>

        <View style={styles.separator} />

        <View style={styles.containerContent}>
          <View style={{marginBottom: heightPercentage(15)}}>
            <ListAvatar
              title="Musician"
              text="Imagine Dragons"
              avatarUri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_yUUsxR8iCCEoLjrK99teZrFVOZiL13_Khx6W02T6Hez0QZjysSIN0BPWH7QBSH_27Fc&usqp=CAU"
            />

            <ListAvatar
              title="Featuring"
              text="The Wekeend"
              avatarUri="https://diskursusnetwork.com/wp-content/uploads/2022/02/The-Weekend-GQ-2015-01.jpg"
            />

            <Text style={[typography.Subtitle1, styles.titleContent]}>
              Song Description
            </Text>
            <Text style={styles.description}>
              {
                'Born on the sofa of his childhood home, singer Lukas Forchhammer entered the world in unconventional surroundings. His parents resided within the 84 acres of Christiania: an alternative, tightly knit community, formed in 1971 by squatters and artists in Cophenhagen.\n\nRunning water, cars and personal toilets were considered luxuries. The area was described by Lukas as "probably the biggest commune in the world" - so this isnt your run of the mill starting point for a record breaking pop star, but with lyrical references to "at eleven smoking herb and drinking burning liquor" the neighborhood had a big part to play in one of the most ridiculously popular tracks on the planet right now!\n\nSongwriters: Christopher Brown, Lukas Forchhammer, Stefan Forrest, Morten Ristorp Jensen, Morten Pilegaard, David Labrel. For non-commercial use only.'
              }
            </Text>

            <ListAlbum
              title={'Album'}
              albumName={'Smoke + Mirror'}
              onPress={goToAlbum}
              createdOn={'2020'}
              imgUri={
                'https://i.pinimg.com/originals/b3/51/66/b35166174c9bde2d0cc436150a983912.jpg'
              }
            />
          </View>
        </View>
      </ScrollView>

      <ModalDonate
        totalCoin={'120,000'}
        modalVisible={isModalVisible.modalDonate}
        onPressClose={closeModal}
      />

      <ModalShare
        url={
          'https://open.ssu.io/track/19AiJfAtRiccvSU1EWcttT?si=36b9a686dad44ae0'
        }
        modalVisible={isModalVisible.modalShare}
        onPressClose={closeModal}
        titleModal={'Share Album'}
        imgUri={
          'https://i.pinimg.com/originals/b3/51/66/b35166174c9bde2d0cc436150a983912.jpg'
        }
        type={'Album'}
        titleSong={'Smoke + Mirror'}
        createdOn={'2019'}
        artist={'Imagine Dragons, The Wekeend'}
        onPressCopy={() => setToastVisible(true)}
      />

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <TickCircleIcon
              width={widthPercentage(21)}
              height={heightPercentage(20)}
              stroke={color.Neutral[10]}
            />
            <Gap width={widthPercentage(7)} />
            <Text style={[typography.Button2, styles.textStyle]}>
              Link have been copied to clipboard!
            </Text>
          </View>
        }
        modalStyle={{marginHorizontal: widthPercentage(24)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  titleSong: {
    fontSize: normalize(20),
    color: color.Neutral[10],
    fontFamily: font.InterSemiBold,
    lineHeight: heightPercentage(28),
  },
  artist: {
    fontSize: normalize(12),
    color: color.Neutral[50],
    fontFamily: font.InterMedium,
  },
  albumName: {
    fontSize: normalize(12),
    color: color.Dark[50],
    fontFamily: font.InterMedium,
  },
  separator: {
    width,
    height: 1,
    backgroundColor: color.Dark[500],
    marginTop: heightPercentage(15),
  },
  containerAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: heightPercentage(12),
  },
  titleContent: {
    color: color.Success[500],
    paddingTop: heightPercentage(12),
  },
  containerFeaturing: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: heightPercentage(8),
  },
  containerTitle: {
    paddingHorizontal: widthPercentage(12),
    marginTop: heightPercentage(10),
  },
  containerMore: {
    width: widthPercentage(123),
    marginLeft: widthPercentage(-113),
    marginTop: heightPercentage(-8),
  },
  containerContent: {
    paddingHorizontal: widthPercentage(20),
    paddingTop: heightPercentage(15),
  },
  artistName: {
    fontFamily: font.InterMedium,
    fontSize: normalize(15),
    lineHeight: heightPercentage(20),
    color: color.Neutral[10],
  },
  description: {
    fontSize: normalize(12),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    lineHeight: heightPercentage(16),
    paddingTop: heightPercentage(8),
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: color.Success[400],
    paddingHorizontal: widthPercentage(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: color.Neutral[10],
  },
});
