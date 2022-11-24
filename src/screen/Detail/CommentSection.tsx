import {FlatList, Platform, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import {
  CommentLvl2Type,
  CommentLvl3Type,
  CommentType,
} from '../../data/comment';
import {normalize, widthResponsive} from '../../utils';
import {Gap, PostComment} from '../../components';
import {mvs} from 'react-native-size-matters';
import CommentLvlTwo from '../../components/molecule/DetailPost/CommentLvlTwo';
import CommentLvlThree from '../../components/molecule/DetailPost/CommentLvlThree';
import {color, font} from '../../theme';

interface CommentSectionType {
  data: CommentType[];
}

interface CommentChildrenLvl2Type {
  data: CommentLvl2Type;
  id: string;
}

interface CommentChildrenLvl3Type {
  data: CommentLvl3Type;
  id: string;
}

const CommentSection: FC<CommentSectionType> = (props: CommentSectionType) => {
  const {data} = props;
  const [likePressed, setLikePressed] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number[]>([]);
  const [selectedIdLvl2, setSelectedIdLvl2] = useState<string[]>([]);
  const [selectedIdLvl3, setSelectedIdLvl3] = useState<string[]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showMoreLvl2, setShowMoreLvl2] = useState<boolean>(false);
  const [showMoreLvl3, setShowMoreLvl3] = useState<boolean>(false);

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

  const commentOnPress = () => {
    // navigation.navigate<any>('PostDetail', {data});
  };

  const CommentChildrenLvl3 = (props: CommentChildrenLvl3Type) => {
    const {data, id} = props;
    return (
      <CommentLvlThree
        imgUriLvl3={data.imgUri}
        userNameLvl3={data.userName}
        userIdLvl3={data.userId}
        postDateLvl3={data.postDate}
        userCommentedIdLvl3={data.commentedToId}
        commentCaptionLvl3={data.commentCaption}
        likeOnPressLvl3={() => likeOnPressLvl3(id)}
        commentOnPressLvl3={commentOnPress}
        likePressedLvl3={selectedIdLvl3.includes(id) ? true : false}
        likeCountLvl3={data.likeCount}
        commentCountLvl3={data.commentCount}
      />
    );
  };

  const CommentChildrenLvl2 = (props: CommentChildrenLvl2Type) => {
    const {data, id} = props;
    return (
      <CommentLvlTwo
        imgUriLvl2={data.imgUri}
        userNameLvl2={data.userName}
        userIdLvl2={data.userId}
        postDateLvl2={data.postDate}
        userCommentedId={data.commentedToId}
        commentCaptionLvl2={data.commentCaption}
        likeOnPressLvl2={() => likeOnPressLvl2(id)}
        commentOnPressLvl2={commentOnPress}
        likePressedLvl2={selectedIdLvl2.includes(id) ? true : false}
        likeCountLvl2={data.likeCount}
        commentCountLvl2={data.commentCount}
        childrenLvl2={
          <>
            {/* Comment Section Lvl 3 */}
            <Gap height={12} />
            {
              // ! Showing all comment list lvl 3
              data?.reply?.length !== undefined &&
              data?.reply?.length > 1 &&
              showMoreLvl3 == true ? (
                <FlatList
                  data={data.reply}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <>
                      <CommentChildrenLvl3 data={item} id={`${index}`} />
                      <Gap height={12} />
                    </>
                  )}
                />
              ) : // ! Showing show more and 1 comment lvl 3
              data?.reply?.length != undefined &&
                data?.reply?.length > 1 &&
                showMoreLvl3 == false ? (
                <>
                  <CommentChildrenLvl3 data={data.reply[0]} id={`${id}_01`} />
                  <Gap height={12} />
                  <Text
                    style={styles.viewMore}
                    onPress={() => setShowMoreLvl3(true)}>
                    View more reply
                  </Text>
                  <Gap height={12} />
                </>
              ) : // ! Showing comment data if only there's 1 index comment lvl 3
              data?.reply?.length != undefined && data?.reply?.length == 1 ? (
                <>
                  <CommentChildrenLvl3 data={data.reply[0]} id={`${id}_02`} />
                  <Gap height={12} />
                </>
              ) : null
            }
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
            imgUri={item.imgUri}
            userName={item.userName}
            userId={item.userId}
            postDate={item.postDate}
            artistPostId={item.artistPostId}
            commentCaption={item.commentCaption}
            likeOnPress={() => likeOnPressLvl1(index)}
            commentOnPress={commentOnPress}
            likePressed={selectedId.includes(index) ? true : false}
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
                        <CommentChildrenLvl2 data={item} id={`${index}`} />
                      )}
                    />
                  ) : // ! Showing show more and 1 comment lvl 2
                  item.reply?.length != undefined &&
                    item.reply?.length > 1 &&
                    showMoreLvl2 == false ? (
                    <>
                      <CommentChildrenLvl2
                        data={item.reply[0]}
                        id={`${index}_01`}
                      />
                      <Text
                        style={styles.viewMore}
                        onPress={() => setShowMoreLvl2(true)}>
                        View more reply
                      </Text>
                    </>
                  ) : // ! Showing comment data if only there's 1 index comment lvl 2
                  item.reply?.length != undefined && item.reply?.length == 1 ? (
                    <CommentChildrenLvl2
                      data={item.reply[0]}
                      id={`${index}_02`}
                    />
                  ) : null
                }
              </>
            }
          />
        )}
      />
      {/* //TODO: set it up when we already have data fro api
       <Text style={styles.viewMore} onPress={() => setShowMore(true)}>
        View more reply
      </Text> */}
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
