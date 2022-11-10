import {Dimensions} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const heightPercentage = (value: number = 0) => {
  const {height} = Dimensions.get('screen');

  const heightPercentage = heightPercentageToDP((value / height) * 100);

  return heightPercentage;
};

export const widhtPercentage = (value: number = 0) => {
  const {width, scale, fontScale} = Dimensions.get('screen');
  const widthPercentage = widthPercentageToDP((value / width) * 100);

  return widthPercentage;
};
