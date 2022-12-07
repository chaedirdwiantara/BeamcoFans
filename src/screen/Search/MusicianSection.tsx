import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Gap, ListCard, SsuToast} from '../../components';
import {CheckCircle2Icon} from '../../assets/icon';
import {color, font} from '../../theme';
import {heightPercentage, normalize, widthResponsive} from '../../utils';
import {mvs} from 'react-native-size-matters';

interface MusicianProps {
  musicianId: string;
  musicianNum: string;
  musicianName: string;
  imgUri: string;
  containerStyles?: ViewStyle;
}

const MusicianSection: React.FC<MusicianProps> = (props: MusicianProps) => {
  const dataMore = [
    {label: 'Follow', value: '1'},
    {label: 'Go To Musician', value: '2'},
  ];
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    modalVisible &&
      setTimeout(() => {
        setModalVisible(false);
      }, 3000);
  }, [modalVisible]);

  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu', props.musicianId, 'id');
    dataResult.label === 'Follow' ? setModalVisible(true) : null;
  };
  return (
    <>
      <ListCard.MusicianList
        dataFilter={dataMore}
        onPressMore={resultDataMore}
        {...props}
      />
      <SsuToast
        modalVisible={modalVisible}
        onBackPressed={() => setModalVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <CheckCircle2Icon />
            <Gap width={4} />
            <Text style={[styles.textStyle]} numberOfLines={2}>
              You have been following selected musician
            </Text>
          </View>
        }
        modalStyle={{
          maxWidth: '100%',
          marginHorizontal: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
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
});
