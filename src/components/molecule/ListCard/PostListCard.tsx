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
import {normalize} from '../../../utils';
import {color, font} from '../../../theme';
import {
  CoinB,
  CoinIcon,
  CommentIcon,
  LoveIcon,
  ShareIcon,
} from '../../../assets/icon';

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
  likeTotal?: number;
  commentTotal?: number;
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
    containerStyles,
    likeTotal,
    commentTotal,
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
            marginLeft: 12,
          }}>
          <View style={{flex: 1}}>
            <View style={styles.topPostSection}>
              <Text style={styles.songTitle}>{musicianName}</Text>
              <View style={[styles.category]}>
                <Text style={styles.categoryText}>Daily Life</Text>
              </View>
            </View>
            <View style={styles.buttomPostSection}>
              <Text style={styles.songDesc}>{musicianId}</Text>
              <Text style={styles.regularText}>{postDate}</Text>
            </View>
          </View>
        </View>
      </View>
      {/* BODY SECTION */}
      <View style={styles.bodyContainer}>
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
          }}>
          {/* like section */}
          <View>
            <TouchableOpacity
              onPress={likeOnPress}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <LoveIcon
                fill={likePressed ? color.Pink[100] : 'none'}
                stroke={likePressed ? 'none' : color.Dark[100]}
              />
              <Gap width={3} />
              <Text style={styles.regularText}>{likeTotal}</Text>
            </TouchableOpacity>
          </View>
          {/* comment section */}
          <View>
            <TouchableOpacity
              onPress={commentOnPress}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CommentIcon
                stroke={color.Dark[100]}
                style={{
                  padding: 2,
                }}
              />
              <Gap width={3} />
              <Text style={styles.regularText}>{commentTotal}</Text>
            </TouchableOpacity>
          </View>
          {/* token section */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={tokenOnPress}>
              <CoinB stroke={color.Dark[100]} />
            </TouchableOpacity>
          </View>
        </View>
        {/* share section */}
        <View
          style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={shareOnPress}>
              <ShareIcon stroke={color.Dark[100]} />
            </TouchableOpacity>
          </View>
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
  bodyContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: mvs(8),
    marginBottom: mvs(12),
  },
  topPostSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttomPostSection: {
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
    // marginTop: mvs(4),
  },
  bottomContainer: {
    flexDirection: 'row',
  },
});
