import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {color} from '../../theme';
import {TopNavigation} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import {SafeAreaView} from 'react-native-safe-area-context';

interface PostDetail {
  props: {};
  route: any;
}

export const PostDetail: FC<PostDetail> = props => {
  // const musicianName = props.route.params.name.name;
  const data = props.route.params.data.item;
  const musicianName = data.musicianName;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <SafeAreaView style={styles.root}>
      <TopNavigation.Type1
        title={`${musicianName} Post`}
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={40}
        itemStrokeColor={color.Neutral[10]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
});
