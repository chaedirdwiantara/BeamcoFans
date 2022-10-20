import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '../components/atom/Button/Button';
import {ChipMoney} from '../components/atom/ChipMoney/ChipMoney';
import ImageSlider from '../components/atom/ImageSlider/ImageSlider.home';
import Color from '../theme/Color';

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
  return (
    <View style={styles.root}>
      <Button label="Sign In" onPress={() => null} />
      <Button
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
      <ChipMoney balance={20000} />
      <ImageSlider data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
