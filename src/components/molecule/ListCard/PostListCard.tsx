import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {Avatar, Gap} from '../../atom';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';
import {color, font} from '../../../theme';
import {CommentIcon, LoveIcon, ShareIcon} from '../../../assets/icon';
import CoinB from '../../../assets/icon/CoinB.icon';

interface ListProps {
  imgUri: string;
  musicianName: string;
  musicianId: string;
  postDate: string;
  children: React.ReactNode;
  likeOnPress: () => void;
  commentOnPress: () => void;
  tokenOnPress: () => void;
  shareOnPress: () => void;
  likePressed: boolean;
  likeCount: number;
  commentCount: number;
  containerStyles?: ViewStyle;
}

const PostListCard: React.FC<ListProps> = (props: ListProps) => {
  const {
    imgUri,
    musicianName,
    musicianId,
    postDate,
    children,
    likeOnPress,
    commentOnPress,
    tokenOnPress,
    shareOnPress,
    likePressed,
    likeCount,
    commentCount,
    containerStyles,
  } = props;
  return (
    <>
      <View style={[styles.topContainer, containerStyles]}>
        <View>
          <Avatar imgUri={imgUri} size={44} />
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: widthPercentage(12),
            paddingBottom: heightPercentage(2),
          }}>
          <View style={styles.textContainer}>
            <Text style={styles.songTitle}>{musicianName}</Text>
            <View style={[styles.category]}>
              <Text style={styles.categoryText}>Daily Life</Text>
            </View>
          </View>
          <View style={styles.rightComponent}>
            <Text style={styles.songDesc}>{musicianId}</Text>
            <Text style={styles.regularText}>{postDate}</Text>
          </View>
        </View>
      </View>
      {/* BODY SECTION */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginTop: heightPercentage(16),
          marginBottom: heightPercentage(12),
        }}>
        <Gap width={57} />
        {children}
      </View>
      {/* BOTTOM SECTION */}
      <View style={styles.bottomContainer}>
        <Gap width={55} />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* like section */}
          <View>
            <TouchableOpacity onPress={likeOnPress} style={styles.socialIcon}>
              <LoveIcon
                fill={likePressed ? color.Pink[100] : 'none'}
                stroke={likePressed ? 'none' : color.Dark[100]}
                width={16}
                height={16}
              />
              <Gap width={3} />
              <Text style={styles.regularText}>{likeCount}</Text>
            </TouchableOpacity>
          </View>
          {/* comment section */}
          <View>
            <TouchableOpacity
              onPress={commentOnPress}
              style={styles.socialIcon}>
              <CommentIcon stroke={color.Dark[100]} width={16} height={14} />
              <Gap width={3} />
              <Text style={styles.regularText}>{commentCount}</Text>
            </TouchableOpacity>
          </View>
          {/* token section */}
          <View style={styles.socialIcon}>
            <TouchableOpacity onPress={tokenOnPress}>
              <CoinB stroke={color.Dark[100]} width={16} height={15} />
            </TouchableOpacity>
          </View>
        </View>
        {/* share section */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity onPress={shareOnPress}>
            <ShareIcon stroke={color.Dark[100]} width={16} height={15} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default PostListCard;

const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    height: undefined,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankStyle: {
    fontSize: normalize(10),
    fontWeight: '600',
    lineHeight: mvs(12),
    marginRight: ms(10),
    color: color.Neutral[10],
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  songTitle: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: normalize(13),
    lineHeight: mvs(15),
    color: color.Neutral[10],
  },
  songDesc: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    color: color.Dark[50],
  },
  rightComponent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  category: {
    backgroundColor: color.Pink[100],
    paddingHorizontal: ms(4),
    paddingVertical: mvs(3),
    borderRadius: 2,
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: normalize(8),
    lineHeight: mvs(10),
    color: color.Neutral[10],
  },
  regularText: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    color: color.Dark[100],
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
