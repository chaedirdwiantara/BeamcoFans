import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {Dropdown, Gap, ListCard, SquareImage} from '../../components';
import {dropDownDataCategory, dropDownDataFilter} from '../../data/dropdown';
import {PostlistData, PostListType} from '../../data/postlist';
import {color, font} from '../../theme';
import {
  heightPercentage,
  normalize,
  widthLeft,
  widthPercentage,
} from '../../utils';
import {LogBox} from 'react-native';

const PostList = () => {
  // ignore warning
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const [likePressed, setLikePressed] = useState(false);
  const [dataFilter, setDataFilter] = useState('');
  const [dataCategory, setDataCategory] =
    useState<PostListType[]>(PostlistData);

  const resultDataFilter = (dataResultFilter: any) => {
    setDataFilter(dataResultFilter);
  };
  const resultDataCategory = (dataResultCategory: any) => {
    let dataFilter = [...PostlistData];
    dataFilter =
      dataResultCategory.label == 'All'
        ? dataFilter
        : dataFilter.filter(x => x.category == dataResultCategory.label);
    setDataCategory(dataFilter);
    console.log(dataFilter);
  };

  // List Area
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
    <>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: heightPercentage(24),
        }}>
        <View
          style={{
            width: widthPercentage(70),
          }}>
          <Dropdown.Menu
            data={dropDownDataFilter}
            placeHolder={'Filter by'}
            selectedMenu={resultDataFilter}
            containerStyle={{
              width: widthPercentage(138),
            }}
          />
        </View>
        <View
          style={{
            width: widthPercentage(80),
          }}>
          <Dropdown.Menu
            data={dropDownDataCategory}
            placeHolder={'Category'}
            selectedMenu={resultDataCategory}
            containerStyle={{
              width: widthPercentage(138),
              marginLeft: widthPercentage(-57),
            }}
          />
        </View>
      </View>
      <FlashList
        data={dataCategory}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: PostListType) => item.id}
        renderItem={({item}: any) => (
          <ListCard.PostList
            musicianName={item.musicianName}
            musicianId={item.musicianId}
            imgUri={item.imgUri}
            postDate={item.postDate}
            category={item.category}
            children={
              <View style={{width: '100%'}}>
                <Text style={styles.childrenPostTitle}>
                  {item?.post.postTitle}
                </Text>
                <Gap height={4} />
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <SafeAreaView style={{flex: 1}}>
                    <FlatList
                      scrollEnabled={false}
                      style={{
                        width: widthLeft(55),
                      }}
                      columnWrapperStyle={{justifyContent: 'flex-start'}}
                      keyExtractor={(_, index) => index.toString()}
                      numColumns={2}
                      data={item.post.postPicture}
                      renderItem={({item}: any) => (
                        <SquareImage
                          imgUri={item.postUri}
                          size={143}
                          id={item.id}
                          containerStyle={{
                            marginRight: widthPercentage(3),
                            marginBottom: heightPercentage(4),
                          }}
                        />
                      )}
                    />
                  </SafeAreaView>
                </View>
              </View>
            }
            likeOnPress={likeOnPress}
            commentOnPress={commentOnPress}
            tokenOnPress={tokenOnPress}
            shareOnPress={shareOnPress}
            likePressed={likePressed}
            containerStyles={{marginTop: mvs(16)}}
            likeCount={item.likeCount}
            commentCount={item.commentCount}
          />
        )}
        estimatedItemSize={dataCategory.length}
      />
    </>
  );
};

export default PostList;

const styles = StyleSheet.create({
  childrenPostTitle: {
    flexShrink: 1,
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(13),
    lineHeight: mvs(20),
    color: color.Neutral[10],
  },
});
