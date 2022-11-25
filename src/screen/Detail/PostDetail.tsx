import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import {color, font} from '../../theme';
import {Gap, ListCard, SquareImage, TopNavigation} from '../../components';
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
  // const caption = data.post.postTitle;
  const caption =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam urna, porttitor rhoncus dolor';
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [likePressed, setLikePressed] = useState<boolean>(false);

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
  return (
    <SafeAreaView style={styles.root}>
      <TopNavigation.Type1
        title={`${musicianName} Post`}
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={40}
        itemStrokeColor={color.Neutral[10]}
      />
      {/* <Text style={{color: 'white'}}>
        {caption.substring(0, 10)}...
        <Text style={{color: 'red'}}> Read More</Text>
      </Text> */}
      <View style={styles.bodyContainer}>
        <ListCard.PostList
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
          containerStyles={{marginTop: mvs(16)}}
          likeCount={data.likeCount}
          commentCount={data.commentCount}
          children={
            <View style={{width: '100%'}}>
              <Text style={styles.childrenPostTitle}>
                {elipsisText(data?.post.postTitle, 600)}
              </Text>
              <Gap height={4} />
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <SafeAreaView style={{flex: 1}}>
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
                              size={widthResponsive(143, 375)}
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
                              size={widthResponsive(143, 375)}
                              id={item.id}
                              containerStyle={{
                                marginRight: widthResponsive(3),
                                marginBottom: heightPercentage(4),
                              }}
                            />
                          )
                    }
                  />
                </SafeAreaView>
              </View>
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
});
