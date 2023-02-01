import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ms} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import SquareComp from './SquareComp';
import {color, font} from '../../theme';
import {Gap, Title} from '../../components';
import {DefaultImage} from '../../assets/icon';
import {RootStackParams} from '../../navigations';
import {heightResponsive, widthResponsive} from '../../utils';
import {AlbumData} from '../../interface/musician.interface';
import {dummySongImg} from '../../data/image';

interface AlbumProps {
  title: string;
  data: AlbumData[];
  errorText: string;
  artistName: string;
  titleStyle?: ViewStyle;
  containerStyles?: ViewStyle;
}

const Album: FC<AlbumProps> = (props: AlbumProps) => {
  const {title, titleStyle, data, errorText, artistName, containerStyles} =
    props;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handleToDetail = (dataAlbum: AlbumData) => {
    navigation.navigate('Album', dataAlbum);
  };

  return (
    <View style={[{marginHorizontal: widthResponsive(24)}, containerStyles]}>
      <Title text={title} textStyle={titleStyle} />
      <Gap height={12} />
      {data ? (
        <View>
          {data.map((item, i) => (
            <TouchableOpacity
              style={styles.container}
              onPress={() => handleToDetail(item)}
              testID={`album${i}`}>
              {item.imageUrl ? (
                <SquareComp
                  imgUri={
                    item.imageUrl.length !== 0
                      ? item.imageUrl[0].image
                      : dummySongImg
                  }
                  size={widthResponsive(56)}
                />
              ) : (
                <DefaultImage.PlaylistCover
                  width={widthResponsive(56)}
                  height={widthResponsive(56)}
                />
              )}
              <View style={styles.textContainer}>
                <Text style={styles.songTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Gap height={4} />
                <Text style={styles.songDesc} numberOfLines={1}>
                  {`by ${artistName}`}
                </Text>
              </View>
              {/* <Dropdown.More
              data={dataFilter ? dataFilter : dataMore}
              selectedMenu={onPressMore}
              containerStyle={{
                width: widthPercentage(120),
                marginLeft: widthPercentage(-110),
                marginTop: heightPercentage(-8),
              }}
            /> */}
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.captionStyle}>{errorText}</Text>
      )}
    </View>
  );
};

export default Album;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: heightResponsive(16),
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
  captionStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: ms(12),
  },
});
