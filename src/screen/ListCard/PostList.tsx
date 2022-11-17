import {FlashList} from '@shopify/flash-list';
import React, {FC, useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {Dropdown, Gap, ListCard, SquareImage} from '../../components';
import {
  DataDropDownType,
  DropDownFilterType,
  DropDownSortType,
} from '../../data/dropdown';
import {PostlistData, PostListType} from '../../data/postlist';
import {color, font} from '../../theme';
import {
  heightPercentage,
  normalize,
  widthPercentage,
  widthResponsive,
} from '../../utils';
import {LogBox} from 'react-native';

interface PostListProps {
  dataRightDropdown: DataDropDownType[];
  dataLeftDropdown: DropDownFilterType[] | DropDownSortType[];
  data: PostListType[];
}

const PostList: FC<PostListProps> = (props: PostListProps) => {
  const {dataRightDropdown, dataLeftDropdown, data} = props;
  // ignore warning
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const [likePressed, setLikePressed] = useState(false);
  const [dataCategory, setDataCategory] = useState<PostListType[]>(data);

  const resultDataFilter = (dataResultFilter: any) => {
    const dates = new Date();
    dates.setDate(dates.getDate() - Number(dataResultFilter.value));
    let dataFilter = [...data];
    dataFilter = dataFilter.filter(x => new Date(x.postDate) > dates);
    setDataCategory(dataFilter);
  };
  const resultDataCategory = (dataResultCategory: any) => {
    let dataFilter = [...data];
    dataFilter =
      dataResultCategory.label == 'All'
        ? dataFilter
        : dataFilter.filter(x => x.category == dataResultCategory.label);
    setDataCategory(dataFilter);
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
            data={dataLeftDropdown}
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
            data={dataRightDropdown}
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
        contentContainerStyle={{
          paddingBottom:
            Platform.OS === 'ios' ? heightPercentage(25) : heightPercentage(40),
        }}
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
                      columnWrapperStyle={{justifyContent: 'flex-start'}}
                      keyExtractor={(_, index) => index.toString()}
                      numColumns={2}
                      data={item.post.postPicture}
                      renderItem={
                        item.post.postPicture.length > 2
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
    maxWidth: widthResponsive(288),
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(13),
    lineHeight: mvs(20),
    color: color.Neutral[10],
  },
});
