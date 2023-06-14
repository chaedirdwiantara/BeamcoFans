import {useState} from 'react';
import {
  checkSubsEC,
  createDonation,
  getCredit,
  subsEC,
} from '../api/credit.api';
import {
  CreateDonationParams,
  SubsECParams,
} from '../interface/credit.interface';
import {useIapStore} from '../store/iap.store';

export const useCreditHook = () => {
  const iapStore = useIapStore();
  const [alreadySubsEC, setAlreadySubsEC] = useState(false);

  const getCreditCount = async () => {
    try {
      const response = await getCredit();
      iapStore.setUserCredit(response.data.credit);
    } catch (err) {
      console.log(err);
    }
  };

  const createNewDonation = async (props: CreateDonationParams) => {
    try {
      const response = await createDonation(props);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const checkSubs = async (musicianID: string) => {
    try {
      const response = await checkSubsEC(musicianID);
      setAlreadySubsEC(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const subsNewEC = async (props: SubsECParams) => {
    try {
      const response = await subsEC(props);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    creditCount: iapStore.userCredit,
    getCreditCount,
    createNewDonation,
    checkSubs,
    alreadySubsEC,
    subsNewEC,
  };
};
