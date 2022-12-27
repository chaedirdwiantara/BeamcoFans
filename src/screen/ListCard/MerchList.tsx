import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {heightPercentage} from '../../utils';
import {FlashList} from '@shopify/flash-list';
import MerchListCard from '../../components/molecule/ListCard/MerchListCard';
import {MerchListType} from '../../data/merchList';

interface MerchListProps {
  data: MerchListType[];
}

const MerchList: FC<MerchListProps> = (props: MerchListProps) => {
  const {data} = props;
  return (
    <>
      <FlashList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ListContainer}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}: any) => (
          <MerchListCard
            id={item.id}
            containerStyles={
              index % 2 == 0 ? {marginRight: 10} : {marginLeft: 10}
            }
            image={item.image}
            title={item.title}
            owner={item.owner}
            price={item.price}
            desc={item.desc}
          />
        )}
        estimatedItemSize={150}
        numColumns={2}
      />
    </>
  );
};

export default MerchList;

const styles = StyleSheet.create({
  ListContainer: {
    paddingVertical: heightPercentage(25),
    paddingBottom: heightPercentage(200),
  },
});
