import SsuAPI from './baseRinjani';
import {ParamsProps} from '../interface/base.interface';
import {SendLogResponseType} from '../interface/tracking.interface';

export const sendViewLogEP = async (
  props?: ParamsProps,
): Promise<SendLogResponseType> => {
  const {data} = await SsuAPI().request<SendLogResponseType>({
    url: '/send-tracking/view',
    method: 'POST',
    data: {
      id: props?.id,
      context: 'post',
    },
  });

  return data;
};

export const sendShareLogEP = async (
  props?: ParamsProps,
): Promise<SendLogResponseType> => {
  const {data} = await SsuAPI().request<SendLogResponseType>({
    url: '/send-tracking/share',
    method: 'POST',
    data: {
      id: props?.id,
      context: 'post',
    },
  });

  return data;
};
