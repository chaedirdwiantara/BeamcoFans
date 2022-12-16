import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Gap, ListCard, ModalDonate, ModalSuccessDonate, SsuToast} from '../..';
import {CheckCircle2Icon} from '../../../assets/icon';
import {color, font} from '../../../theme';
import {heightPercentage, normalize, widthResponsive} from '../../../utils';
import {mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../App';

interface MusicianProps {
  musicianId: string;
  musicianNum: string;
  musicianName: string;
  imgUri: string;
  containerStyles?: ViewStyle;
  point?: string | null;
}

interface DataMore {
  label: string;
  value: string;
}

const MusicianSection: React.FC<MusicianProps> = (props: MusicianProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const dataMore = [
    {label: 'Follow', value: '1'},
    {label: 'Send Donation', value: '2'},
    {label: 'Go To Musician', value: '3'},
  ];
  const [toastVisible, setToastVisible] = useState(false);
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  const resultDataMore = (dataResult: DataMore) => {
    dataResult.label === 'Follow'
      ? setToastVisible(true)
      : dataResult.label === 'Go To Musician'
      ? navigation.navigate('MusicianProfile')
      : setModalDonate(true);
  };

  const onPressDonate = () => {
    setModalDonate(false);
    setTrigger2ndModal(true);
  };

  const onPressSuccess = () => {
    setModalSuccessDonate(false);
  };

  return (
    <>
      <ListCard.MusicianList
        dataFilter={dataMore}
        onPressMore={resultDataMore}
        {...props}
      />
      <ModalDonate
        totalCoin="1000"
        onPressDonate={onPressDonate}
        modalVisible={modalDonate}
        onPressClose={() => setModalDonate(false)}
        onModalHide={() => setModalSuccessDonate(true)}
      />

      <ModalSuccessDonate
        modalVisible={modalSuccessDonate && trigger2ndModal ? true : false}
        toggleModal={onPressSuccess}
      />

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <CheckCircle2Icon />
            <Gap width={4} />
            <Text style={[styles.textStyle]} numberOfLines={2}>
              You have been following selected musician
            </Text>
          </View>
        }
        modalStyle={styles.toast}
      />
    </>
  );
};

export default MusicianSection;

const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'row',
    backgroundColor: color.Success[400],
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
    color: color.Neutral[10],
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
});
