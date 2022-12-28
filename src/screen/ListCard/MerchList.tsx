import React, {FC, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {heightPercentage} from '../../utils';
import {FlashList} from '@shopify/flash-list';
import MerchListCard from '../../components/molecule/ListCard/MerchListCard';
import {useEventHook} from '../../hooks/use-event.hook';
import {useFocusEffect} from '@react-navigation/native';

const MerchList: FC = () => {
  const {dataMerchList, getListDataMerch} = useEventHook();

  useFocusEffect(
    useCallback(() => {
      getListDataMerch({
        countryCode: 'HK',
        type: 'product',
      });
    }, [getListDataMerch]),
  );

  const filterList = dataMerchList.find(merch => {
    return merch.name === 'product_latest';
  });

  return (
    <>
      <FlashList
        data={filterList?.data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ListContainer}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}: any) => (
          <MerchListCard
            id={item.id}
            containerStyles={
              index % 2 == 0 ? {marginRight: 10} : {marginLeft: 10}
            }
            image={item.pic}
            title={item.name}
            owner={item.organizer?.name}
            price={item.price}
            desc={item.content}
            currency={item.currencyCode}
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
