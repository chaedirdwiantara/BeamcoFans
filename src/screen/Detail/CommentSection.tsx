import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
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
interface CommentSectionType {
  data: DetailPostData | undefined;
  postCommentCount: number;
  postId: string;
  onComment: ({id, userName}: {id: string; userName: string}) => void;
  onViewMore: (id: string) => void;
  onSetPage: (value: number) => void;
  dataLvl1: CommentList[] | undefined;
  dataLvl2: CommentList2[] | undefined;
  dataLvl3: CommentList3[] | undefined;
}

const CommentSection: FC<CommentSectionType> = (props: CommentSectionType) => {
  const {
    data,
    dataLvl1,
    dataLvl2,
    dataLvl3,
    onComment,
    onViewMore,
    onSetPage,
    postCommentCount,
    postId,
  } = props;
  const [selectedId, setSelectedId] = useState<number[]>([]);
  const [selectedIdLvl2, setSelectedIdLvl2] = useState<string[]>([]);
  const [selectedIdLvl3, setSelectedIdLvl3] = useState<string[]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showMoreLvl2, setShowMoreLvl2] = useState<boolean>(false);
  const [showMoreLvl3, setShowMoreLvl3] = useState<boolean>(false);
  const [inputCommentModal, setInputCommentModal] = useState<boolean>(false);

  const likeOnPressLvl1 = (id: number) => {
    selectedId.includes(id)
      ? setSelectedId(selectedId.filter((x: number) => x !== id))
      : setSelectedId([...selectedId, id]);
  };

  const likeOnPressLvl2 = (id: string) => {
    selectedIdLvl2.includes(id)
      ? setSelectedIdLvl2(selectedIdLvl2.filter((x: string) => x !== id))
      : setSelectedIdLvl2([...selectedIdLvl2, id]);
  };

  const likeOnPressLvl3 = (id: string) => {
    selectedIdLvl3.includes(id)
      ? setSelectedIdLvl3(selectedIdLvl3.filter((x: string) => x !== id))
      : setSelectedIdLvl3([...selectedIdLvl3, id]);
  };

  const commentOnPress = (id: string, userName: string) => {
    setInputCommentModal(!inputCommentModal);
    onComment?.({id, userName});
  };

  const viewMoreOnPress = (id: string, value: number) => {
    onViewMore?.(id);
    onSetPage?.(value);
    value === 1
      ? setShowMore(true)
      : value === 2
      ? setShowMoreLvl2(true)
      : value === 3
      ? setShowMoreLvl3(true)
      : null;
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
        likePressedLvl3={selectedIdLvl3.includes(id) ? true : false}
        likeCountLvl3={likesCount}
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
        likePressedLvl2={selectedIdLvl2.includes(id) ? true : false}
        likeCountLvl2={likesCount}
        commentCountLvl2={commentsCount}
        childrenLvl2={
          <>
            {/* Comment Section Lvl 3 */}
            <Gap height={12} />
            {comments !== null ? (
              <>
                <FlatList
                  data={comments}
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
                        isLiked={item.isLiked}
                        timeAgo={item.timeAgo}
                        commentOwner={item.commentOwner}
                        commentLevel={item.commentLevel}
                      />
                      <Gap height={12} />
                    </>
                  )}
                />
                {/* // TODO: PENDING */}
                {/* {showMoreLvl3 === false && commentsCount > 1 ? (
                  <Text
                    style={styles.viewMore}
                    onPress={() => viewMoreOnPress(id, 3)}>
                    View more reply
                  </Text>
                ) : null} */}
              </>
            ) : null}
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
            likeOnPress={() => likeOnPressLvl1(index)}
            likePressed={selectedId.includes(index) ? true : false}
            likeCount={item.likesCount}
            commentOnPress={() =>
              commentOnPress(item.id, item.commentOwner.username)
            }
            commentCount={item.commentsCount}
            children={
              <>
                {/* Comment Section Lvl 2 */}
                <Gap height={12} />
                {item.comments !== null ? (
                  <>
                    <FlatList
                      data={dataLvl2 === undefined ? item.comments : dataLvl2}
                      showsVerticalScrollIndicator={false}
                      scrollEnabled={false}
                      keyExtractor={(_, index) => index.toString()}
                      renderItem={({item}) => (
                        <CommentChildrenLvl2
                          id={item.id}
                          caption={item.caption}
                          likesCount={item.likesCount}
                          commentsCount={item.commentsCount}
                          comments={item.comments}
                          repliedTo={item.repliedTo}
                          isLiked={item.isLiked}
                          timeAgo={item.timeAgo}
                          commentOwner={item.commentOwner}
                          commentLevel={item.commentLevel}
                        />
                      )}
                    />
                    {/* // TODO : PENDING */}
                    {item.commentsCount > 1 &&
                    dataLvl2?.length != item.commentsCount ? (
                      <Text
                        style={styles.viewMore}
                        onPress={() => viewMoreOnPress(item.id, 2)}>
                        View more reply
                      </Text>
                    ) : null}
                  </>
                ) : null}
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
    marginBottom: heightResponsive(8),
  },
});
