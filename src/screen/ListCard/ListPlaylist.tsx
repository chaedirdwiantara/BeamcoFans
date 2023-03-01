import React, {FC} from 'react';
import {mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import {ListCard} from '../../components';
import {elipsisText, heightResponsive} from '../../utils';
import {Playlist} from '../../interface/playlist.interface';
import {useTranslation} from 'react-i18next';

interface ListPlaylistScreen {
  data?: Playlist[];
  onPress: (id: number, name: string) => void;
  scrollable?: boolean;
  withoutNum?: boolean;
  playerVisible?: boolean;
}

const ListPlaylist: FC<ListPlaylistScreen> = (props: ListPlaylistScreen) => {
  const {onPress, scrollable, data, withoutNum, playerVisible} = props;
  const {t} = useTranslation();

  return (
    <FlashList
      data={data}
      showsVerticalScrollIndicator={false}
      scrollEnabled={scrollable}
      keyExtractor={item => item.id.toString()}
      renderItem={({item, index}) => (
        <ListCard.Playlist
          imgUri={item.thumbnailUrl !== null ? item.thumbnailUrl : ''}
          musicNum={withoutNum ? '' : index + 1}
          musicTitle={elipsisText(item.name, 22)}
          singerName={
            t('Profile.Label.CreatedBy') + ' ' + item.playlistOwner.fullname
          }
          onPressCard={() => onPress(item.id, item.name)}
          containerStyles={{
            marginTop: mvs(20),
            marginBottom:
              index === data?.length - 1 && playerVisible
                ? heightResponsive(70)
                : 0,
          }}
          isPublic={item.isPublic}
        />
      )}
      estimatedItemSize={heightResponsive(500)}
    />
  );
};

export default ListPlaylist;
