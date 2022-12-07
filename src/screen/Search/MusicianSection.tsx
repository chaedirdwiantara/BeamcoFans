import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {Gap, ListCard, SsuToast} from '../../components';
import {ListProps} from '../../components/molecule/ListCard/MusiciansListCard';
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
  dataFilter: {label: string; value: string}[];
}

const MusicianSection: React.FC<MusicianProps> = (props: MusicianProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu', props.musicianId, 'id');
    dataResult.label === 'Follow' ? setModalVisible(true) : null;
  };
  return (
    <>
      <ListCard.MusicianList {...props} onPressMore={resultDataMore} />
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
