import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import {Gap, Title} from '../../components';
import SquareComp from './SquareComp';
import {widthResponsive} from '../../utils';
import {color, font} from '../../theme';
import {ms, mvs} from 'react-native-size-matters';
import {photos} from '../../interface/musician.interface';
import {useTranslation} from 'react-i18next';
import ImageModal from '../Detail/ImageModal';

interface PhotoProps {
  title: string;
  data: photos[];
  photoOnpress: () => void;
}

const Photo: FC<PhotoProps> = (props: PhotoProps) => {
  const {t} = useTranslation();
  const {title, data, photoOnpress} = props;
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<number>(0);

  const toggleModalOnPress = (index: number) => {
    setModalVisible(!isModalVisible);
    setImgUrl(index);
  };

  return (
    <View style={{marginHorizontal: widthResponsive(24), width: '100%'}}>
      <Title textStyle={{fontSize: mvs(13)}} text={title} />
      <Gap height={12} />
      {data?.length > 0 ? (
        <View style={{flexDirection: 'row', width: '100%'}}>
          {data.map((item, i) => (
            <>
              {data.length <= 4 && (
                <TouchableOpacity
                  onPress={() => toggleModalOnPress(i)}
                  style={{marginRight: widthResponsive(8)}}>
                  <SquareComp
                    imgUri={item.images[2]?.image}
                    size={widthResponsive(76)}
                  />
                </TouchableOpacity>
              )}
              {data.length > 4 && i === 3 ? (
                <TouchableOpacity onPress={photoOnpress}>
                  <View
                    style={{
                      backgroundColor: color.Neutral[10],
                      height: widthResponsive(76),
                      width: widthResponsive(76),
                      opacity: 0.2,
                    }}>
                    <SquareComp
                      imgUri={item.images[0].image}
                      size={widthResponsive(76)}
                    />
                  </View>
                  <View style={styles.textNumberStyle}>
                    <Text style={styles.textPhotos}>{`+${
                      data.length - 3
                    }`}</Text>
                  </View>
                </TouchableOpacity>
              ) : data.length > 4 && i < 3 ? (
                <TouchableOpacity
                  onPress={() => toggleModalOnPress(i)}
                  style={{marginRight: widthResponsive(8)}}>
                  <SquareComp
                    imgUri={item.images[2]?.image}
                    size={widthResponsive(76)}
                  />
                </TouchableOpacity>
              ) : null}
            </>
          ))}
        </View>
      ) : (
        <Text style={styles.captionStyle}>{t('EmptyState.NoPhoto')}</Text>
      )}

      <ImageModal
        toggleModal={() => setModalVisible(!isModalVisible)}
        modalVisible={isModalVisible}
        imageIdx={imgUrl}
        dataImageGallery={data}
      />
    </View>
  );
};

export default Photo;

const styles = StyleSheet.create({
  photo: {
    backgroundColor: 'grey',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: widthResponsive(12),
  },
  songTitle: {
    fontFamily: font.InterRegular,
    fontSize: ms(14),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  songDesc: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: ms(10),
    color: color.Dark[100],
  },
  textPhotos: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontSize: ms(20),
    fontWeight: '600',
  },
  textNumberStyle: {
    position: 'absolute',
    top: widthResponsive(23),
    left: widthResponsive(23),
  },
  captionStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: ms(13),
  },
});
