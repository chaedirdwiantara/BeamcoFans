import React from 'react';
import {View, StyleSheet} from 'react-native';
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';
import {ListAvatar} from './ListAvatar';
import HeartIcon from '../../../assets/icon/Heart.icon';
import {BellNotif} from '../../../assets/icon';
import {heightPercentage, widthPercentage} from '../../../utils';
import {NotifDataType} from '../../../data/notification';
import {FlashList} from '@shopify/flash-list';

interface NotificationCardProps {
  data: NotifDataType[];
}

export const NotificationCard: React.FC<NotificationCardProps> = (
  props: NotificationCardProps,
) => {
  const {data} = props;
  return (
    <FlashList
      data={data}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item}: any) => (
        <View style={styles.root}>
          {item.type === 'like' ? (
            <HeartIcon style={styles.icon} />
          ) : (
            <BellNotif style={styles.icon} />
          )}

          <View>
            <ListAvatar data={item.data} size={32} desc={item.desc} />
          </View>
        </View>
      )}
      estimatedItemSize={15}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Color.Dark[500],
    paddingTop: heightPercentage(16),
    paddingBottom: heightPercentage(12),
    paddingLeft: widthPercentage(40),
    paddingRight: widthPercentage(24),
  },
  icon: {
    marginRight: widthPercentage(16),
    marginTop: heightPercentage(6),
    alignSelf: 'flex-start',
  },
  description: {
    marginTop: 5,
    fontSize: 13,
    color: Color.Neutral[10],
    fontFamily: Font.InterRegular,
  },
});
