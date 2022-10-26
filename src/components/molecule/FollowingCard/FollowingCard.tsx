import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {Avatar, Button} from '../../atom';

const {width} = Dimensions.get('screen');

interface Props {
  imgUri?: string;
  name?: string;
  description?: string;
  onPress?: () => void;
}

export const FollowingCard: React.FC<Props> = (props: Props) => {
  const {imgUri = '', name, description, onPress} = props;
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <View style={styles.containerDesc}>
        <Avatar imgUri={imgUri} />
        <View>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <Button label="Unfollow" buttonWidth={width * 0.3} onPress={() => null} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerDesc: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    paddingLeft: 10,
    color: Color.Neutral[10],
    fontFamily: Font.InterMedium,
  },
  description: {
    fontSize: 11,
    paddingLeft: 10,
    paddingTop: 4,
    color: Color.Dark[50],
    fontFamily: Font.InterRegular,
  },
});
