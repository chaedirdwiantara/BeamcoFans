import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ms} from 'react-native-size-matters';
import {Avatar, Gap} from '../../atom';
import {normalize, widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';

interface ListProps {
  musicianNum?: number;
  musicianName: string;
  imgUri: string;
  followerCount: number;
  followOnPress: (data: any) => void;
  stateButton: boolean;
  containerStyles?: ViewStyle;
}

const FollowMusicianCard: React.FC<ListProps> = (props: ListProps) => {
  const {
    musicianNum,
    musicianName,
    imgUri,
    followerCount,
    followOnPress,
    stateButton,
    containerStyles,
  } = props;

  const followMenu = () => {
    return (
      <TouchableOpacity
        style={[
          styles.followButton,
          {backgroundColor: stateButton ? undefined : color.Pink[200]},
        ]}
        onPress={followOnPress}>
        {stateButton ? (
          <Text style={styles.followText}>Following</Text>
        ) : (
          <Text style={styles.followText}>Follow</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={styles.rankStyle}>
        {musicianNum?.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </Text>
      <Avatar imgUri={imgUri} size={widthResponsive(44)} />
      <Gap width={8} />
      <View style={styles.textContainer}>
        <Text style={styles.musicianName} numberOfLines={1}>
          {musicianName}
        </Text>

        <Text style={styles.followerCount} numberOfLines={1}>
          {followerCount} Listener
        </Text>
      </View>
      <View style={styles.rightContainer}>{followMenu()}</View>
    </View>
  );
};

export default FollowMusicianCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: undefined,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankStyle: {
    fontFamily: font.InterMedium,
    fontSize: normalize(10),
    fontWeight: '600',
    marginRight: widthResponsive(10),
    marginTop: ms(2),
    color: color.Dark[100],
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  musicianName: {
    fontFamily: font.InterRegular,
    fontSize: normalize(14),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  followerCount: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    color: color.Dark[50],
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followButton: {
    paddingVertical: widthResponsive(6),
    width: widthResponsive(68),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.Pink[200],
    borderRadius: 4,
  },
  followText: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    color: color.Neutral[10],
  },
});
