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
import {elipsisText, heightPercentage, widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {CommentIcon, LoveIcon} from '../../../assets/icon';
import {ms} from 'react-native-size-matters';
import {
  dataAlreadyReportPost,
  dataReportPost,
  dataUpdateComment,
} from '../../../data/dropdown';
import {DataDropDownType} from '../../../data/dropdown';
import {useTranslation} from 'react-i18next';
import DropdownMore from '../V2/DropdownFilter/DropdownMore';
import {feedReportRecorded} from '../../../store/idReported';
import BlockUser from '../BlockUserUI';

interface ListProps extends TouchableOpacityProps {
  imgUri?: string;
  fullName: string;
  userName: string;
  postDate: string;
  artistPostId: string;
  commentCaption: string;
  likeOnPress?: () => void;
  commentOnPress?: () => void;
  likePressed?: boolean;
  likeCount: number;
  commentCount: number;
  containerStyles?: ViewStyle;
  children?: React.ReactNode;
  toDetailOnPress?: () => void;
  selectedMenu?: (value: DataDropDownType) => void;
  idComment?: string;
  selectedIdComment?: (idComment: string) => void;
  selectedUserUuid?: (uuid: string) => void;
  selectedUserName: (name: string) => void;
  myComment?: boolean;
  commentOwnerUuid?: string;
  hideDropDown?: boolean;
  appeal?: boolean;
  isBlock: boolean;
  blockIs: boolean;
}

const PostComment: React.FC<ListProps> = (props: ListProps) => {
  const {t} = useTranslation();
  const {
    imgUri,
    fullName,
    userName,
    postDate,
    artistPostId,
    commentCaption,
    likeOnPress,
    commentOnPress,
    likePressed,
    likeCount,
    commentCount,
    containerStyles,
    children,
    toDetailOnPress,
    selectedMenu,
    idComment,
    selectedIdComment,
    selectedUserUuid,
    selectedUserName,
    myComment,
    commentOwnerUuid,
    hideDropDown,
    appeal,
    isBlock,
    blockIs,
  } = props;

  const {idReported} = feedReportRecorded();
  const dataReport = idReported.includes(idComment!)
    ? dataAlreadyReportPost
    : dataReportPost;

  return (
    <View style={[styles.root, containerStyles]}>
      {!appeal && !isBlock && !blockIs && (
        <TouchableOpacity onPress={toDetailOnPress}>
          <Avatar imgUri={imgUri} size={widthResponsive(32)} />
        </TouchableOpacity>
      )}
      <View
        style={{
          flex: 1,
          marginLeft: widthResponsive(appeal || isBlock || blockIs ? 0 : 6),
        }}>
        {isBlock ? (
          <BlockUser
            caption={t('Block.BlockUI.isBlockCaption')}
            linkCaption={t('Block.BlockUI.linkCaption')}
            linkOnPress={toDetailOnPress}
          />
        ) : blockIs ? (
          <BlockUser
            caption={t('Block.BlockUI.blockIsCaption')}
            linkCaption={t('Block.BlockUI.linkCaption')}
            linkOnPress={toDetailOnPress}
          />
        ) : (
          <>
            <View
              style={[
                styles.topSection,
                {marginTop: ms(appeal || isBlock || blockIs ? 0 : -7)},
              ]}>
              {userName !== 'accountdeactivated' ? (
                <Text style={styles.fullname} onPress={toDetailOnPress}>
                  {fullName}
                  <Text style={styles.regularText}>
                    {' '}
                    {`@${elipsisText(userName, 10)}`}
                  </Text>
                </Text>
              ) : (
                <Text style={styles.regularText}>{`@${elipsisText(
                  userName,
                  10,
                )}`}</Text>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginRight: ms(appeal ? 0 : -7),
                }}>
                <Text style={styles.postDateStyle}>{postDate}</Text>
                {!hideDropDown && (
                  <DropdownMore
                    id={idComment}
                    uuid={commentOwnerUuid}
                    userName={fullName}
                    selectedid={selectedIdComment}
                    selectedMenu={selectedMenu!}
                    selectedUserUuid={selectedUserUuid}
                    selectedUserName={selectedUserName}
                    dataFilter={myComment ? dataUpdateComment : dataReport}
                  />
                )}
              </View>
            </View>
            <Gap height={2} />
            <View
              style={[styles.bottomSection, {marginTop: ms(appeal ? 0 : -8)}]}>
              <Text style={styles.reply}>
                {`${t('Post.Label.RepliedTo')} `}{' '}
                <Text style={[styles.reply, {color: color.Pink[100]}]}>
                  {artistPostId}
                </Text>
              </Text>
            </View>
            <Gap height={7} />
            <View>
              <Text style={styles.commentCaption}>{commentCaption}</Text>
            </View>
            <Gap height={!appeal ? 6 : 10} />
            {/* SOCIAL SECTION */}
            <View style={styles.bottomContainer}>
              <View style={styles.socialContainer}>
                {/* like section */}
                <View>
                  <TouchableOpacity
                    onPress={likeOnPress}
                    style={styles.socialIcon}
                    disabled={appeal}>
                    <LoveIcon
                      fill={likePressed ? color.Pink[100] : 'none'}
                      stroke={likePressed ? 'none' : color.Dark[100]}
                      width={17}
                      height={17}
                      style={{marginBottom: heightPercentage(4)}}
                    />
                    <Gap width={3} />
                    <Text style={styles.regularText}>{likeCount}</Text>
                  </TouchableOpacity>
                </View>
                <Gap width={15} />
                {/* comment section */}
                <View>
                  <TouchableOpacity
                    onPress={commentOnPress}
                    style={styles.socialIcon}
                    disabled={appeal}>
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
              </View>
            </View>
          </>
        )}
        {/* COMMENT LVL 2 SECTION */}
        {children}
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
  fullname: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: ms(12),
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
    fontSize: ms(10),
    color: color.Dark[50],
  },
  regularText: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: ms(10),
    color: color.Dark[50],
  },
  reply: {
    color: color.Dark[50],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: ms(10),
  },
  commentCaption: {
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: ms(12),
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
