import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {Avatar, Gap} from '../../atom';
import {
  heightPercentage,
  heightResponsive,
  normalize,
  widthResponsive,
} from '../../../utils';
import {color, font} from '../../../theme';
import {CommentIcon, LoveIcon, ShareIcon} from '../../../assets/icon';
import CoinB from '../../../assets/icon/CoinB.icon';
import {Dropdown} from '../DropDown';
import {DataDropDownType, dataUpdatePost} from '../../../data/dropdown';

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
  toDetailOnPress: () => void;
  myPost: boolean;
  selectedMenu: (value: DataDropDownType) => void;
  idPost: string;
  selectedIdPost: (idPost: string) => void;
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
    category,
    toDetailOnPress,
    myPost,
    selectedMenu,
    idPost,
    selectedIdPost,
  } = props;
  return (
    <TouchableOpacity {...props}>
      <View style={[styles.topContainer, containerStyles]}>
        <TouchableOpacity onPress={toDetailOnPress}>
          <Avatar imgUri={imgUri} size={widthResponsive(32)} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            marginLeft: widthResponsive(6),
            paddingBottom: heightResponsive(2),
          }}>
          <View style={styles.topSection}>
            <Text style={styles.songTitle} onPress={toDetailOnPress}>
              {musicianName}
            </Text>
            <View style={[styles.category]}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          </View>
          <Gap height={4} />
          <View style={styles.bottomSection}>
            <Text style={styles.songDesc}>{musicianId}</Text>
            <Text style={[styles.songDesc, {color: color.Dark[100]}]}>
              {postDate}
            </Text>
          </View>
          {/* BODY SECTION */}
          <View style={styles.bodyContainer}>{children}</View>
          {/* BOTTOM SECTION */}
          <View
            style={[
              styles.bottomContainer,
              {
                marginTop: !myPost ? 0 : -6.5,
                marginBottom: !myPost ? 3 : -4,
              },
            ]}>
            <View style={styles.socialContainer}>
              {/* like section */}
              <View>
                <TouchableOpacity
                  onPress={likeOnPress}
                  style={styles.socialIcon}>
                  <LoveIcon
                    fill={likePressed ? color.Pink[100] : 'none'}
                    stroke={likePressed ? 'none' : color.Dark[100]}
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
                  <CommentIcon stroke={color.Dark[100]} />
                  <Gap width={3} />
                  <Text style={styles.regularText}>{commentCount}</Text>
                </TouchableOpacity>
              </View>
              {/* token section */}
              <View>
                {!myPost ? (
                  <TouchableOpacity onPress={tokenOnPress}>
                    <CoinB fill={color.Dark[100]} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={shareOnPress}>
                    <ShareIcon fill={color.Dark[100]} />
                  </TouchableOpacity>
                )}
              </View>
              {/* share section */}
              <View>
                {!myPost ? (
                  <TouchableOpacity onPress={shareOnPress}>
                    <ShareIcon fill={color.Dark[100]} />
                  </TouchableOpacity>
                ) : (
                  <Dropdown.More
                    data={dataUpdatePost}
                    idComment={idPost}
                    selectedIdComment={selectedIdPost}
                    selectedMenu={selectedMenu}
                    iconFill={color.Dark[100]}
                    containerStyle={{
                      width: widthResponsive(110),
                      marginLeft: widthResponsive(-97),
                      marginTop: Platform.OS === 'android' ? ms(-35) : ms(-10),
                    }}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostListCard;

const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    height: undefined,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: heightResponsive(5),
    paddingHorizontal: widthResponsive(24),
    borderBottomWidth: mvs(1),
    borderBottomColor: color.Dark[500],
  },
  rankStyle: {
    fontSize: mvs(10),
    fontWeight: '600',
    lineHeight: mvs(12),
    marginRight: ms(10),
    color: color.Neutral[10],
  },
  topSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  songTitle: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(13),
    lineHeight: mvs(15.73),
    color: color.Neutral[10],
  },
  songDesc: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(10),
    color: color.Dark[50],
  },
  bodyContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: heightResponsive(8),
    marginBottom: heightResponsive(10),
  },
  category: {
    backgroundColor: color.Pink[100],
    paddingHorizontal: widthResponsive(4),
    height: heightResponsive(16),
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(8),
    color: color.Neutral[10],
  },
  regularText: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(12),
    color: color.Dark[100],
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  socialIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
