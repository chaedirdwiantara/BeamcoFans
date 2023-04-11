import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {CheckBox, Gap, TopNavigation} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import Color from '../../theme/Color';
import {useTranslation} from 'react-i18next';
import {heightPercentage, widthPercentage} from '../../utils';
import Typography from '../../theme/Typography';
import CartItem from '../../components/atom/Cart/CartItem';
import CartBox from '../../components/atom/Cart/CartBox';
import BottomPrice from '../../components/atom/Cart/BottomPrice';

type CartProps = NativeStackScreenProps<RootStackParams, 'Cart'>;

export const Cart: React.FC<CartProps> = ({navigation}: CartProps) => {
  const {t} = useTranslation();
  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Cart.Title')}
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={40}
        itemStrokeColor={Color.Neutral[10]}
      />
      <View style={[styles.topContainer, styles.rowCenter]}>
        <View style={styles.rowCenter}>
          <CheckBox handleOnPress={() => null} active={false} />
          <Gap width={widthPercentage(10)} />
          <Text style={[Typography.Subtitle2, {color: Color.Neutral[10]}]}>
            {t('Cart.SelectAll')}
          </Text>
        </View>
        <View>
          <Text style={[Typography.Subtitle2, {color: Color.Success[400]}]}>
            {t('Cart.Delete')}
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <CartBox>
          <CartItem />
          <CartItem />
        </CartBox>
        <CartBox>
          <CartItem />
        </CartBox>
      </ScrollView>
      <BottomPrice
        onPressPromo={() => navigation.navigate('PromoCode')}
        onPressCheckout={() => navigation.navigate('Checkout')}
      />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topContainer: {
    paddingVertical: heightPercentage(16),
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentage(24),
    borderBottomColor: Color.Dark[500],
    borderBottomWidth: 1,
  },
});
