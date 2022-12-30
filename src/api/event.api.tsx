import {ParamsProps} from '../interface/base.interface';
import {MerchListResponse} from '../interface/event.interface';
import BookYayAPI from './baseBookYay';

export const listMerch = async (
  props?: ParamsProps,
): Promise<MerchListResponse> => {
  const {data} = await BookYayAPI().request<MerchListResponse>({
    url: '/home/topics/pure',
    method: 'GET',
    params: props,
  });

  return data;
};
