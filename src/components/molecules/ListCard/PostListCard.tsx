import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Avatar, Gap} from '../../atom';
import {CommentIcon, LoveIcon, ThreeDotsIcon} from '../../../assets/icon';
import {color} from '../../../theme';

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
              <Text style={styles.songDesc}>{postDate}</Text>
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
        <Gap width={57} />
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
                fill={likePressed ? 'pink' : 'none'}
                stroke={likePressed ? 'none' : 'black'}
              />
              <Gap width={3} />
              <Text style={{color: color.Dark[100], fontSize: 10}}>5000</Text>
            </TouchableOpacity>
          </View>
          {/* comment section */}
          <View>
            <TouchableOpacity
              onPress={commentOnPress}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <LoveIcon stroke={color.Dark[100]} />
              <Gap width={3} />
              <Text style={{color: color.Dark[100], fontSize: 10}}>1000</Text>
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
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 12,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  songTitle: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
  },
  songDesc: {
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 12,
    color: color.Dark[50],
  },
  rightComponent: {
    width: 90,
    alignItems: 'flex-end',
  },
  category: {
    backgroundColor: '#FF70D4',
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 2,
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryText: {
    color: color.Neutral[10],
    fontSize: 8,
    fontWeight: '500',
    lineHeight: 10,
  },
  dateStyle: {
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 12,
    color: color.Dark[50],
    marginTop: 4,
  },
  bottomContainer: {
    flexDirection: 'row',
  },
});
