import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
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

interface PostDetail {
  props: {};
  route: any;
}

export const PostDetail: FC<PostDetail> = props => {
  const data = props.route.params.data.item;
  const musicianName = data.musicianName;
  const caption = data.post.postTitle;
  // const caption =
  //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam urna, porttitor rhoncus dolor,vel fringilla est ullamcorper eget nulla facilisi etiam urna, porttitor rhoncus dolor';
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [likePressed, setLikePressed] = useState<boolean>(false);
  const [readMore, setReadMore] = useState<boolean>(false);

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
      <TopNavigation.Type1
        title={`${musicianName} Post`}
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={40}
        itemStrokeColor={color.Neutral[10]}
      />
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
      <View style={styles.commentContainer}>
        <PostComment
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
          children={
            <View style={{width: '100%'}}>
              <Text style={{color: 'red'}}>anyong</Text>
            </View>
          }
        />
      </View>
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
});
