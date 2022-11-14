import {FlashList} from '@shopify/flash-list';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {Dropdown, Gap, ListCard, SquareImage} from '../../components';
import {dropDownDataCategory, dropDownDataFilter} from '../../data/dropdown';
import {PostlistData, PostListType} from '../../data/postlist';
import {color, font} from '../../theme';
import {heightPercentage, normalize, widthPercentage} from '../../utils';

const PostList = () => {
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
              <View style={{flexDirection: 'column', width: '100%'}}>
                <Text style={styles.childrenPostTitle}>
                  {item?.post.postTitle}
                </Text>
                <Gap height={4} />
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  {item.post.postPicture.map((item: any) => (
                    <View>
                      <SquareImage
                        imgUri={item.postUri}
                        size={143}
                        id={item.id}
                      />
                      <Gap width={3} />
                    </View>
                  ))}
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
        estimatedItemSize={15}
      />
    </>
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
