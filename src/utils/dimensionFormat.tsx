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

export const heightResponsive = (value: number = 0, maxValue: number = 0) => {
  const heightPercent = heightPercentageToDP((value / maxValue) * 100);

  return heightPercent;
};

export const widthPercentage = (value: number = 0) => {
  const widthPercent = widthPercentageToDP((value / width) * 100);

  return widthPercent;
};

export const widthResponsive = (value: number = 0, maxValue: number = 375) => {
  const widthPercent = widthPercentageToDP((value / maxValue) * 100);

  return widthPercent;
};

export const widthLeft = (value: number = 0) => {
  const widthLeft = width - value;
  const widthPercent = widthPercentageToDP((widthLeft / width) * 100);

  return widthPercent;
};

export const heightLeft = (value: number = 0) => {
  const heightLeft = height - value;
  const widthPercent = widthPercentageToDP((heightLeft / width) * 100);

  return widthPercent;
};
