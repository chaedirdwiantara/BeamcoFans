import {View, Text, ScrollView, RefreshControl, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useInfiniteQuery} from 'react-query';
import {getListTips} from '../../../api/credit.api';
import {
  heightPercentage,
  heightResponsive,
  normalize,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import LoadingSpinner from '../../atom/Loading/LoadingSpinner';
import {EmptyState} from '../EmptyState/EmptyState';
import {useTranslation} from 'react-i18next';
import {DonateCardContent} from '../SettingContent/DonateCard';
import Color from '../../../theme/Color';
import {mvs} from 'react-native-size-matters';
import {font} from '../../../theme';
import {DataDropDownType} from '../../../data/dropdown';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {Gap, SsuToast} from '../../atom';
import {CheckCircle2Icon} from '../../../assets/icon';
import {dateFormat, dateFormatSubscribe} from '../../../utils/date-format';
import {tippingDuration} from '../../../utils/tippingDuration';

interface ListTipsProps {
  status: 'current' | 'past';
  duration: '' | 'weekly' | 'monthly' | 'yearly' | string;
}

const ListTips: React.FC<ListTipsProps> = props => {
  const {t} = useTranslation();
  const {status, duration} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [listTips, setListTips] = useState<any>([]);
  const [showStopTipModal, setShowStopTipModal] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const {
    data: dataTips,
    refetch,
    isRefetching,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['/list-tips'],
    ({pageParam = 1}) =>
      getListTips({
        page: pageParam,
        perPage: 10,
        filterValue: status === 'current' ? 1 : 2,
      }),
    {
      getNextPageParam: lastPage => {
        if (lastPage?.data?.length > 0) {
          const nextPage = lastPage?.meta?.Page + 1;
          return nextPage;
        }
        return null;
      },
    },
  );

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (dataTips !== undefined) {
      setListTips(dataTips?.pages?.map((page: any) => page.data).flat() ?? []);
    }
  }, [dataTips]);

  useEffect(() => {
    refetch();
  }, [status, duration]);

  const resultDataMore = (dataResult: DataDropDownType, val: any) => {
    if (dataResult.value === '1') {
      navigation.navigate('MusicianProfile', {id: val.musician.uuid});
    } else {
      setCurrentData(val);
      setShowStopTipModal(true);
    }
  };

  const closeModal = () => {
    setShowStopTipModal(false);
  };

  const onPressConfirm = () => {
    console.log(currentData);
    setShowStopTipModal(false);
    setLoading(true);
    // try {
    //   //   const response = unsubsEC(currentData?.ID);
    //   //   if (response.code === 200) {
    //   //     setTimeout(() => {
    //   //   setToastVisible(true);
    //   // }, 1000);
    //   //     refetch();
    //   //   }
    // } catch (error) {
    //   console.log(error);
    // }
    setLoading(false);
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: heightResponsive(25),
          paddingHorizontal: widthPercentage(6),
        }}
        onTouchEnd={loadMore}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching && !isFetchingNextPage}
            onRefresh={refetch}
            onLayout={e => console.log(e.nativeEvent)}
            tintColor="transparent"
            colors={['transparent']}
            style={{backgroundColor: 'transparent'}}
          />
        }>
        {(isRefetching || isLoading) && !isFetchingNextPage && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner />
          </View>
        )}

        {isLoading ? null : listTips?.length > 0 ? (
          listTips?.map((val: any, index: number) => (
            <DonateCardContent
              key={index}
              avatarUri={val.ownerImage}
              name={val.ownerFullName}
              username={`@${val.ownerUserName}`}
              detail={[
                val.contributionRepeatStatus === 1 ? 'Ongoing' : 'Ended',
                dateFormatSubscribe(val.contributionEndAt),
                val.credit + ' Credit',
                tippingDuration(val.duration),
              ]}
              onPressMore={() => null}
              type="tip"
              next={val.duration > 0 ? true : false}
            />
          ))
        ) : (
          <EmptyState
            text={t('EmptyState.Donate') || ''}
            containerStyle={styles.emptyState}
          />
        )}

        {isFetchingNextPage && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner />
          </View>
        )}
      </ScrollView>
      <ModalConfirm
        modalVisible={showStopTipModal}
        title={t('Modal.Unsub.Title') || ''}
        subtitle={
          t('Modal.Unsub.Subtitle', {
            musician: currentData?.musician.fullname,
          }) || ''
        }
        onPressClose={closeModal}
        onPressOk={onPressConfirm}
        disabled={isLoading}
      />
      <ModalLoading visible={loading} />
      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <CheckCircle2Icon />
            <Gap width={4} />
            <Text style={[styles.textStyle]} numberOfLines={2}>
              {`Your donation have been updated!`}
            </Text>
          </View>
        }
        modalStyle={styles.toast}
      />
    </>
  );
};

export default ListTips;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  textVersion: {
    color: Color.Neutral[10],
    paddingLeft: widthPercentage(15),
    paddingTop: heightPercentage(15),
  },
  textSignOut: {
    color: Color.Neutral[10],
    paddingLeft: widthPercentage(15),
  },
  containerSignout: {
    flexDirection: 'row',
    paddingLeft: widthPercentage(15),
    position: 'absolute',
    bottom: heightPercentage(20),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  musicianName: {
    fontFamily: font.InterRegular,
    fontSize: mvs(14),
    fontWeight: '500',
    color: Color.Neutral[10],
  },
  followerCount: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    color: Color.Dark[50],
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: widthPercentage(20),
    flexDirection: 'row',
    marginBottom: heightPercentage(15),
  },
  modalContainer: {
    flexDirection: 'row',
    backgroundColor: Color.Success[400],
    paddingVertical: heightPercentage(8),
    paddingHorizontal: widthResponsive(12),
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: mvs(22),
    maxWidth: '100%',
    flexWrap: 'wrap',
  },
  textStyle: {
    color: Color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(13),
  },
  toast: {
    maxWidth: '100%',
    marginHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    marginTop: heightPercentage(100),
  },
});