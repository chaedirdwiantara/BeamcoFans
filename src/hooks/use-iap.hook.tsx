import {useState} from 'react';
import {EmitterSubscription, Platform} from 'react-native';
import * as IAP from 'react-native-iap';
import {createIapApple, generateSessionPurchase} from '../api/credit.api';
import {getCoinFromProductId} from '../utils';
import {useIapStore} from '../store/iap.store';
import {storage} from './use-storage.hook';
import {AuthType} from '../interface/auth.interface';

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
  const iapStore = useIapStore();

  // const [iapProduct, setIapProduct] = useState<IAP.Product[]>([]);
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
      iapStore.setProductList(response);
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
      async (purchase: IAP.SubscriptionPurchase | IAP.ProductPurchase) => {
        console.log('purchaseUpdatedListener', purchase);
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          // TODO: wiring to backend to add the credit into profile
          const deviceId = storage.getString('uniqueId');
          const JSONProfile = storage.getString('profile') as string;
          const profileObject = JSON.parse(JSONProfile) as AuthType;
          const ownerId = profileObject.uuid;

          if (deviceId) {
            const generateSession = await generateSessionPurchase({
              deviceId: deviceId,
            });
            console.log(generateSession);
            console.log(
              iapStore.productList.filter(
                ar => ar.productId === purchase.productId,
              ),
            );

            // await createIapApple({
            //   owner: ownerId;
            //   ownerType: 1, //1 fans, 2 musician
            //   trxReferenceId: purchase.transactionId ?? '',
            //   credit: Number(getCoinFromProductId(purchase.productId)),
            //   packageId: purchase.productId,
            //   currency: string;
            //   packagePrice: number;
            //   trxStatus: 1,
            //   deviceId: deviceId,
            //   trxSession: generateSession.data.Session
            // })

            // await getCreditCount()
          }
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
    iapProduct: iapStore.productList,
    initIAP,
    endIap,
    getProductIap,
    purchaseProduct,
    loadIapListener,
    purchaseUpdateListener,
    purchaseErrorListener,
  };
};
