import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Avatar, Gap} from '../../atom';
import {LoveIcon} from '../../../assets/icon';
import {color, font} from '../../../theme';
import {normalize} from '../../../utils';
import {ms, mvs} from 'react-native-size-matters';

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
  } = props;
  return (
    <>
      <View style={styles.topContainer}>
        <View>
          <Avatar imgUri={imgUri} size={44} />
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: 12,
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={styles.textContainer}>
              <Text style={styles.songTitle}>{musicianName}</Text>
              <Text style={styles.songDesc}>{musicianId}</Text>
            </View>
            <View style={styles.rightComponent}>
              <View style={[styles.category]}>
                <Text style={styles.categoryText}>Daily Life</Text>
              </View>
              <Text style={styles.regularText}>{postDate}</Text>
            </View>
          </View>
        </View>
      </View>
      {/* BODY SECTION */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginTop: 8,
          marginBottom: 12,
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
          }}>
          {/* like section */}
          <View>
            <TouchableOpacity
              onPress={likeOnPress}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <LoveIcon
                fill={likePressed ? color.Pink[100] : 'none'}
                stroke={likePressed ? 'none' : color.Dark[100]}
              />
              <Gap width={3} />
              <Text style={styles.regularText}>5000</Text>
            </TouchableOpacity>
          </View>
          {/* comment section */}
          <View>
            <TouchableOpacity
              onPress={commentOnPress}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <LoveIcon stroke={color.Dark[100]} />
              <Gap width={3} />
              <Text style={styles.regularText}>1000</Text>
            </TouchableOpacity>
          </View>
          {/* token section */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={tokenOnPress}>
              <LoveIcon stroke={color.Dark[100]} />
            </TouchableOpacity>
          </View>
        </View>
        {/* share section */}
        <View
          style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={shareOnPress}>
              <LoveIcon stroke={color.Dark[100]} />
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
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
    width: ms(90),
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
  },
  category: {
    backgroundColor: color.Pink[100],
    paddingHorizontal: ms(4),
    paddingVertical: mvs(3),
    borderRadius: 2,
    alignItems: 'center',
    marginBottom: mvs(4),
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
    marginTop: mvs(4),
  },
  bottomContainer: {
    flexDirection: 'row',
  },
});
