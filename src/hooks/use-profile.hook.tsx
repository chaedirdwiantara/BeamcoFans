import axios from 'axios';
import {useState} from 'react';
import {
  getProfile,
  updateProfile,
  UpdateProfilePropsType,
} from '../api/profile.api';
import {applyReferral} from '../api/referral.api';
import {ProfileResponseData} from '../interface/profile.interface';

export const useProfileHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isValidReferral, setIsValidReferral] = useState<boolean | null>(null);
  const [dataProfile, setDataProfile] = useState<ProfileResponseData | null>(
    null,
  );

  const getProfileUser = async () => {
    try {
      const response = await getProfile();
      setDataProfile(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfileUser = async (
    props?: UpdateProfilePropsType,
    triggered?: boolean,
  ) => {
    try {
      setDataProfile(null);
      await updateProfile(props);
      if (triggered) {
        getProfileUser();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfilePreference = async (props?: UpdateProfilePropsType) => {
    try {
      await updateProfile(props);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyReferralUser = async (refCode: string) => {
    try {
      setIsLoading(true);
      const response = await applyReferral(refCode);
      if (response.code === 200) {
        setIsValidReferral(true);
      } else {
        setIsValidReferral(false);
        setErrorMsg(response.message);
      }
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        setErrorMsg(error.response?.data?.message);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMsg,
    isValidReferral,
    dataProfile,
    getProfileUser,
    updateProfileUser,
    applyReferralUser,
    updateProfilePreference,
  };
};
