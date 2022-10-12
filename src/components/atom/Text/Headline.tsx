/** === IMPORT LIB HERE === */
import React, { FC } from 'react';
import { Text } from 'react-native';
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';
/** === INTERFACE === */
type Props = {
  color?: string;
  children?: React.ReactNode;
  align?: 'center' | 'justify' | 'left' | 'right';
  textDecorationLine?: 'line-through' | 'underline' | 'underline line-through';
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  numberOfLines?: number;
};
/** === COMPONENT === */
/** => Headline - Default */
const Large: FC<Props> = (props) => {
  return (
    <Text
      ellipsizeMode={props.ellipsizeMode}
      numberOfLines={props.numberOfLines}
      style={{
        textDecorationLine: props.textDecorationLine
          ? props.textDecorationLine
          : 'none',
        fontFamily: Font.MontserratMedium,
        fontSize: 24,
        lineHeight: 32,
        fontWeight: '600',
        // letterSpacing:
        color: props.color ? props.color : Color.Neutral[10],
        textAlign: props.align ? props.align : 'auto'
      }}
      >
      {props.children}
    </Text>
  );
};

/** === EXPORT COMPONENT === */
export default { Large };
