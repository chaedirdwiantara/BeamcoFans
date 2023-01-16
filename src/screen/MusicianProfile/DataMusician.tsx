import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {Gap} from '../../components';
import ProfileComponent from './ProfileComponent';
import Photo from './Photo';
import Album from './Album';
import {DataDetailMusician} from '../../interface/musician.interface';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';

interface DataMusicianProps {
  profile: DataDetailMusician;
}

const DataMusician: FC<DataMusicianProps> = (props: DataMusicianProps) => {
  const {profile} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const noDataText = 'No information given.';
  const noAlbumText = 'No Album Available.';
  const noMerch = 'No Merch Available';

  const photoDummies = [
    {
      imgUri:
        'https://asset.kompas.com/crops/RUS4vRvIKvaWnENWlpcdErNW1hU=/0x0:0x0/780x390/data/photo/2010/08/20/1045192620X310.JPG',
    },
    {
      imgUri:
        'http://2.bp.blogspot.com/-BNDaQm0AliE/TVqvMyGkdMI/AAAAAAAAALU/lTYo16NG_GU/s1600/29627_J-Rocks-daniel01_resize.jpg',
    },
    {
      imgUri:
        'https://www.dictio.id/uploads/db3342/original/3X/9/3/93e6e77108a95d47c55b424a1baab5defe92a36b.jpg',
    },
    {
      imgUri:
        'https://i.pinimg.com/originals/0c/c0/1d/0cc01d80810fb469bc6f973906790fe0.jpg',
    },
    {imgUri: 'https://cdns.klimg.com/kapanlagi.com/p/001PAGJROCKS10.jpg'},
  ];

  const handleOnPress = () => {
    navigation.navigate('PhotoGallery');
  };

  return (
    <View style={{width: '100%'}}>
      <Gap height={24} />
      <ProfileComponent
        title={'About'}
        content={profile.about ? profile.about : noDataText}
        gap={16}
      />
      <Gap height={24} />
      <ProfileComponent
        title={'Social Media'}
        gap={16}
        socmedSection
        socmed={profile.socialMedia}
      />
      <Gap height={24} />
      <ProfileComponent
        title={'Origin'}
        content={
          profile.originCity && profile.originCountry
            ? `${profile.originCity}, ${profile.originCountry}`
            : noDataText
        }
      />
      <Gap height={24} />
      <ProfileComponent
        title={'Years Active'}
        content={
          profile.yearsActiveFrom && profile.yearsActiveTo
            ? `${profile.yearsActiveFrom} - ${profile.yearsActiveTo}`
            : noDataText
        }
      />
      <Gap height={24} />
      <ProfileComponent
        title={'Members'}
        memberSection
        members={profile.members}
      />
      <Gap height={24} />
      <ProfileComponent title={'Website'} content={profile.website} />
      <Gap height={24} />
      <Photo
        title={'Photos'}
        data={photoDummies}
        photoOnpress={handleOnPress}
      />
      <Gap height={24} />
      <Album title={'Album'} data={profile.albums} errorText={noAlbumText} />
      <Gap height={24} />
      <Album title={'Merch'} data={profile.merchs} errorText={noMerch} />
    </View>
  );
};

export default DataMusician;

const styles = StyleSheet.create({});
