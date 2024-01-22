import create from 'zustand';

type metaProps = {
  page: number;
  perPage: number;
};

interface TabVoucherAvailProps {
  metaVoucher: metaProps;
  setMetaVoucher: (value: metaProps) => void;
  allowUpdateMeta?: boolean;
  setAllowUpdateMeta: (value: boolean) => void;
}

export const tabVoucherStore = create<TabVoucherAvailProps>(set => ({
  metaVoucher: {
    page: 1,
    perPage: 10,
  },
  setMetaVoucher: (value: metaProps) => set({metaVoucher: value}),
  allowUpdateMeta: true,
  setAllowUpdateMeta: (value: boolean) => set({allowUpdateMeta: value}),
}));
