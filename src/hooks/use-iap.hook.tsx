import {EmitterSubscription, Platform} from 'react-native';
import * as IAP from 'react-native-iap';
import {
  createIapApple,
  createIapGoogle,
  generateSessionPurchase,
} from '../api/credit.api';
import {getCoinFromProductId} from '../utils';
import {useIapStore} from '../store/iap.store';
import {profileStorage, storage} from './use-storage.hook';
import {AuthType} from '../interface/auth.interface';
import {useCreditHook} from './use-credit.hook';
import {queryClient} from '../service/queryClient';
import {generateTopupVoucher} from '../api/event.api';

let executeOnce = false;

export const useIapHook = () => {
  const {getCreditCount} = useCreditHook();
  const productId = Platform.select({
    ios: [
      'Credit_beamco_100',
      'Credit_beamco_340',
      'Credit_beamco_540',
      'Credit_beamco_1200',
      'Credit_beamco_6500',
    ],
    android: [
      'credit_beamco_100',
      'credit_beamco_340',
      'credit_beamco_540',
      'credit_beamco_1200',
      'credit_beamco_6500',
    ],
  });
  const iapStore = useIapStore();

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
      await initIAP();
      const response = await IAP.getProducts({skus: productId ?? []});
      iapStore.setProductList(response);
      return response;
    } catch (err) {
      console.log('err', err);
    }
  };

  const endIap = () => {
    IAP.endConnection();
  };

  const purchaseProduct = async (sku: string) => {
    try {
      if (Platform.OS === 'ios') {
        await IAP.requestPurchase({
          sku,
          andDangerouslyFinishTransactionAutomaticallyIOS: false,
        });
      } else if (Platform.OS === 'android') {
        await IAP.requestPurchase({
          skus: [sku],
          andDangerouslyFinishTransactionAutomaticallyIOS: false,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadIapListener = () => {
    initIAP();
    purchaseUpdateListener = IAP.purchaseUpdatedListener(
      async (purchase: IAP.SubscriptionPurchase | IAP.ProductPurchase) => {
        const runOnce = (() => {
          return async () => {
            if (!executeOnce) {
              executeOnce = true;
              const receipt = purchase.transactionReceipt;
              if (receipt) {
                const deviceId = storage.getString('uniqueId');
                const JSONProfile = storage.getString('profile') as string;
                const profileObject = JSON.parse(JSONProfile) as AuthType;
                const ownerId = profileObject.uuid;
                let selectedProduct: IAP.Product[] = [];
                const listProduct = (await getProductIap()) as IAP.Product[];
                selectedProduct = listProduct.filter(
                  ar => ar.productId === purchase.productId,
                );
                if (deviceId) {
                  const generateSession = await generateSessionPurchase({
                    deviceId: deviceId,
                  });
                  if (selectedProduct.length > 0) {
                    if (Platform.OS === 'ios') {
                      await createIapApple({
                        owner: ownerId,
                        ownerType: 1, //1 fans, 2 musician
                        trxReferenceId: purchase.transactionId ?? '',
                        credit: parseInt(
                          getCoinFromProductId({
                            productId: purchase.productId,
                            type: 'number',
                          }),
                        ),
                        packageId: purchase.productId,
                        currency: selectedProduct[0].currency,
                        packagePrice: Number(selectedProduct[0].price),
                        trxStatus: 1,
                        deviceId: deviceId,
                        trxSession: generateSession.data.Session,
                      });
                    } else if (Platform.OS === 'android') {
                      await createIapGoogle({
                        owner: ownerId,
                        ownerType: 1, //1 fans, 2 musician
                        trxReferenceId: purchase.transactionId ?? '',
                        credit: parseInt(
                          getCoinFromProductId({
                            productId: purchase.productId,
                            type: 'number',
                          }),
                        ),
                        packageId: purchase.productId,
                        currency: selectedProduct[0].currency,
                        packagePrice: Number(
                          selectedProduct[0].price.replace(/[^0-9.-]+/g, ''),
                        ),
                        trxStatus: 1,
                        deviceId: deviceId,
                        trxSession: generateSession.data.Session,
                        packageName: purchase.packageNameAndroid,
                        token: purchase.purchaseToken,
                      });
                    }
                    const eventId = storage.getString('eventId');
                    if (eventId) {
                      await generateTopupVoucher({
                        eventId,
                        userType: 'fans',
                        userUUID: profileStorage()?.uuid || '',
                      });
                      storage.delete('eventId');
                    }
                    await getCreditCount();
                  }
                }
                await IAP.finishTransaction({purchase, isConsumable: true});
                executeOnce = false;
              }
              queryClient.invalidateQueries({
                queryKey: ['transaction-history'],
              });
            }
          };
        })();
        runOnce();
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
