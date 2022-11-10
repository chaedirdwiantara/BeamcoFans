import {Dimensions} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const heightPercentage = (value: number = 0) => {
  const {height} = Dimensions.get('screen');
  console.log(height, 'height');
  console.log(value, 'value');

  const heightPercentage = heightPercentageToDP((value / height) * 100);
  console.log(heightPercentage, 'heightPercentage');

  return heightPercentage;
};

export const widhtPercentage = (value: number = 0) => {
  const {width, scale, fontScale} = Dimensions.get('screen');
  const widthPercentage = widthPercentageToDP((value / width) * 100);

  return widthPercentage;
};
