import {FlatList, Platform, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import {CommentLvl3Type, CommentType} from '../../data/comment';
import {heightPercentage, normalize, widthResponsive} from '../../utils';
import {Gap, PostComment} from '../../components';
import {mvs} from 'react-native-size-matters';
import CommentLvlTwo from '../../components/molecule/DetailPost/CommentLvlTwo';
import CommentLvlThree from '../../components/molecule/DetailPost/CommentLvlThree';
import {color, font} from '../../theme';

interface CommentSectionType {
  data: CommentType[];
}

interface CommentChildrenLvl3Type {
  data: CommentLvl3Type;
}

const CommentSection: FC<CommentSectionType> = (props: CommentSectionType) => {
  const {data} = props;
  const [likePressed, setLikePressed] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showMoreLvl2, setShowMoreLvl2] = useState<boolean>(false);
  const [showMoreLvl3, setShowMoreLvl3] = useState<boolean>(false);

  const likeOnPress = () => {
    setLikePressed(!likePressed);
  };

  const commentOnPress = () => {
    // navigation.navigate<any>('PostDetail', {data});
  };

  const CommentChildrenLvl3 = (props: CommentChildrenLvl3Type) => {
    const {data} = props;
    // console.log(data.data, 'data');

    return (
      <CommentLvlThree
        imgUriLvl3={data.imgUri}
        userNameLvl3={data.userName}
        userIdLvl3={data.userId}
        postDateLvl3={data.postDate}
        userCommentedIdLvl3={data.commentedToId}
        commentCaptionLvl3={data.commentCaption}
        likeOnPressLvl3={likeOnPress}
        commentOnPressLvl3={commentOnPress}
        likePressedLvl3={likePressed}
        likeCountLvl3={data.likeCount}
        commentCountLvl3={data.commentCount}
      />
    );
  };

  return (
    <View style={styles.commentContainer}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom:
            Platform.OS === 'ios' ? heightPercentage(25) : heightPercentage(40),
        }}
        renderItem={({item, index}) => (
          <PostComment
            imgUri={item.imgUri}
            userName={item.userName}
            userId={item.userId}
            postDate={item.postDate}
            artistPostId={item.artistPostId}
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
                                        <CommentChildrenLvl3 data={item} />
                                        <Gap height={12} />
                                      </>
                                    )}
                                  />
                                ) : // ! Showing show more and 1 comment lvl 3
                                item.reply?.length != undefined &&
                                  item.reply?.length > 1 &&
                                  showMoreLvl3 == false ? (
                                  <>
                                    <CommentChildrenLvl3 data={item.reply[0]} />
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
                                    <CommentChildrenLvl3 data={item.reply[0]} />
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
                            {
                              // ! Showing all comment list lvl 3
                              item.reply[0]?.reply?.length !== undefined &&
                              item.reply[0]?.reply?.length > 1 &&
                              showMoreLvl3 == true ? (
                                <FlatList
                                  data={item.reply[0].reply}
                                  showsVerticalScrollIndicator={false}
                                  scrollEnabled={false}
                                  keyExtractor={(_, index) => index.toString()}
                                  renderItem={({item, index}) => (
                                    <>
                                      <CommentChildrenLvl3 data={item} />
                                      <Gap height={12} />
                                    </>
                                  )}
                                />
                              ) : // ! Showing show more and 1 comment lvl 3
                              item.reply[0]?.reply?.length != undefined &&
                                item.reply[0]?.reply?.length > 1 &&
                                showMoreLvl3 == false ? (
                                <>
                                  <CommentChildrenLvl3
                                    data={item.reply[0].reply[0]}
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
                              item.reply[0]?.reply?.length != undefined &&
                                item.reply[0]?.reply?.length == 1 ? (
                                <>
                                  <CommentChildrenLvl3
                                    data={item.reply[0].reply[0]}
                                  />
                                  <Gap height={12} />
                                </>
                              ) : null
                            }
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
                  item.reply?.length != undefined && item.reply?.length == 1 ? (
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
                          {
                            // ! Showing all comment list lvl 3
                            item.reply[0]?.reply?.length !== undefined &&
                            item.reply[0]?.reply?.length > 1 &&
                            showMoreLvl3 == true ? (
                              <FlatList
                                data={item.reply[0].reply}
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={false}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({item, index}) => (
                                  <>
                                    <CommentChildrenLvl3 data={item} />
                                    <Gap height={12} />
                                  </>
                                )}
                              />
                            ) : // ! Showing show more and 1 comment lvl 3
                            item.reply[0]?.reply?.length != undefined &&
                              item.reply[0]?.reply?.length > 1 &&
                              showMoreLvl3 == false ? (
                              <>
                                <CommentChildrenLvl3
                                  data={item.reply[0].reply[0]}
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
                            item.reply[0]?.reply?.length != undefined &&
                              item.reply[0]?.reply?.length == 1 ? (
                              <>
                                <CommentChildrenLvl3
                                  data={item.reply[0].reply[0]}
                                />
                                <Gap height={12} />
                              </>
                            ) : null
                          }
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
  );
};

export default CommentSection;

const styles = StyleSheet.create({
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
