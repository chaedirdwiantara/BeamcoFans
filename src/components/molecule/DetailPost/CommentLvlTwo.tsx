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
  imgUriLvl2: string;
  userNameLvl2: string;
  userIdLvl2: string;
  postDateLvl2: string;
  userCommentedId: string;
  commentCaptionLvl2: string;
  likeOnPressLvl2: () => void;
  commentOnPressLvl2: () => void;
  likePressedLvl2: boolean;
  likeCountLvl2: number;
  commentCountLvl2: number;
  containerStylesLvl2?: ViewStyle;
  childrenLvl2?: React.ReactNode;
}

const CommentLvlTwo: React.FC<ListProps> = (props: ListProps) => {
  const {
    imgUriLvl2,
    userNameLvl2,
    userIdLvl2,
    postDateLvl2,
    userCommentedId,
    commentCaptionLvl2,
    likeOnPressLvl2,
    commentOnPressLvl2,
    likePressedLvl2,
    likeCountLvl2,
    commentCountLvl2,
    containerStylesLvl2,
    childrenLvl2,
  } = props;
  return (
    <View style={[styles.root, containerStylesLvl2]}>
      <View>
        <Avatar imgUri={imgUriLvl2} size={widthResponsive(32)} />
      </View>
      <View
        style={{
          flex: 1,
          marginLeft: widthResponsive(6),
        }}>
        <View style={styles.topSection}>
          <Text style={styles.userName}>
            {userNameLvl2}
            <Text style={styles.regularText}> {userIdLvl2}</Text>
          </Text>
          <Text style={styles.postDateStyle}>{postDateLvl2}</Text>
        </View>
        <Gap height={2} />
        <View style={styles.bottomSection}>
          <Text style={styles.reply}>
            {'replied to '}{' '}
            <Text style={[styles.reply, {color: color.Pink[100]}]}>
              {userCommentedId}
            </Text>
          </Text>
        </View>
        <Gap height={7} />
        <View>
          <Text style={styles.commentCaption}>{commentCaptionLvl2}</Text>
        </View>
        <Gap height={6} />
        {/* SOCIAL SECTION */}
        <View style={styles.bottomContainer}>
          <View style={styles.socialContainer}>
            {/* like section */}
            <View>
              <TouchableOpacity
                onPress={likeOnPressLvl2}
                style={styles.socialIcon}>
                <LoveIcon
                  fill={likePressedLvl2 ? color.Pink[100] : 'none'}
                  stroke={likePressedLvl2 ? 'none' : color.Dark[100]}
                  width={17}
                  height={17}
                  style={{marginBottom: heightPercentage(4)}}
                />
                <Gap width={3} />
                <Text style={styles.regularText}>{likeCountLvl2}</Text>
              </TouchableOpacity>
            </View>
            <Gap width={15} />
            {/* comment section */}
            <View>
              <TouchableOpacity
                onPress={commentOnPressLvl2}
                style={styles.socialIcon}>
                <CommentIcon
                  stroke={color.Dark[100]}
                  width={16}
                  height={14}
                  style={{marginBottom: heightPercentage(4)}}
                />
                <Gap width={3} />
                <Text style={styles.regularText}>{commentCountLvl2}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* COMMENT LVL 2 SECTION */}
        {/* <Gap height={12} /> */}
        {childrenLvl2}
      </View>
    </View>
  );
};

export default CommentLvlTwo;

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
  postDateStyle: {
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
  commentCaption: {
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(12),
    color: color.Neutral[10],
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
