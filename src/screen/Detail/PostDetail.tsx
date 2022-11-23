import {
  FlatList,
  LogBox,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {color, font} from '../../theme';
import {
  DetailPost,
  Gap,
  PostComment,
  SquareImage,
  SsuDivider,
  TopNavigation,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  elipsisText,
  heightPercentage,
  normalize,
  widthResponsive,
} from '../../utils';
import {mvs} from 'react-native-size-matters';
import {commentData} from '../../data/comment';
import CommentLvlTwo from '../../components/molecule/DetailPost/CommentLvlTwo';
import CommentLvlThree from '../../components/molecule/DetailPost/CommentLvlThree';

interface PostDetail {
  props: {};
  route: any;
}

export const PostDetail: FC<PostDetail> = props => {
  // ignore warning
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const data = props.route.params.data.item;
  const musicianName = data.musicianName;
  const caption = data.post.postTitle;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [likePressed, setLikePressed] = useState<boolean>(false);
  const [readMore, setReadMore] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showMoreLvl2, setShowMoreLvl2] = useState<boolean>(false);
  const [showMoreLvl3, setShowMoreLvl3] = useState<boolean>(false);

  const likeOnPress = () => {
    setLikePressed(!likePressed);
  };

  const commentOnPress = () => {
    // navigation.navigate<any>('PostDetail', {data});
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
          <DetailPost
            musicianName={data.musicianName}
            musicianId={data.musicianId}
            imgUri={data.imgUri}
            postDate={data.postDate}
            category={data.category}
            likeOnPress={likeOnPress}
            commentOnPress={commentOnPress}
            tokenOnPress={tokenOnPress}
            shareOnPress={shareOnPress}
            likePressed={likePressed}
            containerStyles={{
              marginTop: mvs(16),
              height: heightPercentage(40),
            }}
            likeCount={data.likeCount}
            commentCount={data.commentCount}
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
                  <FlatList
                    scrollEnabled={false}
                    columnWrapperStyle={{justifyContent: 'flex-start'}}
                    keyExtractor={(_, index) => index.toString()}
                    numColumns={2}
                    data={data.post.postPicture}
                    renderItem={
                      data.post.postPicture.length > 2
                        ? ({item}: any) => (
                            <SquareImage
                              imgUri={item.postUri}
                              size={widthResponsive(162, 375)}
                              height={heightPercentage(71)}
                              id={item.id}
                              containerStyle={{
                                marginRight: widthResponsive(3),
                                marginBottom: heightPercentage(4),
                              }}
                            />
                          )
                        : ({item}: any) => (
                            <SquareImage
                              imgUri={item.postUri}
                              size={widthResponsive(162, 375)}
                              id={item.id}
                              containerStyle={{
                                marginRight: widthResponsive(3),
                                marginBottom: heightPercentage(4),
                              }}
                            />
                          )
                    }
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
        <View style={styles.commentContainer}>
          <FlatList
            data={commentData}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              paddingBottom:
                Platform.OS === 'ios'
                  ? heightPercentage(25)
                  : heightPercentage(40),
            }}
            renderItem={({item, index}) => (
              <PostComment
                imgUri={item.imgUri}
                userName={item.userName}
                userId={item.userId}
                postDate={item.postDate}
                artistPostId={data.musicianId}
                commentCaption={item.commentCaption}
                likeOnPress={likeOnPress}
                commentOnPress={commentOnPress}
                likePressed={likePressed}
                likeCount={item.likeCount}
                commentCount={item.commentCount}
                containerStyles={{
                  marginBottom: mvs(20),
                }}
                children={
                  <>
                    {/* Comment Section Lvl 2 */}
                    <Gap height={12} />
                    {
                      // ! Showing all comment list lvl 2
                      item.reply?.length != undefined &&
                      item.reply?.length > 1 &&
                      showMoreLvl2 == true ? (
                        <FlatList
                          data={item.reply}
                          showsVerticalScrollIndicator={false}
                          scrollEnabled={false}
                          keyExtractor={(_, index) => index.toString()}
                          renderItem={({item, index}) => (
                            <CommentLvlTwo
                              imgUriLvl2={item.imgUri}
                              userNameLvl2={item.userName}
                              userIdLvl2={item.userId}
                              postDateLvl2={item.postDate}
                              userCommentedId={item.commentedToId}
                              commentCaptionLvl2={item.commentCaption}
                              likeOnPressLvl2={likeOnPress}
                              commentOnPressLvl2={commentOnPress}
                              likePressedLvl2={likePressed}
                              likeCountLvl2={item.likeCount}
                              commentCountLvl2={item.commentCount}
                              childrenLvl2={
                                <>
                                  {/* Comment Section Lvl 3 */}
                                  <Gap height={12} />
                                  {
                                    // ! Showing all comment list lvl 3
                                    item.reply?.length != undefined &&
                                    item.reply?.length > 1 &&
                                    showMoreLvl3 == true ? (
                                      <FlatList
                                        data={item.reply}
                                        showsVerticalScrollIndicator={false}
                                        scrollEnabled={false}
                                        keyExtractor={(_, index) =>
                                          index.toString()
                                        }
                                        renderItem={({item, index}) => (
                                          <>
                                            <CommentLvlThree
                                              imgUriLvl3={item.imgUri}
                                              userNameLvl3={item.userName}
                                              userIdLvl3={item.userId}
                                              postDateLvl3={item.postDate}
                                              userCommentedIdLvl3={
                                                item.commentedToId
                                              }
                                              commentCaptionLvl3={
                                                item.commentCaption
                                              }
                                              likeOnPressLvl3={likeOnPress}
                                              commentOnPressLvl3={
                                                commentOnPress
                                              }
                                              likePressedLvl3={likePressed}
                                              likeCountLvl3={item.likeCount}
                                              commentCountLvl3={
                                                item.commentCount
                                              }
                                            />
                                            <Gap height={12} />
                                          </>
                                        )}
                                      />
                                    ) : // ! Showing show more and 1 comment lvl 3
                                    item.reply?.length != undefined &&
                                      item.reply?.length > 1 &&
                                      showMoreLvl3 == false ? (
                                      <>
                                        <CommentLvlThree
                                          imgUriLvl3={item.reply[0].imgUri}
                                          userNameLvl3={item.reply[0].userName}
                                          userIdLvl3={item.reply[0].userId}
                                          postDateLvl3={item.reply[0].postDate}
                                          userCommentedIdLvl3={
                                            item.reply[0].commentedToId
                                          }
                                          commentCaptionLvl3={
                                            item.reply[0].commentCaption
                                          }
                                          likeOnPressLvl3={likeOnPress}
                                          commentOnPressLvl3={commentOnPress}
                                          likePressedLvl3={likePressed}
                                          likeCountLvl3={
                                            item.reply[0].likeCount
                                          }
                                          commentCountLvl3={
                                            item.reply[0].commentCount
                                          }
                                        />
                                        <Gap height={12} />
                                        <Text
                                          style={styles.viewMore}
                                          onPress={() => setShowMoreLvl3(true)}>
                                          View more reply
                                        </Text>
                                        <Gap height={12} />
                                      </>
                                    ) : // ! Showing comment data if only there's 1 index comment lvl 3
                                    item.reply?.length != undefined &&
                                      item.reply?.length == 1 ? (
                                      <>
                                        <CommentLvlThree
                                          imgUriLvl3={item.reply[0].imgUri}
                                          userNameLvl3={item.reply[0].userName}
                                          userIdLvl3={item.reply[0].userId}
                                          postDateLvl3={item.reply[0].postDate}
                                          userCommentedIdLvl3={
                                            item.reply[0].commentedToId
                                          }
                                          commentCaptionLvl3={
                                            item.reply[0].commentCaption
                                          }
                                          likeOnPressLvl3={likeOnPress}
                                          commentOnPressLvl3={commentOnPress}
                                          likePressedLvl3={likePressed}
                                          likeCountLvl3={
                                            item.reply[0].likeCount
                                          }
                                          commentCountLvl3={
                                            item.reply[0].commentCount
                                          }
                                        />
                                        <Gap height={12} />
                                      </>
                                    ) : null
                                  }
                                </>
                              }
                            />
                          )}
                        />
                      ) : // ! Showing show more and 1 comment lvl 2
                      item.reply?.length != undefined &&
                        item.reply?.length > 1 &&
                        showMoreLvl2 == false ? (
                        <>
                          <CommentLvlTwo
                            imgUriLvl2={item.reply[0]?.imgUri}
                            userNameLvl2={item.reply[0].userName}
                            userIdLvl2={item.reply[0].userId}
                            postDateLvl2={item.reply[0].postDate}
                            userCommentedId={item.reply[0].commentedToId}
                            commentCaptionLvl2={item.reply[0].commentCaption}
                            likeOnPressLvl2={likeOnPress}
                            commentOnPressLvl2={commentOnPress}
                            likePressedLvl2={likePressed}
                            likeCountLvl2={item.reply[0].likeCount}
                            commentCountLvl2={item.reply[0].commentCount}
                            childrenLvl2={
                              <>
                                {/* Comment Section Lvl 3 */}
                                <Gap height={12} />
                                {/* // ? ADD ANOTHER LOGIC ABOUT SHOW MORE IN HERE*/}
                                <FlatList
                                  data={item.reply[0].reply}
                                  showsVerticalScrollIndicator={false}
                                  scrollEnabled={false}
                                  keyExtractor={(_, index) => index.toString()}
                                  renderItem={({item, index}) => (
                                    <>
                                      <CommentLvlThree
                                        imgUriLvl3={item.imgUri}
                                        userNameLvl3={item.userName}
                                        userIdLvl3={item.userId}
                                        postDateLvl3={item.postDate}
                                        userCommentedIdLvl3={item.commentedToId}
                                        commentCaptionLvl3={item.commentCaption}
                                        likeOnPressLvl3={likeOnPress}
                                        commentOnPressLvl3={commentOnPress}
                                        likePressedLvl3={likePressed}
                                        likeCountLvl3={item.likeCount}
                                        commentCountLvl3={item.commentCount}
                                      />
                                      <Gap height={12} />
                                    </>
                                  )}
                                />
                              </>
                            }
                          />
                          <Text
                            style={styles.viewMore}
                            onPress={() => setShowMoreLvl2(true)}>
                            View more reply
                          </Text>
                        </>
                      ) : // ! Showing comment data if only there's 1 index comment lvl lvl 2
                      item.reply?.length != undefined &&
                        item.reply?.length == 1 ? (
                        <CommentLvlTwo
                          imgUriLvl2={item.reply[0]?.imgUri}
                          userNameLvl2={item.reply[0].userName}
                          userIdLvl2={item.reply[0].userId}
                          postDateLvl2={item.reply[0].postDate}
                          userCommentedId={item.reply[0].commentedToId}
                          commentCaptionLvl2={item.reply[0].commentCaption}
                          likeOnPressLvl2={likeOnPress}
                          commentOnPressLvl2={commentOnPress}
                          likePressedLvl2={likePressed}
                          likeCountLvl2={item.reply[0].likeCount}
                          commentCountLvl2={item.reply[0].commentCount}
                          childrenLvl2={
                            <>
                              {/* Comment Section Lvl 3 */}
                              <Gap height={12} />
                              {/* // ? ADD ANOTHER LOGIC ABOUT SHOW MORE IN HERE*/}
                              <FlatList
                                data={item.reply[0].reply}
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={false}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({item, index}) => (
                                  <>
                                    <CommentLvlThree
                                      imgUriLvl3={item.imgUri}
                                      userNameLvl3={item.userName}
                                      userIdLvl3={item.userId}
                                      postDateLvl3={item.postDate}
                                      userCommentedIdLvl3={item.commentedToId}
                                      commentCaptionLvl3={item.commentCaption}
                                      likeOnPressLvl3={likeOnPress}
                                      commentOnPressLvl3={commentOnPress}
                                      likePressedLvl3={likePressed}
                                      likeCountLvl3={item.likeCount}
                                      commentCountLvl3={item.commentCount}
                                    />
                                    <Gap height={12} />
                                  </>
                                )}
                              />
                            </>
                          }
                        />
                      ) : null
                    }
                  </>
                }
              />
            )}
          />
        </View>
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
