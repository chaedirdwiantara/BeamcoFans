import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, ProfileHeader} from '../components';
import Color from '../theme/Color';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../App';
import {ImageSliderItem} from '../components/molecule/ImageSlider/ImageSlider.boarding';

const data: ImageSliderItem[] = [
  {
    id: 0,
    uri: 'https://img.lemde.fr/2022/06/09/0/411/5083/3389/1440/960/60/0/6870439_1654768589970-hole-in-your-soul-abba-voyage-photo-by-johan-persson-1.jpg',
    title: 'ABBA Concert',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adispicing elit',
  },
  {
    id: 1,
    uri: 'https://imageio.forbes.com/specials-images/imageserve/614af094b90e7b76aac40223/0x0.jpg?format=jpg&width=1200',
    title: 'Global Citizen Festival',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adispicing elit',
  },
  {
    id: 2,
    uri: 'https://assets.pikiran-rakyat.com/crop/0x54:1080x720/x/photo/2022/05/19/849530363.jpg',
    title: 'BTS Concert',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adispicing elit',
  },
  {
    id: 3,
    uri: 'https://stietribhakti.ac.id/wp-content/uploads/2018/08/austin-neill-247047-unsplash.jpg',
    title: 'Concert for Charity',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adispicing elit',
  },
  {
    id: 4,
    uri: 'https://www.billboard.com/wp-content/uploads/2021/08/concert-crowd-billboard-1548-1629382874.jpg?w=942&h=623&crop=1',
    title: 'Canceled Concert Due to COVID',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adispicing elit',
  },
  {
    id: 5,
    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Muse_in_Sydney.jpg/1200px-Muse_in_Sydney.jpg',
    title: 'Concert',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adispicing elit',
  },
];

export const SearchScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <View style={styles.root}>
      <ProfileHeader
        fullname="Kendal Jenner"
        username="@kendaljenner"
        avatarUri={
          'https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg'
        }
      />
      <Button
        label="Sign In"
        onPress={() =>
          // navigation.push('ModalConfirm', {
          //   title: 'Edit Profile',
          //   subtitle: 'Cancel Changes',
          //   goBack: () => navigation.pop(),
          // })
          console.log('onPress')
        }
      />
      {/* <Button
        type="border"
        label="Sign Up"
        labelColor={Color.Pink}
        onPress={() => null}
      />
      <Button
        label="Buy Ticket"
        backgroundColor={Color.Success[700]}
        buttonWidth={200}
        onPress={() => null}
      />
      <MenuText.LeftIcon
        text="Add To Playlist"
        onPress={() => null}
        icon={<AddToPlaylist />}
      />
      <MenuText.RightIcon text="Change Password" onPress={() => null} />
      <MenuText.LeftIconWithSubtitle
        text="No Room for Speed"
        subtitle="Be the first jam contributor on 100 artist"
        onPress={() => null}
        icon={<ProcessingIcon />}
      />
      <NotificationCard
        title="Naruto, Sakura, Sasuke and 997 others"
        description="Liked your reply"
      />
      <FollowingCard
        name="Frank Ocean"
        description="312,123,231 Listener"
        imgUri="https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Dark[800],
  },
});
