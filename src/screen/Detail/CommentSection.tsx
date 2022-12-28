import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {elipsisText, heightResponsive, widthResponsive} from '../../utils';
import {Gap, PostComment} from '../../components';
import CommentLvlTwo from '../../components/molecule/DetailPost/CommentLvlTwo';
import CommentLvlThree from '../../components/molecule/DetailPost/CommentLvlThree';
import {color, font} from '../../theme';
import {
  CommentList,
  CommentList2,
  CommentList3,
  DetailPostData,
} from '../../interface/feed.interface';
import {ms, mvs} from 'react-native-size-matters';
import {filterParentID} from './function';
interface CommentSectionType {
  postCommentCount: number;
  postId: string;
  onComment: ({id, userName}: {id: string; userName: string}) => void;
  onLike?: (id: string) => void;
  onUnlike?: (id: string) => void;
  onViewMore: (id: string) => void;
  onSetPage: (value: number) => void;
  dataLvl1: CommentList[] | undefined;
  dataLvl2: CommentList2[] | undefined;
  dataLvl3: CommentList3[] | undefined;
}

const CommentSection: FC<CommentSectionType> = (props: CommentSectionType) => {
  const {
    dataLvl1,
    dataLvl2,
    dataLvl3,
    onComment,
    onViewMore,
    onSetPage,
    onLike,
    onUnlike,
    postCommentCount,
    postId,
  } = props;
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [selectedIdLvl2, setSelectedIdLvl2] = useState<string[]>([]);
  const [selectedIdLvl3, setSelectedIdLvl3] = useState<string[]>([]);
  const [inputCommentModal, setInputCommentModal] = useState<boolean>(false);

  const likeOnPressLvl1 = (id: string) => {
    if (selectedId.includes(id)) {
      setSelectedId(selectedId.filter((x: string) => x !== id));
      onUnlike?.(id);
    } else {
      setSelectedId([...selectedId, id]);
      onLike?.(id);
    }
  };

  const likeOnPressLvl2 = (id: string) => {
    if (selectedIdLvl2.includes(id)) {
      setSelectedIdLvl2(selectedIdLvl2.filter((x: string) => x !== id));
      onUnlike?.(id);
    } else {
      setSelectedIdLvl2([...selectedIdLvl2, id]);
      onLike?.(id);
    }
  };

  const likeOnPressLvl3 = (id: string) => {
    if (selectedIdLvl3.includes(id)) {
      setSelectedIdLvl3(selectedIdLvl3.filter((x: string) => x !== id));
      onUnlike?.(id);
    } else {
      setSelectedIdLvl3([...selectedIdLvl3, id]);
      onLike?.(id);
    }
  };

  const commentOnPress = (id: string, userName: string) => {
    setInputCommentModal(!inputCommentModal);
    onComment?.({id, userName});
  };

  const viewMoreOnPress = (id: string, value: number) => {
    onViewMore?.(id);
    onSetPage?.(value);
  };

  const CommentChildrenLvl3 = (props: CommentList3) => {
    const {
      id,
      caption,
      likesCount,
      commentsCount,
      repliedTo,
      isLiked,
      timeAgo,
      commentOwner,
      commentLevel,
    } = props;
    return (
      <CommentLvlThree
        imgUriLvl3={commentOwner.image}
        userNameLvl3={commentOwner.fullname}
        userIdLvl3={commentOwner.username}
        postDateLvl3={timeAgo}
        userCommentedIdLvl3={repliedTo}
        commentCaptionLvl3={caption}
        likeOnPressLvl3={() => likeOnPressLvl3(id)}
        commentOnPressLvl3={() => commentOnPress(id, commentOwner.username)}
        likePressedLvl3={selectedIdLvl3.includes(id)}
        likeCountLvl3={
          selectedIdLvl3.includes(id) ? likesCount + 1 : likesCount
        }
        commentCountLvl3={commentsCount}
      />
    );
  };

  const CommentChildrenLvl2 = (props: CommentList2) => {
    const {
      id,
      caption,
      likesCount,
      commentsCount,
      comments,
      repliedTo,
      isLiked,
      timeAgo,
      commentOwner,
      commentLevel,
    } = props;
    return (
      <CommentLvlTwo
        imgUriLvl2={commentOwner.image}
        userNameLvl2={commentOwner.fullname}
        userIdLvl2={commentOwner.username}
        postDateLvl2={timeAgo}
        userCommentedId={repliedTo}
        commentCaptionLvl2={caption}
        likeOnPressLvl2={() => likeOnPressLvl2(id)}
        commentOnPressLvl2={() => commentOnPress(id, commentOwner.username)}
        likePressedLvl2={selectedIdLvl2.includes(id)}
        likeCountLvl2={
          selectedIdLvl2.includes(id) ? likesCount + 1 : likesCount
        }
        commentCountLvl2={commentsCount}
        childrenLvl2={
          <>
            {/* Comment Section Lvl 3 */}
            <Gap height={12} />
            {dataLvl3 !== undefined ? (
              <>
                <FlatList
                  data={filterParentID(dataLvl3, id)}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({item}) => (
                    <>
                      <CommentChildrenLvl3
                        id={item.id}
                        caption={item.caption}
                        likesCount={item.likesCount}
                        commentsCount={item.commentsCount}
                        repliedTo={item.repliedTo}
                        parentID={item.parentID}
                        isLiked={item.isLiked}
                        timeAgo={item.timeAgo}
                        commentOwner={item.commentOwner}
                        commentLevel={item.commentLevel}
                      />
                      <Gap height={12} />
                    </>
                  )}
                />
              </>
            ) : null}
            {commentsCount > 1 &&
              (dataLvl3 === undefined ? (
                <Text
                  style={styles.viewMore}
                  onPress={() => viewMoreOnPress(id, 2)}>
                  View more reply
                </Text>
              ) : dataLvl3 !== undefined &&
                filterParentID(dataLvl3, id).length != commentsCount ? (
                <Text
                  style={styles.viewMore}
                  onPress={() => viewMoreOnPress(id, 2)}>
                  View more reply
                </Text>
              ) : null)}
          </>
        }
      />
    );
  };

  return (
    <View style={styles.commentContainer}>
      <FlatList
        data={dataLvl1}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <PostComment
            imgUri={item.commentOwner.image}
            userName={elipsisText(item.commentOwner.fullname, 21)}
            userId={`@${elipsisText(item.commentOwner.username, 10)}`}
            postDate={item.timeAgo}
            artistPostId={item.repliedTo}
            commentCaption={item.caption}
            likeOnPress={() => likeOnPressLvl1(item.id)}
            likePressed={selectedId.includes(item.id)}
            likeCount={
              selectedId.includes(item.id)
                ? item.likesCount + 1
                : item.likesCount
            }
            commentOnPress={() =>
              commentOnPress(item.id, item.commentOwner.username)
            }
            commentCount={item.commentsCount}
            children={
              <>
                {/* Comment Section Lvl 2 */}
                <Gap height={12} />
                {dataLvl2 !== undefined ? (
                  <>
                    <FlatList
                      data={filterParentID(dataLvl2, item.id)}
                      showsVerticalScrollIndicator={false}
                      scrollEnabled={false}
                      keyExtractor={(_, index) => index.toString()}
                      renderItem={({item}) => (
                        <CommentChildrenLvl2
                          id={item.id}
                          caption={item.caption}
                          likesCount={item.likesCount}
                          commentsCount={item.commentsCount}
                          // @ts-ignore
                          comments={item.comments}
                          repliedTo={item.repliedTo}
                          parentID={item.parentID}
                          isLiked={item.isLiked}
                          timeAgo={item.timeAgo}
                          commentOwner={item.commentOwner}
                          commentLevel={item.commentLevel}
                        />
                      )}
                    />
                  </>
                ) : null}
                {item.commentsCount > 1 &&
                  (dataLvl2 === undefined ? (
                    <Text
                      style={styles.viewMore}
                      onPress={() => viewMoreOnPress(item.id, 2)}>
                      View more reply
                    </Text>
                  ) : dataLvl2 !== undefined &&
                    filterParentID(dataLvl2, item.id).length !=
                      item.commentsCount ? (
                    <Text
                      style={styles.viewMore}
                      onPress={() => viewMoreOnPress(item.id, 2)}>
                      View more reply
                    </Text>
                  ) : null)}
              </>
            }
          />
        )}
      />
      {postCommentCount >= 10 && dataLvl1?.length != postCommentCount ? (
        <Text
          style={[
            styles.viewMore,
            {
              marginBottom: mvs(20),
            },
          ]}
          onPress={() => viewMoreOnPress(postId, 1)}>
          View more reply
        </Text>
      ) : null}
    </View>
  );
};

export default CommentSection;

const styles = StyleSheet.create({
  commentContainer: {
    width: '100%',
    paddingHorizontal: widthResponsive(24),
    paddingBottom: heightResponsive(10),
  },
  viewMore: {
    color: color.Pink[100],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: ms(12),
    marginBottom: heightResponsive(12),
  },
});
