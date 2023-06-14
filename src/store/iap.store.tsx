import create from 'zustand';
import * as IAP from 'react-native-iap';

interface IapState {
  productList: IAP.Product[];
  selectedProduct: IAP.Product | null;
  setProductList: (by: IAP.Product[]) => void;
  setSelectedProduct: (by: IAP.Product) => void;
}

export const useIapStore = create<IapState>()(set => ({
  productList: [],
  selectedProduct: null,
  setProductList: by => set(state => ({productList: by})),
  setSelectedProduct: by => set(state => ({selectedProduct: by})),
}));
