import {useState} from 'react';
import {EmitterSubscription, Platform} from 'react-native';
import * as IAP from 'react-native-iap';

export const useIapHook = () => {
  const productId = Platform.select({
    ios: [
      'Credit_beamco_100',
      'Credit_beamco_540',
      'Credit_beamco_1200',
      'Credit_beamco_6500',
    ],
    android: [],
  });

  const [iapProduct, setIapProduct] = useState<IAP.Product[]>([]);
  let purchaseUpdateListener: EmitterSubscription | undefined;
  let purchaseErrorListener: EmitterSubscription | undefined;

  const initIAP = async () => {
    try {
      await IAP.initConnection();
    } catch (err) {
      console.log(err);
    }
  };

  const getProductIap = async () => {
    try {
      const response = await IAP.getProducts({skus: productId ?? []});
      setIapProduct(response);
    } catch (err) {
      console.log(err);
    }
  };

  const endIap = () => {
    IAP.endConnection();
  };

  const purchaseProduct = async (sku: string) => {
    try {
      await IAP.requestPurchase({
        sku,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const loadIapListener = () => {
    initIAP();
    purchaseUpdateListener = IAP.purchaseUpdatedListener(
      (purchase: IAP.SubscriptionPurchase | IAP.ProductPurchase) => {
        console.log('purchaseUpdatedListener', purchase);
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          // TODO: wiring to backend to add the credit into profile
        }
      },
    );
    purchaseErrorListener = IAP.purchaseErrorListener(
      (error: IAP.PurchaseError) => {
        console.log('purchaseErrorListener', error);
      },
    );
  };

  return {
    iapProduct,
    initIAP,
    endIap,
    getProductIap,
    purchaseProduct,
    loadIapListener,
    purchaseUpdateListener,
    purchaseErrorListener,
  };
};
