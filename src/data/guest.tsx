import React from 'react';
import HandImage from '../assets/image/Hand.image';
import TicketImage from '../assets/image/Ticket.image';
import MusicPlayerImage from '../assets/image/MusicPlayer.image';
import ContentPhoneImage from '../assets/image/ContentPhone.image';
import i18n from '../locale';

export interface ListContentType {
  image: React.ReactNode;
  text: string;
}

export const listContentGuest: ListContentType[] = [
  {
    text: i18n.t('Guest.UnlimitedSong'),
    image: <MusicPlayerImage />,
  },
  {
    text: i18n.t('Guest.GetEvent'),
    image: <TicketImage />,
  },
  {
    text: i18n.t('Guest.GetExclusive'),
    image: <ContentPhoneImage />,
  },
  {
    text: i18n.t('Guest.Support'),
    image: <HandImage />,
  },
];
