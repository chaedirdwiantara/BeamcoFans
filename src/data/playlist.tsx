import i18n from '../locale';

export interface PropsType {
  label: string;
  value: string;
}

export const dataVisibility: PropsType[] = [
  {label: i18n.t('Music.NewPlaylist.Visibility.Public'), value: 'Public'},
  {label: i18n.t('Music.NewPlaylist.Visibility.Private'), value: 'Private'},
];
