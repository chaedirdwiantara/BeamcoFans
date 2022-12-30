import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {normalize, widthResponsive} from '../../utils';
import Color from '../../theme/Color';
import Font from '../../theme/Font';

export interface SelectSizeType {
  id: number;
  name: string;
}

const SizeButton = ({
  text,
  onPressSize,
  customStyle,
}: {
  text: string;
  onPressSize: () => void;
  customStyle: any;
}) => {
  return (
    <TouchableOpacity style={[styles.root, customStyle]} onPress={onPressSize}>
      <Text style={styles.labelStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const SelectSize = ({
  selectedSize,
  sizes,
  onPressSize,
}: {
  selectedSize: SelectSizeType | undefined;
  sizes: SelectSizeType[];
  onPressSize: (size: SelectSizeType) => void;
}) => {
  return (
    <View style={styles.buttonContainer}>
      {sizes?.length > 0 &&
        sizes?.map((size, index) => {
          return (
            <SizeButton
              key={index}
              text={size.name}
              onPressSize={() => onPressSize(size)}
              customStyle={{
                marginLeft: index > 0 ? 14 : 0,
                backgroundColor:
                  selectedSize?.id === size.id
                    ? Color.Pink.linear
                    : 'transparent',
              }}
            />
          );
        })}
    </View>
  );
};

export default SelectSize;

const styles = StyleSheet.create({
  root: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.Pink.linear,
    borderWidth: 1,
    alignSelf: 'flex-start',
    paddingVertical: widthResponsive(7),
    paddingHorizontal: widthResponsive(16),
  },
  labelStyle: {
    fontSize: normalize(12),
    color: Color.Neutral[10],
    fontFamily: Font.InterMedium,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});