import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {TicketIcon} from '../../assets/icon';
import Color from '../../theme/Color';
import {heightPercentage, heightResponsive, widthResponsive} from '../../utils';
import {EmptyState} from '../../components';
import {FlashList} from '@shopify/flash-list';
import MerchListCard from '../../components/molecule/ListCard/MerchListCard';

const ConcertList: FC = () => {
  return (
    <>
      <FlashList
        data={[]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ListContainer}
        // keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <EmptyState
            icon={
              <TicketIcon
                fill={Color.Dark[500]}
                width={widthResponsive(150)}
                height={heightResponsive(150)}
                style={styles.iconEmpty}
              />
            }
            text="No Event Available"
            containerStyle={styles.containerEmpty}
          />
        }
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
          />
        )}
        estimatedItemSize={150}
        numColumns={2}
      />
    </>
  );
};

export default ConcertList;

const styles = StyleSheet.create({
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
});