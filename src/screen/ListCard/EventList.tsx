import React, {FC, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {MusicianList} from '../../interface/musician.interface';
import {heightResponsive, widthResponsive} from '../../utils';
import {ListDataSearchMusician} from '../../interface/search.interface';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import {EmptyStateSongMusician} from '../../components/molecule/EmptyState/EmptyStateSongMusician';
import MusiciansListCard from '../../components/molecule/ListCard/MusiciansListCard';
import Color from '../../theme/Color';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';

interface EventListProps {
  type?: string;
  scrollable?: boolean;
  dataEvent?: MusicianList[] | ListDataSearchMusician[];
  emptyState?: React.ComponentType;
  isLoading?: boolean;
}

const EventList: FC<EventListProps> = ({type, dataEvent, isLoading}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [listMusician, setListMusician] = useState(dataEvent);

  useEffect(() => {
    if (dataEvent !== undefined) {
      setListMusician(dataEvent);
    }
  }, [dataEvent]);

  return listMusician && listMusician?.length > 0 ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        // TODO: get response from api and change style
        // paddingRight: listMusician?.length > 5 ? widthResponsive(24) : 0,
        // width: listMusician?.length > 5 ? 'auto' : '100%',
        paddingLeft: widthResponsive(24),
        paddingRight: 0,
        width: '100%',
      }}>
      <View
        style={{
          marginRight: ms(20),
          flex: 1,
          // TODO: get response from api and change style
          //   width: listMusician?.length > 5 ? widthResponsive(255) : '100%',
          width: '100%',
        }}>
        {listMusician?.map((item, index) => {
          if (index <= 4) {
            return (
              <MusiciansListCard
                key={item.uuid}
                musicianNum={(index + 1).toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
                musicianName={item.fullname}
                imgUri={item.imageProfileUrls[1]?.image || ''}
                containerStyles={
                  // TODO: get response from api isLive
                  index === 0 ? styles.eventLive : {marginTop: mvs(18)}
                }
                point={type === 'profile' ? item.point || '' : ''}
                isEvent={true}
                activeMore={false}
                onPressImage={() =>
                  navigation.navigate('EventDetail', {id: '1'})
                }
                onPressMore={() => null}
                eventDate="Hongkong, 8 Feb 2024"
                isLive={index === 0}
              />
            );
          }
        })}
      </View>
      {/* {listMusician?.length > 5 && (
        <View style={{width: widthResponsive(255)}}>
          {listMusician?.map((item, index) => {
            if (index > 4 && index < 10) {
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
                    marginTop: mvs(12),
                  }}
                  point={type === 'profile' ? item.point || '' : ''}
                  isFollowed={item.isFollowed}
                  followOnPress={() =>
                    followOnPress(item.uuid, item.isFollowed)
                  }
                />
              );
            }
          })}
        </View>
      )} */}
    </ScrollView>
  ) : isLoading ? (
    <View
      style={{
        alignItems: 'center',
        paddingVertical: mvs(20),
      }}>
      <LoadingSpinner />
    </View>
  ) : (
    <EmptyStateSongMusician
      text={t('Home.Musician.EmptyState', {title: 'Top Musician'})}
    />
  );
};

export default EventList;

const styles = StyleSheet.create({
  eventLive: {
    marginTop: mvs(18),
    borderColor: Color.Pink.linear,
    borderWidth: 1,
    paddingHorizontal: widthResponsive(6),
    paddingVertical: heightResponsive(8),
    borderRadius: widthResponsive(4),
    overflow: 'hidden',
    position: 'relative',
  },
});
