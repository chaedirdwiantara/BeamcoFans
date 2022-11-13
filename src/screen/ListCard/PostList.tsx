import {FlashList} from '@shopify/flash-list';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {Gap, ListCard, SquareImage} from '../../components';
import {PostlistData} from '../../data/postlist';
import {color, font} from '../../theme';
import {normalize} from '../../utils';

const PostList = () => {
  const [likePressed, setLikePressed] = useState(false);

  const likeOnPress = () => {
    console.log('likey');
    setLikePressed(!likePressed);
  };

  const commentOnPress = () => {
    console.log('comment');
  };

  const tokenOnPress = () => {
    console.log('token');
  };

  const shareOnPress = () => {
    console.log('share');
  };

  return (
    <FlashList
      data={PostlistData}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={({item}: any) => (
        <ListCard.PostList
          musicianName={item.musicianName}
          musicianId={item.musicianId}
          imgUri={item.imgUri}
          postDate={item.postDate}
          children={
            <View style={{flexDirection: 'column', width: '100%'}}>
              <Text style={styles.childrenPostTitle}>
                {item?.post.postTitle}
              </Text>
              <Gap height={4} />
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {item.post.postPicture.map((postUri: any) => (
                  <>
                    <SquareImage imgUri={postUri} size={143} />
                    <Gap width={3} />
                  </>
                ))}
              </View>
            </View>
          }
          likeOnPress={likeOnPress}
          commentOnPress={commentOnPress}
          tokenOnPress={tokenOnPress}
          shareOnPress={shareOnPress}
          likePressed={likePressed}
          containerStyles={{marginTop: mvs(20)}}
          likeCount={120}
          commentCount={67}
        />
      )}
      estimatedItemSize={15}
    />
  );
};

export default PostList;

const styles = StyleSheet.create({
  childrenPostTitle: {
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(13),
    lineHeight: mvs(20),
    color: color.Neutral[10],
  },
});
