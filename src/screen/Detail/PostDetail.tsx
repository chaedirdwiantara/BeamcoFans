import {LogBox, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {color, font} from '../../theme';
import {
  CommentInputModal,
  DetailPost,
  Gap,
  SsuDivider,
  TopNavigation,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  elipsisText,
  heightPercentage,
  normalize,
  widthResponsive,
} from '../../utils';
import {mvs} from 'react-native-size-matters';
import {commentData} from '../../data/comment';
import CommentSection from './CommentSection';
import ImageModal from './ImageModal';
import ImageList from '../ListCard/ImageList';
import {useFeedHook} from '../../hooks/use-feed.hook';

interface PostDetail {
  props: {};
  route: any;
}

export const PostDetail: FC<PostDetail> = props => {
  // ignore warning
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  console.log(props.route.params, 'props');

  const data = props.route.params;
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

  const {
    dataPostDetail,
    setLikePost,
    setUnlikePost,
    setCommentToPost,
    setCommentToComment,
  } = useFeedHook();

  const likeOnPress = (id: string) => {
    if (likePressed) {
      return setLikePost({id}), setLikePressed(!likePressed);
    } else {
      setUnlikePost({id}), setLikePressed(!likePressed);
    }
  };

  const commentOnPress = (id: string, username: string) => {
    setInputCommentModal(!inputCommentModal);
    setMusicianId(id);
    setUserName(username);
  };

  const handleReplyOnPress = () => {
    commentType.length > 0
      ? setCommentToPost({id: musicianId, content: {content: commentType}})
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

        {/* // TODO : POST DETAIL GET FROM DETAIL API, AND MUSICIAN DATA FROM PROPS */}
        <View style={styles.bodyContainer}>
          <DetailPost
            musicianName={musicianName}
            musicianId={data.musician.username}
            imgUri={data.musician.imageProfileUrl}
            postDate={data.updatedAt}
            category={data.category}
            likeOnPress={() => likeOnPress(data.id)}
            commentOnPress={() => commentOnPress(data.id, musicianName)}
            tokenOnPress={tokenOnPress}
            shareOnPress={shareOnPress}
            likePressed={data.isLiked}
            containerStyles={{
              marginTop: mvs(16),
              height: heightPercentage(40),
            }}
            likeCount={data.likesCount}
            commentCount={data.commentsCount}
            disabled={true}
            children={
              <View style={{width: '100%'}}>
                {caption.length >= 250 && readMore == false ? (
                  <Text style={styles.childrenPostTitle}>
                    {elipsisText(caption, 250)}
                    {/* {caption.substring(0, 10)}... */}
                    <Text style={styles.readMore} onPress={readMoreOnPress}>
                      {' '}
                      Read More
                    </Text>
                  </Text>
                ) : caption.length < 250 ? (
                  <Text style={styles.childrenPostTitle}>{caption}</Text>
                ) : (
                  <Text style={styles.childrenPostTitle}>
                    {caption}
                    <Text style={styles.readMore} onPress={readMoreOnPress}>
                      {'\n'}
                      Read Less
                    </Text>
                  </Text>
                )}
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
        </View>
        <Gap height={12} />
        <SsuDivider />
        <Gap height={20} />
        {/* Comment Section Lvl 1 */}
        <CommentSection data={commentData} />
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
    fontSize: normalize(13),
    lineHeight: mvs(20),
    color: color.Neutral[10],
  },
  readMore: {
    color: color.Pink[100],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(13),
  },
  commentContainer: {
    width: '100%',
    paddingHorizontal: widthResponsive(24),
  },
  viewMore: {
    color: color.Pink[100],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(12),
  },
});
