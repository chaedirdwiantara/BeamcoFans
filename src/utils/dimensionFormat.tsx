import {Dimensions} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const {height, width} = Dimensions.get('screen');

export const heightPercentage = (value: number = 0) => {
  const heightPercent = heightPercentageToDP((value / height) * 100);

  return heightPercent;
};

export const widthPercentage = (value: number = 0) => {
  const widthPercent = widthPercentageToDP((value / width) * 100);

  return widthPercent;
};
