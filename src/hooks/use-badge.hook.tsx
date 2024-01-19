import {useQuery} from 'react-query';
import {checkBadgeLevel} from '../api/badge.api';
import {BadgePropsType} from '../interface/badge.interface';

export const useBadgeHook = () => {
  const useCheckBadge = (props: BadgePropsType, enabled?: boolean) =>
    useQuery({
      queryKey: ['badge', props],
      queryFn: () => checkBadgeLevel(props),
      enabled,
    });

  return {
    useCheckBadge,
  };
};
