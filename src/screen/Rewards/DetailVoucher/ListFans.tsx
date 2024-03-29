import {useQuery} from 'react-query';
import React, {FC, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';

import Color from '../../../theme/Color';
import {EmptyState} from '../../../components';
import {useSearchHook} from '../../../hooks/use-search.hook';
import {heightPercentage, heightResponsive} from '../../../utils';
import {ListDataSearchFans} from '../../../interface/search.interface';
import LoadingSpinner from '../../../components/atom/Loading/LoadingSpinner';
import MusicianSection from '../../../components/molecule/MusicianSection/MusicianSection';
import {profileStorage} from '../../../hooks/use-storage.hook';

export interface ListFansProps {
  keyword: string;
  onPress: (item: ListDataSearchFans) => void;
}

const ListFans: FC<ListFansProps> = ({keyword, onPress}: ListFansProps) => {
  const {t} = useTranslation();
  const myUuid = profileStorage()?.uuid;
  const {getSearchFans} = useSearchHook();

  const {
    data: dataSearchFans,
    refetch,
    isRefetching,
    isLoading,
  } = useQuery(['/search-fans'], () => getSearchFans({keyword: keyword}));

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  // does not show our name in listing searches
  const filteredData = dataSearchFans?.data.filter(val => val.uuid !== myUuid);

  return (
    <View style={styles.container}>
      {(isRefetching || isLoading) && (
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
        </View>
      )}

      <FlatList
        contentContainerStyle={styles.ListContainer}
        showsVerticalScrollIndicator={false}
        data={filteredData}
        renderItem={({item, index}) => (
          <MusicianSection
            musicianNum={(index + 1).toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            musicianName={item.fullname}
            imgUri={
              item.imageProfileUrls.length > 0
                ? item.imageProfileUrls[0].image
                : ''
            }
            containerStyles={{marginTop: mvs(20)}}
            userId={item.uuid}
            activeMore={false}
            type="fans"
            onPress={() => onPress(item)}
          />
        )}
        ListEmptyComponent={
          !isLoading && !isRefetching ? (
            <EmptyState
              text={t('EmptyState.Search.Fans') || ''}
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

export default ListFans;

const styles = StyleSheet.create({
  container: {
    marginTop: heightPercentage(8),
    width: '100%',
    height: '100%',
  },
  ListContainer: {
    paddingBottom: heightPercentage(400),
  },
  loading: {
    color: Color.Neutral[10],
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: heightPercentage(20),
  },
  containerEmpty: {
    flex: 0,
    height: heightResponsive(500),
  },
});
