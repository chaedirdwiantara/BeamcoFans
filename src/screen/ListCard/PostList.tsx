import {FlashList} from '@shopify/flash-list';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {ListCard, SquareImage} from '../../components';
import {PostlistData} from '../../data/postlist';

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
      // keyExtractor={}
      renderItem={({item}: any) => (
        <ListCard.PostList
          musicianName={item.musicianName}
          musicianId={item.musicianId}
          imgUri={item.imgUri}
          postDate={item.postDate}
          children={
            <View style={{flexDirection: 'column'}}>
              <Text>{item?.post.postTitle}</Text>
              <View style={{flexDirection: 'row'}}>
                {item.post.postPicture.map((postUri: any) => (
                  <SquareImage imgUri={postUri} size={100} />
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
      estimatedItemSize={31}
    />
  );
};

export default PostList;
