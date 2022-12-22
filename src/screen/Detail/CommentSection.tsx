import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import {heightResponsive, normalize, widthResponsive} from '../../utils';
import {Gap, PostComment} from '../../components';
import {mvs} from 'react-native-size-matters';
import CommentLvlTwo from '../../components/molecule/DetailPost/CommentLvlTwo';
import CommentLvlThree from '../../components/molecule/DetailPost/CommentLvlThree';
import {color, font} from '../../theme';
import {
  CommentList,
  CommentList2,
  CommentList3,
  DetailPostData,
} from '../../interface/feed.interface';
interface CommentSectionType {
  data: CommentList[] | undefined;
  postCommentCount: number;
  postId: string;
  onComment: ({id, userName}: {id: string; userName: string}) => void;
  onViewMore: (id: string) => void;
}

const CommentSection: FC<CommentSectionType> = (props: CommentSectionType) => {
  const {data, onComment, onViewMore, postCommentCount, postId} = props;
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
    value === 1
      ? setShowMore(true)
      : value === 2
      ? setShowMoreLvl2(true)
      : value === 3
      ? setShowMoreLvl3(true)
      : null;
  };

  // ? Dummy Temporary until api update is complete
  const dummy = {
    imgUri:
      'https://p4.wallpaperbetter.com/wallpaper/704/568/863/k-pop-redvelvet-women-irene-red-velvet-wallpaper-preview.jpg',
    userName: 'Irene',
    userId: 'red-velvet',
    postDate: '2 hours',
    artistPostId: 'black-pink',
  };

  const CommentChildrenLvl3 = (props: CommentList3) => {
    const {id, caption, likesCount, commentsCount} = props;
    return (
      <CommentLvlThree
        imgUriLvl3={dummy.imgUri}
        userNameLvl3={dummy.userName}
        userIdLvl3={dummy.userId}
        postDateLvl3={dummy.postDate}
        userCommentedIdLvl3={dummy.artistPostId}
        commentCaptionLvl3={caption}
        likeOnPressLvl3={() => likeOnPressLvl3(id)}
        commentOnPressLvl3={() => commentOnPress(id, dummy.userId)}
        likePressedLvl3={selectedIdLvl3.includes(id) ? true : false}
        likeCountLvl3={likesCount}
        commentCountLvl3={commentsCount}
      />
    );
  };

  const CommentChildrenLvl2 = (props: CommentList2) => {
    const {id, caption, likesCount, commentsCount, comments} = props;
    return (
      <CommentLvlTwo
        imgUriLvl2={dummy.imgUri}
        userNameLvl2={dummy.userName}
        userIdLvl2={dummy.userId}
        postDateLvl2={dummy.postDate}
        userCommentedId={dummy.artistPostId}
        commentCaptionLvl2={caption}
        likeOnPressLvl2={() => likeOnPressLvl2(id)}
        commentOnPressLvl2={() => commentOnPress(id, dummy.userId)}
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
                      />
                      <Gap height={12} />
                    </>
                  )}
                />
                {showMoreLvl3 === false && commentsCount > 1 ? (
                  <Text
                    style={styles.viewMore}
                    onPress={() => viewMoreOnPress(id, 3)}>
                    View more reply
                  </Text>
                ) : null}
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
        data={data}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <PostComment
            imgUri={dummy.imgUri}
            userName={dummy.userName}
            userId={`@${dummy.userId}`}
            postDate={dummy.postDate}
            artistPostId={dummy.artistPostId}
            commentCaption={item.caption}
            likeOnPress={() => likeOnPressLvl1(index)}
            likePressed={selectedId.includes(index) ? true : false}
            likeCount={item.likesCount}
            commentOnPress={() => commentOnPress(item.id, dummy.userId)}
            commentCount={item.commentsCount}
            children={
              <>
                {/* Comment Section Lvl 2 */}
                <Gap height={12} />
                {item.comments !== null ? (
                  <>
                    <FlatList
                      data={item.comments}
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
                        />
                      )}
                    />
                    {showMoreLvl2 === false && item.commentsCount > 1 ? (
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
      {showMore === false && postCommentCount > 10 ? (
        <Text
          style={[
            styles.viewMore,
            {
              marginBottom: mvs(20),
            },
          ]}
          onPress={() => viewMoreOnPress(postId, 3)}>
          View more reply
        </Text>
      ) : null}
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
    paddingBottom: heightResponsive(10),
  },
  viewMore: {
    color: color.Pink[100],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(12),
    marginBottom: heightResponsive(8),
  },
});
