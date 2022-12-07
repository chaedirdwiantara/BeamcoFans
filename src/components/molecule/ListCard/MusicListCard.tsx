import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';

import {Dropdown} from '../DropDown';
import {color, font} from '../../../theme';
import {Gap, SquareImage} from '../../atom';
import {SoundIcon} from '../../../assets/icon';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';

interface ListProps {
  imgUri: string;
  onPressMore?: (data: any) => void;
  onPressCard: () => void;
  musicNum?: number;
  musicTitle: string;
  singerName: string;
  containerStyles?: ViewStyle;
  dataFilter?: [];
  rightIcon?: boolean;
  rightIconComponent?: React.ReactNode;
  onPressIcon?: (data: any) => void;
  type?: string;
}

const MusicListCard: React.FC<ListProps> = ({
  imgUri,
  onPressMore,
  onPressIcon,
  onPressCard,
  musicNum,
  musicTitle,
  singerName,
  containerStyles,
  dataFilter,
  rightIcon,
  rightIconComponent,
  type,
}) => {
  // ? Dropdown Menu Example
  const dataMore = [
    {label: 'Add to Playlist', value: '1'},
    {label: 'Send Donation', value: '2'},
    {label: 'Add to Queue', value: '3'},
    {label: 'Share Music', value: '4'},
    {label: 'Show Credits', value: '25'},
  ];

  const [played, setPlayed] = useState(false);
  const titleColor = played ? color.Success[400] : color.Neutral[10];

  const onPressPlay = () => {
    if (type === 'modal') {
      onPressCard();
    } else {
      onPressCard();
      setPlayed(!played);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyles]}
      onPress={onPressPlay}>
      {played && <SoundIcon style={{marginRight: widthPercentage(5)}} />}
      {musicNum && !played && (
        <Text style={styles.rankStyle}>
          {musicNum.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </Text>
      )}
      <SquareImage imgUri={imgUri} size={44} />
      <View style={styles.textContainer}>
        <Text style={[styles.songTitle, {color: titleColor}]} numberOfLines={1}>
          {musicTitle}
        </Text>
        <Gap height={2} />
        <Text style={styles.songDesc} numberOfLines={1}>
          {singerName}
        </Text>
      </View>
      {rightIcon ? (
        <TouchableOpacity onPress={onPressIcon}>
          {rightIconComponent}
        </TouchableOpacity>
      ) : (
        <Dropdown.More
          data={dataFilter ? dataFilter : dataMore}
          selectedMenu={onPressMore}
          containerStyle={{
            width: widthPercentage(120),
            marginLeft: widthPercentage(-110),
            marginTop: heightPercentage(-8),
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default MusicListCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: undefined,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankStyle: {
    fontFamily: font.InterMedium,
    fontWeight: '600',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    width: widthPercentage(25),
    paddingLeft: 2,
    color: color.Dark[100],
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: ms(12),
  },
  songTitle: {
    fontFamily: font.InterRegular,
    fontSize: normalize(14),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  songDesc: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    color: color.Dark[100],
  },
  likeButton: {
    justifyContent: 'center',
    marginRight: ms(5),
  },
  dotsButton: {
    justifyContent: 'center',
  },
});
