import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Avatar, Gap} from '../../atom';
import {heightPercentage, normalize, widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {CommentIcon, LoveIcon, ShareIcon} from '../../../assets/icon';
import CoinB from '../../../assets/icon/CoinB.icon';

interface ListProps extends TouchableOpacityProps {
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
  category: string;
}

const PostComment: React.FC<ListProps> = (props: ListProps) => {
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
    category,
  } = props;
  return (
    <View style={styles.root}>
      <View>
        <Avatar imgUri={imgUri} size={widthResponsive(32)} />
      </View>
      <View
        style={{
          flex: 1,
          marginLeft: widthResponsive(6),
          paddingBottom: heightPercentage(2),
        }}>
        <View style={styles.topSection}>
          <Text style={styles.userName}>
            {'Carmila'}
            <Text style={styles.regularText}> {'@Carmilya'}</Text>
          </Text>
          <Text style={styles.categoryText}>{'1 hours'}</Text>
        </View>
        <Gap height={2} />
        <View style={styles.bottomSection}>
          <Text style={styles.reply}>
            {'replied to '}{' '}
            <Text style={[styles.reply, {color: color.Pink[100]}]}>
              {'@franky'}
            </Text>
          </Text>
        </View>
        <Gap height={7} />
        <View>
          <Text style={styles.replyCaption}>
            {
              'Sup Folk way way heh hehe he release coy ah ha ha ha ha ha ha ha ha ha ha ha'
            }
          </Text>
        </View>
        <Gap height={6} />
        {/* SOCIAL SECTION */}
        <View style={styles.bottomContainer}>
          <View style={styles.socialContainer}>
            {/* like section */}
            <View>
              <TouchableOpacity onPress={likeOnPress} style={styles.socialIcon}>
                <LoveIcon
                  fill={likePressed ? color.Pink[100] : 'none'}
                  stroke={likePressed ? 'none' : color.Dark[100]}
                  width={17}
                  height={17}
                  style={{marginBottom: heightPercentage(4)}}
                />
                <Gap width={3} />
                <Text style={styles.regularText}>{'100'}</Text>
              </TouchableOpacity>
            </View>
            <Gap width={15} />
            {/* comment section */}
            <View>
              <TouchableOpacity
                onPress={commentOnPress}
                style={styles.socialIcon}>
                <CommentIcon
                  stroke={color.Dark[100]}
                  width={16}
                  height={14}
                  style={{marginBottom: heightPercentage(4)}}
                />
                <Gap width={3} />
                <Text style={styles.regularText}>{commentCount}</Text>
              </TouchableOpacity>
            </View>
            <Gap width={15} />
            {/* token section */}
            <View style={styles.socialIcon}>
              <TouchableOpacity onPress={tokenOnPress}>
                <CoinB
                  stroke={color.Dark[100]}
                  width={16}
                  height={15}
                  style={{marginBottom: heightPercentage(4)}}
                />
              </TouchableOpacity>
            </View>
            <Gap width={15} />
          </View>
          {/* share section */}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity onPress={shareOnPress}>
              <ShareIcon
                stroke={color.Dark[100]}
                width={16}
                height={15}
                style={{marginBottom: heightPercentage(4)}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostComment;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  topSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  userName: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: normalize(12),
    color: color.Neutral[10],
  },
  category: {
    backgroundColor: color.Pink[100],
    paddingHorizontal: widthResponsive(4),
    height: heightPercentage(16),
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(10),
    color: color.Dark[50],
  },
  regularText: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: normalize(10),
    color: color.Dark[50],
  },
  reply: {
    color: color.Dark[50],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
  },
  replyCaption: {
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(12),
    color: color.Neutral[10],
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: color.Dark[500],
  },
  socialContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
