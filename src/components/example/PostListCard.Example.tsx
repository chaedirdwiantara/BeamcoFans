import React, {useState} from 'react';
import {View} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {SquareImage} from '../atom';
import {ListCard} from '../molecule';

const PostListCardExample = () => {
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
    <View style={{width: '100%', marginBottom: mvs(16)}}>
      <ListCard.PostList
        musicianName={'Sikok Bagi Tigo'}
        musicianId={'@frankocean'}
        imgUri={
          'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp'
        }
        postDate={'11 Sept 2022'}
        children={
          <SquareImage
            imgUri="https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp"
            size={100}
          />
        }
        likeOnPress={likeOnPress}
        commentOnPress={commentOnPress}
        tokenOnPress={tokenOnPress}
        shareOnPress={shareOnPress}
        likePressed={likePressed}
        containerStyles={{marginTop: mvs(20)}}
      />
      <ListCard.PostList
        musicianName={'Sikok Bagi Tigo'}
        musicianId={'@frankocean'}
        imgUri={
          'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp'
        }
        postDate={'11 Sept 2022'}
        children={
          <SquareImage
            imgUri="https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp"
            size={100}
          />
        }
        likeOnPress={likeOnPress}
        commentOnPress={commentOnPress}
        tokenOnPress={tokenOnPress}
        shareOnPress={shareOnPress}
        likePressed={likePressed}
        containerStyles={{marginTop: mvs(20)}}
      />
    </View>
  );
};

export default PostListCardExample;
