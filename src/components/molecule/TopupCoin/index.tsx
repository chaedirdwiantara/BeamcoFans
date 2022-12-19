import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {Gap} from '../../atom';
import {TabFilter} from '../TabFilter';
import {TopNavigation} from '../TopNavigation';
import {color, typography} from '../../../theme/';
import {ArrowLeftIcon, CoinDIcon} from '../../../assets/icon';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {TransactionCard} from './TransactionCard';
import {CoinCard} from './CoinCard';
import listPrice from '../../../data/topUp';

interface TopupCoinProps {
  onPressGoBack: () => void;
}

export const TopupCoinContent: React.FC<TopupCoinProps> = ({onPressGoBack}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filter] = useState([
    {filterName: 'Buy Package'},
    {filterName: 'Transaction'},
  ]);
  const filterData = (item: any, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title="Top Up"
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{marginBottom: heightPercentage(15)}}
      />

      <View>
        <Text style={[typography.Subtitle1, styles.text]}>
          SSU Coin is your way to show your appreciation
        </Text>
        <Text style={[typography.Caption, styles.text]}>
          SSU Coin allows you to parcitipate in Musician’s upside and grow their
          community
        </Text>
        <Text style={[typography.Caption, styles.text]}>
          Find Musician who is providing a lot of value? Rewards them with SSU
          Coin as a support
        </Text>
      </View>

      <View style={styles.containerCoin}>
        <Text style={[typography.Subtitle1, {color: color.Neutral[10]}]}>
          My Coin
        </Text>
        <View style={{flexDirection: 'row'}}>
          <CoinDIcon />
          <Gap width={widthPercentage(5)} />
          <Text style={[typography.Heading6, {color: color.Neutral[10]}]}>
            2,150
          </Text>
        </View>
      </View>

      <TabFilter.Type1
        filterData={filter}
        onPress={filterData}
        selectedIndex={selectedIndex}
        TouchableStyle={{width: width * 0.45}}
      />

      {filter[selectedIndex].filterName === 'Buy Package' ? (
        <View style={styles.containerListPrice}>
          {listPrice.map((val, i) => (
            <View key={i} style={styles.padding}>
              <CoinCard
                totalCoin={val.totalCoin}
                price={val.price}
                initialCoin={val.initialCoin}
                bonusCoin={val.bonusCoin}
              />
            </View>
          ))}
          <View style={styles.padding}>
            <CoinCard
              totalCoin={''}
              price={''}
              initialCoin={''}
              bonusCoin={''}
              showIconCoin={false}
              containerStyle={{backgroundColor: color.Dark[800]}}
            />
          </View>
        </View>
      ) : (
        <TransactionCard
          title="20 Coin have been purchased!"
          date="Dec 16, 2022"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    paddingHorizontal: widthPercentage(12),
    alignItems: 'center',
  },
  text: {
    color: color.Neutral[10],
    textAlign: 'center',
    marginTop: heightPercentage(20),
    width: width * 0.9,
  },
  containerCoin: {
    width: width * 0.9,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: heightPercentage(1),
    borderColor: color.Dark[500],
    paddingHorizontal: widthPercentage(20),
    paddingVertical: heightPercentage(15),
    marginVertical: heightPercentage(20),
  },
  containerListPrice: {
    width,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightPercentage(20),
  },
  padding: {
    paddingHorizontal: widthPercentage(5),
    paddingVertical: heightPercentage(5),
  },
});