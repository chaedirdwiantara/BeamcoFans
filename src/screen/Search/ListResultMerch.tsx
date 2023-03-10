import React, {FC, useEffect} from 'react';
import {RefreshControl, StyleSheet, View} from 'react-native';
import {heightPercentage, heightResponsive} from '../../utils';
import {FlashList} from '@shopify/flash-list';
import MerchListCard from '../../components/molecule/ListCard/MerchListCard';
import {EmptyState} from '../../components';
import Color from '../../theme/Color';
import {useQuery} from 'react-query';
import {useSearchHook} from '../../hooks/use-search.hook';
import {useTranslation} from 'react-i18next';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';

interface Props {
  keyword: string;
}

const ListResultMerch: FC<Props> = ({keyword}: Props) => {
  const {t} = useTranslation();
  const {getSearchMerchs} = useSearchHook();

  const {
    data: dataMerchList,
    refetch,
    isRefetching,
    isLoading,
  } = useQuery(['/search-merch'], () => getSearchMerchs({keyword: keyword}));

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  useEffect(() => {
    console.log(dataMerchList);
  }, [dataMerchList]);

  return (
    <View style={styles.container}>
      {(isRefetching || isLoading) && (
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
        </View>
      )}

      <FlashList
        data={dataMerchList?.data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ListContainer}
        keyExtractor={item => item?.id.toString()}
        renderItem={({item, index}: any) => (
          <MerchListCard
            id={item.id}
            containerStyles={
              index % 2 == 0 ? {marginRight: 10} : {marginLeft: 10}
            }
            image={item.pic}
            title={item.name}
            owner={item.organizer?.name}
            ownerImage={item.organizer?.pic}
            price={item.price}
            desc={item.content}
            currency={item.currencyCode}
            type={'merch'}
          />
        )}
        estimatedItemSize={200}
        numColumns={2}
        ListEmptyComponent={
          !isLoading && !isRefetching ? (
            <EmptyState
              text={t('EmptyState.Search.Merch') || ''}
              containerStyle={styles.containerEmpty}
            />
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      />
    </View>
  );
};

export default ListResultMerch;

const styles = StyleSheet.create({
  container: {
    marginTop: heightPercentage(8),
    width: '100%',
    height: '100%',
    paddingBottom: heightPercentage(200),
  },
  ListContainer: {
    paddingVertical: heightPercentage(25),
    paddingBottom: heightPercentage(200),
  },
  containerEmpty: {
    flex: 0,
    height: heightResponsive(500),
  },
  iconEmpty: {
    marginBottom: 12,
  },
  loading: {
    color: Color.Neutral[10],
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: heightPercentage(20),
  },
});
