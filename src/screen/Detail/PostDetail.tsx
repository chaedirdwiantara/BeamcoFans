import {LogBox, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {color, font} from '../../theme';
import {
  CommentInputModal,
  DetailPost,
  Gap,
  SsuDivider,
  TopNavigation,
} from '../../components';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  elipsisText,
  heightPercentage,
  normalize,
  widthResponsive,
} from '../../utils';
import {ms, mvs} from 'react-native-size-matters';
import {commentData} from '../../data/comment';
import CommentSection from './CommentSection';
import ImageModal from './ImageModal';
import ImageList from '../ListCard/ImageList';
import {useFeedHook} from '../../hooks/use-feed.hook';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {dateFormat} from '../../utils/date-format';
import {CommentList} from '../../interface/feed.interface';
import {useProfileHook} from '../../hooks/use-profile.hook';

type PostDetailProps = NativeStackScreenProps<RootStackParams, 'PostDetail'>;

export const PostDetail: FC<PostDetailProps> = ({route}: PostDetailProps) => {
  // ignore warning
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const {
    dataPostDetail,
    dataCmntToCmnt,
    dataCommentList,
    setLikePost,
    setUnlikePost,
    setCommentToPost,
    setCommentToComment,
    getDetailPost,
    setCommentList,
  } = useFeedHook();

  const {dataProfile, getProfileUser} = useProfileHook();

  const data = route.params;
  const musicianName = data.musician.fullname;
  const caption = data.caption;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [likePressed, setLikePressed] = useState<boolean>(false);
  const [readMore, setReadMore] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [inputCommentModal, setInputCommentModal] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>('');
  const [musicianId, setMusicianId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [commentType, setCommentType] = useState<string>('');
  const [cmntToCmnt, setCmntToCmnt] = useState<{
    id: string;
    userName: string;
  }>();
  const [viewMore, setViewMore] = useState<string>('');
  const [dataMainComment, setDataMainComment] = useState<
    CommentList[] | undefined
  >(dataPostDetail?.comments);
  const [dataProfileImg, setDataProfileImg] = useState<string>('');

  const likeOnPress = (id: string, isLiked: boolean) => {
    if (isLiked) {
      return setLikePost({id});
    } else {
      setUnlikePost({id});
    }
  };

  useFocusEffect(
    useCallback(() => {
      getDetailPost({id: data.id});
    }, []),
  );

  useEffect(() => {
    dataPostDetail !== null && dataCommentList === null
      ? setDataMainComment(dataPostDetail?.comments)
      : null;
  }, [dataPostDetail]);

  useEffect(() => {
    getProfileUser();
  }, []);

  useEffect(() => {
    dataProfile?.data.imageProfileUrl !== null &&
    dataProfile?.data.imageProfileUrl !== undefined
      ? setDataProfileImg(dataProfile?.data.imageProfileUrl)
      : '';
  }, [dataProfile]);

  //? handle comment in commentsection & open modal comment
  useEffect(() => {
    if (cmntToCmnt !== undefined) {
      setUserName(cmntToCmnt.userName);
      setInputCommentModal(!inputCommentModal);
    }
  }, [cmntToCmnt]);

  useEffect(() => {
    dataCmntToCmnt !== null && viewMore === ''
      ? getDetailPost({id: data.id})
      : dataCmntToCmnt !== null && viewMore !== ''
      ? setCommentList({id: viewMore})
      : null;
  }, [dataCmntToCmnt, viewMore]);

  //? handle viewMore in commentsection & call the api list comment
  useEffect(() => {
    viewMore !== '' ? setCommentList({id: viewMore}) : null;
  }, [viewMore]);

  useEffect(() => {
    dataCommentList !== null ? setDataMainComment(dataCommentList) : null;
  }, [dataCommentList]);

  const commentOnPress = (id: string, username: string) => {
    setInputCommentModal(!inputCommentModal);
    setMusicianId(id);
    setUserName(username);
  };

  const handleReplyOnPress = () => {
    commentType.length > 0 && cmntToCmnt !== undefined
      ? setCommentToComment({
          id: cmntToCmnt.id,
          content: {content: commentType},
        })
      : commentType.length > 0 && cmntToCmnt === undefined
      ? setCommentToPost({
          id: musicianId,
          content: {content: commentType},
        })
      : null;
    setInputCommentModal(false);
    setCommentType('');
  };

  const tokenOnPress = () => {
    console.log('token');
  };

  const shareOnPress = () => {
    console.log('share');
  };

  const readMoreOnPress = () => {
    setReadMore(!readMore);
  };

  const toggleModalOnPress = (uri: string) => {
    setModalVisible(!isModalVisible);
    setImgUrl(uri);
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <TopNavigation.Type1
          title={`${musicianName} Post`}
          leftIconAction={() => navigation.goBack()}
          maxLengthTitle={40}
          itemStrokeColor={color.Neutral[10]}
        />
        {/* Post Detail Section */}
        <View style={styles.bodyContainer}>
          {dataPostDetail ? (
            <DetailPost
              musicianName={musicianName}
              musicianId={`@${data.musician.username}`}
              imgUri={data.musician.imageProfileUrl}
              postDate={dateFormat(data.updatedAt)}
              category={data.category}
              likeOnPress={() =>
                likeOnPress(dataPostDetail.id, dataPostDetail.isLiked)
              }
              likePressed={dataPostDetail.isLiked ? true : false}
              likeCount={dataPostDetail.likesCount}
              commentOnPress={() => commentOnPress(data.id, musicianName)}
              tokenOnPress={tokenOnPress}
              shareOnPress={shareOnPress}
              containerStyles={{
                marginTop: mvs(16),
                height: heightPercentage(40),
              }}
              commentCount={dataPostDetail.commentsCount}
              disabled={true}
              children={
                <View style={{width: '100%'}}>
                  {dataPostDetail ? (
                    dataPostDetail?.caption.length >= 250 &&
                    readMore == false ? (
                      <Text style={styles.childrenPostTitle}>
                        {elipsisText(dataPostDetail?.caption, 250)}
                        <Text style={styles.readMore} onPress={readMoreOnPress}>
                          {' '}
                          Read More
                        </Text>
                      </Text>
                    ) : dataPostDetail?.caption.length < 250 ? (
                      <Text style={styles.childrenPostTitle}>
                        {dataPostDetail?.caption}
                      </Text>
                    ) : (
                      <Text style={styles.childrenPostTitle}>
                        {dataPostDetail?.caption}
                        <Text style={styles.readMore} onPress={readMoreOnPress}>
                          {'\n'}
                          Read Less
                        </Text>
                      </Text>
                    )
                  ) : null}
                  <Gap height={4} />
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <ImageList
                      imgData={data.image}
                      disabled={false}
                      width={162}
                      height={79}
                      onPress={toggleModalOnPress}
                    />
                  </View>
                </View>
              }
            />
          ) : null}
        </View>
        <Gap height={12} />
        <SsuDivider />
        <Gap height={20} />
        {/* Comment Section Lvl 1 */}
        {dataPostDetail ? (
          <CommentSection
            data={dataMainComment}
            onComment={setCmntToCmnt}
            onViewMore={setViewMore}
            postCommentCount={dataPostDetail.commentsCount}
            postId={dataPostDetail.id}
          />
        ) : null}
        <ImageModal
          toggleModal={() => setModalVisible(!isModalVisible)}
          modalVisible={isModalVisible}
          image={imgUrl}
        />
        <CommentInputModal
          toggleModal={() => setInputCommentModal(!inputCommentModal)}
          modalVisible={inputCommentModal}
          name={userName}
          commentValue={commentType}
          onCommentChange={setCommentType}
          handleOnPress={handleReplyOnPress}
          onModalHide={() => setCmntToCmnt(undefined)}
          userAvatarUri={dataProfileImg}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  bodyContainer: {width: '100%', paddingHorizontal: widthResponsive(24)},
  childrenPostTitle: {
    flexShrink: 1,
    maxWidth: widthResponsive(288),
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: ms(13),
    color: color.Neutral[10],
  },
  readMore: {
    color: color.Pink[100],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: ms(13),
  },
  commentContainer: {
    width: '100%',
    paddingHorizontal: widthResponsive(24),
  },
});
