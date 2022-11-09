import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';

import Color from '../../../theme/Color';
import {Button} from '../../atom';

interface SelectBoxProps {
  selected?: string;
  setSelected: (value: string) => void;
  favorites?: [];
  containerStyle?: ViewStyle;
}

export const SelectBox: React.FC<SelectBoxProps> = ({
  selected,
  setSelected,
  favorites = [],
  containerStyle,
}) => {
  return (
    <View style={[styles.root, containerStyle]}>
      {favorites.map((val, i) => {
        const activeBtn = val === selected && styles.activeBtn;
        return (
          <View style={{marginLeft: ms(8), marginBottom: mvs(8)}}>
            <Button
              key={i}
              label={val}
              containerStyles={[styles.btnContainer, activeBtn]}
              onPress={() => setSelected(val)}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    maxWidth: ms(320),
  },
  title: {
    color: Color.Neutral[10],
  },
  footer: {
    width: ms(327),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnContainer: {
    width: undefined,
    paddingHorizontal: ms(10),
    height: mvs(31),
    backgroundColor: Color.Dark[400],
  },
  activeBtn: {
    backgroundColor: Color.Pink.linear,
  },
});
