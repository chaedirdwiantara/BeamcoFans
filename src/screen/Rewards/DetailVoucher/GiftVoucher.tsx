import {useMutation} from 'react-query';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet} from 'react-native';
import {mvs} from 'react-native-size-matters';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  Gap,
  SearchBar,
  TopNavigation,
  ModalSendGift,
  ModalInfoSendGift,
} from '../../../components';
import ListFans from './ListFans';
import {color} from '../../../theme';
import Color from '../../../theme/Color';
import {widthResponsive} from '../../../utils';
import {RootStackParams} from '../../../navigations';
import {transferVoucher} from '../../../api/reward.api';
import {ListDataSearchFans} from '../../../interface/search.interface';

type GiftVoucherProps = NativeStackScreenProps<RootStackParams, 'GiftVoucher'>;

export const GiftVoucher: React.FC<GiftVoucherProps> = ({
  route,
  navigation,
}: GiftVoucherProps) => {
  const {t} = useTranslation();
  const voucherid = route.params.voucherid;

  const [state, setState] = useState<string>('');
  const [modalSendGift, setModalSendGift] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'success' | 'failed'>('success');
  const [selectedFans, setSelectedFans] = useState<ListDataSearchFans>();

  useEffect(() => {
    setModalSendGift(true);
  }, [selectedFans]);

  const setTransferVoucher = useMutation({
    mutationKey: ['generate-voucher'],
    mutationFn: transferVoucher,
    onSuccess(res) {
      setModalSendGift(false);
      setModalInfo(true);
      if (res?.code === 200) {
        setModalType('success');
      } else {
        setModalType('failed');
      }
    },
    onError(e: any) {
      setModalSendGift(false);
      setModalInfo(true);
      setModalType('failed');
    },
  });

  const handleTransfer = () => {
    setTransferVoucher.mutate({
      voucherid,
      UUIDReceiver: selectedFans?.uuid || '',
      usernameReceiver: selectedFans?.username || '',
      fullnameReceiver: selectedFans?.fullname || '',
      imageReceiver:
        selectedFans?.imageProfileUrls &&
        selectedFans?.imageProfileUrls.length > 0
          ? selectedFans?.imageProfileUrls[0].image
          : '',
    });
  };

  const handleBackAction = () => {
    navigation.goBack();
  };

  const onPressFans = (item: ListDataSearchFans) => {
    setSelectedFans(item);
  };

  const goToHistoryVoucher = () => {
    navigation.navigate('MyVoucher');
    setModalInfo(false);
  };

  return (
    <>
      <View style={styles.root}>
        <TopNavigation.Type1
          title={t('Rewards.DetailVoucher.GiftVoucher')}
          leftIconAction={handleBackAction}
          maxLengthTitle={40}
          itemStrokeColor={color.Neutral[10]}
        />
        <View style={styles.container}>
          <Gap height={mvs(16)} />
          <SearchBar
            value={state}
            onChangeText={(newText: string) => setState(newText)}
            rightIcon={state !== '' && true}
            reset={() => setState('')}
          />
          <ListFans keyword={state} onPress={item => onPressFans(item)} />
        </View>

        {selectedFans !== undefined && (
          <ModalSendGift
            selectedItem={selectedFans}
            modalVisible={modalSendGift}
            onPressSendGift={handleTransfer}
            onPressClose={() => setModalSendGift(false)}
            onModalHide={() => setModalInfo(true)}
          />
        )}

        <ModalInfoSendGift
          type={modalType}
          modalVisible={modalInfo}
          onPressClose={goToHistoryVoucher}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  container: {
    paddingHorizontal: widthResponsive(24),
  },
});
